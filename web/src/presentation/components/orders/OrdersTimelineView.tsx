'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Order } from '@/domain/entities/Order';
import { cn } from '@/core/utils/cn';
import { formatCurrency, formatDate } from '@/core/utils/format';
import { OrderTrackingPanel } from './OrderTrackingPanel';
import { getOrderStatusTitle } from './orderTimelineSteps';
import { orderStatusConfig } from './orderStatusConfig';

interface OrdersTimelineViewProps {
  orders: Order[];
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function OrdersTimelineView({ orders }: OrdersTimelineViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter((order) => order.id.toLowerCase().includes(query));
  }, [orders, searchQuery]);

  useEffect(() => {
    if (filteredOrders.length === 0) {
      setSelectedOrderId(null);
      return;
    }

    const isSelectedVisible = filteredOrders.some((order) => order.id === selectedOrderId);
    if (!isSelectedVisible) {
      setSelectedOrderId(filteredOrders[0].id);
    }
  }, [filteredOrders, selectedOrderId]);

  const selectedOrder =
    filteredOrders.find((order) => order.id === selectedOrderId) ?? filteredOrders[0] ?? null;

      if (filteredOrders.length === 0) {
    return (
      <div className="orders-timeline-empty">
        <p className="orders-timeline-empty__title">Nenhum pedido encontrado</p>
        <p className="orders-timeline-empty__text">
          {searchQuery.trim()
            ? 'Tente pesquisar com outro número de pedido.'
            : 'Ainda não há pedidos vinculados à sua conta. Se você acabou de criar a conta, peça ao time Trançatto para liberar os dados ou execute o seed de demonstração.'}
        </p>
      </div>
    );
  }

  return (
    <div className="orders-timeline-layout">
      <aside className="orders-timeline-sidebar">
        <div className="orders-timeline-search">
          <label htmlFor="order-search" className="sr-only">
            Pesquisar por número do pedido
          </label>
          <SearchIcon className="orders-timeline-search__icon" />
          <input
            id="order-search"
            type="search"
            placeholder="Buscar pedido..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="orders-timeline-search__input"
          />
        </div>

        <ul className="orders-timeline-list" role="listbox" aria-label="Lista de pedidos">
          {filteredOrders.map((order) => {
            const isSelected = order.id === selectedOrder?.id;
            const statusTitle = getOrderStatusTitle(order.status);
            const statusLabel = orderStatusConfig[order.status].label;

            return (
              <li key={order.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={cn(
                    'orders-timeline-list__item',
                    isSelected && 'orders-timeline-list__item--active',
                  )}
                >
                  <div className="orders-timeline-list__top">
                    <span className="orders-timeline-list__id">{order.id}</span>
                    <span className="orders-timeline-list__status">{statusLabel}</span>
                  </div>
                  <p className="orders-timeline-list__phase">{statusTitle}</p>
                  <div className="orders-timeline-list__meta">
                    <span>{formatDate(order.orderDate)}</span>
                    <span>{formatCurrency(order.estimatedValue)}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <section className="orders-timeline-main" aria-live="polite">
        {selectedOrder ? (
          <OrderTrackingPanel order={selectedOrder} />
        ) : (
          <div className="orders-timeline-empty">
            <p className="orders-timeline-empty__title">Selecione um pedido</p>
            <p className="orders-timeline-empty__text">
              Escolha um pedido na lista para ver o rastreamento completo.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
