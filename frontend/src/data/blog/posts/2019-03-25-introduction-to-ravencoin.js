export default {
  slug: 'introduction-to-ravencoin',
  date: '2019-03-25',
  
  // English content
  title_en: 'Introduction to Ravencoin',
  summary_en: 'An overview of Ravencoin, a Bitcoin fork designed for asset transfers, and its unique features that set it apart from other cryptocurrencies.',
  
  // Japanese content
  title_ja: 'レイブンコインの紹介',
  summary_ja: '資産転送のために設計されたビットコインフォークであるレイブンコインと、他の暗号通貨との差別化する独自機能の概要。',
  
  // Chinese content
  title_zh: '渡鸦币简介',
  summary_zh: '渡鸦币概述，这是一种为资产转移而设计的比特币分叉币，以及使其区别于其他加密货币的独特功能。',
  
  // Common properties
  tags: ['ravencoin', 'blockchain', 'cryptocurrency', 'bitcoin-fork', 'asset-transfer'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content (English)
  getContent: () => import('../content/introduction-to-ravencoin.md'),
  
  // Localized content
  getLocalizedContent: (lang) => {
    // Load language-specific content if available
    switch(lang) {
      case 'ja':
        return import('../content/ja/introduction-to-ravencoin.md')
          .catch(() => import('../content/introduction-to-ravencoin.md')); // Fallback to English
      case 'zh':
        return import('../content/zh/introduction-to-ravencoin.md')
          .catch(() => import('../content/introduction-to-ravencoin.md')); // Fallback to English
      default:
        return import('../content/introduction-to-ravencoin.md');
    }
  }
} 