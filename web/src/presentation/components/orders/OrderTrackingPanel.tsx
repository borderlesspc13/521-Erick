'use client';

import type { Order } from '@/domain/entities/Order';
import { formatCurrency, formatDate, formatWeight } from '@/core/utils/format';
import { OrderTimeline } from './OrderTimeline';
import { getOrderStatusHeadline, getOrderStatusTitle } from './orderTimelineSteps';
import { orderStatusConfig } from './orderStatusConfig';

interface OrderTrackingPanelProps {
  order: Order;
}

export function OrderTrackingPanel({ order }: OrderTrackingPanelProps) {
  const statusTitle = getOrderStatusTitle(order.status);
  const statusHeadline = getOrderStatusHeadline(order.status);
  const statusLabel = orderStatusConfig[order.status].label;

  return (
    <article className="order-tracking-panel">
      <header className="order-tracking-panel__header">
        <div>
          <p className="order-tracking-panel__eyebrow">Pedido {order.id}</p>
          <h2 className="order-tracking-panel__title">{statusTitle}</h2>
          <p className="order-tracking-panel__headline">{statusHeadline}</p>
        </div>
        <span className="order-tracking-panel__badge">{statusLabel}</span>
      </header>

      <div className="order-tracking-panel__timeline order-tracking-panel__timeline--desktop">
        <OrderTimeline status={order.status} variant="horizontal" />
      </div>

      <div className="order-tracking-panel__timeline order-tracking-panel__timeline--mobile">
        <OrderTimeline status={order.status} variant="vertical" />
      </div>

      <dl className="order-tracking-panel__details">
        <div>
          <dt>Data do pedido</dt>
          <dd>{formatDate(order.orderDate)}</dd>
        </div>
        <div>
          <dt>Peso total</dt>
          <dd>{formatWeight(order.weightInKg)}</dd>
        </div>
        <div>
          <dt>Valor estimado</dt>
          <dd>{formatCurrency(order.estimatedValue)}</dd>
        </div>
        <div>
          <dt>CNPJ</dt>
          <dd>{order.clientCnpj}</dd>
        </div>
      </dl>
    </article>
  );
}
