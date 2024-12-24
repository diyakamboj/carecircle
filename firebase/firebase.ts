import { useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from 'firebase/auth';
import firebase_app from './config';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Initialize Auth
const auth = getAuth(firebase_app);

// Google Login Hook
export const useGoogleLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const login = async () => {
    setError(null);
    setIsPending(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success('Signed In Successfully!');
      router.push('/dashboard/overview');
    } catch (error: any) {
      setError(error.message);
      toast.error(`Failed to sign in: ${error.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};

// GitHub Login Hook
export const useGithubLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const provider = new GithubAuthProvider();

  const login = async () => {
    setError(null);
    setIsPending(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success('Signed In Successfully!');
      router.push('/dashboard/overview');
    } catch (error: any) {
      setError(error.message);
      toast.error(`Failed to sign in: ${error.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};

// Email and Password Login Hook
export const useEmailPasswordLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed In Successfully!');
      router.push('/dashboard/overview');
    } catch (error: any) {
      setError(error.message);
      toast.error(`Failed to sign in: ${error.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};

// Email and Password Registration Hook
export const useEmailPasswordRegistration = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const register = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res.user) throw new Error('Registration failed');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { register, error, isPending };
};

// Email Verification Hook
export const useEmailVerification = () => {
  const [isSent, setIsSent] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendVerification = async () => {
    setError(null);
    setIsPending(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is currently logged in');
      await sendEmailVerification(user);
      setIsSent(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { sendVerification, isSent, isPending, error };
};

// Logout Hook
export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { logout, error };
};
