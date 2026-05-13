const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto('http://localhost:3000/tools/take-home-pay-calculator');
  await page.waitForLoadState('networkidle');

  // Select $75k preset
  await page.click('button:has-text("$75k")');
  // Select California
  await page.selectOption('#state-selector', { label: 'California — 9.3%' });
  // Click calculate
  await page.click('button:has-text("Calculate my take-home pay")');
  // Wait for navigation to state page
  await page.waitForURL('**/ca', { timeout: 10000 });
  // Wait for the loader to finish (button re-enabled or result element appears)
  await page.waitForFunction(() => !document.querySelector('button[disabled]'), { timeout: 10000 });
  await page.waitForTimeout(1500);

  // Scroll to show the big result number
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(400);

  const outPath = path.resolve(__dirname, 'public/images/take_home_pay_calculator.png');
  await page.screenshot({ path: outPath, fullPage: false });

  await browser.close();
  console.log('Screenshot saved to', outPath);
})().catch(e => { console.error(e); process.exit(1); });
