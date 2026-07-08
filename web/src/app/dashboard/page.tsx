import type { Metadata } from 'next';
import { DashboardAuthGuard } from '@/components/landing/DashboardAuthGuard';
import { TrancattoPortalHeader } from '@/components/landing/TrancattoPortalHeader';
import { OrdersListContainer } from '@/presentation/components/orders/OrdersListContainer';
import '@/styles/trancatto.css';

export const metadata: Metadata = {
  title: 'Meus Pedidos',
  description: 'Acompanhe o andamento dos seus pedidos Trançatto em tempo real.',
};

export default function DashboardPage() {
  return (
    <div className="trancatto-portal">
      <TrancattoPortalHeader />

      <main className="trancatto-portal-main">
        <div className="trancatto-portal-intro">
          <p className="eyebrow dark">Rastreamento</p>
          <h1>Meus pedidos</h1>
          <p>
            Acompanhe cada etapa da produção com a mesma clareza de um rastreamento de entrega.
          </p>
        </div>

        <DashboardAuthGuard>
          <OrdersListContainer />
        </DashboardAuthGuard>
      </main>
    </div>
  );
}
