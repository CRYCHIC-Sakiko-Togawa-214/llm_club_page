import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Layers3,
  Menu,
  MessageCircle,
  Plus,
  Rocket,
  Sparkles,
  Terminal,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'
import {
  achievements,
  club,
  departments,
  events,
  members,
  projects,
} from './data'

type Project = (typeof projects)[number]
type Department = (typeof departments)[number]
type ClubEvent = (typeof events)[number]
type ModalState =
  | { type: 'join'; department?: string }
  | { type: 'project'; project: Project }
  | { type: 'department'; department: Department }
  | { type: 'event'; event: ClubEvent }
  | null

const hasRecruitmentChannel = Boolean(
  club.recruitment.groupNumber ||
  club.recruitment.groupLink ||
  club.recruitment.qrImage,
)

const navItems = [
  { id: 'about', name: '关于我们' },
  { id: 'team', name: '部门与成员' },
  { id: 'projects', name: '成果与探索' },
  { id: 'events', name: '活动安排' },
]

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      className={`brand ${inverse ? 'brand-inverse' : ''}`}
      href="#home"
      aria-label="兰州大学大模型社团首页"
    >
      <svg className="brand-mark" viewBox="0 0 44 44" aria-hidden="true">
        <rect width="44" height="44" rx="12" fill="currentColor" />
        <path
          d="M11 11h6v22h-6zm10 8h6v14h-6zm10-7h4v4h-4zM11 30h24v5H11z"
          fill="white"
        />
      </svg>
      <span className="brand-name">
        兰州大学大模型社团<span>LZU LLM CLUB</span>
      </span>
    </a>
  )
}

function SectionLabel({
  number,
  children,
  light = false,
}: {
  number: string
  children: ReactNode
  light?: boolean
}) {
  return (
    <div className={`section-label ${light ? 'section-label-light' : ''}`}>
      <span className="label-square" />
      {children}
      <span className="label-number">/ {number}</span>
    </div>
  )
}

const sphereNodes = Array.from({ length: 190 }, (_, i) => {
  const y = 1 - (i / 189) * 2
  const r = Math.sqrt(1 - y * y)
  const theta = i * Math.PI * (3 - Math.sqrt(5))
  const x = Math.cos(theta) * r
  const z = Math.sin(theta) * r
  return { x: 280 + x * 172, y: 252 + y * 172, z, r: 1.3 + (z + 1) * 1.1 }
})

