import type { PingApiClient } from '../integrations/ping-api.client';

export async function probePing(client: PingApiClient) {
  return client.ping();
}
