'use client';

import { useState } from 'react';
import { LoginInput } from '@/domain/schemas/auth.schema';

interface UseLoginReturn {
  login: (input: LoginInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (input: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const { container } = await import('@/infrastructure/di/container');
      const { AuthError } = await import('@/infrastructure/auth/auth.utils');
      await container.getAuthService().login(input);
      // Futuro: router.push('/dashboard')
    } catch (err) {
      const { AuthError } = await import('@/infrastructure/auth/auth.utils');
      if (err instanceof AuthError) {
        setError(err.message);
        return;
      }
      setError('Ocorreu um erro ao iniciar sessão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
