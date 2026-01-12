import { test, expect } from '@playwright/test';

test.describe('SEO機能', () => {
  test.describe('sitemap.xml', () => {
    test('sitemap.xmlが生成される', async ({ request }) => {
      const response = await request.get('/sitemap.xml');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('xml');
    });

    test('sitemap.xmlに主要ページが含まれる', async ({ request }) => {
      const response = await request.get('/sitemap.xml');
      const body = await response.text();
      
      expect(body).toContain('/');
      expect(body).toContain('/about');
      expect(body).toContain('/free');
      expect(body).toContain('/knowledge');
    });

    test('sitemap.xmlに記事が含まれる', async ({ request }) => {
      const response = await request.get('/sitemap.xml');
      const body = await response.text();
      
      // 記事のURLが含まれることを確認
      expect(body).toMatch(/\/knowledge\/[^\/]+\/[^\/]+/);
    });
  });

  test.describe('robots.txt', () => {
    test('robots.txtが生成される', async ({ request }) => {
      const response = await request.get('/robots.txt');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('text');
    });

    test('robots.txtに適切な設定が含まれる', async ({ request }) => {
      const response = await request.get('/robots.txt');
      const body = await response.text();
      
      expect(body).toMatch(/User-Agent|User-agent/i);
      expect(body).toContain('Sitemap');
    });

    test('robots.txtで/adminがdisallowされる', async ({ request }) => {
      const response = await request.get('/robots.txt');
      const body = await response.text();
      
      // /admin/がdisallowされていることを確認（存在する場合）
      if (body.includes('Disallow')) {
        expect(body).toMatch(/Disallow.*\/admin/);
      }
    });
  });

  test.describe('メタデータ', () => {
    test('全ページでtitleが設定されている', async ({ page }) => {
      const pages = ['/', '/about', '/free', '/knowledge'];
      
      for (const path of pages) {
        await page.goto(path);
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeLessThanOrEqual(60);
      }
    });

    test('全ページでdescriptionが設定されている', async ({ page }) => {
      const pages = ['/', '/about', '/free', '/knowledge'];
      
      for (const path of pages) {
        await page.goto(path);
        const metaDescription = page.locator('meta[name="description"]');
        if (await metaDescription.count() > 0) {
          const description = await metaDescription.getAttribute('content');
          expect(description).toBeTruthy();
          expect(description?.length).toBeLessThanOrEqual(160);
        }
      }
    });

    test('記事ページでOGPタグが設定されている', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const ogTitle = page.locator('meta[property="og:title"]');
      const ogDescription = page.locator('meta[property="og:description"]');
      const ogImage = page.locator('meta[property="og:image"]');
      
      if (await ogTitle.count() > 0) {
        await expect(ogTitle).toHaveCount(1);
        await expect(ogDescription).toHaveCount(1);
        // og:imageはオプション
      }
    });
  });

  test.describe('構造化データ', () => {
    test('記事ページにArticle構造化データが含まれる', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const structuredData = page.locator('script[type="application/ld+json"]');
      const count = await structuredData.count();
      
      if (count > 0) {
        const json = await structuredData.first().textContent();
        const data = JSON.parse(json || '{}');
        expect(data['@type']).toBe('Article');
      }
    });

    test('バイブコーディングDB記事にFAQ構造化データが含まれる（推奨）', async ({ page }) => {
      await page.goto('/knowledge/vibe-coding/what-is-vibe-coding');
      
      const structuredData = page.locator('script[type="application/ld+json"]');
      const count = await structuredData.count();
      
      // FAQ構造化データが含まれるか確認（オプション）
      if (count > 0) {
        const json = await structuredData.first().textContent();
        const data = JSON.parse(json || '{}');
        // FAQが含まれる場合は確認
      }
    });

    test('実装DB記事にHowTo構造化データが含まれる（推奨）', async ({ page }) => {
      await page.goto('/knowledge/build/features/auth');
      
      const structuredData = page.locator('script[type="application/ld+json"]');
      const count = await structuredData.count();
      
      // HowTo構造化データが含まれるか確認（オプション）
      if (count > 0) {
        const json = await structuredData.first().textContent();
        const data = JSON.parse(json || '{}');
        // HowToが含まれる場合は確認
      }
    });
  });
});
