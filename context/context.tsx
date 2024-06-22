'use client';

import { auth } from '@/firebase/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

type UserType = {
  uid: string;
  displayName: string;
  photoURL: string;
} | null;

type AppContextType = {
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  user: UserType;
};

export const AppContext = createContext<AppContextType | null>(null);

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>(null);

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
