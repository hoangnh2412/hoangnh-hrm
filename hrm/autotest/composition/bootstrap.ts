import { createTestHarness, type IBrowserDriver, type IHttpTransport } from '@jarvis/autotest';
import type { HrmEnv } from '../config/env';
import { PingApiClient } from '../integrations/ping-api.client';
import { probePing } from '../application/ping.workflow';
import { loginAs } from '../application/authentication/login.workflow';
import { expectDashboard } from '../application/dashboard/open-dashboard.workflow';

export type HrmApp = {
  ping: () => ReturnType<typeof probePing>;
  loginAs: (email: string, password: string) => Promise<void>;
  expectDashboard: () => Promise<void>;
};

export function bootstrap(
  transport: IHttpTransport,
  env: HrmEnv,
  driver?: IBrowserDriver,
): HrmApp {
  const clients = createTestHarness(
    { transport, baseUrl: env.baseUrl, authHeaders: {} },
    (deps) => ({
      ping: new PingApiClient(deps.transport, deps.baseUrl, deps.authHeaders),
    }),
  );

  return {
    ping: () => probePing(clients.ping),
    loginAs: async (email, password) => {
      if (!driver) {
        throw new Error('loginAs cần IBrowserDriver (UI)');
      }
      await loginAs(driver, env.webUrl, email, password);
    },
    expectDashboard: async () => {
      if (!driver) {
        throw new Error('expectDashboard cần IBrowserDriver (UI)');
      }
      await expectDashboard(driver);
    },
  };
}
