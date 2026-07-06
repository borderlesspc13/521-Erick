import { FirebaseAuthRepository } from '@/infrastructure/firebase/FirebaseAuthRepository';
import { SupabaseAuthRepository } from '@/infrastructure/auth/SupabaseAuthRepository';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';

export type AuthProviderType = 'firebase' | 'supabase';

export function createAuthRepository(provider: AuthProviderType): IAuthRepository {
  switch (provider) {
    case 'supabase':
      return new SupabaseAuthRepository();
    case 'firebase':
    default:
      return new FirebaseAuthRepository();
  }
}
