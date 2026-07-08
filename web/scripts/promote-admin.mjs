import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../..');

function loadEnvFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (!process.env[key]) {
        process.env[key] = rest.join('=');
      }
    }
  } catch {
    // optional env file
  }
}

loadEnvFile(resolve(rootDir, 'web/.env.local'));
loadEnvFile(resolve(rootDir, 'web/.env'));

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyBZP7R6v08MNsPv_BeT3DGT5jStpc75GXg',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'erick-c7214.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'erick-c7214',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'erick-c7214.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '495249634769',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '1:495249634769:web:1379c03d766888362cdcf0',
};

const [emailArg, passwordArg] = process.argv.slice(2);
const email = emailArg ?? process.env.PROMOTE_USER_EMAIL;
const password = passwordArg ?? process.env.PROMOTE_USER_PASSWORD;

if (!email || !password) {
  console.error('Uso: npm run promote:admin -- <email> <senha>');
  console.error('Ou defina PROMOTE_USER_EMAIL e PROMOTE_USER_PASSWORD no ambiente.');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const { user } = await signInWithEmailAndPassword(auth, email, password);
const userRef = doc(db, 'users', user.uid);
const snapshot = await getDoc(userRef);

if (!snapshot.exists()) {
  console.error(`Perfil não encontrado em users/${user.uid}`);
  process.exit(1);
}

const currentRole = snapshot.data().role;

if (currentRole === 'admin') {
  console.log(`Usuário ${email} já é admin.`);
  process.exit(0);
}

await updateDoc(userRef, { role: 'admin' });

console.log(`Usuário ${email} promovido para admin com sucesso.`);
console.log(`Documento: users/${user.uid}`);
