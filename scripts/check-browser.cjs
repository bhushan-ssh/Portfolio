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

    const staticContext = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(base);
    for (const section of ["home", "about", "projects", "skills", "achievements", "contact"]) {
      assert.ok(await staticPage.locator(`#${section}`).isVisible());
    }
    assert.equal(await staticPage.locator("h1").count(), 1);
    assert.equal(await staticPage.locator(".project-card").count(), 6);
    const { SITE_URL } = await import("../site.config.js");
    assert.equal(await staticPage.locator('link[rel="canonical"]').getAttribute("href"), `${SITE_URL}/`);
    const schema = JSON.parse(await staticPage.locator('script[type="application/ld+json"]').textContent());
    assert.equal(schema.alumniOf.length, 2);
    assert.ok(schema.sameAs.includes("https://www.kaggle.com/bhushanssh"));
    assert.deepEqual(await staticPage.locator(".achievement-strip strong").allTextContents(),
      ["1st place", "Winner", "Runner-Up", "110+", "SQL & Java"]);
    await staticContext.close();
    pass("Prerendered content, metadata and nonduplicated milestones");

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

    await page.setViewportSize({ width: 360, height: 640 });
    await page.evaluate(() => window.scrollTo(0, 0));
    for (const name of ["View projects", "Download resume"]) {
      const box = await page.getByRole("link", { name, exact: true }).boundingBox();
      assert.ok(box.y >= 0 && box.y + box.height <= 640, `${name} below the fold`);
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    pass("Both hero actions above the mobile fold");

    const anchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href").slice(1)),
    );
    for (const id of anchors) {
      assert.ok(await page.locator(`[id="${id}"]`).count(), `Missing ${id}`);
    }
    pass("Internal links resolve");

    await page.getByRole("button", { name: "Web", exact: true }).click();
    assert.equal(await page.locator(".project-card").count(), 2);
    assert.equal(await page.getByRole("status").first().textContent(), "Showing 2 Web projects");
    await page.getByRole("button", { name: "Machine Learning", exact: true }).click();
    assert.equal(await page.locator(".project-card").count(), 4);
    await page.getByRole("button", { name: "All 6" }).click();
    assert.equal(await page.locator(".project-card").count(), 6);
    pass("Project filters");

    await page.getByRole("button", { name: "View screenshot of Uptime" }).click();
    assert.ok(await page.getByRole("dialog", { name: "Uptime screenshot" }).isVisible());
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog").count(), 0);
    assert.equal(
      await page.locator(":focus").getAttribute("aria-label"),
      "View screenshot of Uptime",
    );
    pass("Screenshot dialog and focus restoration");

    await page.getByRole("button", { name: "Case study: Heavy Equipment Price Prediction" }).click();
    assert.ok(
      await page.getByRole("dialog", { name: "Heavy Equipment Price Prediction case study" }).isVisible(),
    );
    await page.keyboard.press("Escape");
    pass("Case study dialog");

    await page.setViewportSize({ width: 360, height: 900 });
    await page.getByRole("button", { name: "Open navigation" }).click();
    assert.ok(await page.getByRole("dialog", { name: "Navigation" }).isVisible());
    const closeMenu = page.getByRole("button", { name: "Close Navigation" });
    await closeMenu.focus();
    await page.keyboard.press("Shift+Tab");
    assert.ok(await page.getByRole("dialog").evaluate((dialog) => dialog.contains(document.activeElement)));
    await page.keyboard.press("Tab");
    assert.ok(await closeMenu.evaluate((button) => button === document.activeElement));
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

    await page.getByRole("button", { name: "Explore all 21 certificates" }).click();
    for (const img of await page.locator("main img").all()) {
      assert.ok(Number(await img.getAttribute("width")) > 0);
      assert.ok(Number(await img.getAttribute("height")) > 0);
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((element) => element.decode());
    }
    assert.deepEqual(await page.locator('a[target="_blank"]').evaluateAll((links) =>
      links.filter((link) => !link.relList.contains("noopener") || !link.relList.contains("noreferrer")).map((link) => link.href)), []);
    pass("Every image decodes with dimensions and external links are protected");

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.getByRole("button", { name: "Copy email", exact: true }).click();
    await page.getByText("Email copied.", { exact: true }).waitFor();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), "bhushan.sonawane.tech@gmail.com");
    await page.evaluate(() => Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new Error("Permission denied"); } },
    }));
    await page.getByRole("button", { name: "Copy email", exact: true }).click();
    await page.getByText("Couldn’t copy automatically.", { exact: false }).waitFor();
    pass("Clipboard success and permission-denied feedback");

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
