'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/auth-context';

export default function Dashboard() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      router.push('/dashboard/overview');
    }
  }, [user, router]);

  return null;
}
