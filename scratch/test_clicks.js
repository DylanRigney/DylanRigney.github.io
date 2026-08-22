const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Abort all font requests to eliminate font hang completely
  await page.route('**/*', route => {
    if (route.request().resourceType() === 'font') {
      route.abort();
    } else {
      route.continue();
    }
  });

  console.log('Navigating to http://localhost:3001...');
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const artifactDir = 'C:\\Users\\dylan\\.gemini\\antigravity\\brain\\f30eb780-5417-4b2e-99ab-401a26f9580e';

  // 1. Initial screenshot
  console.log('Capturing initial cards...');
  const buf1 = await page.screenshot();
  fs.writeFileSync(path.join(artifactDir, 'preview_initial_cards.png'), buf1);
  console.log('Saved preview_initial_cards.png');

  // 2. Click Left Card
  console.log('Clicking Left Card...');
  await page.locator('#ai-left-card').click({ force: true });
  await page.waitForTimeout(1500);

  const buf2 = await page.screenshot();
  fs.writeFileSync(path.join(artifactDir, 'preview_left_scooch_notch.png'), buf2);
  console.log('Saved preview_left_scooch_notch.png');

  // Close Left Card
  console.log('Closing left panel...');
  await page.locator('#ai-close-btn').click({ force: true });
  await page.waitForTimeout(1000);

  // 3. Click Right Card
  console.log('Clicking Right Card...');
  await page.locator('#ai-right-card').click({ force: true });
  await page.waitForTimeout(1500);

  const buf3 = await page.screenshot();
  fs.writeFileSync(path.join(artifactDir, 'preview_right_frosted_glass.png'), buf3);
  console.log('Saved preview_right_frosted_glass.png');

  await browser.close();
  console.log('All done successfully!');
})().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
