'use client';

import { AdminAuthGuard } from '@/components/landing/AdminAuthGuard';
import { TrancattoPortalHeader } from '@/components/landing/TrancattoPortalHeader';
import { OrdersKanbanContainer } from '@/presentation/components/admin/OrdersKanbanContainer';

export function AdminPortalShell() {
  return (
    <div className="trancatto-portal">
      <TrancattoPortalHeader portalLabel="Painel interno" />

      <main className="trancatto-portal-main trancatto-portal-main--wide">
        <div className="trancatto-portal-intro">
          <p className="eyebrow dark">Operações</p>
          <h1>Quadro de pedidos</h1>
          <p>
            Cadastre novos pedidos e arraste os cards entre as etapas para atualizar o status em
            tempo real.
          </p>
        </div>

        <AdminAuthGuard>
          <OrdersKanbanContainer />
        </AdminAuthGuard>
      </main>
    </div>
  );
}
