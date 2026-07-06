import Link from 'next/link';
import { Button } from '@/presentation/components/ui/Button';
import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProofCarousel } from '@/components/landing/SocialProofCarousel';
import { FaqSection } from '@/components/landing/FaqSection';
import { ChatbotFab } from '@/components/landing/ChatbotFab';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-primary-800">
            Cordas Industriais
          </Link>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#faq">FAQ</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/login">Aceder ao Portal</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <SocialProofCarousel />
        <FaqSection />
      </main>

      <footer className="border-t border-neutral-200 bg-primary-800 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-sm text-primary-100">
            © {new Date().getFullYear()} Cordas Industriais. Todos os direitos reservados.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="bg-secondary-500 hover:bg-secondary-400"
            asChild
          >
            <Link href="/login">Aceder ao Portal</Link>
          </Button>
        </div>
      </footer>

      <ChatbotFab />
    </div>
  );
}
