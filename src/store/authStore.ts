import { create } from 'zustand';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import { AuthState, Designer } from '../types';

export const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}>((set) => ({
  designer: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch userName from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      const userName = userDoc.exists() ? userDoc.data().userName : '';

      set({
        designer: {
          id: user.uid,
          name: userName, 
          email: user.email || '',
        } as Designer,
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: async () => {
    await signOut(auth);
    set({
      designer: null,
      isAuthenticated: false,
    });
  },
}));
