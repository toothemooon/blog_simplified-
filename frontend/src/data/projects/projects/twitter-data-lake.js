export default {
  title: 'Twitter Data Lake Analysis',
  title_ja: 'Twitterデータレイク分析',
  title_zh: 'Twitter数据湖分析',
  
  role: 'Data Architecture Demo',
  role_ja: 'データアーキテクチャデモ',
  role_zh: '数据架构演示',
  
  location: 'Demonstration Project',
  location_ja: 'デモプロジェクト',
  location_zh: '演示项目',
  
  period: 'Oct 2025',
  
  slug: 'twitter-data-lake',
  
  summary: 'A demonstration of how Twitter data from advanced search scraping (via tools like Octoparse) can be structured, stored, and analyzed in a data lake architecture.',
  summary_ja: '高度な検索スクレイピング（Octoparseなどのツール経由）からのTwitterデータをデータレイクアーキテクチャで構造化、保存、分析する方法のデモンストレーション。',
  summary_zh: '展示如何在数据湖架构中构建、存储和分析来自高级搜索抓取（通过Octoparse等工具）的Twitter数据。',
  
  achievements: [
    'Structured Twitter data schema supporting 25+ fields including engagement metrics',
    'Implemented data lake architecture for social media analytics',
    'Created sample dataset with multi-language tweets (English, Italian, Japanese)',
    'Built utility functions for data analysis and engagement tracking',
    'Designed scalable structure supporting 500+ pages of tweet data',
    'Developed interactive data visualization component'
  ],
  
  achievements_ja: [
    'エンゲージメント指標を含む25以上のフィールドをサポートするTwitterデータスキーマを構造化',
    'ソーシャルメディア分析用のデータレイクアーキテクチャを実装',
    '多言語ツイート（英語、イタリア語、日本語）のサンプルデータセットを作成',
    'データ分析とエンゲージメント追跡のためのユーティリティ関数を構築',
    '500ページ以上のツイートデータをサポートするスケーラブルな構造を設計',
    'インタラクティブなデータ視覚化コンポーネントを開発'
  ],
  
  achievements_zh: [
    '构建支持25个以上字段的Twitter数据架构，包括参与度指标',
    '实现用于社交媒体分析的数据湖架构',
    '创建包含多语言推文（英语、意大利语、日语）的示例数据集',
    '构建用于数据分析和参与度跟踪的实用函数',
    '设计可扩展结构，支持500页以上的推文数据',
    '开发交互式数据可视化组件'
  ],
  
  tags: ['data-lake', 'twitter', 'analytics', 'data-architecture', 'social-media'],
  
  metadata: {
    type: 'Technical Demonstration',
    type_ja: '技術デモンストレーション',
    type_zh: '技术演示',
    
    field: 'Data Engineering',
    field_ja: 'データエンジニアリング',
    field_zh: '数据工程',
    
    teamSize: 'Individual Project',
    teamSize_ja: '個人プロジェクト',
    teamSize_zh: '个人项目',
    
    role: 'Data Architect',
    role_ja: 'データアーキテクト',
    role_zh: '数据架构师'
  },
  
  // For future detailed content
  getContent: () => import('../content/twitter-data-lake.md')
}
