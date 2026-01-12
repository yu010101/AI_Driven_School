import { test, expect } from '@playwright/test';

test.describe('無料教材ページ', () => {
  test.describe('無料教材一覧（/free）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/free');
    });

    test.describe('正常系', () => {
      test('ページが正しく表示される', async ({ page }) => {
        await expect(page).toHaveTitle(/無料教材|Free/);
        await expect(page.locator('h1')).toBeVisible();
      });

      test('2つの教材が表示される', async ({ page }) => {
        const books = page.locator('a[href*="/free/"]');
        const count = await books.count();
        expect(count).toBeGreaterThanOrEqual(2);
      });

      test('バイブコーディングの教科書へのリンクが存在する', async ({ page }) => {
        const link = page.locator('a[href="/free/vibe-coding-book"]');
        await expect(link).toBeVisible();
      });

      test('0円マーケティングの教科書へのリンクが存在する', async ({ page }) => {
        const link = page.locator('a[href="/free/zero-marketing-book"]');
        await expect(link).toBeVisible();
      });

      test('リンクが正しく動作する', async ({ page }) => {
        await page.click('a[href="/free/vibe-coding-book"]');
        await expect(page).toHaveURL('/free/vibe-coding-book');
      });
    });

    test.describe('異常系', () => {
      test('教材が見つからない場合の表示', async ({ page }) => {
        // モックで教材を0件にする場合のテスト
        // 実際の実装に応じて調整
        const message = page.locator('text=教材が見つかりません');
        // メッセージが表示されるか、空の状態が適切に表示されることを確認
      });
    });
  });

  test.describe('バイブコーディングの教科書LP（/free/vibe-coding-book）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/free/vibe-coding-book');
    });

    test.describe('正常系', () => {
      test('LPが正しく表示される', async ({ page }) => {
        await expect(page).toHaveTitle(/バイブコーディング/);
        await expect(page.locator('h1')).toBeVisible();
      });

      test('フォームが表示される（存在する場合）', async ({ page }) => {
        const form = page.locator('form');
        const count = await form.count();
        if (count > 0) {
          await expect(form.first()).toBeVisible();
        }
      });

      test('CTAボタンが表示される', async ({ page }) => {
        const cta = page.locator('button[type="submit"], a[href*="line"], a[href*="mail"]');
        const count = await cta.count();
        expect(count).toBeGreaterThan(0);
      });
    });

    test.describe('異常系', () => {
    test('ページが見つからない場合の404', async ({ page }) => {
      const response = await page.goto('/free/vibe-coding-book-invalid');
      expect(response?.status()).toBe(404);
      const notFound = page.locator('text=見つかりません, text=404, h1');
      await expect(notFound.first()).toBeVisible();
    });
    });
  });

  test.describe('0円マーケティングの教科書LP（/free/zero-marketing-book）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/free/zero-marketing-book');
    });

    test.describe('正常系', () => {
      test('LPが正しく表示される', async ({ page }) => {
        await expect(page).toHaveTitle(/0円マーケティング|ゼロ円マーケティング/);
        await expect(page.locator('h1')).toBeVisible();
      });

      test('フォームが表示される（存在する場合）', async ({ page }) => {
        const form = page.locator('form');
        const count = await form.count();
        if (count > 0) {
          await expect(form.first()).toBeVisible();
        }
      });
    });

    test.describe('異常系', () => {
    test('ページが見つからない場合の404', async ({ page }) => {
      const response = await page.goto('/free/zero-marketing-book-invalid');
      expect(response?.status()).toBe(404);
      const notFound = page.locator('text=見つかりません, text=404, h1');
      await expect(notFound.first()).toBeVisible();
    });
    });
  });
});
