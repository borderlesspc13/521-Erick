import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/trancatto.css';

interface TrancattoAuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function TrancattoAuthLayout({
  title,
  subtitle,
  children,
}: TrancattoAuthLayoutProps) {
  return (
    <div className="trancatto-auth">
      <header className="trancatto-auth-header">
        <Link href="/" className="trancatto-auth-brand" aria-label="Trançatto — início">
          <Image
            src="/images/trancatto/asset-5.png"
            alt="Trançatto"
            width={176}
            height={52}
            priority
            unoptimized
          />
        </Link>
        <Link href="/" className="trancatto-auth-back">
          Voltar ao site <span aria-hidden="true">←</span>
        </Link>
      </header>

      <main className="trancatto-auth-main">
        <div className="trancatto-auth-card">
          <div className="trancatto-auth-head">
            <p className="eyebrow dark">Portal do cliente</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
