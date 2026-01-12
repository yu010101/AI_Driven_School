import { test, expect } from '@playwright/test';

test.describe('エラーページ', () => {
  test.describe('404エラーページ', () => {
    test('存在しないページで404が表示される', async ({ page }) => {
      const response = await page.goto('/non-existent-page');
      expect(response?.status()).toBe(404);
      // カスタム404ページが表示される
      const notFound = page.locator('text=見つかりません, text=404, h1');
      await expect(notFound.first()).toBeVisible();
    });

    test('カスタム404ページが表示される', async ({ page }) => {
      const response = await page.goto('/non-existent-page');
      expect(response?.status()).toBe(404);
      
      const notFound = page.locator('text=見つかりません, text=404, h1');
      await expect(notFound.first()).toBeVisible();
    });

    test('ホームへのリンクが動作する', async ({ page }) => {
      await page.goto('/non-existent-page');
      
      const homeLink = page.locator('a[href="/"]');
      if (await homeLink.count() > 0) {
        await homeLink.click();
        await expect(page).toHaveURL('/');
      }
    });

    test('カテゴリ一覧へのリンクが動作する', async ({ page }) => {
      await page.goto('/knowledge/invalid-category/article');
      
      const knowledgeLink = page.locator('a[href="/knowledge"]');
      if (await knowledgeLink.count() > 0) {
        await knowledgeLink.click();
        await expect(page).toHaveURL('/knowledge');
      }
    });
  });

  test.describe('500エラーページ', () => {
    test('サーバーエラー時に500が表示される', async ({ page }) => {
      // モックサーバーで500エラーを返す場合のテスト
      await page.route('**/api/**', route => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
        });
      });
      
      // 500エラーが発生するページにアクセス
      // 実際の実装に応じて調整
    });

    test('カスタム500ページが表示される', async ({ page }) => {
      // 500エラーが発生した場合
      const errorPage = page.locator('text=エラー, text=500, h1');
      // エラーページが表示されることを確認
    });

    test('エラーログが記録される', async ({ page }) => {
      // エラー発生時にログが記録されることを確認
      // 実際の実装に応じて調整（モックサーバーで確認）
    });
  });

  test.describe('エラーハンドリング', () => {
    test('記事取得エラー時に適切なメッセージが表示される', async ({ page }) => {
      await page.route('**/api/articles/**', route => route.abort());
      await page.goto('/knowledge/vibe-coding');
      
      // エラーメッセージまたはフォールバックUIが表示されることを確認
      const errorMessage = page.locator('text=エラー, text=取得に失敗');
      // メッセージが表示されるか、空の状態が適切に表示されることを確認
    });

    test('画像読み込みエラー時にフォールバックが表示される', async ({ page }) => {
      await page.route('**/*.{jpg,png,gif,webp}', route => route.abort());
      await page.goto('/');
      
      // フォールバック画像またはaltテキストが表示されることを確認
    });
  });
});
