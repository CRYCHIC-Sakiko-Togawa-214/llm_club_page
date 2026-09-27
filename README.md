# 兰州大学大模型社团 · LZU LLM Club

蓝白色响应式社团宣传网站，使用 React、TypeScript、Vite 和 Lucide 图标。所有模型网络、项目卡片及日历插画均由 SVG / CSS 绘制，无需图片生成服务。

## 本地开发

建议使用 Node.js 24。

```bash
npm ci
npm run dev
```

开发服务默认地址为 `http://127.0.0.1:5173`。

```bash
npm run build     # TypeScript 检查与生产构建
npm run preview   # 预览 dist 中的生产版本
npm test          # 桌面端及移动端浏览器测试
npm run format:check # 检查代码格式
```

Windows 测试默认使用已安装的 Chrome。其他系统请先执行 `npx playwright install chromium`。如 Windows Chrome 安装在其他位置，请修改 `playwright.config.ts` 中的 `executablePath`。

启动开发服务后，还可以使用 `npm run capture` 生成桌面和移动端截图、检查常见宽度的横向溢出，或使用 `npm run audit:a11y` 执行自动无障碍检查。截图保存到 Git 忽略的 `artifacts/` 目录。

## 网站内容

- 首页：社团定位、招新入口与原创模型网络插画。
- 关于我们：学习、科研、项目、比赛、活动与合作六个方向。
- 部门与成员：五个部门的职责详情、成员展示和招募说明。
- 成果与探索：可筛选的项目方向、详情弹窗，以及正式成果数据入口。
- 活动安排：技术培训、学术交流与项目共创活动筛选。
- 招新：部门意向选择，本地生成、复制和下载报名草稿。
- 常见问题：入社门槛、跨专业参与、部长要求和报名安排。

未提供的成员、成果、群号和活动日期不会被虚构。初始页面将项目标为「探索方向」、活动标为「筹备中」。原始文案中的「中秋期间」缺少明确年份与日期，因此面试时间采用「以最新招新通知为准」。

## 内容维护

主要数据集中在 `src/data.ts`：

1. **正式报名渠道**：填写 `club.recruitment.groupNumber`、`groupLink` 或 `qrImage`。二维码文件可放到 `public/`，路径填写 `./qr-code.png`。更新 `interviewTime` 为确认后的时间。
2. **成员档案**：在获得成员授权后向 `members` 添加姓名、部门、职务、简介和可选头像；「成员风采」会自动展示。
3. **已完成成果**：向 `achievements` 添加经核实的标题、介绍、日期、类型和可选作品链接；页面会自动增加「已发布成果」。项目方向不等于已完成成果。
4. **活动安排**：更新 `events` 的标题、说明、`dateLabel`（显示时间）、`location`（地点）、`status`（状态）和 `agenda`（内容安排）。目前全部活动均未确定时间，正式排期后填入确认的信息即可。
5. **部门**：更新 `departments` 的职责、适合人群与标签。
6. **其他文案**：首页、常见问题与静态说明在 `src/App.tsx`，样式在 `src/styles.css`。

报名草稿只在当前页面的内存中生成，不存储到服务器或浏览器本地存储，不代表完成报名。刷新或关闭页面会清除未下载的草稿。正式渠道尚未配置时，不会展示虚构群号或二维码。网站没有收集报名信息的后端。

英文展示字体随构建产物本地托管，中文使用系统字体；网站核心功能、字体和插画均不依赖运行时外部服务。

## 发布到 GitHub Pages

本站使用 GitHub Pages 的分支发布模式：`main` 保存源码，`gh-pages` 保存构建后的静态网站。

网站地址：<https://crychic-sakiko-togawa-214.github.io/llm_club_page/>

更新内容后，在已经完成 GitHub Git 认证的终端执行：

```bash
git add .
git commit -m "Update club website"
git push origin main
npm run deploy
```

`npm run deploy` 会构建网站，再以临时 Git 索引更新 `gh-pages`。它不切换当前分支、不修改源码暂存区、不强制推送，也不保存访问令牌。相同构建不会重复创建部署提交。GitHub Pages 会在发布分支更新后重新部署。

首次设置时，在仓库 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**，分支选择 `gh-pages`、目录选择 `/ (root)`。`public/.nojekyll` 会随构建输出，避免静态文件被 Jekyll 处理。

### 可选：改为 GitHub Actions 自动发布

仓库还保留了工作流模板 `deployment/github-pages.yml`。若以后希望推送源码后自动部署：

1. 将模板复制到 `.github/workflows/deploy.yml`，使用具备工作流写入权限的身份提交并推送到 `main` 分支。经典个人令牌需要额外具有 `workflow` 权限；仅有 `repo` 权限可以上传网站源码，但不能创建这个工作流。
2. 在 GitHub 仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
3. 启用后，工作流会构建并发布 `dist/`，也可以在 Actions 页手动触发。

Vite 使用相对资源路径，支持 GitHub Pages 项目子路径。实际发布状态以仓库 Pages 设置及部署结果为准。`dist/` 也可部署至其他静态网站托管服务。

## 交互与无障碍

使用语义化区块、单一主标题、跳转至主内容链接、键盘焦点样式、原生 `dialog`、Esc 关闭、FAQ `details` 与动态筛选状态。适配桌面、平板、移动端，并尊重 `prefers-reduced-motion` 设置。
