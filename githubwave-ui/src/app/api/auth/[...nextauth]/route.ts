// app/api/auth/[...nextauth]/route.ts
import type { UserApi } from '@/types/user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch('http://localhost:8080/api/gitwave/v1/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data?.user) {
          // Fazemos uma type assertion aqui para garantir que TypeScript saiba que 'data' tem o formato esperado
          return {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            image: data.user.image,
            role: data.user.role,
            access_token: data.access_token,
          } as UserApi & { access_token: string };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as UserApi).id;
        token.access_token = (user as UserApi & { access_token: string }).access_token;
        token.user = user as UserApi;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as UserApi;
      session.access_token = token.access_token as string; // Garante que o TypeScript reconheça 'access_token'
      return session;
    },
  },
});

export { handler as GET, handler as POST };
