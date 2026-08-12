export default {
  title: 'ECHO — Daily Quote Experience',
  title_ja: 'ECHO — デイリー名言体験',
  title_zh: 'ECHO — 每日名言体验',

  role: 'Independent iOS App',
  role_ja: '個人開発 iOS アプリ',
  role_zh: '独立开发 iOS 应用',

  location: 'iOS / TestFlight',
  location_ja: 'iOS / TestFlight',
  location_zh: 'iOS / TestFlight',

  period: 'Jul 2026 – Present',
  slug: 'echo',

  heroImage: '/images/projects/echo-icon-dark.png',
  heroImageAlt: 'ECHO app icon',
  heroImageAlt_ja: 'ECHO アプリアイコン',
  heroImageAlt_zh: 'ECHO 应用图标',

  summary: 'A calm, offline-first quote experience with author biographies, accessibility support, three visual themes, refined typography, bookmarks, and shareable quote cards.',
  summary_ja: '著者プロフィール、アクセシビリティサポート、3つのテーマ、磨き上げられたタイポグラフィ、ブックマーク、共有カードを備えた、オフライン中心の名言アプリです。',
  summary_zh: '一款以离线体验为核心的静心名言应用，新增人物传记页与闪光点、无障碍支持、三种主题、精校文字、收藏与名言卡片分享。',

  achievements: [
    'Designed an offline-first daily quote reading experience',
    'Built Light, Dark, and textured Archive visual themes',
    'Added quote typography, transition preferences, bookmarks, and sharing',
    'Developed a structured content-quality and attribution workflow',
    'Created author biography pages with biographical summaries and ECHOS highlights',
    'Implemented accessibility support for improved readability',
    'Refined quote text through multiple rounds of proofreading across three languages'
  ],
  achievements_ja: [
    'オフライン中心のデイリー名言体験を設計',
    'Light、Dark、Archiveの3つのビジュアルテーマを構築',
    '文字設定、切り替えアニメーション、ブックマーク、共有機能を追加',
    'コンテンツ品質と出典確認のワークフローを設計',
    '著者プロフィールページを作成し、略歴とECHOSのハイライトを追加',
    'アクセシビリティサポートを実装し、読みやすさを向上',
    '3言語の名言テキストを多角的に磨き上げ'
  ],
  achievements_zh: [
    '设计以离线使用为核心的每日名言阅读体验',
    '完成 Light、Dark 与牛皮纸 Archive 三种视觉主题',
    '实现字体、翻页动画、收藏和分享功能',
    '建立名言质量、作者身份与来源核对流程',
    '新增人物传记页，包含生平简介与 ECHOS 闪光点',
    '实现无障碍支持，提升阅读易用性',
    '对三语名言文字进行多轮精校'
  ],

  tags: ['ios', 'react-native', 'mobile', 'product-design'],

  metadata: {
    type: 'Mobile App',
    type_ja: 'モバイルアプリ',
    type_zh: '移动应用',
    field: 'Reading & Wellbeing',
    field_ja: '読書・ウェルビーイング',
    field_zh: '阅读与身心体验',
    platform: 'iOS',
    platform_ja: 'iOS',
    platform_zh: 'iOS',
    status: 'MVP / TestFlight',
    status_ja: 'MVP / TestFlight',
    status_zh: 'MVP / TestFlight'
  },

  resources: [
    {
      label: 'Privacy Policy',
      label_ja: 'プライバシーポリシー',
      label_zh: '隐私政策',
      description: 'How ECHO handles local preferences, bookmarks, sharing, and support messages.',
      description_ja: 'ECHOにおける設定、ブックマーク、共有、サポート連絡の取り扱いについて。',
      description_zh: '说明 ECHO 如何处理本地偏好、收藏、分享与支持邮件。',
      href: '/projects/echo/privacy'
    },
    {
      label: 'Terms of Service',
      label_ja: '利用規約',
      label_zh: '服务条款',
      description: 'The rules and conditions for using the current free ECHO test version.',
      description_ja: '現在の無料テスト版ECHOを利用するための条件です。',
      description_zh: '当前 ECHO 免费测试版的使用条件。',
      href: '/projects/echo/terms'
    }
  ],

  resourcesTitle: 'Legal & Support',
  resourcesTitle_ja: '法的情報・サポート',
  resourcesTitle_zh: '法律信息与支持',

  getContent: () => import('../content/echo.md')
};
