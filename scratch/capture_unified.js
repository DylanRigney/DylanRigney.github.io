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
  fs.writeFileSync(path.join(artifactDir, 'preview_unified_card.png'), Buffer.from(snapInit.data, 'base64'));
  console.log('Saved preview_unified_card.png');

  // 2. Click Right Card to Open Unified Panel
  console.log('Clicking Right Card...');
  await page.locator('#ai-right-card').click({ force: true });
  await page.waitForTimeout(1500);

  let snapRight = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'preview_unified_panel.png'), Buffer.from(snapRight.data, 'base64'));
  console.log('Saved preview_unified_panel.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
})().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
