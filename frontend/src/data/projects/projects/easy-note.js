export default {
  title: 'EasyNote — Minimalist Notes for macOS',
  title_ja: 'EasyNote — macOS向けミニマルノート',
  title_zh: 'EasyNote — macOS 极简笔记软件',

  role: 'Independent macOS App',
  role_ja: '個人開発 macOS アプリ',
  role_zh: '独立开发 macOS 应用',

  location: 'macOS / Direct Distribution',
  location_ja: 'macOS / 直接配布',
  location_zh: 'macOS / 独立发行',

  period: 'May 2025 – Oct 2025',
  slug: 'easy-note',

  heroImage: '/images/projects/easy-note.webp',
  heroImageMode: 'wide',
  heroImageAlt: 'EasyNote macOS note editor interface',
  heroImageAlt_ja: 'EasyNoteのmacOSノート編集画面',
  heroImageAlt_zh: 'EasyNote macOS 笔记编辑界面',

  summary: 'A privacy-focused, minimalist note-taking app for macOS, designed for fast local writing without distracting collaboration or cloud features.',
  summary_ja: 'クラウドや共同編集の複雑さを避け、ローカルで素早く書くことに集中した、プライバシー重視のmacOS向けノートアプリです。',
  summary_zh: '一款注重隐私与专注体验的 macOS 极简笔记应用，以本地存储和快速写作为核心。',

  achievements: [
    'Designed a focused three-pane writing interface for notes and tags',
    'Kept notes stored locally on the user’s Mac for privacy and ownership',
    'Added instant search and keyboard-oriented navigation',
    'Created a simple one-time-purchase product and landing-page experience'
  ],
  achievements_ja: [
    'ノートとタグを整理できる、集中型の3ペイン画面を設計',
    'プライバシーと所有権を重視し、ノートをMac上にローカル保存',
    '即時検索とキーボード中心の操作を実装',
    '買い切り型プロダクトとランディングページ体験を構築'
  ],
  achievements_zh: [
    '设计用于笔记与标签管理的专注型三栏界面',
    '笔记保存在用户 Mac 本地，强调隐私与数据所有权',
    '实现即时搜索与键盘优先的操作方式',
    '构建一次性购买模式及配套产品落地页'
  ],

  tags: ['productivity', 'privacy', 'macos', 'product-design'],

  metadata: {
    type: 'Desktop App',
    type_ja: 'デスクトップアプリ',
    type_zh: '桌面应用',
    field: 'Notes & Productivity',
    field_ja: 'ノート・生産性',
    field_zh: '笔记与效率工具',
    platform: 'macOS',
    platform_ja: 'macOS',
    platform_zh: 'macOS',
    status: 'Completed Development',
    status_ja: '開発完了',
    status_zh: '开发完成'
  },

  resourcesTitle: 'Product Links',
  resourcesTitle_ja: 'プロダクトリンク',
  resourcesTitle_zh: '产品链接',
  resources: [
    {
      label: 'Visit EasyNote',
      label_ja: 'EasyNoteを見る',
      label_zh: '访问 EasyNote 官网',
      description: 'Explore the product, features, pricing, and frequently asked questions.',
      description_ja: '機能、価格、よくある質問などの製品情報をご覧いただけます。',
      description_zh: '查看产品功能、价格与常见问题。',
      href: 'https://www.sarada.fun/',
      external: true
    }
  ],

  getContent: () => import('../content/easy-note.md')
};
