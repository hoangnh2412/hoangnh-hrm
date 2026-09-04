import { test as base } from '@playwright/test';
import { createPlaywrightTransport } from '@jarvis/autotest.playwright';
import { loadEnv } from '../../../config/env';
import { bootstrap, type HrmApp } from '../../../composition/bootstrap';

export const test = base.extend<{ app: HrmApp }>({
  app: async ({ request }, use) => {
    const env = loadEnv();
    const transport = createPlaywrightTransport(request as never);
    const app = bootstrap(transport, env);
    await use(app);
  },
});

export { expect } from '@playwright/test';
