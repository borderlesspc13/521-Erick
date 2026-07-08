'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { waitForFirebaseAuthSession } from '@/infrastructure/firebase/firebaseAuthSession';
import { isCurrentUserAdmin } from '@/infrastructure/firebase/FirebaseUserProfileRepository';

interface DashboardAuthGuardProps {
  children: ReactNode;
}

export function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function verifySession() {
      const user = await waitForFirebaseAuthSession();

      if (!isMounted) {
        return;
      }

      if (!user) {
        router.replace('/login');
        return;
      }

      const isAdmin = await isCurrentUserAdmin();

      if (!isMounted) {
        return;
      }

      if (isAdmin) {
        router.replace('/admin');
        return;
      }

      setIsReady(true);
    }

    void verifySession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (!isReady) {
    return (
      <div className="orders-timeline-loading">
        <p>Verificando sessão...</p>
      </div>
    );
  }

  return <>{children}</>;
}
