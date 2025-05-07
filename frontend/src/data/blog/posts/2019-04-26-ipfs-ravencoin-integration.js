export default {
  slug: 'ipfs-ravencoin-integration',
  date: '2019-04-26',
  
  // English content
  title_en: 'IPFS Integration with Ravencoin Assets',
  summary_en: 'How Ravencoin uses the InterPlanetary File System (IPFS) to store immutable metadata for tokenized assets, enabling decentralized content storage alongside blockchain transactions.',
  
  // Japanese content
  title_ja: 'レイブンコイン資産とIPFSの統合',
  summary_ja: 'レイブンコインがトークン化された資産のために不変メタデータを保存するためにIPFS（InterPlanetary File System）をどのように使用し、ブロックチェーントランザクションとともに分散型コンテンツストレージを可能にするかについて。',
  
  // Chinese content
  title_zh: '渡鸦币资产与IPFS的集成',
  summary_zh: '渡鸦币如何使用星际文件系统（IPFS）存储代币化资产的不可变元数据，实现区块链交易的同时进行去中心化内容存储。',
  
  // Common properties
  tags: ['ravencoin', 'ipfs', 'blockchain', 'decentralized-storage', 'asset-metadata'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content (English)
  getContent: () => import('../content/ipfs-ravencoin-integration.md'),
  
  // Localized content
  getLocalizedContent: (lang) => {
    // Load language-specific content if available
    switch(lang) {
      case 'ja':
        return import('../content/ja/ipfs-ravencoin-integration.md')
          .catch(() => import('../content/ipfs-ravencoin-integration.md')); // Fallback to English
      case 'zh':
        return import('../content/zh/ipfs-ravencoin-integration.md')
          .catch(() => import('../content/ipfs-ravencoin-integration.md')); // Fallback to English
      default:
        return import('../content/ipfs-ravencoin-integration.md');
    }
  }
} 