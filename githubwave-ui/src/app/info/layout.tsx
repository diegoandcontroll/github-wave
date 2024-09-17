'use client'
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Se o usuário não estiver logado e a sessão estiver carregada, redirecionar para a página de login
    if (status === 'unauthenticated') {
      signIn(); // Redireciona para a página de login padrão do NextAuth
    }
  }, [status]);

  // Mostrar um "carregando" enquanto verificamos a sessão
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Se o usuário estiver logado, renderizar o conteúdo da página
  return <>{session ? children : null}</>;
}
