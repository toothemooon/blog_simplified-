export default {
  title: 'PixelForge — Cyberpunk Avatar Waitlist',
  title_ja: 'PixelForge — サイバーパンク・アバター待機ページ',
  title_zh: 'PixelForge — 像素赛博风等待页',

  role: 'Product Website & Waitlist Experience',
  role_ja: 'プロダクトサイト・ウェイトリスト体験',
  role_zh: '产品网站与 Waitlist 体验',

  location: 'Web / Web3',
  location_ja: 'Web / Web3',
  location_zh: 'Web / Web3',

  period: 'Nov 2025 – Present',
  slug: 'pixel-forge',

  heroImage: '/images/projects/pixel-forge.png',
  heroImageMode: 'wide',
  heroImageAlt: 'PixelForge cyberpunk pixel avatar collection',
  heroImageAlt_ja: 'PixelForgeのサイバーパンク・ピクセルアバターコレクション',
  heroImageAlt_zh: 'PixelForge 赛博朋克像素头像合集',

  summary: 'A neon pixel-art waitlist experience for a Web3 avatar generator, combining a distinctive cyberpunk identity with a focused early-adopter funnel.',
  summary_ja: '独自のサイバーパンク表現と初期ユーザー向け導線を組み合わせた、Web3アバター生成サービスのネオン調ウェイトリストページです。',
  summary_zh: '一个面向 Web3 像素头像生成器的霓虹赛博风等待页，将鲜明视觉身份与早期用户转化流程结合。',

  achievements: [
    'Created a distinctive neon pixel-art visual identity for the product',
    'Designed a focused waitlist flow for early community members',
    'Presented unique avatar generation, ownership, and PNG/SVG export concepts',
    'Structured early-adopter rewards and community participation messaging'
  ],
  achievements_ja: [
    'ネオン調ピクセルアートによる独自のビジュアルアイデンティティを構築',
    '初期コミュニティ向けに明確なウェイトリスト導線を設計',
    'ユニークなアバター生成、所有権、PNG/SVG出力の構想を提示',
    '初期参加特典とコミュニティ参加メッセージを整理'
  ],
  achievements_zh: [
    '构建具有辨识度的霓虹像素艺术视觉体系',
    '为早期社区用户设计聚焦的 Waitlist 转化流程',
    '展示唯一头像生成、资产所有权及 PNG/SVG 导出概念',
    '系统呈现早期用户奖励与社区参与信息'
  ],

  tags: ['web3', 'pixel-art', 'landing-page', 'product-design'],

  metadata: {
    type: 'Waitlist Website',
    type_ja: 'ウェイトリストサイト',
    type_zh: 'Waitlist 网站',
    field: 'Digital Identity',
    field_ja: 'デジタルアイデンティティ',
    field_zh: '数字身份',
    platform: 'Web',
    platform_ja: 'Web',
    platform_zh: 'Web',
    status: 'Waitlist Live',
    status_ja: 'ウェイトリスト公開中',
    status_zh: '等待页已上线'
  },

  resourcesTitle: 'Project Links',
  resourcesTitle_ja: 'プロジェクトリンク',
  resourcesTitle_zh: '项目链接',
  resources: [
    {
      label: 'Visit PixelForge',
      label_ja: 'PixelForgeを見る',
      label_zh: '访问 PixelForge',
      description: 'View the live cyberpunk waitlist and pixel-avatar concept.',
      description_ja: '公開中のウェイトリストとピクセルアバターのコンセプトをご覧ください。',
      description_zh: '查看已上线的赛博风等待页与像素头像概念。',
      href: 'https://pixelforge.yachts/',
      external: true
    }
  ],

  getContent: () => import('../content/pixel-forge.md')
};
