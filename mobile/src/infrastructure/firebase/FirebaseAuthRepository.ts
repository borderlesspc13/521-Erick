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

function resolveAuthEmail(identifier: string): string {
  if (identifier.includes('@')) {
    return identifier.trim().toLowerCase();
  }
  throw new Error('Autenticação por CNPJ será activada em breve. Utilize o seu e-mail corporativo.');
}

export class FirebaseAuthRepository implements IAuthRepository {
  async signIn(credentials: SignInCredentials): Promise<User> {
    const email = resolveAuthEmail(credentials.identifier);
    const { user } = await signInWithEmailAndPassword(
      getFirebaseAuth(),
      email,
      credentials.password,
    );
    return mapFirebaseUser(user);
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
