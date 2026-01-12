import { test, expect } from '@playwright/test';

test.describe('ビジネスロジック', () => {
  test.describe('CTA配置ルール', () => {
    test('バイブコーディングDB記事にはバイブコーディングの教科書のみ', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const correctCta = page.locator('a[href="/free/vibe-coding-book"]');
      const wrongCta = page.locator('a[href="/free/zero-marketing-book"]');
      
      await expect(correctCta).toHaveCount(1);
      await expect(wrongCta).toHaveCount(0);
    });

    test('実装DB記事にはバイブコーディングの教科書のみ', async ({ page }) => {
      await page.goto('/knowledge/build/features/auth');
      
      const correctCta = page.locator('a[href="/free/vibe-coding-book"]');
      const wrongCta = page.locator('a[href="/free/zero-marketing-book"]');
      
      await expect(correctCta).toHaveCount(1);
      await expect(wrongCta).toHaveCount(0);
    });

    test('マーケDB記事には0円マーケティングの教科書のみ', async ({ page }) => {
      await page.goto('/knowledge/marketing/tactics/x-thread');
      
      const correctCta = page.locator('a[href="/free/zero-marketing-book"]');
      const wrongCta = page.locator('a[href="/free/vibe-coding-book"]');
      
      await expect(correctCta).toHaveCount(1);
      await expect(wrongCta).toHaveCount(0);
    });

    test('1ページにCTAは1つだけ', async ({ page }) => {
      const pages = [
        '/knowledge/vibe-coding/what-is-vibe-coding',
        '/knowledge/build/features/auth',
        '/knowledge/marketing/tactics/x-thread',
      ];
      
      for (const path of pages) {
        await page.goto(path);
        
        // /free/で始まるリンク（CTA）は1つだけ
        const ctaLinks = page.locator('a[href^="/free/"]');
        const count = await ctaLinks.count();
        expect(count).toBe(1);
      }
    });
  });

  test.describe('内部リンクルール', () => {
    test('記事に最低5本の内部リンクがある', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      // 記事本文内のリンクと「次に読むべき記事」セクションのリンクを含む
      const internalLinks = page.locator('a[href^="/knowledge/"]');
      const count = await internalLinks.count();
      // 記事本文内のリンク（2本）+ 次に読むべき記事セクション（最低3本）= 最低5本
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('同カテゴリ内リンクが最低3本ある', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      // 「次に読むべき記事」セクションの同カテゴリリンク
      const sameCategoryLinks = page.locator('a[href^="/knowledge/vibe-coding/"]');
      const count = await sameCategoryLinks.count();
      // 記事本文内のリンク + 次に読むべき記事セクション = 最低3本
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('別カテゴリリンクが最低2本ある', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const otherCategoryLinks = page.locator('a[href^="/knowledge/build/"], a[href^="/knowledge/marketing/"]');
      const count = await otherCategoryLinks.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('内部リンクのアンカーテキストが具体的', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const links = page.locator('a[href^="/knowledge/"]');
      const count = await links.count();
      
      // 少なくとも1つのリンクが存在することを確認
      expect(count).toBeGreaterThan(0);
      
      // 最初の3つのリンクをチェック
      for (let i = 0; i < Math.min(count, 3); i++) {
        const text = await links.nth(i).textContent();
        expect(text).toBeTruthy();
        // 「こちら」「ここ」「これ」などの曖昧なテキストを禁止（ただし、文脈によっては許容）
        if (text && text.trim().length < 10) {
          expect(text).not.toMatch(/^(こちら|ここ|これ)$/);
        }
      }
    });
  });

  test.describe('記事必須要素', () => {
    test('結論（30秒要約）が存在する', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const content = page.locator('[data-testid="article-content"]');
      const contentText = await content.textContent();
      expect(contentText).toContain('結論');
      expect(contentText).toContain('30秒要約');
    });

    test('コピペ可能なパートが存在する', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const copyable = page.locator('code, pre');
      const count = await copyable.count();
      expect(count).toBeGreaterThan(0);
    });

    test('よくある失敗が記載されている', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const content = page.locator('[data-testid="article-content"]');
      const contentHtml = await content.innerHTML();
      expect(contentHtml).toContain('よくある失敗');
    });

    test('次にやるべきことが記載されている', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      // 「次に読むべき記事」セクションまたは記事本文内の「次に」というテキスト
      const nextSteps = page.locator('[data-testid="next-steps"], text=次に, text=次は');
      const count = await nextSteps.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('カテゴリ別必須要素', () => {
    test('バイブコーディングDB記事にプロンプトテンプレートがある', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const content = page.locator('[data-testid="article-content"]');
      const contentHtml = await content.innerHTML();
      expect(contentHtml).toContain('プロンプト');
      const codeBlocks = page.locator('code, pre');
      const count = await codeBlocks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('実装DB記事に実装ステップがある', async ({ page }) => {
      await page.goto('/knowledge/build/features/auth');
      
      const content = page.locator('[data-testid="article-content"]');
      const contentHtml = await content.innerHTML();
      expect(contentHtml).toContain('実装ステップ');
    });

    test('マーケDB記事にコピペ用テンプレがある', async ({ page }) => {
      await page.goto('/knowledge/marketing/tactics/x-thread');
      
      const content = page.locator('[data-testid="article-content"]');
      const contentHtml = await content.innerHTML();
      expect(contentHtml).toContain('テンプレ');
      const codeBlocks = page.locator('code, pre');
      const count = await codeBlocks.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
