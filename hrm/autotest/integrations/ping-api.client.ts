import { ApiClient } from '@jarvis/autotest';

export type PingPayload = {
  status: string;
  product: string;
};

export type JarvisEnvelope<T> = {
  data?: T;
};

export class PingApiClient extends ApiClient {
  async ping(): Promise<PingPayload> {
    const body = await this.get<JarvisEnvelope<PingPayload> | PingPayload>('/api/ping');
    if (body && typeof body === 'object' && 'data' in body && body.data) {
      return body.data;
    }
    return body as PingPayload;
  }
}
