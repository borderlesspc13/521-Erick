import type { Metadata } from 'next';
import { AdminPortalShell } from '@/components/landing/AdminPortalShell';
import '@/styles/trancatto.css';

export const metadata: Metadata = {
  title: 'Painel de Pedidos',
  description: 'Gerencie pedidos e movimente etapas no quadro Kanban Trançatto.',
};

export default function AdminPage() {
  return <AdminPortalShell />;
}
