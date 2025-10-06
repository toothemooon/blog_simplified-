export default {
  // URL slug
  slug: 'bozu-mekuri-traditional-japanese-card-game',
  
  // Publication date (YYYY-MM-DD format)
  date: '2025-10-06',
  
  // English metadata
  title_en: 'Bozu Mekuri: A Traditional Japanese Card Game of Flipping Monks',
  summary_en: 'Explore Bozu Mekuri, a delightful traditional Japanese card game using Hyakunin Isshu cards, where children learn classical literature through play while enjoying dramatic reversals of fortune.',
  
  // Japanese metadata
  title_ja: '坊主めくり：伝統的な日本のカードゲーム',
  summary_ja: '百人一首のかるた札を使用する楽しい伝統的な日本のカードゲーム「坊主めくり」について。子どもたちが遊びながら古典文学に触れ、運命の劇的な逆転を楽しむゲームです。',
  
  // Chinese metadata
  title_zh: '坊主めくり：翻转和尚的传统日本卡牌游戏',
  summary_zh: '探索坊主めくり，一款使用百人一首纸牌的有趣传统日本卡牌游戏，让孩子们在玩乐中学习古典文学，享受命运的戏剧性逆转。',
  
  // Tags (common across all languages)
  tags: ['japanese-culture', 'traditional-games', 'card-games', 'hyakunin-isshu', 'cultural-heritage'],
  
  // Author info (common across all languages)
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content loader (English)
  getContent: () => import('../content/bozu-mekuri-traditional-japanese-card-game.md'),
  
  // Localized content loader with fallbacks
  getLocalizedContent: (lang) => {
    switch(lang) {
      case 'ja':
        return import('../content/ja/bozu-mekuri-traditional-japanese-card-game.md')
          .catch(() => import('../content/bozu-mekuri-traditional-japanese-card-game.md'));
      case 'zh':
        return import('../content/zh/bozu-mekuri-traditional-japanese-card-game.md')
          .catch(() => import('../content/bozu-mekuri-traditional-japanese-card-game.md'));
      default:
        return import('../content/bozu-mekuri-traditional-japanese-card-game.md');
    }
  }
}
