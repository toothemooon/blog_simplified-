export default {
  slug: 'public-vs-private-blockchains',
  date: '2019-05-04',
  
  // English content
  title_en: 'Public vs Private Blockchains: Understanding the Differences',
  summary_en: 'An in-depth comparison of public and private blockchain technologies, their use cases, advantages, and how Ravencoin fits into the broader blockchain ecosystem.',
  
  // Japanese content
  title_ja: 'パブリックブロックチェーンとプライベートブロックチェーン：違いを理解する',
  summary_ja: 'パブリックおよびプライベートブロックチェーン技術の詳細な比較、そのユースケース、利点、およびレイブンコインが広範なブロックチェーンエコシステムにどのように適合するかについて。',
  
  // Chinese content
  title_zh: '公共区块链与私有区块链：理解差异',
  summary_zh: '深入比较公共和私有区块链技术、它们的用例、优势，以及渡鸦币如何融入更广泛的区块链生态系统。',
  
  // Common properties
  tags: ['ravencoin', 'blockchain', 'public-blockchain', 'private-blockchain', 'distributed-ledger'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content (English)
  getContent: () => import('../content/public-vs-private-blockchains.md'),
  
  // Localized content
  getLocalizedContent: (lang) => {
    // Load language-specific content if available
    switch(lang) {
      case 'ja':
        return import('../content/ja/public-vs-private-blockchains.md')
          .catch(() => import('../content/public-vs-private-blockchains.md')); // Fallback to English
      case 'zh':
        return import('../content/zh/public-vs-private-blockchains.md')
          .catch(() => import('../content/public-vs-private-blockchains.md')); // Fallback to English
      default:
        return import('../content/public-vs-private-blockchains.md');
    }
  }
} 