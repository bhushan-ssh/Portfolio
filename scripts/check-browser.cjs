const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
fs.mkdirSync("artifacts", { recursive: true });
const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
(async () => {
  const browser = await chromium.launch({ headless: true, channel: "chrome" });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  const errors = [];
  const checks = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const pass = (name) => {
    checks.push(name);
    console.log("PASS", name);
  };
  await page.goto(base, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").textContent(), "Skip to content");
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(":focus").getAttribute("id"), "main");
  pass("Keyboard skip link");
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    pass(`No overflow at ${width}px`);
  }
  const anchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((as) => as.map((a) => a.getAttribute("href").slice(1)));
  for (const id of anchors)
    assert.ok(await page.locator(`[id="${id}"]`).count(), `Missing ${id}`);
  pass("All fragment links resolve");
  await page.getByRole("button", { name: "Web", exact: true }).click();
  assert.equal(await page.locator(".project-card").count(), 2);
  await page
    .getByRole("button", { name: "Machine Learning", exact: true })
    .click();
  assert.equal(await page.locator(".project-card").count(), 1);
  assert.equal(await page.locator(".project-card h3").textContent(), "Uptime↗");
  await page.getByRole("button", { name: "All 03" }).click();
  assert.equal(await page.locator(".project-card").count(), 3);
  pass("Project filters");
  const shot = page.getByRole("button", { name: "View Uptime screenshot" });
  await shot.click();
  assert.ok(
    await page.getByRole("dialog", { name: "Uptime screenshot" }).isVisible(),
  );
  await page.keyboard.press("Shift+Tab");
  assert.equal(
    await page.locator(":focus").textContent(),
    "Explore the source ",
  );
  await page.keyboard.press("Tab");
  assert.equal(
    await page.locator(":focus").getAttribute("aria-label"),
    "Close Uptime screenshot",
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog").count(), 0);
  assert.equal(
    await page.locator(":focus").getAttribute("aria-label"),
    "View Uptime screenshot",
  );
  pass("Lightbox, focus trap, Escape, focus restoration");
  await page.setViewportSize({ width: 360, height: 900 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Shift+Tab");
  assert.match(await page.locator(":focus").textContent(), /connect/);
  await page.keyboard.press("Tab");
  assert.equal(
    await page.locator(":focus").getAttribute("aria-label"),
    "Close Navigation",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator(":focus").getAttribute("aria-label"),
    "Open navigation",
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  assert.equal(await page.locator("dialog").count(), 0);
  await page.waitForTimeout(100);
  assert.ok(
    (await page
      .locator("#projects")
      .evaluate((el) => el.getBoundingClientRect().top)) >= 72,
  );
  pass("Mobile menu, focus trap, Escape, link closure, anchor offset");
  await page
    .getByRole("button", { name: "Explore all 21 certificates" })
    .click();
  assert.equal(await page.locator(".certificate-card").count(), 21);
  for (const href of await page
    .locator(".certificate-card a")
    .evaluateAll((as) => as.map((a) => a.href))) {
    const response = await context.request.get(href);
    assert.equal(response.status(), 200, href);
    assert.equal(
      (await response.body()).subarray(0, 4).toString(),
      "%PDF",
      href,
    );
  }
  pass("All 21 certificate cards and PDF downloads");
  await page
    .getByRole("button", { name: "Show selected certificates" })
    .click();
  assert.equal(await page.locator(".certificate-card").count(), 6);
  const resume = page.getByRole("link", { name: "Download resume" });
  assert.equal(
    await resume.getAttribute("download"),
    "Bhushan_Sonawane_Resume.pdf",
  );
  assert.equal(
    (
      await (
        await context.request.get(
          new URL(await resume.getAttribute("href"), base).href,
        )
      ).body()
    )
      .subarray(0, 4)
      .toString(),
    "%PDF",
  );
  pass("Resume download");
  await page.getByRole("button", { name: "Copy email address" }).click();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    "bhushan.sonawane.tech@gmail.com",
  );
  pass("Copy email");
  assert.equal(
    await page.getByRole("button", { name: "Send message" }).isDisabled(),
    true,
  );
  pass("Unconfigured form clearly disabled with email fallback");
  await page.locator(".scroll-top").click();
  await page.waitForTimeout(200);
  assert.ok((await page.evaluate(() => scrollY)) < 10);
  pass("Back to top");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator("#certifications").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "artifacts/certificates-desktop.png" });
  assert.equal(
    await page
      .locator(".will-reveal")
      .evaluateAll((es) => es.some((e) => getComputedStyle(e).opacity === "0")),
    false,
  );
  pass("Reduced motion content visible");
  await page.goto(process.env.FORM_PREVIEW_URL || "http://127.0.0.1:5174/", {
    waitUntil: "networkidle",
  });
  let requests = 0;
  let mode = "success";
  await page.route("**/test-contact", async (route) => {
    requests++;
    if (mode === "network") return route.abort();
    await new Promise((r) => setTimeout(r, 250));
    return route.fulfill({
      status: mode === "error" ? 422 : 200,
      contentType: "application/json",
      body: JSON.stringify(
        mode === "error"
          ? { errors: [{ message: "Try again" }] }
          : { next: "/thanks" },
      ),
    });
  });
  const submit = page.getByRole("button", { name: "Send message" });
  await submit.click();
  assert.equal(requests, 0);
  pass("Required form validation");
  const fill = async () => {
    await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
    await page
      .getByLabel("Email address", { exact: true })
      .fill("test@example.com");
    await page.getByLabel("Subject", { exact: true }).fill("Local test");
    await page
      .getByLabel("Message", { exact: true })
      .fill("This is a local intercepted test message.");
  };
  await fill();
  await page.locator('input[name="email"]').fill("invalid");
  await submit.click();
  assert.equal(requests, 0);
  pass("Email format validation");
  await fill();
  await submit.click();
  assert.ok(await page.getByRole("button", { name: "Sending…" }).isDisabled());
  await page
    .getByText("Thanks for reaching out! Your message has been sent.")
    .waitFor();
  assert.equal(
    await page.getByLabel("Your name", { exact: true }).inputValue(),
    "",
  );
  pass("Form loading and successful response");
  mode = "error";
  await fill();
  await submit.click();
  await page.getByText(/Your message could not be sent/).waitFor();
  assert.equal(
    await page.getByLabel("Your name", { exact: true }).inputValue(),
    "Test Visitor",
  );
  pass("Form server error retains input");
  mode = "network";
  await submit.click();
  await page.getByText(/Your message could not be sent/).waitFor();
  pass("Form network failure");
  const before = requests;
  await page
    .locator('input[name="_gotcha"]')
    .evaluate((el) => (el.value = "spam"));
  await submit.click();
  await page.waitForTimeout(300);
  assert.equal(requests, before);
  pass("Honeypot rejects submission");
  assert.deepEqual(errors, []);
  pass("No JavaScript runtime errors");
  fs.writeFileSync(
    "artifacts/browser-checks.json",
    JSON.stringify({ checks, errors }, null, 2),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
