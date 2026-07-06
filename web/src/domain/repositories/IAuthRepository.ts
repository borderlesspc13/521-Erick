import { User } from '../entities/User';

export interface SignInCredentials {
  identifier: string;
  password: string;
}

export interface IAuthRepository {
  signIn(credentials: SignInCredentials): Promise<User>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
