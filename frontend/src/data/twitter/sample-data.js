// Sample Twitter data structure based on Octoparse Twitter Advanced Search Scraper
// This demonstrates how Twitter data can be organized in a data lake format

export const twitterDataSchema = {
  Query_Str: 'string',
  Post_URL: 'string',
  Author_Name: 'string',
  Author_Web_Page_URL: 'string',
  Author_Handle: 'string',
  Verified_Status: 'boolean',
  UTC_Time: 'datetime',
  Ads: 'boolean',
  Tweet_Content: 'string',
  Post_ID: 'string',
  Tweet_URL: 'string',
  Reply_Count: 'number',
  Repost_Count: 'number',
  Like_Count: 'number',
  View_Count: 'number',
  Bookmark_Count: 'number',
  Tweet_Image_URL: 'string',
  Replying_to: 'boolean',
  Reply_to_Whom: 'string',
  Reply_to_Whom_URL: 'string',
  Reply_to_Whom_Username: 'string',
  Reply_to_Whom_Handle: 'string',
  Language: 'string'
};

// Sample Twitter data entries
export const sampleTwitterData = [
  {
    Query_Str: 'fringe benefit',
    Post_URL: 'https://x.com/search?q=fringe benefit until:2024-12-01 since:2024-11-01&src=typed_query',
    Author_Name: 'bābā.eth 🏴🤝🌎💹🧲',
    Author_Web_Page_URL: 'https://x.com/TweetMeister10',
    Author_Handle: 'TweetMeister10',
    Verified_Status: true,
    UTC_Time: '2024-11-27 19:40:22+00:00',
    Ads: false,
    Tweet_Content: '@Aella_Girl It\'s like the only fringe benefit of that level of relational commitment 🤭 https://t.co/QQeD9pkGAZ',
    Post_ID: '1861857619733778893',
    Tweet_URL: 'https://x.com/TweetMeister10/status/1861857619733778893',
    Reply_Count: 0,
    Repost_Count: 0,
    Like_Count: 1,
    View_Count: 2069,
    Bookmark_Count: 0,
    Tweet_Image_URL: 'https://pbs.twimg.com/tweet_video_thumb/Gdalop7XQAAwf0k.jpg',
    Replying_to: true,
    Reply_to_Whom: 'Aella_Girl',
    Reply_to_Whom_URL: 'https://x.com/Aella_Girl',
    Reply_to_Whom_Username: 'Aella',
    Reply_to_Whom_Handle: 'Aella_Girl',
    Language: 'en'
  },
  {
    Query_Str: 'fringe benefit',
    Post_URL: 'https://x.com/search?q=fringe benefit until:2024-12-01 since:2024-11-01&src=typed_query',
    Author_Name: 'Ian Johnston 🇾🇪',
    Author_Web_Page_URL: 'https://x.com/nclfuzzy',
    Author_Handle: 'nclfuzzy',
    Verified_Status: true,
    UTC_Time: '2024-11-19 18:17:07+00:00',
    Ads: false,
    Tweet_Content: '@A1an_M And sticking it to Clarkson is a fringe benefit.',
    Post_ID: '1858937563433795984',
    Tweet_URL: 'https://x.com/nclfuzzy/status/1858937563433795984',
    Reply_Count: 0,
    Repost_Count: 0,
    Like_Count: 1,
    View_Count: 407,
    Bookmark_Count: 0,
    Tweet_Image_URL: '',
    Replying_to: true,
    Reply_to_Whom: 'A1an_M',
    Reply_to_Whom_URL: 'https://x.com/A1an_M',
    Reply_to_Whom_Username: 'Alan',
    Reply_to_Whom_Handle: 'A1an_M',
    Language: 'en'
  },
  {
    Query_Str: 'fringe benefit',
    Post_URL: 'https://x.com/search?q=fringe benefit until:2025-01-01 since:2024-12-01&src=typed_query',
    Author_Name: 'Hand Banana',
    Author_Web_Page_URL: 'https://x.com/__hand_banana',
    Author_Handle: '__hand_banana',
    Verified_Status: false,
    UTC_Time: '2024-12-28 17:50:52+00:00',
    Ads: false,
    Tweet_Content: '@docentdemagogue a non-tech business would reject this project on ROI grounds because they would not recognize the enormous fringe benefit of having built a tech org that could accomplish such a task',
    Post_ID: '1873064085761474995',
    Tweet_URL: 'https://x.com/__hand_banana/status/1873064085761474995',
    Reply_Count: 0,
    Repost_Count: 0,
    Like_Count: 3,
    View_Count: 48,
    Bookmark_Count: 0,
    Tweet_Image_URL: '',
    Replying_to: true,
    Reply_to_Whom: '__hand_banana',
    Reply_to_Whom_URL: 'https://x.com/__hand_banana',
    Reply_to_Whom_Username: 'Sky',
    Reply_to_Whom_Handle: '__hand_banana',
    Language: 'en'
  },
  {
    Query_Str: 'fringe benefit',
    Post_URL: 'https://x.com/search?q=fringe benefit until:2025-01-01 since:2024-12-01&src=typed_query',
    Author_Name: 'Due di denari - Radio 24',
    Author_Web_Page_URL: 'https://x.com/2didenari',
    Author_Handle: '2didenari',
    Verified_Status: false,
    UTC_Time: '2024-12-09 10:40:20+00:00',
    Ads: false,
    Tweet_Content: '"#Autoaziendali: rivoluzionato il modo di calcolare il fringe benefit. I coefficienti faranno leva sul tipo di alimentazione del veicolo" 🎙️ @StefanoSirocchi (esperto @sole24ore) #6dicembre #Duedidenari',
    Post_ID: '1866070370702315983',
    Tweet_URL: 'https://x.com/2didenari/status/1866070370702315983',
    Reply_Count: 1,
    Repost_Count: 0,
    Like_Count: 0,
    View_Count: 24,
    Bookmark_Count: 0,
    Tweet_Image_URL: '',
    Replying_to: true,
    Reply_to_Whom: '2didenari',
    Reply_to_Whom_URL: 'https://x.com/2didenari',
    Reply_to_Whom_Username: 'Stefano Sirocchi',
    Reply_to_Whom_Handle: '2didenari',
    Language: 'it'
  },
  {
    Query_Str: 'fringe benefit',
    Post_URL: 'https://x.com/search?q=fringe benefit until:2025-03-01 since:2025-02-01&src=typed_query',
    Author_Name: 'FareContrattazione',
    Author_Web_Page_URL: 'https://x.com/adapt_rel_ind',
    Author_Handle: 'adapt_rel_ind',
    Verified_Status: false,
    UTC_Time: '2025-02-18 10:40:14+00:00',
    Ads: false,
    Tweet_Content: '🔍 Novità chiave: obbligo di preavviso di 3 giorni per la proroga dei contratti a termine! ⏳ Se non rispettato, scatta un indennizzo di 20€/giorno in fringe benefit. 💶 Un passo avanti per la tutela e la stabilità dei lavoratori! 🧵',
    Post_ID: '1891799880063938845',
    Tweet_URL: 'https://x.com/adapt_rel_ind/status/1891799880063938845',
    Reply_Count: 1,
    Repost_Count: 0,
    Like_Count: 1,
    View_Count: 39,
    Bookmark_Count: 0,
    Tweet_Image_URL: '',
    Replying_to: true,
    Reply_to_Whom: 'adapt_rel_ind',
    Reply_to_Whom_URL: 'https://x.com/adapt_rel_ind',
    Reply_to_Whom_Username: 'adapt_rel_ind',
    Reply_to_Whom_Handle: 'adapt_rel_ind',
    Language: 'it'
  },
  {
    Query_Str: 'fringe benefit',
    Post_URL: 'https://x.com/search?q=fringe benefit until:2025-04-01 since:2025-03-01&src=typed_query',
    Author_Name: '城之内みな🇯🇵',
    Author_Web_Page_URL: 'https://x.com/7Znv478Zu8TnSWj',
    Author_Handle: '7Znv478Zu8TnSWj',
    Verified_Status: true,
    UTC_Time: '2025-03-10 04:50:20+00:00',
    Ads: false,
    Tweet_Content: '@2022meimei3 全国にどんどん乱造されたFラン大も3ヶ月以上ビザ取得に使われ、医療費タダ乗り、出産して滞在特別許可取得の方便に利用されていますね。',
    Post_ID: '1898959582300639444',
    Tweet_URL: 'https://x.com/7Znv478Zu8TnSWj/status/1898959582300639444',
    Reply_Count: 2,
    Repost_Count: 219,
    Like_Count: 570,
    View_Count: 8656,
    Bookmark_Count: 6,
    Tweet_Image_URL: '',
    Replying_to: true,
    Reply_to_Whom: '2022meimei3',
    Reply_to_Whom_URL: 'https://x.com/2022meimei3',
    Reply_to_Whom_Username: 'mei',
    Reply_to_Whom_Handle: '2022meimei3',
    Language: 'ja'
  },
  {
    Query_Str: 'fringe benefit',
    Post_URL: 'https://x.com/search?q=fringe benefit until:2025-04-01 since:2025-03-01&src=typed_query',
    Author_Name: 'Sathish',
    Author_Web_Page_URL: 'https://x.com/sathishpgw',
    Author_Handle: 'sathishpgw',
    Verified_Status: true,
    UTC_Time: '2025-03-04 07:04:12+00:00',
    Ads: false,
    Tweet_Content: '@ajayrotti Our finance ministry has the habit of searching every country\'s tax laws and pick up the worst in it.. Remember one Fringe benefit tax they introduced in 2005 saying it is there in Australia',
    Post_ID: '1896818945186992498',
    Tweet_URL: 'https://x.com/sathishpgw/status/1896818945186992498',
    Reply_Count: 0,
    Repost_Count: 1,
    Like_Count: 3,
    View_Count: 339,
    Bookmark_Count: 0,
    Tweet_Image_URL: '',
    Replying_to: true,
    Reply_to_Whom: 'ajayrotti',
    Reply_to_Whom_URL: 'https://x.com/ajayrotti',
    Reply_to_Whom_Username: 'Ajay Rotti',
    Reply_to_Whom_Handle: 'ajayrotti',
    Language: 'en'
  },
  {
    Query_Str: 'fringe benefit',
    Post_URL: 'https://x.com/search?q=fringe benefit until:2025-05-01 since:2025-04-01&src=typed_query',
    Author_Name: 'Joey C',
    Author_Web_Page_URL: 'https://x.com/Jocava327919',
    Author_Handle: 'Jocava327919',
    Verified_Status: false,
    UTC_Time: '2025-04-07 13:15:55+00:00',
    Ads: false,
    Tweet_Content: '@Adams60011Adams It\'s a fringe benefit for politicians. Steal our money.',
    Post_ID: '1909233679265595762',
    Tweet_URL: 'https://x.com/Jocava327919/status/1909233679265595762',
    Reply_Count: 1,
    Repost_Count: 0,
    Like_Count: 1,
    View_Count: 7,
    Bookmark_Count: 0,
    Tweet_Image_URL: '',
    Replying_to: true,
    Reply_to_Whom: 'Adams60011Adams',
    Reply_to_Whom_URL: 'https://x.com/Adams60011Adams',
    Reply_to_Whom_Username: 'Brian Adams',
    Reply_to_Whom_Handle: 'Adams60011Adams',
    Language: 'en'
  }
];

