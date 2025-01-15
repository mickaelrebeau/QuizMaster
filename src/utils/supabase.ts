import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cgkwzgucgbhzevahlpqg.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNna3d6Z3VjZ2JoemV2YWhscHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDQyNTYsImV4cCI6MjA0ODM4MDI1Nn0.hS7TdaQlBCSlWlhp51cz1kTU5rMU9kb_9j3FRPdmY5o';


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function getUserId() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Erreur lors de la récupération de la session :', error);
      return null;
    }

    if (session) {
      const userId = session.user.id;
      return userId;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erreur inattendue :', error);
    return null;
  }
}
