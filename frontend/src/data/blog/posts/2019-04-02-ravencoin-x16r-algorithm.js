export default {
  title: 'Understanding Ravencoin\'s X16R Algorithm',
  date: '2019-04-02',
  summary: 'A technical deep-dive into Ravencoin\'s innovative X16R proof-of-work algorithm and how it helps maintain mining decentralization by resisting ASIC dominance.',
  slug: 'ravencoin-x16r-algorithm',
  tags: ['ravencoin', 'blockchain', 'mining', 'algorithm', 'proof-of-work'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  // The content will be loaded dynamically
  getContent: () => import('../content/ravencoin-x16r-algorithm.md')
} 