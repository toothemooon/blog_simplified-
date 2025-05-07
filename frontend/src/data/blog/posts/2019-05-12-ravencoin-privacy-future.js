export default {
  slug: 'ravencoin-privacy-future',
  date: '2019-05-12',
  
  // English content
  title_en: 'Privacy and Future Developments in Ravencoin',
  summary_en: 'An exploration of upcoming privacy features in Ravencoin and a look at the planned development roadmap for this innovative cryptocurrency.',
  
  // Japanese content
  title_ja: 'レイブンコインのプライバシーと将来の開発',
  summary_ja: 'レイブンコインの今後のプライバシー機能と、この革新的な暗号通貨の計画された開発ロードマップについての探求。',
  
  // Chinese content
  title_zh: '渡鸦币的隐私和未来发展',
  summary_zh: '探索渡鸦币即将推出的隐私功能，并展望这种创新加密货币的计划发展路线图。',
  
  // Common properties
  tags: ['ravencoin', 'blockchain', 'privacy', 'cryptocurrency', 'blockchain'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content (English)
  getContent: () => import('../content/ravencoin-privacy-future.md'),
  
  // Localized content
  getLocalizedContent: (lang) => {
    // Load language-specific content if available
    switch(lang) {
      case 'ja':
        return import('../content/ja/ravencoin-privacy-future.md')
          .catch(() => import('../content/ravencoin-privacy-future.md')); // Fallback to English
      case 'zh':
        return import('../content/zh/ravencoin-privacy-future.md')
          .catch(() => import('../content/ravencoin-privacy-future.md')); // Fallback to English
      default:
        return import('../content/ravencoin-privacy-future.md');
    }
  }
} 