// Data lake statistics
export const dataLakeStats = {
  totalRecords: sampleTwitterData.length,
  dateRange: {
    start: '2024-11-01',
    end: '2025-05-01'
  },
  languages: ['en', 'it', 'ja'],
  totalEngagement: sampleTwitterData.reduce((acc, tweet) => 
    acc + tweet.Reply_Count + tweet.Repost_Count + tweet.Like_Count + tweet.View_Count, 0
  ),
  verifiedAccounts: sampleTwitterData.filter(tweet => tweet.Verified_Status).length,
  averageViews: Math.round(
    sampleTwitterData.reduce((acc, tweet) => acc + tweet.View_Count, 0) / sampleTwitterData.length
  )
};

// Utility functions for data analysis
export function getTopTweetsByEngagement(data = sampleTwitterData, limit = 5) {
  return [...data]
    .sort((a, b) => {
      const engagementA = a.Reply_Count + a.Repost_Count + a.Like_Count;
      const engagementB = b.Reply_Count + b.Repost_Count + b.Like_Count;
      return engagementB - engagementA;
    })
    .slice(0, limit);
}

export function getTweetsByLanguage(data = sampleTwitterData, language) {
  return data.filter(tweet => tweet.Language === language);
}

export function getEngagementStats(data = sampleTwitterData) {
  const totalTweets = data.length;
  const totalReplies = data.reduce((acc, t) => acc + t.Reply_Count, 0);
  const totalReposts = data.reduce((acc, t) => acc + t.Repost_Count, 0);
  const totalLikes = data.reduce((acc, t) => acc + t.Like_Count, 0);
  const totalViews = data.reduce((acc, t) => acc + t.View_Count, 0);
  
  return {
    totalTweets,
    totalReplies,
    totalReposts,
    totalLikes,
    totalViews,
    avgReplies: (totalReplies / totalTweets).toFixed(2),
    avgReposts: (totalReposts / totalTweets).toFixed(2),
    avgLikes: (totalLikes / totalTweets).toFixed(2),
    avgViews: (totalViews / totalTweets).toFixed(2)
  };
}
