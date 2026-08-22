const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const targetUrl = 'http://localhost:3001';
  console.log('Navigating to ' + targetUrl);
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);

  const artifactDir = 'C:\\Users\\dylan\\.gemini\\antigravity\\brain\\f30eb780-5417-4b2e-99ab-401a26f9580e';

  // Screenshot 1: Initial state showing both cards
  await page.screenshot({ path: path.join(artifactDir, 'preview_initial_cards.png') });
  console.log('Captured initial cards screenshot');

  // Click left card
  const leftCard = page.locator('text=Dylan\'s Assistant').first();
  await leftCard.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(artifactDir, 'preview_left_scooch_notch.png') });
  console.log('Captured left scooch notch screenshot');

  // Close left
  const closeButton = page.locator('button[aria-label="Close AI Assistant"]');
  if (await closeButton.count() > 0) {
    await closeButton.click();
    await page.waitForTimeout(1000);
  }

  // Click right card
  const rightCard = page.locator('text=AI Home').first();
  await rightCard.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(artifactDir, 'preview_right_frosted_glass.png') });
  console.log('Captured right frosted glass screenshot');

  await browser.close();
  console.log('Done!');
})().catch(err => {
  console.error('Error in script:', err);
  process.exit(1);
});
