export default {
  slug: 'finding-your-groove-balancing-ai-and-good-old-fashioned-coding',
  date: '2024-05-06',
  
  // English content
  title_en: 'Finding Your Groove: Balancing AI and Good Old-Fashioned Coding',
  summary_en: 'Discovering the sweet spot between leveraging AI tools and maintaining your core coding skills in today\'s rapidly evolving development landscape.',
  
  // Japanese content
  title_ja: 'あなたのリズムを見つける：AIと従来のコーディングのバランス',
  summary_ja: '今日の急速に進化する開発環境で、AIツールを活用しながらコアコーディングスキルを維持するための最適なバランスを探る。',
  
  // Chinese content
  title_zh: '找到你的节奏：平衡AI与传统编程',
  summary_zh: '在当今快速发展的开发环境中，探索如何在利用AI工具的同时保持核心编程技能的最佳平衡。',
  
  // Common properties
  tags: ['programming', 'ai', 'productivity', 'developer-tips'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Content will be loaded dynamically - would need multilingual markdown files
  getContent: () => import('../content/finding-your-groove-balancing-ai-and-good-old-fashioned-coding.md')
} 