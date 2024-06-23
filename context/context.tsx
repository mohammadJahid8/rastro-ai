'use client';

import { auth } from '@/firebase/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

export type UserType = {
  uid: string;
  displayName: string;
  photoURL: string;
} | null;

export const AppContext = createContext<any | null>(null);

export function useAppContext(): any {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.getIdToken().then((idToken) => {
          localStorage.setItem('token', idToken);
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName as string,
            photoURL: currentUser.photoURL as string,
          });
          setLoadingUser(false);
        });
      } else {
        setUser(null);
        localStorage.removeItem('token');
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('inside logout');
      await signOut(auth);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{ handleLogin, handleLogout, user, loadingUser }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default Context;
