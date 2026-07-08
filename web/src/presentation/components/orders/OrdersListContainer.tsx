'use client';

import Link from 'next/link';
import { OrdersTimelineView } from '@/presentation/components/orders/OrdersTimelineView';
import { useOrders } from '@/presentation/hooks/useOrders';

export function OrdersListContainer() {
  const { orders, isLoading, error, refresh } = useOrders();

  if (isLoading && orders.length === 0) {
    return (
      <div className="orders-timeline-loading">
        <p>Carregando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-timeline-error">
        <p>{error}</p>
        <div className="orders-timeline-error__actions">
          <button type="button" onClick={() => void refresh()}>
            Tentar novamente
          </button>
          <Link href="/login">Iniciar sessão</Link>
        </div>
      </div>
    );
  }

  return <OrdersTimelineView orders={orders} />;
}
