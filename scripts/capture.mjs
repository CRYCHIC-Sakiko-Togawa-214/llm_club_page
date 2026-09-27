import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch({
  ...(process.platform === 'win32'
    ? {
        executablePath:
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      }
    : {}),
})
const page = await browser.newPage({
  viewport: { width: 1440, height: 1050 },
  deviceScaleFactor: 1,
})
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' })
await page.screenshot({ path: 'artifacts/desktop-full.png', fullPage: true })
await page.screenshot({ path: 'artifacts/desktop-hero.png' })
const overflow = []
for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 })
  overflow.push({
    width,
    overflow: await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  })
}
await page.setViewportSize({ width: 390, height: 844 })
await page.screenshot({ path: 'artifacts/mobile-full.png', fullPage: true })
await page.screenshot({ path: 'artifacts/mobile-hero.png' })
await page.getByRole('button', { name: '加入我们', exact: true }).click()
await page.screenshot({ path: 'artifacts/mobile-join.png' })
console.log(JSON.stringify({ errors, overflow }, null, 2))
await browser.close()
