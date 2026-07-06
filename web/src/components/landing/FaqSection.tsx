'use client';

import { useState } from 'react';
import { cn } from '@/core/utils/cn';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Quantos metros produzem por dia?',
    answer:
      'A nossa capacidade produtiva ultrapassa os 15.000 metros por dia, com flexibilidade para picos de demanda mediante planeamento prévio com a nossa equipa comercial.',
  },
  {
    question: 'Quanto tempo estão no mercado?',
    answer:
      'Estamos há mais de 30 anos no mercado industrial, fornecendo cordas para sectores como construção civil, logística, offshore e agricultura em todo o território nacional.',
  },
  {
    question: 'Como funciona a rastreabilidade dos pedidos?',
    answer:
      'Cada pedido recebe um identificador único no portal B2B. Pode acompanhar o estado em tempo real — desde a aprovação, produção, separação até à faturação.',
  },
  {
    question: 'Qual é o prazo médio de entrega?',
    answer:
      'O prazo varia conforme o volume e especificação técnica. Após aprovação, a produção standard é iniciada em até 48 horas, com entrega acordada no momento do pedido.',
  },
  {
    question: 'É possível personalizar cordas para a minha operação?',
    answer:
      'Sim. Trabalhamos com especificações técnicas sob medida — diâmetro, composição, resistência e acabamento — sempre com laudo de qualidade e rastreio completo.',
  },
];

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary-800"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-neutral-800">{item.question}</span>
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800 transition-transform duration-200',
            isOpen && 'rotate-45',
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <p className="pr-10 text-sm leading-relaxed text-neutral-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-medium tracking-widest text-secondary-500 uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-800">
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-neutral-600">
            Respostas diretas para as dúvidas mais comuns dos nossos parceiros B2B.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6">
          {FAQ_ITEMS.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
