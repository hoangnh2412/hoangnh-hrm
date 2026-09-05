import type { IBrowserDriver } from '@jarvis/autotest';
import { DashboardPage } from '../../ui/pages/DashboardPage';

export async function expectDashboard(driver: IBrowserDriver): Promise<void> {
  await new DashboardPage(driver).expectLoaded();
}
