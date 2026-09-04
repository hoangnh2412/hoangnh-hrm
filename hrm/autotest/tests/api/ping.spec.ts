import { test, expect } from '../../drivers/playwright/fixtures/hrm-test';

test.describe('HRM API @api @smoke', () => {
  test('GET /api/ping @smoke', async ({ app }) => {
    const ping = await app.ping();
    expect(ping.status).toBe('ok');
    expect(ping.product).toBe('Hrm');
  });
});
