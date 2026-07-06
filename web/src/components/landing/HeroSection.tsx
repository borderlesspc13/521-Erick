import Link from 'next/link';
import { Button } from '@/presentation/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-50)_0%,_transparent_60%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <span className="mb-6 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-800">
          Fábrica de cordas industriais · B2B
        </span>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-primary-800 sm:text-5xl lg:text-6xl">
          Rastreabilidade total e prazos que a sua operação pode confiar
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          Produzimos cordas de alta performance com controlo de qualidade em cada
          etapa. Acompanhe pedidos em tempo real, desde a aprovação até à
          faturação — com transparência industrial.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/login">Aceder ao Portal</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#faq">Ver perguntas frequentes</Link>
          </Button>
        </div>

        <dl className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-neutral-200 pt-10">
          {[
            { value: '15k+', label: 'metros/dia' },
            { value: '30+', label: 'anos no mercado' },
            { value: '100%', label: 'rastreável' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-2xl font-bold text-primary-800 sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-neutral-500">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
