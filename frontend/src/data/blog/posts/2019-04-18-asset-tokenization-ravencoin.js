export default {
  slug: 'asset-tokenization-ravencoin',
  date: '2019-04-18',
  
  // English content
  title_en: 'Asset Tokenization on Ravencoin',
  summary_en: 'Explanation of Ravencoin\'s asset capabilities, how to create and manage digital assets on the Ravencoin blockchain, and practical use cases for tokenization.',
  
  // Japanese content
  title_ja: 'レイブンコインでの資産トークン化',
  summary_ja: 'レイブンコインの資産機能の説明、レイブンコインブロックチェーン上でのデジタル資産の作成と管理方法、およびトークン化の実用的なユースケース。',
  
  // Chinese content
  title_zh: '渡鸦币上的资产代币化',
  summary_zh: '渡鸦币资产功能的解释，如何在渡鸦币区块链上创建和管理数字资产，以及代币化的实际应用案例。',
  
  // Common properties
  tags: ['ravencoin', 'blockchain', 'tokenization', 'assets', 'digital-assets'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content (English)
  getContent: () => import('../content/asset-tokenization-ravencoin.md'),
  
  // Localized content
  getLocalizedContent: (lang) => {
    // Load language-specific content if available
    switch(lang) {
      case 'ja':
        return import('../content/ja/asset-tokenization-ravencoin.md')
          .catch(() => import('../content/asset-tokenization-ravencoin.md')); // Fallback to English
      case 'zh':
        return import('../content/zh/asset-tokenization-ravencoin.md')
          .catch(() => import('../content/asset-tokenization-ravencoin.md')); // Fallback to English
      default:
        return import('../content/asset-tokenization-ravencoin.md');
    }
  }
} 