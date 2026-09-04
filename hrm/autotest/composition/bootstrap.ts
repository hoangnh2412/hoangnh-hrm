import { createTestHarness, type IHttpTransport } from '@jarvis/autotest';
import type { HrmEnv } from '../config/env';
import { PingApiClient } from '../integrations/ping-api.client';
import { probePing } from '../application/ping.workflow';

export type HrmApp = {
  ping: () => ReturnType<typeof probePing>;
};

export function bootstrap(transport: IHttpTransport, env: HrmEnv): HrmApp {
  const clients = createTestHarness(
    { transport, baseUrl: env.baseUrl, authHeaders: {} },
    (deps) => ({
      ping: new PingApiClient(deps.transport, deps.baseUrl, deps.authHeaders),
    }),
  );

  return {
    ping: () => probePing(clients.ping),
  };
}
