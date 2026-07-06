'use client';

import { useState } from 'react';
import { cn } from '@/core/utils/cn';

export function ChatbotFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed right-6 bottom-24 z-50 w-80 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
          role="dialog"
          aria-label="Chat de apoio"
        >
          <div className="bg-primary-800 px-5 py-4">
            <p className="font-semibold text-white">Apoio ao Cliente</p>
            <p className="text-sm text-primary-100">
              Estamos disponíveis para ajudar
            </p>
          </div>

          <div className="space-y-3 p-5">
            <div className="rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-700">
              Olá! Como podemos ajudar com o seu pedido industrial?
            </div>
            <p className="text-xs text-neutral-400">
              Chat em breve. Entretanto, contacte-nos pelo portal.
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200',
          'bg-secondary-500 text-white hover:bg-secondary-600 hover:shadow-xl',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2',
          'active:scale-95',
          isOpen && 'rotate-0',
        )}
        aria-label={isOpen ? 'Fechar chat de apoio' : 'Abrir chat de apoio'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}
