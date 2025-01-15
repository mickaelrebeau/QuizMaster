import AsyncStorage from '@react-native-async-storage/async-storage';

import { supabase } from '@/utils/supabase';

export type TokenType = {
  access: string | null;
  refresh: string | null;
};

export type AuthType = {
  email: string;
  password: string;
};

export const getToken = async (): Promise<TokenType | null> => {
  const token = await AsyncStorage.getItem('supabase.auth.token');
  return token ? JSON.parse(token) : null;
};

export const setToken = async (data: TokenType): Promise<void> => {
  await AsyncStorage.setItem('supabase.auth.token', JSON.stringify(data));
};

export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('supabase.auth.token');
};
export const signUpWithEmail = async (email: string, password: string) => {
  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return user;
};
export const signInWithEmail = async (email: string, password: string) => {
  const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return { user, session };
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
