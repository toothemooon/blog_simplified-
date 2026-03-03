<script>
  import { sampleTwitterData, dataLakeStats, getTopTweetsByEngagement, getEngagementStats } from '../../data/twitter/sample-data.js';
  
  // Get engagement statistics
  const engagementStats = getEngagementStats();
  const topTweets = getTopTweetsByEngagement(sampleTwitterData, 3);
  
  // Format numbers for display
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
  
  // Format date
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  // Calculate engagement score
  function calculateEngagement(tweet) {
    return tweet.Reply_Count + tweet.Repost_Count + tweet.Like_Count;
  }
  
  // Language distribution
  const languageDistribution = sampleTwitterData.reduce((acc, tweet) => {
    acc[tweet.Language] = (acc[tweet.Language] || 0) + 1;
    return acc;
  }, {});
  
  const languageNames = {
    'en': 'English',
    'it': 'Italian',
    'ja': 'Japanese'
  };
</script>

<div class="twitter-data-visualization">
  <h2>📊 Data Lake Overview</h2>
  
  <!-- Statistics Grid -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">{dataLakeStats.totalRecords}</div>
      <div class="stat-label">Total Tweets</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-value">{formatNumber(dataLakeStats.totalEngagement)}</div>
      <div class="stat-label">Total Engagement</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-value">{dataLakeStats.verifiedAccounts}</div>
      <div class="stat-label">Verified Accounts</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-value">{formatNumber(dataLakeStats.averageViews)}</div>
      <div class="stat-label">Avg. Views</div>
    </div>
  </div>
  
  <!-- Language Distribution -->
  <div class="section">
    <h3>🌍 Language Distribution</h3>
    <div class="language-bars">
      {#each Object.entries(languageDistribution) as [lang, count]}
        <div class="language-bar">
          <div class="language-label">
            {languageNames[lang] || lang}
            <span class="language-count">({count})</span>
          </div>
          <div class="bar-container">
            <div 
              class="bar-fill" 
              style="width: {(count / dataLakeStats.totalRecords) * 100}%"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Engagement Analytics -->
  <div class="section">
    <h3>📈 Engagement Analytics</h3>
    <div class="engagement-grid">
      <div class="engagement-stat">
        <span class="emoji">💬</span>
        <div class="engagement-data">
          <div class="engagement-total">{engagementStats.totalReplies}</div>
          <div class="engagement-label">Total Replies</div>
          <div class="engagement-avg">Avg: {engagementStats.avgReplies}</div>
        </div>
      </div>
      
      <div class="engagement-stat">
        <span class="emoji">🔄</span>
        <div class="engagement-data">
          <div class="engagement-total">{engagementStats.totalReposts}</div>
          <div class="engagement-label">Total Reposts</div>
          <div class="engagement-avg">Avg: {engagementStats.avgReposts}</div>
        </div>
      </div>
      
      <div class="engagement-stat">
        <span class="emoji">❤️</span>
        <div class="engagement-data">
          <div class="engagement-total">{engagementStats.totalLikes}</div>
          <div class="engagement-label">Total Likes</div>
          <div class="engagement-avg">Avg: {engagementStats.avgLikes}</div>
        </div>
      </div>
      
      <div class="engagement-stat">
        <span class="emoji">👁️</span>
        <div class="engagement-data">
          <div class="engagement-total">{formatNumber(engagementStats.totalViews)}</div>
          <div class="engagement-label">Total Views</div>
          <div class="engagement-avg">Avg: {engagementStats.avgViews}</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Top Tweets by Engagement -->
  <div class="section">
    <h3>🏆 Top Tweets by Engagement</h3>
    <div class="top-tweets">
      {#each topTweets as tweet, index}
        <div class="tweet-card">
          <div class="tweet-header">
            <div class="tweet-rank">#{index + 1}</div>
            <div class="tweet-author">
              <div class="author-name">
                {tweet.Author_Name}
                {#if tweet.Verified_Status}
                  <span class="verified-badge">✓</span>
                {/if}
              </div>
              <div class="author-handle">@{tweet.Author_Handle}</div>
            </div>
          </div>
          
          <div class="tweet-content">
            {tweet.Tweet_Content}
          </div>
          
          <div class="tweet-meta">
            <span class="meta-item">
              💬 {tweet.Reply_Count}
            </span>
            <span class="meta-item">
              🔄 {tweet.Repost_Count}
            </span>
            <span class="meta-item">
              ❤️ {tweet.Like_Count}
            </span>
            <span class="meta-item">
              👁️ {formatNumber(tweet.View_Count)}
            </span>
          </div>
          
          <div class="tweet-date">
            {formatDate(tweet.UTC_Time)}
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Data Lake Info -->
  <div class="section info-section">
    <h3>ℹ️ About This Data Lake</h3>
    <p>
      This demonstration showcases a Twitter data lake architecture with sample data 
      collected via Octoparse Twitter Advanced Search Scraper. The data spans from 
      <strong>{formatDate(dataLakeStats.dateRange.start)}</strong> to 
      <strong>{formatDate(dataLakeStats.dateRange.end)}</strong> and includes tweets 
      in multiple languages with comprehensive engagement metrics.
    </p>
    <p class="legal-note">
      <strong>Note:</strong> This is a technical demonstration of data architecture. 
      Always ensure compliance with platform Terms of Service and applicable laws when 
      collecting social media data.
    </p>
  </div>
</div>

<style>
  .twitter-data-visualization {
    padding: 1.5rem 0;
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: var(--color-text-primary);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: var(--color-bg-secondary);
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    border: 1px solid var(--color-border);
    transition: transform 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-link);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-link);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }

  .section {
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: var(--color-bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--color-border);
  }

  .language-bars {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .language-bar {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .language-label {
    font-size: 0.95rem;
    color: var(--color-text-primary);
    font-weight: 500;
  }

  .language-count {
    color: var(--color-text-secondary);
    font-weight: normal;
  }

  .bar-container {
    height: 24px;
    background: var(--color-bg-primary);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--color-border);
  }

  .bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-link), var(--color-link-hover));
    transition: width 0.3s ease;
  }

  .engagement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  .engagement-stat {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--color-bg-primary);
    border-radius: 8px;
    border: 1px solid var(--color-border);
  }

  .emoji {
    font-size: 2rem;
  }

  .engagement-data {
    display: flex;
    flex-direction: column;
  }

  .engagement-total {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-text-primary);
  }

  .engagement-label {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
  }

  .engagement-avg {
    font-size: 0.8rem;
    color: var(--color-text-tertiary);
    margin-top: 0.25rem;
  }

  .top-tweets {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tweet-card {
    padding: 1.5rem;
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .tweet-card:hover {
    border-color: var(--color-link);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .tweet-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .tweet-rank {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-link);
    min-width: 40px;
  }

  .tweet-author {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-weight: 600;
    color: var(--color-text-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .verified-badge {
    color: var(--color-link);
    font-size: 0.9rem;
  }

  .author-handle {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }

  .tweet-content {
    margin-bottom: 1rem;
    color: var(--color-text-primary);
    line-height: 1.6;
  }

  .tweet-meta {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .meta-item {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }

  .tweet-date {
    font-size: 0.85rem;
    color: var(--color-text-tertiary);
  }

  .info-section p {
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
  }

  .legal-note {
    font-size: 0.9rem;
    padding: 1rem;
    background: var(--color-bg-primary);
    border-left: 3px solid var(--color-link);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .engagement-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    .stat-value {
      font-size: 1.5rem;
    }
  }
</style>
