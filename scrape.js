const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [64,65,66,67,68,69,70,71,72,73];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    await page.waitForSelector("table");

    const sum = await page.$$eval("table td", cells =>
      cells.reduce((acc, cell) => {
        const num = parseFloat(cell.innerText);
        return acc + (isNaN(num) ? 0 : num);
      }, 0)
    );

    console.log(`Seed ${seed} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();