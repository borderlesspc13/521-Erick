'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import type { Order, OrderStatus } from '@/domain/entities/Order';
import type { CreateOrderData } from '@/domain/repositories/IOrderRepository';
import { AuthSessionError } from '@/infrastructure/firebase/firebaseAuthSession';
import { isCurrentUserAdmin } from '@/infrastructure/firebase/FirebaseUserProfileRepository';

function resolveAdminOrdersError(error: unknown): string {
  if (error instanceof AuthSessionError) {
    return error.message;
  }

  if (error instanceof FirebaseError) {
    if (error.code === 'permission-denied') {
      return 'Sem permissão para gerenciar pedidos.';
    }

    if (error.code === 'unavailable') {
      return 'Serviço temporariamente indisponível. Tente novamente.';
    }
  }

  if (process.env.NODE_ENV === 'development' && error instanceof Error) {
    console.error('[useAdminOrders]', error);
  }

  return 'Não foi possível concluir a operação. Tente novamente.';
}

interface UseAdminOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  isMutating: boolean;
  refresh: () => Promise<void>;
  createOrder: (data: CreateOrderData) => Promise<boolean>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<boolean>;
}

export function useAdminOrders(): UseAdminOrdersReturn {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const isAdmin = await isCurrentUserAdmin();

      if (!isAdmin) {
        router.replace('/dashboard');
        return;
      }

      const { container } = await import('@/infrastructure/di/container');
      const data = await container.getOrderRepository().getAll();
      setOrders(data);
    } catch (err) {
      if (err instanceof AuthSessionError) {
        router.replace('/login');
        return;
      }

      setError(resolveAdminOrdersError(err));
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const createOrder = useCallback(
    async (data: CreateOrderData): Promise<boolean> => {
      setIsMutating(true);
      setError(null);

      try {
        const { container } = await import('@/infrastructure/di/container');
        const created = await container.getOrderRepository().create(data);
        setOrders((current) =>
          [created, ...current].sort(
            (left, right) =>
              new Date(right.orderDate).getTime() - new Date(left.orderDate).getTime(),
          ),
        );
        return true;
      } catch (err) {
        setError(resolveAdminOrdersError(err));
        return false;
      } finally {
        setIsMutating(false);
      }
    },
    [],
  );

  const updateOrderStatus = useCallback(
    async (orderId: string, status: OrderStatus): Promise<boolean> => {
      const previousOrders = orders;

      setOrders((current) =>
        current.map((order) => (order.id === orderId ? { ...order, status } : order)),
      );
      setError(null);

      try {
        const { container } = await import('@/infrastructure/di/container');
        const updated = await container.getOrderRepository().updateStatus(orderId, status);
        setOrders((current) =>
          current.map((order) => (order.id === orderId ? updated : order)),
        );
        return true;
      } catch (err) {
        setOrders(previousOrders);
        setError(resolveAdminOrdersError(err));
        return false;
      }
    },
    [orders],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    orders,
    isLoading,
    error,
    isMutating,
    refresh,
    createOrder,
    updateOrderStatus,
  };
}
