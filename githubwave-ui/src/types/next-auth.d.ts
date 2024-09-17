import { UserApi } from './user';

declare module 'next-auth' {
  interface Session {
    user: UserApi;
    access_token: string;
  }

  interface JWT {
    id: string;
    access_token: string;
    user: UserApi;
  }
}