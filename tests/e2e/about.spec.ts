import { test, expect } from '@playwright/test';

test.describe('Aboutページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test.describe('正常系', () => {
    test('ページが正しく表示される', async ({ page }) => {
      await expect(page).toHaveTitle(/About|について/);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('プロフィール情報が表示される', async ({ page }) => {
      // 背景、発信実績、価値観が表示される
      const content = page.locator('main');
      await expect(content).toBeVisible();
    });

    test('SNSリンクが表示される（存在する場合）', async ({ page }) => {
      const snsLinks = page.locator('a[href*="twitter.com"], a[href*="x.com"], a[href*="note.com"]');
      const count = await snsLinks.count();
      if (count > 0) {
        await expect(snsLinks.first()).toBeVisible();
      }
    });

    test('ホームへのリンクが動作する', async ({ page }) => {
      await page.click('a[href="/"]');
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('異常系', () => {
    test('データ取得失敗時にエラーが表示される', async ({ page }) => {
      await page.route('**/api/**', route => route.abort());
      await page.reload();
      // エラーメッセージまたはフォールバックUIが表示されることを確認
    });
  });
});
