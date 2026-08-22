const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  console.log('Before click:');
  console.log('Close button count:', await page.locator('#ai-close-btn').count());
  const boxBefore = await page.locator('#ai-close-btn').boundingBox();
  console.log('Close button box before:', boxBefore);

  await page.locator('#ai-right-card').click({ force: true });
  await page.waitForTimeout(1000);

  console.log('After clicking right card:');
  const boxAfter = await page.locator('#ai-close-btn').boundingBox();
  console.log('Close button box after:', boxAfter);

  await browser.close();
})();
