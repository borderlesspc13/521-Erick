import { createAuthRepository } from '@/infrastructure/auth/createAuthRepository';
import { SignInUseCase } from '@/domain/usecases/SignInUseCase';
import { AuthService } from '@/application/auth/AuthService';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';

const authProvider = (process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? 'firebase') as
  | 'firebase'
  | 'supabase';

class Container {
  private authRepository: IAuthRepository | null = null;

  getAuthRepository(): IAuthRepository {
    if (!this.authRepository) {
      this.authRepository = createAuthRepository(authProvider);
    }
    return this.authRepository;
  }

  getSignInUseCase(): SignInUseCase {
    return new SignInUseCase(this.getAuthRepository());
  }

  getAuthService(): AuthService {
    return new AuthService(this.getSignInUseCase(), this.getAuthRepository());
  }
}

export const container = new Container();
