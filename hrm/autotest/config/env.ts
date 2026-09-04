export interface HrmEnv {
  baseUrl: string;
  webUrl: string;
}

export function loadEnv(): HrmEnv {
  const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5167';
  return {
    baseUrl,
    webUrl: process.env.WEB_URL ?? baseUrl,
  };
}
