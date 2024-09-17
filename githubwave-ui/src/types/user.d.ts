export type ResponseAuth = {
  user: UserApi;
  access_token: string;
};

export type UserApi = {
  id: string;
  username: string;
  email: string;
  image: string;
  role: string;
};