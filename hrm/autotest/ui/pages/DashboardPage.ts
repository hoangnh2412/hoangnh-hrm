import { Page } from '@jarvis/autotest';

export class DashboardPage extends Page {
  async expectLoaded(): Promise<void> {
    await this.driver.waitForPath('/');
    await this.driver.expectVisibleText('HRM');
    await this.driver.expectVisibleText('Thêm biểu đồ');
  }
}
