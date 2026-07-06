import { useState } from 'react';
import { LoginScreen } from '@/presentation/screens/LoginScreen';
import { HomeScreen } from '@/presentation/screens/HomeScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <HomeScreen onLogout={() => setIsAuthenticated(false)} />;
}
