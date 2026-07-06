const PARTNERS = [
  'Metalúrgica Atlas',
  'Porto Industrial',
  'TransRope Logística',
  'Offshore Norte',
  'Construções Silva',
  'AgroCord Brasil',
  'NavalTech',
  'Energia & Cabos',
];

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div
      className="mx-8 flex h-14 w-44 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 shadow-sm"
      aria-hidden="true"
    >
      <span className="truncate text-sm font-semibold tracking-wide text-neutral-400 uppercase">
        {name}
      </span>
    </div>
  );
}

export function SocialProofCarousel() {
  const logos = [...PARTNERS, ...PARTNERS];

  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-10 text-center text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Empresas que confiam em nós
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-neutral-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-neutral-50 to-transparent" />

        <div className="flex w-max animate-marquee">
          {logos.map((name, index) => (
            <LogoPlaceholder key={`${name}-${index}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
