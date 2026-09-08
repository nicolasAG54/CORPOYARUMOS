import { expect, test } from '@playwright/test';

test('homepage presents the approved thesis without horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { level: 1, name: /Territorio, conocimiento/ }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Conocer El Roble', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explorar territorios', exact: true })).toBeVisible();
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasOverflow).toBe(false);
});

test('approved brand and editorial assets remain stable after client hydration', async ({
  page,
}) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const heroImage = page.locator('.hero-media img');
  await expect(heroImage).toHaveAttribute('src', /hero-jornada-campo-outpaint-left-v2/);
  await expect(page.locator('.story-archive img')).toHaveAttribute('src', /el-roble-mock-v2/);
  const headerLogo = page.locator('.brand img');
  await expect(headerLogo).toHaveAttribute(
    'src',
    /corporacion-los-yarumos-logo-horizontal-full-color\.svg/,
  );
  await expect(page.locator('.conversation img')).toHaveAttribute(
    'src',
    /corporacion-los-yarumos-simbolo-full-color\.svg/,
  );
  await expect(page.locator('.map-geometry').first()).toHaveAttribute(
    'href',
    /tolima-editorial-mock-v3/,
  );
  await expect(page.locator('.publication-cover img')).toHaveCount(3);

  const hydratedLogoSrc = await headerLogo.getAttribute('src');
  const hydratedHeroSrc = await heroImage.evaluate((image) => image.currentSrc);
  await page.waitForTimeout(1_000);
  expect(await headerLogo.getAttribute('src')).toBe(hydratedLogoSrc);
  expect(await heroImage.evaluate((image) => image.currentSrc)).toBe(hydratedHeroSrc);

  const loadedAssetUrls = await page.evaluate(() =>
    performance.getEntriesByType('resource').map((entry) => entry.name),
  );
  expect(
    loadedAssetUrls.some((url) =>
      /territorio-1920\.|hero-jornada-campo-original-retouched-v1|el-roble-documental|(?:lockup|symbol)-(?:horizontal|mock-v5|mock-exact-v6|mock-crisp-v7)|tolima-municipal/.test(
        url,
      ),
    ),
  ).toBe(false);

  await page.goto('/corporacion');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.hero-mark img')).toHaveAttribute(
    'src',
    /corporacion-los-yarumos-simbolo-full-color\.svg/,
  );
});

test('project archive filters and opens El Roble', async ({ page }) => {
  await page.goto('/proyectos');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Proyectos que dejan rastro.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Ambiente', exact: true }).click();
  await expect(page.getByRole('heading', { name: /Reforestación Cortolima/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /El Roble/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await page.getByRole('link', { name: 'Abrir expediente', exact: true }).click();
  await expect(page).toHaveURL(/\/proyectos\/el-roble$/);
  await expect(page.getByRole('heading', { level: 1, name: 'El Roble' })).toBeVisible();
});

test('territory explorer exposes an accessible equivalent to the map', async ({ page }) => {
  await page.goto('/territorios');
  await page.getByRole('button', { name: /Chaparral/ }).click();
  await expect(
    page.getByText('PDEA Tolima; PDEA Chaparral', { exact: true }).first(),
  ).toBeVisible();
});

test('homepage map controls expose the same territory evidence', async ({ page }) => {
  await page.goto('/');
  const chaparralPin = page.getByRole('button', { name: /Mostrar Chaparral/ });
  await chaparralPin.focus();
  await chaparralPin.press('Enter');
  await expect(chaparralPin).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.map-caption')).toContainText('PDEA 2022-2023');
});

test('global loader, persistent navigation and contact form work as one flow', async ({
  page,
}, testInfo) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const loader = page.locator('.global-loader');
  await expect(loader).toBeVisible();
  await expect(loader).toBeHidden({ timeout: 2_000 });

  const header = page.locator('.site-header');
  await expect(header).toHaveCSS('position', 'sticky');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  expect(
    Math.abs(await header.evaluate((element) => element.getBoundingClientRect().top)),
  ).toBeLessThanOrEqual(1);

  if (testInfo.project.name.includes('mobile')) {
    await page.getByRole('button', { name: 'Menú', exact: true }).click();
  }

  await page
    .getByRole('navigation', { name: 'Navegación principal' })
    .getByRole('link', { name: 'Conversemos', exact: true })
    .click();

  await expect(page).toHaveURL(/\/contacto$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Conversemos sobre el territorio.' }),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Nombre y apellidos' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Correo electrónico' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Tema' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Preparar mensaje' })).toBeVisible();
  await expect(page.locator('#contenido')).toHaveCSS('view-transition-name', 'page-content');
});

test('mobile navigation opens and reaches knowledge', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Mobile-only interaction');
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menú', exact: true });
  await menu.click();
  await page
    .getByRole('navigation', { name: 'Navegación principal' })
    .getByRole('link', { name: 'Conocimiento', exact: true })
    .click();
  await expect(page).toHaveURL(/\/conocimiento$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Conocimiento que regresa al territorio.' }),
  ).toBeVisible();
});

test('FAQ assistant answers, preserves focus and routes to verified content', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const launcher = page.getByRole('button', {
    name: 'Abrir asistente de preguntas frecuentes',
  });

  await launcher.click();
  const dialog = page.getByRole('dialog', { name: 'Yarumos responde' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Escribe tu pregunta' })).toBeFocused();
  await page.screenshot({ path: `qa/faq-chat-initial-${testInfo.project.name}.png` });

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(launcher).toBeFocused();

  await launcher.click();
  await page.getByRole('button', { name: '¿Dónde puedo consultar los proyectos?' }).click();
  await expect(dialog.locator('.typing-status')).toBeVisible();
  await dialog.screenshot({ path: `qa/faq-chat-typing-${testInfo.project.name}.png` });
  await expect(dialog.getByText(/El archivo de proyectos presenta contratos/)).toBeVisible();
  const projectLink = dialog.getByRole('link', { name: 'Ver proyectos e impacto' });
  await expect(projectLink).toBeVisible();

  await page.screenshot({ path: `qa/faq-chat-${testInfo.project.name}.png` });

  await projectLink.click();
  await expect(page).toHaveURL(/\/proyectos$/);
  await expect(dialog).toBeHidden();
});
