'use client';

import { auth } from '@/firebase/firebase';

import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

export function useAppContext(): any {
  return useContext(AppContext);
}

function Context({ children }: any) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.getIdToken().then((idToken) => {
          localStorage.setItem('token', idToken);
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          });
        });
      } else {
        setUser(null);
        localStorage.removeItem('token');
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
    <AppContext.Provider value={{ handleLogin, handleLogout, user }}>
      {children}
    </AppContext.Provider>
  );
}

export default Context;
