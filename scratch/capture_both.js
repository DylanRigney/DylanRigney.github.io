const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3001...');
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const artifactDir = 'C:\\Users\\dylan\\.gemini\\antigravity\\brain\\f30eb780-5417-4b2e-99ab-401a26f9580e';
  const cdp = await page.context().newCDPSession(page);

  // 1. Open Left Panel
  console.log('Clicking Left Card...');
  await page.locator('#ai-left-card').click({ force: true });
  await page.waitForTimeout(1500);

  let { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'preview_left_scooch_notch.png'), Buffer.from(data, 'base64'));
  console.log('Captured open Left Panel!');

  // Close Left
  await page.locator('#ai-close-btn').click({ force: true });
  await page.waitForTimeout(1000);

  // 2. Open Right Panel
  console.log('Clicking Right Card...');
  await page.locator('#ai-right-card').click({ force: true });
  await page.waitForTimeout(1500);

  const snapRight = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'preview_right_frosted_glass.png'), Buffer.from(snapRight.data, 'base64'));
  console.log('Captured open Right Panel!');

  await browser.close();
  console.log('Done!');
})().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
