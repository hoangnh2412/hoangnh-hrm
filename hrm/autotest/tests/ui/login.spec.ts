import { test } from '../../drivers/playwright/fixtures/hrm-test';
import { loadEnv } from '../../config/env';

test.describe('HRM đăng nhập @ui @smoke', () => {
  test('đăng nhập admin và vào dashboard @smoke', async ({ app }) => {
    const env = loadEnv();
    await app.loginAs(env.loginEmail, env.loginPassword);
    await app.expectDashboard();
  });
});
