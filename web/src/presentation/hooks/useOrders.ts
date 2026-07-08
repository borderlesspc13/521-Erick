'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import type { Order } from '@/domain/entities/Order';
import { getCurrentUserClientCnpj } from '@/infrastructure/firebase/FirebaseUserProfileRepository';
import { AuthSessionError } from '@/infrastructure/firebase/firebaseAuthSession';

function resolveOrdersError(error: unknown): string {
  if (error instanceof AuthSessionError) {
    return error.message;
  }

  if (error instanceof FirebaseError) {
    if (error.code === 'permission-denied') {
      return 'Sem permissão para ler os pedidos. Faça login novamente.';
    }

    if (error.code === 'failed-precondition') {
      return 'A consulta de pedidos ainda não está disponível. Tente novamente em instantes.';
    }

    if (error.code === 'unavailable') {
      return 'Serviço temporariamente indisponível. Tente novamente.';
    }
  }

  if (process.env.NODE_ENV === 'development' && error instanceof Error) {
    console.error('[useOrders]', error);
  }

  return 'Não foi possível carregar os pedidos. Verifique a sua sessão e tente novamente.';
}

interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useOrders(): UseOrdersReturn {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { container } = await import('@/infrastructure/di/container');
      const clientCnpj = await getCurrentUserClientCnpj();
      const data = await container.getOrderRepository().getAllByClientCnpj(clientCnpj);
      setOrders(data);
    } catch (err) {
      if (err instanceof AuthSessionError) {
        router.replace('/login');
        return;
      }

      setError(resolveOrdersError(err));
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { orders, isLoading, error, refresh };
}
