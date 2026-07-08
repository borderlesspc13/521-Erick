'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { waitForFirebaseAuthSession } from '@/infrastructure/firebase/firebaseAuthSession';
import { isCurrentUserAdmin } from '@/infrastructure/firebase/FirebaseUserProfileRepository';

interface AdminAuthGuardProps {
  children: ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isDenied, setIsDenied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function verifyAccess() {
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

      if (!isAdmin) {
        setIsDenied(true);
        return;
      }

      setIsReady(true);
    }

    void verifyAccess();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isDenied) {
    return (
      <div className="orders-timeline-loading">
        <p>Você não tem permissão para acessar o painel interno.</p>
        <p className="orders-timeline-loading__hint">
          Solicite acesso ao time Trançatto ou use uma conta administrativa.
        </p>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="orders-timeline-loading">
        <p>Verificando permissões...</p>
      </div>
    );
  }

  return <>{children}</>;
}
