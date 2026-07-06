import { FirebaseAuthRepository } from '@/infrastructure/firebase/FirebaseAuthRepository';
import { SignInUseCase } from '@/domain/usecases/SignInUseCase';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';

class Container {
  private authRepository: IAuthRepository | null = null;

  getAuthRepository(): IAuthRepository {
    if (!this.authRepository) {
      this.authRepository = new FirebaseAuthRepository();
    }
    return this.authRepository;
  }

  getSignInUseCase(): SignInUseCase {
    return new SignInUseCase(this.getAuthRepository());
  }
}

export const container = new Container();
