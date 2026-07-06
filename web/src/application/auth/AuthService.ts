import { LoginInput } from '@/domain/schemas/auth.schema';
import { User } from '@/domain/entities/User';
import { SignInUseCase } from '@/domain/usecases/SignInUseCase';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';

export class AuthService {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly authRepository: IAuthRepository,
  ) {}

  async login(input: LoginInput): Promise<User> {
    return this.signInUseCase.execute(input);
  }

  async logout(): Promise<void> {
    return this.authRepository.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }
}