function NeuralVisual() {
  return (
    <div
      className="neural-visual"
      aria-label="由蓝色节点组成的模型网络与代码卡片插画"
      role="img"
    >
      <div className="visual-topline">
        <span>
          <i /> YOUR NEXT CHAPTER STARTS HERE
        </span>
        <Plus size={16} />
      </div>
      <svg className="neural-sphere" viewBox="0 0 560 510" aria-hidden="true">
        <defs>
          <radialGradient id="sphereGlow">
            <stop offset="0%" stopColor="#cadcff" stopOpacity=".65" />
            <stop offset="100%" stopColor="#eff5ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="orbitGradient">
            <stop stopColor="#93b6ff" stopOpacity="0" />
            <stop offset="45%" stopColor="#719cfa" />
            <stop offset="100%" stopColor="#93b6ff" stopOpacity=".15" />
          </linearGradient>
        </defs>
        <circle cx="280" cy="252" r="230" fill="url(#sphereGlow)" />
        <g stroke="#9bbcff" strokeWidth=".65" fill="none">
          {[45, 83, 118, 145, 164, 174].map((r) => (
            <ellipse key={r} cx="280" cy="252" rx={r} ry="174" opacity=".37" />
          ))}
          {[112, 151, 199, 252, 305, 353, 392].map((y, i) => (
            <ellipse
              key={y}
              cx="280"
              cy={y}
              rx={[101, 143, 164, 173, 164, 143, 101][i]}
              ry={i === 3 ? 34 : 20}
              opacity=".32"
            />
          ))}
          <circle cx="280" cy="252" r="174" opacity=".7" />
        </g>
        <g stroke="#80a7f8" strokeWidth=".55">
          {sphereNodes.flatMap((a, i) =>
            sphereNodes
              .slice(i + 1)
              .filter(
                (b) =>
                  a.z > -0.35 &&
                  b.z > -0.35 &&
                  Math.hypot(a.x - b.x, a.y - b.y) < 36,
              )
              .slice(0, 4)
              .map((b, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  opacity={(a.z + 1.2) * 0.3}
                />
              )),
          )}
        </g>
        {sphereNodes.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="#2963e7"
            opacity={0.16 + (p.z + 1) * 0.36}
          />
        ))}
        <ellipse
          cx="280"
          cy="252"
          rx="256"
          ry="79"
          transform="rotate(-27 280 252)"
          stroke="url(#orbitGradient)"
          strokeWidth="1.1"
          fill="none"
        />
        <ellipse
          cx="280"
          cy="252"
          rx="231"
          ry="206"
          transform="rotate(20 280 252)"
          stroke="#b3caff"
          strokeWidth=".7"
          strokeDasharray="3 7"
          fill="none"
        />
        <circle cx="487" cy="144" r="7" fill="#255cf3" />
        <circle cx="487" cy="144" r="13" stroke="#b9d0ff" fill="none" />
        <circle cx="82" cy="388" r="4" fill="#255cf3" />
      </svg>
      <div className="floating-label floating-label-a">
        <Sparkles size={16} />
        无限可能，正在生成
        <span className="tiny-dot" />
      </div>
      <div className="code-window">
        <div className="code-title">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>hello_future.py</span>
          <Code2 size={14} />
        </div>
        <div className="code-content">
          <div>
            <span className="line-number">01</span>
            <span className="code-purple">from</span> curiosity{' '}
            <span className="code-purple">import</span> future
          </div>
          <div>
            <span className="line-number">02</span>
          </div>
          <div>
            <span className="line-number">03</span>club ={' '}
            <span className="code-function">Community</span>(
          </div>
          <div>
            <span className="line-number">04</span>
            <span className="code-indent">
              &nbsp;&nbsp;passion ={' '}
              <span className="code-string">"AI × ∞"</span>,
            </span>
          </div>
          <div>
            <span className="line-number">05</span>&nbsp;&nbsp;spirit ={' '}
            <span className="code-string">"Open source"</span>
          </div>
          <div>
            <span className="line-number">06</span>)
          </div>
          <div>
            <span className="line-number">07</span>club.
            <span className="code-function">build</span>(
            <span className="code-string">with_you</span>)
            <span className="code-caret" />
          </div>
        </div>
        <div className="code-output">
          <span>
            <i /> Ready to build something great.
          </span>
          <span>↵</span>
        </div>
      </div>
      <div className="floating-label floating-label-b">
        <span className="blue-symbol">✳</span>
        <div>
          BUILT ON CURIOSITY<span>由好奇心驱动</span>
        </div>
      </div>
      <div className="visual-bottomline">
        <span>OPEN MINDS. OPEN SOURCE.</span>
        <span>LANZHOU UNIVERSITY / LLM CLUB</span>
      </div>
    </div>
  )
}

function ProjectArt({ kind }: { kind: Project['kind'] }) {
  if (kind === 'chat')
    return (
      <div className="project-art art-chat" aria-hidden="true">
        <div className="art-grid" />
        <div className="mini-chat">
          <div className="mini-chat-header">
            <span className="mini-ai">
              <Sparkles size={15} />
            </span>
            <span>
              Campus Copilot<span>你的知识探索搭子</span>
            </span>
            <span className="chat-status" />
          </div>
          <div className="chat-bubble question">大模型的世界，从哪里开始？</div>
          <div className="chat-answer">
            <Sparkles size={13} />
            <div>
              <span>
                从一个好问题开始。
                <b className="typing-cursor" />
              </span>
              <i />
              <i />
            </div>
          </div>
          <div className="chat-input">
            Ask something curious...
            <ArrowUpRight size={14} />
          </div>
        </div>
        <span className="art-caption">KNOWLEDGE, CONNECTED.</span>
      </div>
    )
  if (kind === 'vision')
    return (
      <div className="project-art art-vision" aria-hidden="true">
        <div className="art-grid" />
        <div className="vision-frame">
          <div className="vision-landscape">
            <span className="landscape-sun" />
            <span className="mountain mountain-back" />
            <span className="mountain mountain-front" />
          </div>
          <div className="vision-scan">
            <i />
            <i />
            <i />
            <i />
            <span>
              <Sparkles size={12} /> 看见，理解，创造
            </span>
          </div>
        </div>
        <span className="vision-chip">
          <Layers3 size={14} /> image → imagination
        </span>
        <span className="art-caption">BEYOND THE WORDS.</span>
      </div>
    )
  return (
    <div className="project-art art-tools" aria-hidden="true">
      <div className="art-grid" />
      <div className="workflow">
        <div className="workflow-node node-input">
          <Terminal size={21} />
        </div>
        <span className="workflow-line" />
        <div className="workflow-node node-core">
          <Sparkles size={29} />
          <span>AI</span>
        </div>
        <span className="workflow-line" />
        <div className="workflow-node node-output">
          <Zap size={21} />
        </div>
      </div>
      <span className="tool-chip chip-one">
        <Check size={11} /> Less repetitive.
      </span>
      <span className="tool-chip chip-two">
        <Check size={11} /> More creative.
      </span>
      <span className="art-caption">SMALL TOOLS. REAL IMPACT.</span>
    </div>
  )
}

