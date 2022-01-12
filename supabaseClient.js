import { createClient } from '@supabase/supabase-js'
import { AsyncStorage } from 'react-native'
export const supabase = createClient(
    "https://xhwicmzcrqrpectawsbl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjczMjkyNCwiZXhwIjoxOTUyMzA4OTI0fQ._6N3rG3SvVED4d9pSMwK-mcNjF61Zcf__KpGEyKTzew", {
    localStorage: AsyncStorage,
    detectSessionInUrl: false // Prevents Supabase from evaluating window.location.href, breaking mobile
});