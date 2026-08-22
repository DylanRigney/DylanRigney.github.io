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

  // 1. Initial State Screenshot
  let snapInit = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'preview_initial_cards.png'), Buffer.from(snapInit.data, 'base64'));
  console.log('Saved preview_initial_cards.png');

  // 2. Click Left Card to Open Left Panel
  console.log('Clicking Left Card...');
  await page.locator('#ai-left-card').click({ force: true });
  await page.waitForTimeout(1500);

  let snapLeft = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'preview_left_scooch_notch.png'), Buffer.from(snapLeft.data, 'base64'));
  console.log('Saved preview_left_scooch_notch.png');

  // Close Left Panel
  console.log('Closing left panel...');
  await page.locator('#ai-close-btn').click({ force: true });
  await page.waitForTimeout(1000);

  // 3. Click Right Card to Open Right Panel
  console.log('Clicking Right Card...');
  await page.locator('#ai-right-card').click({ force: true });
  await page.waitForTimeout(1500);

  let snapRight = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'preview_right_frosted_glass.png'), Buffer.from(snapRight.data, 'base64'));
  console.log('Saved preview_right_frosted_glass.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
})().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
