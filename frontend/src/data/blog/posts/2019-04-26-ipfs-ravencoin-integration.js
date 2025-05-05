export default {
  title: 'IPFS Integration with Ravencoin Assets',
  date: '2019-04-26',
  summary: 'How Ravencoin uses the InterPlanetary File System (IPFS) to provide immutable, decentralized storage for asset metadata, enhancing the functionality of tokenized assets.',
  slug: 'ipfs-ravencoin-integration',
  tags: ['ravencoin', 'ipfs', 'blockchain', 'decentralized-storage', 'asset-metadata'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  // The content will be loaded dynamically
  getContent: () => import('../content/ipfs-ravencoin-integration.md')
} 