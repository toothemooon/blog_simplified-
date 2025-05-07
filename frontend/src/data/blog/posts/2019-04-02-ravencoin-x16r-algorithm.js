export default {
  slug: 'ravencoin-x16r-algorithm',
  date: '2019-04-02',
  
  // English content
  title_en: 'Understanding Ravencoin\'s X16R Algorithm',
  summary_en: 'A technical deep-dive into Ravencoin\'s innovative X16R proof-of-work algorithm and how it helps maintain mining decentralization by resisting ASIC dominance.',
  
  // Japanese content
  title_ja: 'レイブンコインのX16Rアルゴリズムを理解する',
  summary_ja: 'レイブンコインの革新的なX16R作業証明アルゴリズムについての技術的な深堀りと、ASICの支配に抵抗することで採掘の分散化を維持する方法について。',
  
  // Chinese content
  title_zh: '理解渡鸦币的X16R算法',
  summary_zh: '对渡鸦币创新的X16R工作量证明算法的技术深入分析，以及它如何通过抵抗ASIC主导来维持挖矿去中心化。',
  
  // Common properties
  tags: ['ravencoin', 'blockchain', 'mining', 'algorithm', 'proof-of-work'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content (English)
  getContent: () => import('../content/ravencoin-x16r-algorithm.md'),
  
  // Localized content
  getLocalizedContent: (lang) => {
    // Load language-specific content if available
    switch(lang) {
      case 'ja':
        return import('../content/ja/ravencoin-x16r-algorithm.md')
          .catch(() => import('../content/ravencoin-x16r-algorithm.md')); // Fallback to English
      case 'zh':
        return import('../content/zh/ravencoin-x16r-algorithm.md')
          .catch(() => import('../content/ravencoin-x16r-algorithm.md')); // Fallback to English
      default:
        return import('../content/ravencoin-x16r-algorithm.md');
    }
  }
} 