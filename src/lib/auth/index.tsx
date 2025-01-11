import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { SignUpType, TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn' | 'signUp';
  signIn: (data: TokenType) => void;
  signOut: () => void;
  signUp: (data: SignUpType) => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,

  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },

  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },

  signUp: (data) => {
    console.log(data);
    set({ status: 'signUp' });
  },

  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // Catch error during hydration
      // Maybe sign_out user!
      console.error(e);
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const signUp = (data: SignUpType) => _useAuth.getState().signUp(data);
export const hydrateAuth = () => _useAuth.getState().hydrate();
