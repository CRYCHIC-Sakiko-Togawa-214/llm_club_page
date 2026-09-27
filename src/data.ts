import { BookOpen, Code2, Megaphone, Rocket, ShieldCheck } from 'lucide-react'

// Update this file with approved club information before publishing.
export const club = {
  name: '兰州大学大模型社团',
  englishName: 'LZU LLM CLUB',
  motto: '开源共享，求真创新',
  recruitment: {
    groupNumber: '',
    groupLink: '',
    qrImage: '',
    interviewTime: '以最新招新通知为准',
  },
}

export const departments = [
  {
    id: 'tech',
    number: '01',
    name: '技术部',
    english: 'TECHNOLOGY',
    role: '让技术，真正跑起来。',
    icon: Code2,
    tags: ['模型实战', '代码管理', '平台维护'],
    description: '把知识转化为可复用的代码与工具，为社团提供可靠的技术支持。',
    responsibilities: [
      '组织 Python、PyTorch、模型调用与微调实战培训',
      '管理代码仓库，推动代码评审与开源协作',
      '维护技术平台，整理实践文档与开发工具',
    ],
    fit: '适合喜欢动手、乐于解决问题，也愿意耐心帮助伙伴的你。技术基础可以在实践中积累。',
  },
  {
    id: 'academic',
    number: '02',
    name: '学术部',
    english: 'RESEARCH',
    role: '向问题深处，再走一步。',
    icon: BookOpen,
    tags: ['论文精读', '学习路线', '竞赛备赛'],
    description: '连接前沿研究与日常学习，让每一次讨论都有新的启发。',
    responsibilities: [
      '组织论文分享、技术讲座和主题读书会',
      '为不同基础的成员设计循序渐进的学习路线',
      '交流竞赛信息，组织备赛与研究方法分享',
    ],
    fit: '适合对原理保持好奇、喜欢阅读与表达、愿意和大家一起打磨问题的你。',
  },
  {
    id: 'projects',
    number: '03',
    name: '项目运营部',
    english: 'OPERATIONS',
    role: '把一个想法，变成一次发生。',
    icon: Rocket,
    tags: ['活动策划', '项目推进', '校企合作'],
    description: '连接人、想法与机会，让社团的每一次共创有序发生。',
    responsibilities: [
      '策划 Hackathon、产品展示日与技术沙龙',
      '协调团队分工、项目进度和活动执行',
      '探索校内外实验室及企业的合作与实践机会',
    ],
    fit: '适合善于沟通、愿意主动推进事情，能把创意落到具体行动中的你。',
  },
  {
    id: 'media',
    number: '04',
    name: '宣传部',
    english: 'CREATIVE',
    role: '让值得记录的，被更多人看见。',
    icon: Megaphone,
    tags: ['新媒体', '视觉设计', '内容创作'],
    description: '用文字、影像与设计，记录社团的成长和每一个闪光瞬间。',
    responsibilities: [
      '运营社团新媒体，策划推文与专题内容',
      '设计活动海报和宣传素材，维护视觉风格',
      '记录活动与项目故事，让更多同学认识社团',
    ],
    fit: '适合热爱表达、有审美好奇心，喜欢文字、设计、摄影或视频创作的你。',
  },
  {
    id: 'secretariat',
    number: '05',
    name: '秘书处与纪检部',
    english: 'SECRETARIAT',
    role: '让每一份热爱，都有稳妥的支持。',
    icon: ShieldCheck,
    tags: ['组织协调', '会议记录', '财务监督'],
    description: '做好日常组织与监督工作，为社团长期稳定运转提供支持。',
    responsibilities: [
      '负责日常行政、会议记录和资料归档',
      '做好考勤管理、成员沟通与组织协调',
      '落实财务监督，协助规范社团工作流程',
    ],
    fit: '适合认真细致、负责可靠、愿意为团队建立秩序与信任的你。',
  },
]

