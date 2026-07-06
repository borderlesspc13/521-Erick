import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirebaseAuth } from '@/core/config/firebase';
import { User } from '@/domain/entities/User';
import {
  IAuthRepository,
  SignInCredentials,
} from '@/domain/repositories/IAuthRepository';
import { AuthError, resolveAuthEmail } from '@/infrastructure/auth/auth.utils';

function mapFirebaseUser(firebaseUser: {
  uid: string;
  email: string | null;
  displayName: string | null;
  metadata: { creationTime?: string };
}): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email ?? '',
    displayName: firebaseUser.displayName,
    createdAt: new Date(firebaseUser.metadata.creationTime ?? Date.now()),
  };
}

export class FirebaseAuthRepository implements IAuthRepository {
  async signIn(credentials: SignInCredentials): Promise<User> {
    try {
      const email = resolveAuthEmail(credentials.identifier);
      const { user } = await signInWithEmailAndPassword(
        getFirebaseAuth(),
        email,
        credentials.password,
      );
      return mapFirebaseUser(user);
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }

      throw new AuthError(
        'Credenciais inválidas. Verifique o e-mail e a palavra-passe.',
        'INVALID_CREDENTIALS',
      );
    }
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(getFirebaseAuth());
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (user) => {
        unsubscribe();
        resolve(user ? mapFirebaseUser(user) : null);
      });
    });
  }
}
