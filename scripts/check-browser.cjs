const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
const checks = [];
const pass = (name) => {
  checks.push(name);
  console.log("PASS", name);
};

(async () => {
  const browser = await chromium.launch({ headless: true, channel: "chrome" });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle" });

    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").textContent(), "Skip to content");
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(":focus").getAttribute("id"), "main");
    pass("Keyboard skip link");

    for (const width of [360, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
      );
    }
    pass("No horizontal overflow at common widths");

    const anchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href").slice(1)),
    );
    for (const id of anchors) {
      assert.ok(await page.locator(`[id="${id}"]`).count(), `Missing ${id}`);
    }
    pass("Internal links resolve");

    await page.getByRole("button", { name: "Web", exact: true }).click();
    assert.equal(await page.locator(".project-card").count(), 2);
    await page.getByRole("button", { name: "Machine Learning", exact: true }).click();
    assert.equal(await page.locator(".project-card").count(), 4);
    await page.getByRole("button", { name: "All 6" }).click();
    assert.equal(await page.locator(".project-card").count(), 6);
    pass("Project filters");

    await page.getByRole("button", { name: "View Uptime screenshot" }).click();
    assert.ok(await page.getByRole("dialog", { name: "Uptime screenshot" }).isVisible());
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog").count(), 0);
    assert.equal(
      await page.locator(":focus").getAttribute("aria-label"),
      "View Uptime screenshot",
    );
    pass("Screenshot dialog and focus restoration");

    await page.getByRole("button", { name: "Read Heavy Equipment Price Prediction case study" }).click();
    assert.ok(
      await page.getByRole("dialog", { name: "Heavy Equipment Price Prediction case study" }).isVisible(),
    );
    await page.keyboard.press("Escape");
    pass("Case study dialog");

    await page.setViewportSize({ width: 360, height: 900 });
    await page.getByRole("button", { name: "Open navigation" }).click();
    assert.ok(await page.getByRole("dialog", { name: "Navigation" }).isVisible());
    await page.keyboard.press("Escape");
    pass("Mobile navigation dialog");

    await page.getByRole("button", { name: "Explore all 21 certificates" }).click();
    assert.equal(await page.locator(".certificate-card").count(), 21);
    for (const href of await page.locator(".certificate-card a").evaluateAll((links) =>
      links.map((link) => link.href),
    )) {
      const response = await context.request.get(href);
      assert.equal(response.status(), 200, href);
      assert.equal((await response.body()).subarray(0, 4).toString(), "%PDF", href);
    }
    await page.getByRole("button", { name: "Show selected certificates" }).click();
    assert.equal(await page.locator(".certificate-card").count(), 3);
    pass("Certificate gallery and PDFs");

    const resume = page.getByRole("link", { name: "Download resume" });
    const response = await context.request.get(
      new URL(await resume.getAttribute("href"), base).href,
    );
    assert.equal((await response.body()).subarray(0, 4).toString(), "%PDF");
    pass("Resume download");

    assert.deepEqual(errors, []);
    pass("No JavaScript runtime errors");
    fs.mkdirSync("artifacts", { recursive: true });
    fs.writeFileSync("artifacts/browser-checks.json", JSON.stringify({ checks, errors }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
