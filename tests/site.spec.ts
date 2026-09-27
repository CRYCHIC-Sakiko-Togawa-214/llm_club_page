import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('renders the club and all sections without page errors or horizontal overflow', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page).toHaveTitle(/兰州大学大模型社团/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    '成为创造力',
  )
  for (const id of ['about', 'team', 'projects', 'events', 'join']) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
  expect(errors).toEqual([])
  await expect(page.locator('.activity-card')).toHaveCount(6)
  await expect(page.locator('.department-card')).toHaveCount(5)
})

test('filters projects and opens an accessible project dialog', async ({
  page,
}) => {
  await page.goto('/')
  const filters = page.getByRole('group', { name: '项目方向筛选' })
  await filters.getByRole('button', { name: '多模态', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await page
    .getByRole('button', { name: '查看项目方向：不止于文字的理解' })
    .click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(
    '不止于文字的理解',
  )
  await expect(dialog).toContainText('不代表已经完成的项目或获奖成果')
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await filters.getByRole('button', { name: '全部方向' }).click()
  await expect(page.locator('.project-card')).toHaveCount(3)
})

test('department application generates a local draft and downloads it', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .locator('.department-card')
    .filter({ has: page.getByRole('heading', { name: '学术部', exact: true }) })
    .click()
  await page.getByRole('button', { name: '我对这个部门感兴趣' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByLabel('感兴趣的部门')).toHaveValue('学术部')
  await dialog.getByLabel('你的姓名').fill('测试同学')
  await dialog.getByLabel('一句话介绍自己').fill('希望与伙伴一起阅读论文。')
  await dialog.getByRole('button', { name: '生成报名草稿' }).click()
  await expect(dialog.getByLabel('报名草稿')).toHaveValue(/意向部门：学术部/)
  await expect(dialog.getByLabel('报名草稿')).toHaveValue(/测试同学/)
  await expect(dialog).toContainText('尚未发送或提交')
  const downloadPromise = page.waitForEvent('download')
  await dialog.getByRole('button', { name: '下载文本' }).click()
  expect((await downloadPromise).suggestedFilename()).toBe(
    '兰大大模型社团-报名草稿.txt',
  )
  await dialog.getByRole('button', { name: '关闭弹窗' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
})

test('event filters, member view, and FAQ expose meaningful states', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .getByRole('group', { name: '活动类型筛选' })
    .getByRole('button', { name: '学术交流' })
    .click()
  await expect(page.locator('.event-card')).toHaveCount(1)
  await expect(page.locator('.event-card')).toContainText('Paper & Coffee')
  await expect(page.locator('.event-card')).toContainText('时间待定')
  await page.getByRole('button', { name: '成员风采', exact: true }).click()
  await expect(page.locator('.members-panel')).toContainText('获得本人授权')
  await page.getByRole('button', { name: '部门介绍', exact: true }).click()
  await expect(page.locator('.department-card')).toHaveCount(5)
  await page.locator('summary').filter({ hasText: '没有编程基础' }).click()
  await expect(page.locator('details[open]')).toContainText('当然可以')
})

test('navigation works and the small-screen menu is dismissible', async ({
  page,
  isMobile,
}) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: '打开菜单' }).click()
    await expect(
      page.getByRole('navigation', { name: '移动导航' }),
    ).toBeVisible()
    await page
      .getByRole('navigation', { name: '移动导航' })
      .getByRole('link', { name: '活动安排' })
      .click()
    await expect(
      page.getByRole('navigation', { name: '移动导航' }),
    ).toHaveCount(0)
    await expect(page).toHaveURL(/#events$/)
    await page.getByRole('button', { name: '打开菜单' }).click()
    await page.keyboard.press('Escape')
    await expect(
      page.getByRole('navigation', { name: '移动导航' }),
    ).toHaveCount(0)
  } else {
    await page
      .getByRole('navigation', { name: '主导航' })
      .getByRole('link', { name: '部门与成员' })
      .click()
    await expect(page).toHaveURL(/#team$/)
  }
})

test('activity details show the agenda and lead to participation information', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .getByRole('button', { name: '了解活动：Hello, LLM! 从第一行代码开始' })
    .click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(
    'Hello, LLM! 从第一行代码开始',
  )
  await expect(dialog).toContainText('地点待定')
  await expect(dialog).toContainText('尝试调用模型，完成一次简单对话')
  await dialog.getByRole('button', { name: '查看参与方式' }).click()
  await expect(page.getByRole('dialog').getByLabel('你的姓名')).toBeVisible()
})

test('homepage and recruitment dialog pass automated accessibility checks', async ({
  page,
}) => {
  await page.goto('/')
  const home = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(home.violations).toEqual([])
  await page.getByRole('button', { name: '加入我们', exact: true }).click()
  const join = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(join.violations).toEqual([])
})
