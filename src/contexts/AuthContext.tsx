import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface Profile {
  id: string
  username: string
  first_name: string | null
  last_name: string | null
  email: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userData: { username: string; firstName?: string; lastName?: string }) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Function to completely clear all auth-related storage
  const clearAllAuthStorage = () => {
    console.log('🧹 Clearing all authentication storage...')
    
    // Clear localStorage
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.includes('supabase') || key.includes('auth') || key.includes('sb-'))) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => {
      console.log(`🗑️ Removing localStorage key: ${key}`)
      localStorage.removeItem(key)
    })
    
    // Clear sessionStorage
    const sessionKeysToRemove = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key && (key.includes('supabase') || key.includes('auth') || key.includes('sb-'))) {
        sessionKeysToRemove.push(key)
      }
    }
    sessionKeysToRemove.forEach(key => {
      console.log(`🗑️ Removing sessionStorage key: ${key}`)
      sessionStorage.removeItem(key)
    })
    
    // Clear specific known keys
    const specificKeys = [
      'supabase.auth.token',
      'sb-chzqxaipqwqneupsvgce-auth-token',
      'supabase-auth-token',
      'supabase.session'
    ]
    
    specificKeys.forEach(key => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    })
    
    console.log('✅ All authentication storage cleared')
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session)
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session)
      
      // Handle sign out event specifically
      if (event === 'SIGNED_OUT') {
        console.log('User signed out - clearing all state')
        setSession(null)
        setUser(null)
        setProfile(null)
        setLoading(false)
        
        // Clear all storage
        clearAllAuthStorage()
        
        return
      }
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found - this is not an error, just means profile doesn't exist yet
          console.log('No profile found for user:', userId)
          setProfile(null)
        } else {
          console.error('Error fetching profile:', error)
          // For other errors, still set profile to null but log the error
          setProfile(null)
        }
      } else if (data) {
        console.log('Profile fetched successfully:', data)
        setProfile(data)
      } else {
        // No data and no error - shouldn't happen but handle it
        console.log('No profile data returned for user:', userId)
        setProfile(null)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: { username: string; firstName?: string; lastName?: string }) => {
    try {
      console.log('🚀 Starting signup process...', { email, username: userData.username })

      // Check if username is already taken
      console.log('🔍 Checking if username exists...')
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', userData.username)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Error checking username:', checkError)
        return { error: { message: 'Error checking username availability: ' + checkError.message } }
      }

      if (existingProfile) {
        console.log('❌ Username already exists')
        return { error: { message: 'Username is already taken' } }
      }

      console.log('✅ Username is available')

      // Sign up the user
      console.log('👤 Attempting to sign up user...')
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            username: userData.username,
            first_name: userData.firstName || null,
            last_name: userData.lastName || null,
          }
        }
      })

      if (authError) {
        console.error('❌ Auth signup error:', authError)
        return { error: authError }
      }

      console.log('✅ Auth signup successful:', authData)

      // Since email confirmation is disabled, we should have a user and session immediately
      if (authData.user?.id) {
        console.log('📝 Creating profile for user:', authData.user.id)
        
        const profileData = {
          id: authData.user.id,
          username: userData.username,
          first_name: userData.firstName || null,
          last_name: userData.lastName || null,
          email: email,
        }

        console.log('📝 Profile data to insert:', profileData)

        const { data: profileResult, error: profileError } = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .single()

        if (profileError) {
          console.error('❌ Error creating profile:', profileError)
          // Don't return error here - the user account was created successfully
          // The profile will be created on first login if it fails here
          console.log('⚠️ Profile creation failed, but signup was successful. Profile will be created on first login.')
        } else {
          console.log('✅ Profile created successfully:', profileResult)
        }

        // If we have a session (email confirmation disabled), the user is logged in immediately
        if (authData.session) {
          console.log('🎉 User is logged in immediately (email confirmation disabled)')
          setSession(authData.session)
          setUser(authData.user)
          if (profileResult) {
            setProfile(profileResult)
          }
        }
      } else {
        console.log('📧 User created but needs email confirmation')
      }

      console.log('🎉 Registration completed successfully!')
      return { error: null }
    } catch (error: any) {
      console.error('💥 Signup error:', error)
      return { error: { message: 'Registration failed: ' + (error.message || 'Unknown error') } }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting to sign in user:', email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('❌ Sign in error:', error)
        
        // Enhanced error handling with more specific messages
        let userFriendlyMessage = error.message
        
        if (error.message.includes('Invalid login credentials')) {
          userFriendlyMessage = 'The email or password you entered is incorrect. Please check your credentials and try again.'
        } else if (error.message.includes('Email not confirmed')) {
          userFriendlyMessage = 'Please check your email and click the confirmation link before signing in.'
        } else if (error.message.includes('Too many requests')) {
          userFriendlyMessage = 'Too many login attempts. Please wait a few minutes before trying again.'
        } else if (error.message.includes('User not found')) {
          userFriendlyMessage = 'No account found with this email address. Please check your email or register for a new account.'
        } else if (error.message.includes('signup_disabled')) {
          userFriendlyMessage = 'New signups are currently disabled. Please contact support.'
        }
        
        return { error: { ...error, message: userFriendlyMessage } }
      }

      console.log('✅ Sign in successful')

      // Check if profile exists, create if missing
      if (data.user) {
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError && profileError.code === 'PGRST116') {
          console.log('📝 Creating missing profile for user:', data.user.id)
          
          const profileData = {
            id: data.user.id,
            username: data.user.user_metadata?.username || data.user.email?.split('@')[0] || 'user',
            first_name: data.user.user_metadata?.first_name || null,
            last_name: data.user.user_metadata?.last_name || null,
            email: data.user.email || '',
          }

          const { error: createError } = await supabase
            .from('profiles')
            .insert(profileData)

          if (createError) {
            console.error('❌ Error creating profile on login:', createError)
          } else {
            console.log('✅ Profile created on login')
          }
        } else if (existingProfile) {
          console.log('✅ Profile found for user:', existingProfile)
          setProfile(existingProfile)
        }
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('💥 Sign in error:', error)
      return { error: { message: 'Login failed due to a network error. Please check your connection and try again.' } }
    }
  }

  const signOut = async () => {
    try {
      console.log('👋 Starting sign out process')
      
      // Clear state immediately to prevent any UI flickering
      setUser(null)
      setProfile(null)
      setSession(null)
      
      // Clear all auth storage BEFORE calling signOut
      clearAllAuthStorage()
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut({
        scope: 'global' // This ensures the user is signed out from all sessions
      })
      
      if (error) {
        console.error('❌ Error signing out from Supabase:', error)
      } else {
        console.log('✅ Successfully signed out from Supabase')
      }
      
      // Clear storage again after signOut to be absolutely sure
      clearAllAuthStorage()
      
      // Force reload the page to ensure complete cleanup
      setTimeout(() => {
        window.location.reload()
      }, 100)
      
      console.log('🧹 Sign out process completed')
      
    } catch (error) {
      console.error('💥 Sign out error:', error)
      // Clear state and storage even if there's an error
      setUser(null)
      setProfile(null)
      setSession(null)
      clearAllAuthStorage()
      
      // Force reload on error too
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: { message: 'No user logged in' } }

    const { error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)

    if (!error && profile) {
      setProfile({ ...profile, ...updates })
    }

    return { error }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}