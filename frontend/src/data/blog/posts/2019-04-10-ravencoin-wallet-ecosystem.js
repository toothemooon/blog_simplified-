export default {
  slug: 'ravencoin-wallet-ecosystem',
  date: '2019-04-10',
  
  // English content
  title_en: 'The Ravencoin Wallet Ecosystem: How to Store and Use RVN',
  summary_en: 'An overview of the various wallet options available for Ravencoin users, from desktop and mobile applications to paper wallets and SMS-based transactions.',
  
  // Japanese content
  title_ja: 'レイブンコインウォレットエコシステム：RVNの保存と使用方法',
  summary_ja: 'レイブンコインユーザー向けのデスクトップやモバイルアプリケーション、ペーパーウォレット、SMSベースの取引まで、様々なウォレットオプションの概要。',
  
  // Chinese content
  title_zh: '渡鸦币钱包生态系统：如何存储和使用RVN',
  summary_zh: '为渡鸦币用户提供的各种钱包选择概述，从桌面和移动应用程序到纸钱包和基于短信的交易。',
  
  // Common properties
  tags: ['ravencoin', 'cryptocurrency', 'wallets', 'blockchain', 'cointext'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content (English)
  getContent: () => import('../content/ravencoin-wallet-ecosystem.md'),
  
  // Localized content
  getLocalizedContent: (lang) => {
    // Load language-specific content if available
    switch(lang) {
      case 'ja':
        return import('../content/ja/ravencoin-wallet-ecosystem.md')
          .catch(() => import('../content/ravencoin-wallet-ecosystem.md')); // Fallback to English
      case 'zh':
        return import('../content/zh/ravencoin-wallet-ecosystem.md')
          .catch(() => import('../content/ravencoin-wallet-ecosystem.md')); // Fallback to English
      default:
        return import('../content/ravencoin-wallet-ecosystem.md');
    }
  }
} 