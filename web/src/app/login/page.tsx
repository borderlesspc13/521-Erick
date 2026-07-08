import type { Metadata } from 'next';
import { TrancattoAuthLayout } from '@/components/landing/TrancattoAuthLayout';
import { LoginForm } from '@/presentation/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse sua conta no portal Trançatto para acompanhar pedidos e produção.',
};

export default function LoginPage() {
  return (
    <TrancattoAuthLayout
      title="Acessar minha conta"
      subtitle="Entre com CNPJ ou e-mail para acompanhar pedidos e produção em tempo real."
    >
      <LoginForm />
    </TrancattoAuthLayout>
  );
}
