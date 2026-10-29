import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('filters, restores URLs, and progressively shows every family', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(18);
  await page.getByRole('button', { name: /Form formats/ }).click();
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(16);
  await expect(page).toHaveURL(/type=form/);
  await page.reload();
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(16);
  if (!await page.getByLabel('Search formats').isVisible()) await page.locator('.filter-panel > summary').click();
  await page.getByLabel('Search formats').fill('status');
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(2);
  await page.goBack();
  await expect(page.getByLabel('Search formats')).toHaveValue('');
  await page.getByRole('button', { name: 'Clear all filters' }).click();
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(18);
  await page.getByRole('button', { name: 'Show more formats' }).click();
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(36);
});

test('shows every form variant, accurate downloads, and explicit clipboard failure', async ({ page, request }) => {
  await page.goto('samples/form/status-header-footer/');
  await expect(page.getByLabel('Definition', { exact: true }).locator('option')).toHaveCount(2);
  await page.getByLabel('Definition', { exact: true }).selectOption('status-footer.json');
  const current = page.locator('[data-definition]:visible');
  await expect(current).toContainText('Form footer');
  const source = await current.locator('textarea').inputValue();
  const download = await current.getByRole('link', { name: 'Download JSON' }).getAttribute('href');
  expect(download).toBeTruthy();
  const response = await request.get(download!);
  expect(response.ok()).toBe(true);
  expect((await response.text()).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')).toBe(source.replace(/\r\n/g, '\n'));
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Permission denied'); } } }));
  await current.getByRole('button', { name: 'Copy JSON' }).click();
  await expect(page.getByRole('status')).toContainText('Copy was not available');
  await page.reload();
  await expect(page.locator('[data-definition]:visible')).toHaveAttribute('data-definition', 'status-footer.json');
});

test('copies exactly the selected definition when the clipboard is available', async ({ page }) => {
  await page.goto('samples/column/generic-status-badges/');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: async (text: string) => { document.documentElement.setAttribute('data-copied-text', text); },
    } });
  });
  const definition = page.locator('[data-definition]:visible');
  const source = await definition.locator('textarea').inputValue();
  await definition.getByRole('button', { name: 'Copy JSON' }).click();
  await expect(page.getByRole('status')).toContainText('Copied');
  expect(await page.locator('html').getAttribute('data-copied-text')).toBe(source);
});

test('navigation, legacy routes, recognition, and free defaults remain usable', async ({ page, request }, testInfo) => {
  await page.goto('./');
  const nav = testInfo.project.name === 'mobile' ? page.getByRole('navigation', { name: 'Mobile navigation' }) : page.getByRole('navigation', { name: 'Primary navigation' });
  if (testInfo.project.name === 'mobile') await page.getByLabel('Open navigation').click();
  await expect(nav.getByRole('link').first()).toHaveText('Community');
  await expect(nav.getByRole('link').first()).toHaveAttribute('href', 'https://aka.ms/community/home');
  await expect(page.locator('[data-visitor-stats]')).toHaveCount(0);
  for (const route of ['gettingstarted/columnformats/', 'gettingstarted/viewformats/', 'tools/html-formatter-generator/index.html', 'groupings/classes/ms-bgColor/', 'catalog.json']) {
    expect((await request.get(route)).ok(), route).toBe(true);
  }
  await page.goto('contributors/');
  await expect(page.getByRole('img', { name: /Community Contributor/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore the Credly badge' })).toHaveAttribute('href', /community-contributor/);
  await page.goto('whats-new/');
  await expect(page.locator('[data-update]:visible')).toHaveCount(30);
});

test('persists themes and stays within the viewport', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('switch', { name: 'Switch to dark mode' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('samples/view/custom-charts/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('contributors show their own GitHub profile images with a fallback only for missing accounts', async ({ page }) => {
  await page.route(/^https:\/\/github\.com\/[^/]+\.png\?size=96$/, (route) => route.fulfill({
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><circle cx="48" cy="48" r="48" fill="#008272"/></svg>',
  }));
  await page.goto('contributors/');
  const cards = page.locator('.contributor-card');
  const users = await cards.evaluateAll((elements) => elements.map((card) => ({
    profile: card.querySelector<HTMLAnchorElement>('a[href^="https://github.com/"]')?.href,
    image: card.querySelector<HTMLImageElement>('img.avatar')?.getAttribute('src'),
    fallback: card.querySelector('div.avatar')?.textContent,
  })));
  expect(users.some((user) => user.profile)).toBe(true);
  for (const user of users) {
    if (user.profile) {
      expect(user.image).toBe(`${user.profile}.png?size=96`);
      expect(user.fallback).toBeUndefined();
    } else {
      expect(user.image).toBeUndefined();
      expect(user.fallback).toMatch(/\S/);
    }
  }
  const image = cards.locator('img.avatar').first();
  await expect(image).toHaveAttribute('loading', 'lazy');
  await expect(image).toHaveAttribute('width', '49');
  await expect(image).toHaveAttribute('height', '49');
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate((element) => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
});

test('the preserved legacy converter actually transforms HTML', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'The deprecated tool has its original desktop-only layout.');
  await page.goto('tools/html-formatter-generator/index.html');
  await expect(page.getByRole('button', { name: 'Run', exact: true })).toBeVisible();
  const editor = page.locator('.monaco-editor textarea').first();
  await editor.press('ControlOrMeta+A');
  await editor.fill('<div>Hello formatting</div>');
  await page.getByRole('button', { name: 'Run', exact: true }).click();
  await expect(page.locator('.paneContainer pre code')).toContainText('"elmType": "div"');
  await expect(page.locator('.paneContainer pre code')).toContainText('Hello formatting');
});

test('representative pages have no serious accessibility violations in either theme', async ({ page }) => {
  for (const route of ['./', 'samples/form/status-header-footer/', 'getting-started/', 'contributors/', 'whats-new/']) {
    await page.goto(route);
    for (const theme of ['light', 'dark']) {
      await page.evaluate((value) => document.documentElement.dataset.theme = value, theme);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? '')), `${route} ${theme}`).toEqual([]);
    }
  }
});
