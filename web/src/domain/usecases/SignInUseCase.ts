import { IAuthRepository, SignInCredentials } from '../repositories/IAuthRepository';
import { User } from '../entities/User';
import { loginSchema } from '../schemas/auth.schema';

export class SignInUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: SignInCredentials): Promise<User> {
    const validated = loginSchema.parse(credentials);
    return this.authRepository.signIn(validated);
  }
}
