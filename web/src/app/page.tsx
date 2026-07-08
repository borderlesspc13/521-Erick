import type { Metadata } from 'next';
import { TrancattoLanding } from '@/components/landing/TrancattoLanding';

export const metadata: Metadata = {
  title: 'Trançatto — Cordas e tricôs náuticos para móveis',
  description:
    'Cordas e tricôs náuticos com fabricação própria, resistência UV e paleta de cores para o setor moveleiro.',
};

export default function Home() {
  return <TrancattoLanding />;
}
