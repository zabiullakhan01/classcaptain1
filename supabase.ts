import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if environment variables are properly configured
const isConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && 
                    supabaseAnonKey !== 'placeholder-key' &&
                    supabaseUrl.includes('supabase.co') &&
                    supabaseAnonKey.length > 20;

if (!isConfigured) {
  console.warn('⚠️  Supabase not configured properly. Using fallback mode.');
  console.warn('📝 To enable database features:');
  console.warn('   1. Create a Supabase project at https://supabase.com');
  console.warn('   2. Copy your project URL and anon key');
  console.warn('   3. Update the .env file with your credentials');
  console.warn('   4. Restart the development server');
} else {
  console.log('✅ Supabase configured successfully');
}

// Create Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // Since we're using custom auth
  },
  global: {
    headers: {
      'X-Client-Info': 'class-captain-app'
    }
  }
});

// Export configuration status for use in components
export const isSupabaseConfigured = isConfigured;

// Database types
export interface Academy {
  id: string
  name: string
  email: string
  academy_key: string
  user_id: string // Added user_id to link to auth.users
  created_at: string
}

export interface Student {
  id: string
  name: string
  email: string
  roll_number?: string
  father_name: string
  date_of_birth: string
  mobile_number_1: string
  mobile_number_2?: string
  gender: 'Male' | 'Female' | 'Other'
  address?: string
  admission_date: string
  academy_id: string
  password: string
  transport_use: string
  id_number?: string
  field_1?: string
  field_2?: string
  student_id: string // Added student_id
  batch?: string // Added batch
  created_at: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  subject: string
  academy_id: string
  date_of_birth?: string // Made optional as per migration
  created_at: string
}

export interface Batch {
  id: string
  name: string
  subject: string
  teacher_id?: string // Made optional as per migration
  academy_id: string
  schedule: string
  start_date: string
  end_date?: string // Made optional as per migration
  max_students?: number // Made optional as per migration
  fees?: number // Made optional as per migration
  description?: string // Made optional as per migration
  created_at: string
}

export interface Attendance {
  id: string
  student_id: string
  batch_id: string
  date: string
  status: 'present' | 'absent'
  created_at: string
}

export interface Grade {
  id: string
  student_id: string
  batch_id: string
  marks: number
  total_marks: number
  exam_date: string
  created_at: string
}
