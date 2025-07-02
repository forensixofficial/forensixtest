import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://chzqxaipqwqneupsvgce.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoenF4YWlwcXdxbmV1cHN2Z2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNzY0MzQsImV4cCI6MjA2Njc1MjQzNH0.TNzpDnyK8nAMMti77n4Gd3R73gHuRnmW8thrVdc6K18'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          first_name: string | null
          last_name: string | null
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          first_name?: string | null
          last_name?: string | null
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          first_name?: string | null
          last_name?: string | null
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}