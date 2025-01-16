import { create } from 'zustand';

import { createSelectors } from '../utils';
import { type AuthType, getToken, removeToken, setToken, signInWithEmail, signUpWithEmail, type TokenType } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn' | 'signUp';
  signIn: (data: AuthType) => void;
  signOut: () => void;
  signUp: (data: AuthType) => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,

  signUp: async (data) => {
    try {
      const user = await signUpWithEmail(data.email, data.password);
      console.log('User created:', user);
      set({ status: 'signUp' });
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  },

  signIn: async (data) => {
    try {
      const { session } = await signInWithEmail(data.email, data.password);
      setToken({
        access: session?.access_token ?? '',
        refresh: session?.refresh_token ?? '',
      });
      set({
        status: 'signIn',
        token: {
          access: session?.access_token ?? '',
          refresh: session?.refresh_token ?? '',
        },
      });
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  },

  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },

  hydrate: async () => {
    try {
      const userToken = await getToken();
      if (userToken !== null) {
        set({
          status: 'signIn',
          token: userToken,
        });
      } else {
        get().signOut();
      }
    } catch (e) {
      console.error('Hydration error:', e);
      get().signOut();
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (data: AuthType) => _useAuth.getState().signIn(data);
export const signUp = (data: AuthType) => _useAuth.getState().signUp(data);
export const hydrateAuth = () => _useAuth.getState().hydrate();
