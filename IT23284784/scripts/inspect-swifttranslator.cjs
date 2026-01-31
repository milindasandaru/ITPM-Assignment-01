const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Dump possible inputs/outputs.
  const candidates = await page.evaluate(() => {
    const elems = Array.from(
      document.querySelectorAll('textarea, input[type="text"], input:not([type])')
    );

    return elems.map((el, index) => {
      const attrs = {
        index,
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute('type'),
        id: el.id || null,
        name: el.getAttribute('name'),
        placeholder: el.getAttribute('placeholder'),
        ariaLabel: el.getAttribute('aria-label'),
        role: el.getAttribute('role'),
        className: el.className || null,
      };

      // Try to compute an accessible-ish label (best-effort).
      const label = el.labels && el.labels.length ? el.labels[0].innerText : null;
      return { ...attrs, label: label || null };
    });
  });

  console.log(JSON.stringify({ url: page.url(), candidates }, null, 2));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
