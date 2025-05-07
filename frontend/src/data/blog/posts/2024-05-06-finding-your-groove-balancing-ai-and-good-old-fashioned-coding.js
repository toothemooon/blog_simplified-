export default {
  slug: 'finding-your-groove-balancing-ai-and-good-old-fashioned-coding',
  date: '2024-05-06',
  
  // English content
  title_en: 'Finding Your Groove: Balancing AI and Good Old-Fashioned Coding',
  summary_en: 'Exploring the harmony between using AI tools like ChatGPT and maintaining traditional programming practices to become a more effective developer.',
  
  // Japanese content
  title_ja: 'グルーブを見つける：AIと従来のコーディングのバランス',
  summary_ja: 'ChatGPTのようなAIツールの使用と伝統的なプログラミング手法の維持の間の調和を探り、より効果的な開発者になる方法について。',
  
  // Chinese content
  title_zh: '找到你的节奏：平衡AI和传统编程',
  summary_zh: '探索ChatGPT等AI工具的使用与保持传统编程实践之间的和谐，以成为更高效的开发者。',
  
  // Common properties
  tags: ['ai', 'programming', 'productivity', 'developer-tips', 'learning'],
  authors: [
    {
      name: 'Sarada',
      avatar: '/images/custom/landscape-icon.svg',
      twitter: '@Developer036'
    }
  ],
  
  // Default content (English)
  getContent: () => import('../content/finding-your-groove-balancing-ai-and-good-old-fashioned-coding.md'),
  
  // Localized content
  getLocalizedContent: (lang) => {
    // Load language-specific content if available
    switch(lang) {
      case 'ja':
        return import('../content/ja/finding-your-groove-balancing-ai-and-good-old-fashioned-coding.md')
          .catch(() => import('../content/finding-your-groove-balancing-ai-and-good-old-fashioned-coding.md')); // Fallback to English
      case 'zh':
        return import('../content/zh/finding-your-groove-balancing-ai-and-good-old-fashioned-coding.md')
          .catch(() => import('../content/finding-your-groove-balancing-ai-and-good-old-fashioned-coding.md')); // Fallback to English
      default:
        return import('../content/finding-your-groove-balancing-ai-and-good-old-fashioned-coding.md');
    }
  }
} 