export const projects = [
  {
    id: 'qa',
    title: '让知识，随问随答',
    subtitle: '基于大模型的智能问答助手',
    category: '智能应用',
    kind: 'chat',
    tags: ['RAG', 'LLM', '知识库'],
    description:
      '探索如何把文档变成可对话的知识，让信息检索更自然，也更有依据。',
    steps: [
      '学习模型 API 调用与提示词设计',
      '构建文档检索流程，尝试基于检索的回答',
      '评估回答质量、引用准确性与使用体验',
    ],
    output: '可演示的问答原型、技术文档与实践复盘。',
  },
  {
    id: 'multimodal',
    title: '不止于文字的理解',
    subtitle: '图像 × 语言的多模态探索',
    category: '多模态',
    kind: 'vision',
    tags: ['Vision', '多模态', 'AIGC'],
    description:
      '让图像与语言在同一个应用中相遇，探索图像理解、内容生成与交互的可能。',
    steps: [
      '了解多模态模型的输入输出方式',
      '设计图像描述、视觉问答等小型实验',
      '对比不同提示词与应用场景下的效果',
    ],
    output: '多模态交互 Demo、实验记录与展示材料。',
  },
  {
    id: 'tools',
    title: '给日常，加一点 AI',
    subtitle: '面向真实需求的效率小工具',
    category: '开发工具',
    kind: 'tools',
    tags: ['Agent', 'Python', '开源'],
    description:
      '从一个真实的小需求出发，用 AI 和代码做出能够被使用、被改进的工具。',
    steps: [
      '寻找学习或协作中的具体需求',
      '实现最小可用原型，并邀请伙伴试用',
      '完善使用说明，以开源方式分享成果',
    ],
    output: '实用工具原型、使用指南与公开代码。',
  },
] as const

// These are proposed activities, not confirmed dated events.
export const events = [
  {
    id: 'intro',
    type: '技术培训',
    title: 'Hello, LLM! 从第一行代码开始',
    description: 'Python 基础、模型调用与动手实践，给好奇心一个起点。',
    format: '实战工作坊',
    audience: '零基础友好',
    dateLabel: '时间待定',
    location: '地点待定',
    status: '筹备中',
    agenda: [
      '从环境准备与 Python 基础开始',
      '尝试调用模型，完成一次简单对话',
      '交流动手过程中遇到的问题与学习资源',
    ],
    icon: Code2,
  },
  {
    id: 'papers',
    type: '学术交流',
    title: 'Paper & Coffee · 一起读懂一篇论文',
    description: '带着问题来，把复杂的方法讲清楚，把新的灵感带回去。',
    format: '论文分享会',
    audience: '全体成员',
    dateLabel: '时间待定',
    location: '地点待定',
    status: '筹备中',
    agenda: [
      '围绕一个主题选择论文，分享阅读背景',
      '一起拆解研究问题、方法与实验',
      '交流疑问，整理可以继续探索的方向',
    ],
    icon: BookOpen,
  },
  {
    id: 'hack',
    type: '项目共创',
    title: 'Build Together · 把想法做成 Demo',
    description: '找到队友，选择问题，在一次共创中完成你的第一个原型。',
    format: '共创 / 展示',
    audience: '欢迎跨学科',
    dateLabel: '时间待定',
    location: '地点待定',
    status: '筹备中',
    agenda: [
      '分享想法，寻找感兴趣的队友',
      '明确一个小目标，协作搭建原型',
      '展示 Demo，交流实践经验与后续计划',
    ],
    icon: Rocket,
  },
]

// Publish members only with their consent. Empty data renders a recruiting state.
export type Member = {
  name: string
  role: string
  department: string
  bio: string
  avatar?: string
}
export const members: Member[] = []

// Add verified achievements here; proposed projects above are never presented as awards.
export type Achievement = {
  title: string
  description: string
  date: string
  category: string
  url?: string
}
export const achievements: Achievement[] = []