function Modal({
  children,
  onClose,
  titleId,
}: {
  children: ReactNode
  onClose: () => void
  titleId: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      dialog?.close()
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby={titleId}
      onCancel={onClose}
      onClose={(e) => {
        if (!e.currentTarget.open) onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="dialog-body">
        <button
          className="dialog-close icon-button"
          onClick={onClose}
          aria-label="关闭弹窗"
        >
          <X size={21} />
        </button>
        {children}
      </div>
    </dialog>
  )
}

function JoinContent({ department = '' }: { department?: string }) {
  const [draft, setDraft] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const draftRef = useRef<HTMLTextAreaElement>(null)
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setDraft(
      `兰州大学大模型社团 · 报名意向\n\n姓名：${data.get('name')}\n在读阶段：${data.get('degree')}\n意向部门：${data.get('department') || '希望进一步了解'}\n自我介绍：${data.get('intro') || '（请补充你的兴趣、经历与想做的事情）'}\n\n此内容为本地报名草稿，尚未提交。请通过社团公布的正式渠道发送。`,
    )
  }
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopyError(true)
      draftRef.current?.focus()
      draftRef.current?.select()
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob(['\uFEFF' + draft], { type: 'text/plain;charset=utf-8' }),
    )
    const link = document.createElement('a')
    link.href = url
    link.download = '兰大大模型社团-报名草稿.txt'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <>
      <span className="dialog-eyebrow">YOUR NEXT CHAPTER</span>
      <h2 id="modal-title">
        下一位共创者，
        <br />
        也许就是你。
      </h2>
      <p className="dialog-intro">
        面向兰州大学全日制本科生与研究生。带上好奇心，我们一起找到适合你的方向。
      </p>
      <div className="contact-notice">
        <MessageCircle size={21} />
        <div>
          <strong>
            {club.recruitment.groupNumber
              ? `招新群：${club.recruitment.groupNumber}`
              : hasRecruitmentChannel
                ? '通过官方招新群联系我们'
                : '招新群联系方式即将公布'}
          </strong>
          <p>
            面试时间：{club.recruitment.interviewTime}。
            {!hasRecruitmentChannel
              ? '你可以先准备一份报名草稿。'
              : '请通过正式招新渠道联系负责人。'}
          </p>
          {club.recruitment.groupLink && (
            <a
              href={club.recruitment.groupLink}
              target="_blank"
              rel="noreferrer"
            >
              前往招新群 <ArrowUpRight size={14} />
            </a>
          )}
          {club.recruitment.qrImage && (
            <img
              className="join-qr"
              src={club.recruitment.qrImage}
              alt="社团招新群二维码"
            />
          )}
        </div>
      </div>
      {draft ? (
        <div className="draft-result">
          <h3>
            <Check size={18} /> 报名草稿已生成
          </h3>
          <p>草稿仅保存在当前页面，尚未发送或提交。</p>
          <textarea
            ref={draftRef}
            aria-label="报名草稿"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value)
              setCopied(false)
            }}
            rows={9}
          />
          <div className="draft-actions">
            <button
              className="button button-primary"
              onClick={() => copy(draft)}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? '已复制' : '复制草稿'}
            </button>
            <button className="button button-outline" onClick={download}>
              <Download size={16} />
              下载文本
            </button>
          </div>
          <div role="status" className="form-status">
            {copied
              ? '复制成功，可发送至正式招新渠道。'
              : copyError
                ? '浏览器未允许复制，请选中草稿后手动复制。'
                : ''}
          </div>
          <button
            className="text-button"
            onClick={() => {
              setDraft('')
              setCopied(false)
              setCopyError(false)
            }}
          >
            重新填写 <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="join-form">
          <div className="form-row">
            <label>
              你的姓名
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={40}
                placeholder="怎么称呼你？"
              />
            </label>
            <label>
              在读阶段
              <select name="degree" defaultValue="本科生">
                <option>本科生</option>
                <option>硕士研究生</option>
                <option>博士研究生</option>
              </select>
            </label>
          </div>
          <label>
            感兴趣的部门
            <select name="department" defaultValue={department}>
              <option value="">还没想好，想先了解</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            一句话介绍自己<span className="optional">（选填）</span>
            <textarea
              name="intro"
              rows={3}
              maxLength={1000}
              placeholder="你的兴趣、做过的事情，或想和我们一起实现的想法……"
            />
          </label>
          <p className="form-note">
            信息仅用于在本地生成文本，不会上传或自动报名。
          </p>
          <button className="button button-primary form-submit" type="submit">
            生成报名草稿 <ArrowRight size={17} />
          </button>
        </form>
      )}
    </>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [projectFilter, setProjectFilter] = useState('全部方向')
  const [eventFilter, setEventFilter] = useState('全部活动')
  const [modal, setModal] = useState<ModalState>(null)
  const [teamTab, setTeamTab] = useState('部门介绍')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -65% 0px' },
    )
    document
      .querySelectorAll('main > section[id]')
      .forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!menuOpen) return
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  const closeModal = () => setModal(null)
  const openJoin = (department?: string) => {
    setMenuOpen(false)
    setModal({ type: 'join', department })
  }

  return (
    <>
      <a className="skip-link" href="#main">
        跳至主要内容
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="主导航">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={activeSection === item.id ? 'active' : ''}
                href={`#${item.id}`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="button button-primary header-join"
              onClick={() => openJoin()}
            >
              加入我们 <ArrowUpRight size={16} />
            </button>
            <button
              className="mobile-menu-button icon-button"
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="移动导航">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
                <ArrowUpRight size={17} />
              </a>
            ))}
            <button onClick={() => openJoin()}>
              加入我们 <ArrowUpRight size={17} />
            </button>
          </nav>
        )}
      </header>

      <main id="main">
        <section id="home" className="hero">
          <div className="container hero-layout">
            <div className="hero-copy">
              <a href="#join" className="recruit-pill">
                <span className="live-dot" />
                寻找下一位 AI 共创者
                <span className="pill-divider" />
                <span>管理成员招募中</span>
                <ArrowUpRight size={14} />
              </a>
              <p className="hero-eyebrow">HELLO, FUTURE BUILDERS.</p>
              <h1>
                让好奇心，
                <br />
                <span>
                  成为创造力<span className="hero-period">。</span>
                </span>
                <svg
                  className="hero-spark"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M24 3v42M3 24h42M9 9l30 30M9 39L39 9"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </h1>
              <p className="hero-description">
                我们是兰州大学大模型社团。
                <br />
                一群对 AI 充满好奇的人，在这里学习、研究、创造，
                <br className="desktop-break" />
                把一个人的灵感，变成一群人的可能。
              </p>
              <div className="hero-buttons">
                <a className="button button-primary button-large" href="#join">
                  和我们一起探索 <ArrowUpRight size={19} />
                </a>
                <a className="button button-quiet button-large" href="#about">
                  认识一下 <ArrowDown size={17} />
                </a>
              </div>
              <div className="hero-community">
                <div className="community-symbols" aria-hidden="true">
                  <span>
                    <Code2 size={19} />
                  </span>
                  <span>
                    <Sparkles size={18} />
                  </span>
                  <span>
                    <BookOpen size={18} />
                  </span>
                  <span>+</span>
                </div>
                <p>
                  不设起点，只为热爱<span>零基础友好 · 欢迎跨学科</span>
                </p>
              </div>
            </div>
            <NeuralVisual />
          </div>
          <div className="container hero-footer">
            <span>
              开源共享 <i /> 求真创新
            </span>
            <a href="#about">
              向下探索 <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <div className="tech-strip" aria-label="技术探索方向">
          <div className="container">
            <span className="tech-strip-intro">OUR SHARED LANGUAGE</span>
            {['Python', 'PyTorch', 'LLM', 'RAG', 'AGENT', 'MULTIMODAL'].map(
              (tech, index) => (
                <span className="tech-word" key={tech}>
                  {index > 0 && <span className="tech-star">✳</span>}
                  {tech}
                </span>
              ),
            )}
            <span className="tech-strip-end">
              <Code2 size={21} /> & more
            </span>
          </div>
        </div>

        <section id="about" className="section about-section">
          <div className="container">
            <SectionLabel number="01">ABOUT US · 关于我们</SectionLabel>
            <div className="section-heading about-heading">
              <h2>
                在兰大，找到你的
                <br />
                <span className="blue-text">AI 同路人。</span>
              </h2>
              <div>
                <p>
                  由兰大学长学姐自发组建、共同运营的科研学术类社团。
                  <br />
                  我们相信，最好的学习发生在分享中，
                  <br />
                  最有趣的创新，始于一句「要不，我们试试？」
                </p>
                <a className="text-link" href="#team">
                  认识我们的团队 <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="activity-grid">
              {[
                {
                  icon: Code2,
                  name: '从零开始，学大模型',
                  english: 'LEARN',
                  text: '从 Python 到 PyTorch，从模型调用到微调，让每一次上手都有收获。',
                  num: '01',
                },
                {
                  icon: BookOpen,
                  name: '与前沿对话，读论文',
                  english: 'RESEARCH',
                  text: '论文分享、专题讲座、读书会。一起拆解难题，理解方法背后的为什么。',
                  num: '02',
                },
                {
                  icon: Layers3,
                  name: '把灵感落地，做项目',
                  english: 'BUILD',
                  text: '智能问答、多模态应用、效率小工具，让想法从笔记本走向真实世界。',
                  num: '03',
                },
                {
                  icon: Trophy,
                  name: '组队出发，打比赛',
                  english: 'CHALLENGE',
                  text: '探索 AIGC、算法与数据挖掘赛事，在共同备赛中拓展能力的边界。',
                  num: '04',
                },
                {
                  icon: Sparkles,
                  name: '碰撞新想法，搞活动',
                  english: 'CONNECT',
                  text: 'Hackathon、产品展示日、技术沙龙，认识和你一样有趣的伙伴。',
                  num: '05',
                },
                {
                  icon: Rocket,
                  name: '走出课堂，连实践',
                  english: 'EXPLORE',
                  text: '对接校内外实验室与企业，探索合作项目，让技术遇见真实需求。',
                  num: '06',
                },
              ].map((item) => (
                <article className="activity-card" key={item.num}>
                  <div className="activity-top">
                    <item.icon size={23} strokeWidth={1.6} />
                    <span>
                      {item.num} / {item.english}
                    </span>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="about-note">
              <span>
                <span className="blue-asterisk">✳</span>
                你不需要很厉害才开始，但可以从这里开始变厉害。
              </span>
              <span className="mono">START WHERE YOU ARE.</span>
            </div>
          </div>
        </section>

        <section id="team" className="section team-section">
          <div className="container">
            <SectionLabel number="02">PEOPLE & TEAMS · 部门与成员</SectionLabel>
            <div className="section-heading">
              <div>
                <h2>
                  不同的擅长，<span className="blue-text">同一种热爱。</span>
                </h2>
                <p>
                  五个部门，五种打开方式。找到你的位置，一起让社团更有可能。
                </p>
              </div>
              <div
                className="segmented-control"
                role="group"
                aria-label="团队内容"
              >
                {['部门介绍', '成员风采'].map((tab) => (
                  <button
                    key={tab}
                    aria-pressed={teamTab === tab}
                    className={teamTab === tab ? 'selected' : ''}
                    onClick={() => setTeamTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            {teamTab === '部门介绍' ? (
              <div className="department-grid">
                {departments.map((d) => (
                  <button
                    className="department-card"
                    key={d.id}
                    onClick={() =>
                      setModal({ type: 'department', department: d })
                    }
                  >
                    <div className="department-top">
                      <span className="department-icon">
                        <d.icon size={23} strokeWidth={1.7} />
                      </span>
                      <span>{d.number}</span>
                    </div>
                    <div className="department-label">{d.english}</div>
                    <h3>{d.name}</h3>
                    <p>{d.role}</p>
                    <div className="department-tags">
                      {d.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="department-bottom">
                      <span>
                        <i />
                        部长 / 成员招募中
                      </span>
                      <ArrowUpRight size={19} />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="members-panel">
                {members.length ? (
                  <div className="member-grid">
                    {members.map((member) => (
                      <article
                        className="member-card"
                        key={`${member.name}-${member.role}`}
                      >
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={`${member.name}的头像`}
                          />
                        ) : (
                          <span className="member-avatar">
                            {member.name.slice(0, 1)}
                          </span>
                        )}
                        <h3>{member.name}</h3>
                        <p>
                          {member.department} · {member.role}
                        </p>
                        <p>{member.bio}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="members-empty">
                    <div className="member-empty-icons">
                      <span>
                        <Code2 />
                      </span>
                      <span>
                        <BookOpen />
                      </span>
                      <span>
                        <Sparkles />
                      </span>
                    </div>
                    <div>
                      <h3>优秀的团队，也期待你的名字。</h3>
                      <p>
                        成员档案正在整理，将在获得本人授权后陆续公开。
                        <br />
                        现在，欢迎加入我们，共同书写社团的下一章。
                      </p>
                    </div>
                    <button
                      className="button button-primary"
                      onClick={() => openJoin()}
                    >
                      成为其中一员 <ArrowUpRight size={17} />
                    </button>
                  </div>
                )}
              </div>
            )}
            <p className="team-footnote">
              <Users size={15} />{' '}
              面向兰州大学全日制在校生，本科、研究生均可。经验是加分项，热情和责任心更重要。
            </p>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="container">
            <SectionLabel number="03">PROJECT LAB · 成果与探索</SectionLabel>
            <div className="section-heading">
              <div>
                <h2>
                  让想法，<span className="blue-text">有一个作品的形状。</span>
                </h2>
                <p>从解决一个小问题开始，在真实的创造中学习。</p>
              </div>
            </div>
            <div className="project-filter-row">
              <div
                className="filter-tabs"
                role="group"
                aria-label="项目方向筛选"
              >
                {['全部方向', '智能应用', '多模态', '开发工具'].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setProjectFilter(filter)}
                      className={projectFilter === filter ? 'selected' : ''}
                      aria-pressed={projectFilter === filter}
                    >
                      {filter}
                    </button>
                  ),
                )}
              </div>
              <span className="filter-note">
                <span className="tiny-dot" />
                探索方向 · 等你共创
              </span>
            </div>
            <div className="projects-grid">
              {projects
                .filter(
                  (p) =>
                    projectFilter === '全部方向' ||
                    p.category === projectFilter,
                )
                .map((project) => (
                  <article className="project-card" key={project.id}>
                    <button
                      className="project-visual-button"
                      aria-label={`查看项目方向：${project.title}`}
                      onClick={() => setModal({ type: 'project', project })}
                    >
                      <ProjectArt kind={project.kind} />
                      <span className="project-art-label">项目方向</span>
                      <span className="project-open">
                        <ArrowUpRight size={19} />
                      </span>
                    </button>
                    <div className="project-card-copy">
                      <span className="project-category">
                        {project.category}
                      </span>
                      <h3>
                        <button
                          onClick={() => setModal({ type: 'project', project })}
                        >
                          {project.title}
                        </button>
                      </h3>
                      <p>{project.subtitle}</p>
                      <div className="project-card-bottom">
                        <div>
                          {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <button
                          className="icon-button"
                          aria-label={`了解${project.title}`}
                          onClick={() => setModal({ type: 'project', project })}
                        >
                          <ArrowUpRight size={18} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
            {achievements.length > 0 ? (
              <div className="verified-achievements">
                <h3>
                  <Trophy size={21} /> 已发布成果
                </h3>
                {achievements.map((item) => (
                  <article key={item.title}>
                    <span>
                      {item.category} · {item.date}
                    </span>
                    <h4>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer">
                          {item.title} <ExternalLink size={14} />
                        </a>
                      ) : (
                        item.title
                      )}
                    </h4>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="project-note">
                <Terminal size={18} />
                <p>
                  <strong>下一个代表作，期待和你一起完成。</strong>
                  这里展示的是社团的项目探索方向，正式成果与开源作品将在完成后陆续发布。
                </p>
                <span>
                  TO BE CONTINUED <ArrowRight size={15} />
                </span>
              </div>
            )}
          </div>
        </section>

        <section id="events" className="section events-section">
          <div className="container events-layout">
            <div className="events-intro">
              <SectionLabel number="04">WHAT'S NEXT · 活动安排</SectionLabel>
              <h2>
                下一次见面，
                <br />
                一起<span className="blue-text">做点什么。</span>
              </h2>
              <p>
                为知识留一点时间，
                <br />
                也为有趣的人留一个位置。
              </p>
              <div className="calendar-illustration" aria-hidden="true">
                <div className="calendar-mini">
                  <div className="calendar-bind">
                    <i />
                    <i />
                  </div>
                  <div className="calendar-mini-top">LET'S MEET</div>
                  <div className="calendar-dots">
                    {Array.from({ length: 21 }, (_, i) => (
                      <span
                        className={[4, 9, 15].includes(i) ? 'marked' : ''}
                        key={i}
                      >
                        {i === 9 ? <Sparkles size={16} /> : ''}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="calendar-note">
                  Good things
                  <br />
                  happen together.
                  <svg width="49" height="29" viewBox="0 0 49 29">
                    <path
                      d="M2 3c19 28 34 21 42 6m-14 3 15-5-1 15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </span>
              </div>
              <p className="schedule-note">
                <CalendarDays size={15} />{' '}
                {events.every((event) => event.dateLabel === '时间待定')
                  ? '以下活动正在筹备，时间与地点另行通知。'
                  : '具体安排请查看活动详情，最新变动以社团通知为准。'}
              </p>
            </div>
            <div className="events-list-area">
              <div
                className="filter-tabs event-filters"
                role="group"
                aria-label="活动类型筛选"
              >
                {['全部活动', '技术培训', '学术交流', '项目共创'].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setEventFilter(filter)}
                      className={eventFilter === filter ? 'selected' : ''}
                      aria-pressed={eventFilter === filter}
                    >
                      {filter}
                    </button>
                  ),
                )}
              </div>
              <div className="events-list">
                {events
                  .filter(
                    (e) => eventFilter === '全部活动' || e.type === eventFilter,
                  )
                  .map((event) => (
                    <article className="event-card" key={event.id}>
                      <div className="event-date">
                        <span>WHAT'S NEXT</span>
                        <event.icon size={27} strokeWidth={1.5} />
                        <strong>{event.dateLabel}</strong>
                      </div>
                      <div className="event-info">
                        <div className="event-labels">
                          <span>{event.type}</span>
                          <span className="event-status">{event.status}</span>
                        </div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div className="event-meta">
                          <span>
                            <CalendarDays size={13} />
                            {event.format}
                          </span>
                          <span>
                            <Users size={13} />
                            {event.audience}
                          </span>
                        </div>
                      </div>
                      <button
                        className="event-arrow icon-button"
                        aria-label={`了解活动：${event.title}`}
                        onClick={() => setModal({ type: 'event', event })}
                      >
                        <ArrowUpRight size={22} />
                      </button>
                    </article>
                  ))}
              </div>
              <div className="events-bottom">
                <span>有想分享的话题，或想发起的活动？</span>
                <button className="text-link" onClick={() => openJoin()}>
                  带上你的想法来 <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="join" className="join-section">
          <div className="container">
            <div className="join-banner">
              <div className="join-decoration" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <Sparkles />
              </div>
              <div className="join-banner-main">
                <SectionLabel number="05" light>
                  JOIN THE CLUB · 正在招募
                </SectionLabel>
                <h2>
                  这个故事，
                  <br />
                  还差一个<span>你。</span>
                </h2>
                <p>
                  不论是第一行代码，还是下一个研究方向，
                  <br />
                  在这里，你的热爱都值得被认真对待。
                </p>
                <button
                  className="button button-white button-large"
                  onClick={() => openJoin()}
                >
                  我想加入 <ArrowUpRight size={19} />
                </button>
                <span className="join-small-note">
                  五大部门开放招募 · 一起参与，一起成长
                </span>
              </div>
              <div className="join-perks">
                <div>
                  <span className="perk-icon">
                    <Rocket size={21} />
                  </span>
                  <p>
                    把想法变成行动
                    <span>参与社团决策与资源协调，亲手推动一件事发生。</span>
                  </p>
                </div>
                <div>
                  <span className="perk-icon">
                    <GraduationCap size={22} />
                  </span>
                  <p>
                    在实践中长出新能力
                    <span>技能培训、项目协作，让成长有迹可循。</span>
                  </p>
                </div>
                <div>
                  <span className="perk-icon">
                    <Users size={22} />
                  </span>
                  <p>
                    遇见一起认真做事的人
                    <span>和志趣相投的伙伴，分享灵感，也互相支持。</span>
                  </p>
                </div>
                <div className="join-requirements">
                  <span>
                    <Check size={13} />对 AI 有热情
                  </span>
                  <span>
                    <Check size={13} />
                    负责、有担当
                  </span>
                  <span>
                    <Check size={13} />
                    乐于分享与传承
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container faq-layout">
            <div>
              <span className="eyebrow">A FEW THINGS TO KNOW</span>
              <h2>你可能还想知道</h2>
              <p>开始之前，先解答几个小问题。</p>
            </div>
            <div className="faq-list">
              {[
                [
                  '没有编程基础，也能加入吗？',
                  '当然可以。社团欢迎对大模型与人工智能感兴趣的兰大全日制在校生。我们会从 Python 基础、模型调用等内容开始，也有运营、宣传、组织协调等不同的参与方向。',
                ],
                [
                  '只有计算机相关专业的同学才能报名吗？',
                  '不是。无论本科生还是研究生，任何专业的兰州大学全日制在校生都可以报名。我们期待不同学科的视角，让技术与更多真实问题相遇。',
                ],
                [
                  '想竞选部长，需要什么条件？',
                  '我们期待你对 AI 有热情，愿意投入时间，做事负责、有担当，也乐于帮助新人。社团管理、科研项目或科技竞赛经验是加分项，但并非必须。',
                ],
                [
                  '如何报名，面试在什么时候？',
                  `请通过社团正式公布的招新群联系负责人。${hasRecruitmentChannel ? '点击加入我们，可查看正式报名渠道并准备报名草稿。' : '招新群联系方式即将公布，可先使用报名入口准备草稿。'}面试时间：${club.recruitment.interviewTime}，由现任会长团与指导老师共同考察。`,
                ],
              ].map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <Plus size={18} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Logo />
              <p>
                开源共享，求真创新。
                <br />
                Open minds. Open source. Endless possibilities.
              </p>
            </div>
            <div className="footer-links">
              <span>继续探索</span>
              {navItems.slice(0, 3).map((item) => (
                <a href={`#${item.id}`} key={item.id}>
                  {item.name}
                </a>
              ))}
            </div>
            <div className="footer-links">
              <span>与我们连接</span>
              <a href="#events">活动安排</a>
              <button onClick={() => openJoin()}>
                加入社团 <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="footer-message">
              <span>
                LET'S BUILD
                <br />
                <strong>SOMETHING GREAT.</strong>
              </span>
              <ArrowUpRight size={40} strokeWidth={1.2} />
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} 兰州大学大模型社团</span>
            <span>
              MADE WITH CURIOSITY <span className="footer-star">✳</span> BUILT
              TOGETHER
            </span>
            <a href="#home">
              回到顶部 <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </footer>

      {modal && (
        <Modal key={modal.type} onClose={closeModal} titleId="modal-title">
          {modal.type === 'join' ? (
            <JoinContent department={modal.department} />
          ) : modal.type === 'department' ? (
            <>
              <span className="dialog-eyebrow">
                {modal.department.english} / {modal.department.number}
              </span>
              <div className="dialog-title-icon">
                <modal.department.icon size={30} />
              </div>
              <h2 id="modal-title">{modal.department.name}</h2>
              <p className="dialog-intro">{modal.department.description}</p>
              <h3 className="dialog-subheading">在这里，你会参与</h3>
              <ul className="detail-list">
                {modal.department.responsibilities.map((r) => (
                  <li key={r}>
                    <Check size={17} />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="detail-callout">{modal.department.fit}</div>
              <p className="detail-recruiting">
                <span className="live-dot" /> 部长与成员招募中
              </p>
              <button
                className="button button-primary form-submit"
                onClick={() => openJoin(modal.department.name)}
              >
                我对这个部门感兴趣 <ArrowUpRight size={18} />
              </button>
            </>
          ) : modal.type === 'event' ? (
            <>
              <span className="dialog-eyebrow">
                UPCOMING EVENT · {modal.event.type}
              </span>
              <div className="dialog-title-icon">
                <modal.event.icon size={30} />
              </div>
              <h2 id="modal-title">{modal.event.title}</h2>
              <p className="dialog-intro">{modal.event.description}</p>
              <div className="detail-callout">
                <strong>
                  {modal.event.status} · {modal.event.dateLabel}
                </strong>
                <p>
                  {modal.event.location} · {modal.event.format} ·{' '}
                  {modal.event.audience}
                </p>
              </div>
              <h3 className="dialog-subheading">计划一起探索</h3>
              <ul className="detail-list">
                {modal.event.agenda.map((item) => (
                  <li key={item}>
                    <Check size={17} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="form-note">
                活动内容以正式通知为准，欢迎通过社团招新渠道表达参与意向。
              </p>
              <button
                className="button button-primary form-submit"
                onClick={() => openJoin()}
              >
                查看参与方式 <ArrowUpRight size={18} />
              </button>
            </>
          ) : (
            <>
              <span className="dialog-eyebrow">
                PROJECT DIRECTION · 项目方向
              </span>
              <h2 id="modal-title">{modal.project.title}</h2>
              <p className="dialog-intro">{modal.project.description}</p>
              <ProjectArt kind={modal.project.kind} />
              <h3 className="dialog-subheading">可以从这些小目标开始</h3>
              <ul className="detail-list">
                {modal.project.steps.map((step) => (
                  <li key={step}>
                    <Check size={17} />
                    {step}
                  </li>
                ))}
              </ul>
              <div className="detail-callout">
                <strong>预期产出</strong>
                <p>{modal.project.output}</p>
              </div>
              <p className="form-note">
                这是探索方向介绍，不代表已经完成的项目或获奖成果。
              </p>
              <button
                className="button button-primary form-submit"
                onClick={() => openJoin('技术部')}
              >
                想和大家一起做 <ArrowUpRight size={18} />
              </button>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default App
