'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TrancattoPortalHeaderProps {
  portalLabel?: string;
}

export function TrancattoPortalHeader({
  portalLabel = 'Portal do cliente',
}: TrancattoPortalHeaderProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { container } = await import('@/infrastructure/di/container');
      await container.getAuthService().logout();
      router.push('/login');
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="trancatto-portal-header">
      <Link href="/" className="trancatto-portal-header__brand" aria-label="Trançatto — início">
        <Image
          src="/images/trancatto/asset-5.png"
          alt="Trançatto"
          width={176}
          height={52}
          priority
          unoptimized
        />
      </Link>

      <div className="trancatto-portal-header__actions">
        <span className="trancatto-portal-header__label">{portalLabel}</span>
        <button
          type="button"
          className="trancatto-portal-header__logout"
          onClick={() => void handleSignOut()}
          disabled={isSigningOut}
        >
          {isSigningOut ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    </header>
  );
}
