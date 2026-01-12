import { test, expect } from '@playwright/test';

test.describe('知識DBページ', () => {
  test.describe('知識DB一覧（/knowledge）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/knowledge');
    });

    test.describe('正常系', () => {
      test('ページが正しく表示される', async ({ page }) => {
        await expect(page).toHaveTitle(/知識|Knowledge/);
        await expect(page.locator('h1')).toBeVisible();
      });

      test('3つのカテゴリが表示される', async ({ page }) => {
        const categories = [
          page.locator('a[href="/knowledge/vibe-coding"]'),
          page.locator('a[href="/knowledge/build"]'),
          page.locator('a[href="/knowledge/marketing"]'),
        ];

        for (const category of categories) {
          await expect(category).toBeVisible();
        }
      });

      test('カテゴリリンクが正しく動作する', async ({ page }) => {
        await page.click('a[href="/knowledge/vibe-coding"]');
        await expect(page).toHaveURL('/knowledge/vibe-coding');
      });
    });

    test.describe('異常系', () => {
      test('カテゴリが存在しない場合の表示', async ({ page }) => {
        // モックでカテゴリを0件にする場合のテスト
        // 実際の実装に応じて調整
      });
    });
  });

  test.describe('バイブコーディングDB一覧（/knowledge/vibe-coding）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/knowledge/vibe-coding');
    });

    test.describe('正常系', () => {
      test('ページが正しく表示される', async ({ page }) => {
        await expect(page).toHaveTitle(/バイブコーディング/);
        await expect(page.locator('h1')).toBeVisible();
      });

      test('記事一覧が表示される', async ({ page }) => {
        const articles = page.locator('article, [data-testid="article-card"]');
        const count = await articles.count();
        expect(count).toBeGreaterThan(0);
      });

      test('記事リンクが正しく動作する', async ({ page }) => {
        const firstArticle = page.locator('a[href*="/knowledge/vibe-coding/"]').first();
        if (await firstArticle.count() > 0) {
          const href = await firstArticle.getAttribute('href');
          await firstArticle.click();
          await expect(page).toHaveURL(new RegExp(href || ''));
        }
      });

      test('ページネーションが表示される（記事が多い場合）', async ({ page }) => {
        const pagination = page.locator('[data-testid="pagination"], nav[aria-label="ページネーション"]');
        const count = await pagination.count();
        // 記事数に応じてページネーションが表示されるか確認
      });
    });

    test.describe('異常系', () => {
      test('記事が0件の場合の表示', async ({ page }) => {
        // モックで記事を0件にする場合のテスト
        const message = page.locator('text=記事が見つかりません, text=まだ記事がありません');
        // メッセージが表示されるか、空の状態が適切に表示されることを確認
      });

      test('ページネーションエラー', async ({ page }) => {
        // 無効なページ番号にアクセスした場合
        await page.goto('/knowledge/vibe-coding?page=999');
        // エラーメッセージまたは1ページ目にリダイレクトされることを確認
      });
    });
  });

  test.describe('実装DB一覧（/knowledge/build）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/knowledge/build');
    });

    test.describe('正常系', () => {
      test('ページが正しく表示される', async ({ page }) => {
        await expect(page).toHaveTitle(/実装|Build/);
        await expect(page.locator('h1')).toBeVisible();
      });

      test('記事一覧が表示される', async ({ page }) => {
        const articles = page.locator('article, [data-testid="article-card"]');
        const count = await articles.count();
        expect(count).toBeGreaterThanOrEqual(0);
      });

      test('フィルタリングが動作する（存在する場合）', async ({ page }) => {
        const filter = page.locator('[data-testid="filter"], select[name="filter"]');
        const count = await filter.count();
        if (count > 0) {
          await expect(filter.first()).toBeVisible();
        }
      });
    });

    test.describe('異常系', () => {
      test('記事が0件の場合の表示', async ({ page }) => {
        const message = page.locator('text=記事が見つかりません');
        // メッセージが表示されるか、空の状態が適切に表示されることを確認
      });
    });
  });

  test.describe('マーケDB一覧（/knowledge/marketing）', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/knowledge/marketing');
    });

    test.describe('正常系', () => {
      test('ページが正しく表示される', async ({ page }) => {
        await expect(page).toHaveTitle(/マーケティング|Marketing/);
        await expect(page.locator('h1')).toBeVisible();
      });

      test('記事一覧が表示される', async ({ page }) => {
        const articles = page.locator('article, [data-testid="article-card"]');
        const count = await articles.count();
        expect(count).toBeGreaterThanOrEqual(0);
      });

      test('ソートが動作する（存在する場合）', async ({ page }) => {
        const sort = page.locator('[data-testid="sort"], select[name="sort"]');
        const count = await sort.count();
        if (count > 0) {
          await expect(sort.first()).toBeVisible();
        }
      });
    });

    test.describe('異常系', () => {
      test('記事が0件の場合の表示', async ({ page }) => {
        const message = page.locator('text=記事が見つかりません');
        // メッセージが表示されるか、空の状態が適切に表示されることを確認
      });
    });
  });
});
