export interface HrmEnv {
  baseUrl: string;
  webUrl: string;
  loginEmail: string;
  loginPassword: string;
}

export function loadEnv(): HrmEnv {
  const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5167';
  return {
    baseUrl,
    webUrl: process.env.WEB_URL ?? baseUrl,
    loginEmail: process.env.LOGIN_EMAIL ?? 'admin@gmail.com',
    loginPassword: process.env.LOGIN_PASSWORD ?? 'Admin@123',
  };
}
