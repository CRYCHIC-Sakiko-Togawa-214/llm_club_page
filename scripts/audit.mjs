import { chromium } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const browser = await chromium.launch({
  ...(process.platform === 'win32'
    ? {
        executablePath:
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      }
    : {}),
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
})
const page = await context.newPage()
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' })
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
  .analyze()
console.log(
  JSON.stringify(
    results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({
        selector: n.target,
        message: n.failureSummary,
      })),
    })),
    null,
    2,
  ),
)
await browser.close()
if (results.violations.length) process.exitCode = 1
