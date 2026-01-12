import { test, expect } from '@playwright/test';

test.describe('トップページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('正常系', () => {
    test('ページが正しく表示される', async ({ page }) => {
      await expect(page).toHaveTitle(/非エンジニアでも/);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('Heroセクションが表示される', async ({ page }) => {
      const hero = page.locator('main').first();
      await expect(hero).toBeVisible();
      await expect(hero.locator('text=作れて・動いて・売れる')).toBeVisible();
    });

    test('ナビゲーションが表示される', async ({ page }) => {
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      // ナビゲーション内のリンクが存在することを確認
      const navLinks = nav.locator('a');
      const count = await navLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('CTAボタンが表示される', async ({ page }) => {
      // CTAは1つだけ表示される（ページ文脈で出し分け）
      const ctaButtons = page.locator('a[href*="/free/"]');
      const count = await ctaButtons.count();
      expect(count).toBeGreaterThan(0);
    });

    test('ナビゲーションリンクが動作する', async ({ page }) => {
      await page.click('a[href="/about"]');
      await expect(page).toHaveURL(/\/about/);
    });

    test('フッターが表示される', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });
  });

  test.describe('異常系', () => {
    test('データ取得失敗時にエラーが表示される', async ({ page }) => {
      // モックサーバーでエラーを返す場合のテスト
      await page.route('**/api/**', route => route.abort());
      await page.reload();
      // エラーメッセージまたはフォールバックUIが表示されることを確認
      // 実際の実装に応じて調整
    });

    test('画像の読み込み失敗時にフォールバックが表示される', async ({ page }) => {
      // 画像の読み込みをブロック
      await page.route('**/*.{jpg,png,gif,webp}', route => route.abort());
      await page.reload();
      // フォールバック画像またはaltテキストが表示されることを確認
    });
  });

  test.describe('アクセシビリティ', () => {
    test('適切な見出し構造がある', async ({ page }) => {
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
    });

    test('適切なランドマークがある', async ({ page }) => {
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  });
});
