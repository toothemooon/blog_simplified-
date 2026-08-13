<script>
  import { language } from '../../i18n';
  import { getEchoLegalDocument } from '../../data/legal/echo.js';

  export let document = 'privacy';

  $: currentLanguage = $language;
  $: legal = getEchoLegalDocument(document, currentLanguage);
  $: isSupport = document === 'support';
  $: documents = [
    { key: 'privacy', label: { en: 'Privacy', ja: 'プライバシー', zh: '隐私政策' } },
    { key: 'terms', label: { en: 'Terms', ja: '利用規約', zh: '服务条款' } },
    { key: 'support', label: { en: 'Support', ja: 'サポート', zh: '支持' } }
  ];
  $: backLabel = { en: 'Back to ECHO', ja: 'ECHOに戻る', zh: '返回 ECHO 项目' }[currentLanguage] || 'Back to ECHO';
</script>

<svelte:head>
  <title>{legal.title} | Sarada's Blog</title>
  <meta name="description" content={isSupport ? (currentLanguage === 'zh' ? '来自开发者的一封信' : currentLanguage === 'ja' ? '開発者からの手紙' : 'A Letter from the Developer') : legal.summary} />
</svelte:head>

<article class="legal-page">
  <header class="legal-header">
    <p class="eyebrow">{legal.eyebrow}</p>
    <h1>{legal.title}</h1>
  </header>

  <nav class="document-switcher" aria-label="ECHO legal documents">
    {#each documents as doc}
      <a href="/projects/echo/{doc.key}" class:active={document === doc.key}>
        {doc.label[currentLanguage]}
      </a>
    {/each}
  </nav>

  {#if isSupport}
    <div class="legal-content letter-content">
      {#if currentLanguage === 'en'}
        <p>Thank you for spending a little of your time with ECHO.</p>
        <p>The idea behind ECHO is simple: <strong>to hear the echoes of history.</strong></p>
        <p>A quote is rarely just a sentence. Behind it is a person, a moment, and often an event that gives those words meaning. ECHO brings together quotes, the people connected to them, and brief stories of important moments in their lives.</p>
        <p>The visual design follows the same idea. ECHO includes <strong>three carefully designed themes with matching app icons</strong>, including an <strong>Archive theme</strong> inspired by aged paper, old books, and historical documents.</p>
        <p>I wanted ECHO to feel less like an endless feed and more like opening a small personal archive.</p>
        <p>Privacy is also intentionally simple. Your preferences, bookmarks, reading state, and other app settings are stored locally on your device and are not transmitted to me. ECHO currently has no account system, advertising tracking, behavioural analytics, or payment processing.</p>
        <p>If you contact me at <strong><a href="mailto:abc510433622@gmail.com">abc510433622@gmail.com</a></strong>, I will only use the information you choose to send in order to reply and provide support. I do not sell or provide personal information to advertisers or data brokers.</p>
        <p>ECHO will continue to evolve with new quotes, people, historical moments, and ways to experience them.</p>
        <p>I hope it can become a small place where the distance between past and present feels a little shorter.</p>
        <p class="closing-line"><strong>A sentence survives. A person leaves something behind. A moment in history continues to echo.</strong></p>
        <p>Thank you for giving ECHO a place on your device.</p>
        <p class="signature"><strong>— The developer of ECHO</strong></p>
      {:else if currentLanguage === 'zh'}
        <p>感谢你将 ECHO 放在设备上，花一点时间与它相处。</p>
        <p>ECHO 背后的想法很简单：<strong>去聆听历史的回声。</strong></p>
        <p>一句名言很少仅仅是文字。它的背后是一个人、一个时刻，以及往往赋予这些文字意义的事件。ECHO 将名言、与之相关的人物，以及他们生命中重要时刻的故事汇集在一起。</p>
        <p>视觉设计也遵循同样的理念。ECHO 包含<strong>三套精心设计的主题与对应的 App 图标</strong>，其中 <strong>Archive 主题</strong>的灵感来自泛黄的纸张、旧书和历史文献。</p>
        <p>我希望 ECHO 感起来不像是一个无尽的信息流，而更像是打开一个属于自己的小型档案馆。</p>
        <p>隐私同样被有意地简化。你的偏好设置、收藏、阅读状态和其他应用数据都存储在你的设备本地，不会传输到我这里。ECHO 目前没有账户系统、广告追踪、行为分析或支付处理。</p>
        <p>如果你通过 <strong><a href="mailto:abc510433622@gmail.com">abc510433622@gmail.com</a></strong> 联系我，我只会使用你选择发送的信息来回复和提供支持。我不会向广告商或数据经纪商出售或提供个人信息。</p>
        <p>ECHO 将继续进化，带来新的名言、人物、历史时刻和体验方式。</p>
        <p>我希望它能成为一个让过去与现在的距离变得更近一点的小地方。</p>
        <p class="closing-line"><strong>一句名言留存下来。一个人留下了某些东西。一个历史时刻持续回响。</strong></p>
        <p>谢谢你给 ECHO 在你的设备上留了一席之地。</p>
        <p class="signature"><strong>— ECHO 的开发者</strong></p>
      {:else}
        <p>ECHO を Devices に置いていただき、ありがとうございます。</p>
        <p>ECHO の背景にある考えはシンプルです。<strong>歴史のこだまを聴くこと。</strong></p>
        <p>名言は Rarely 仅仅是文字。它的背后是一个人、一个时刻，以及往往赋予这些文字意义的事件。ECHO 将名言、与之相关的人物，以及他们生命中重要时刻的故事汇集在一起。</p>
        <p>ビジュアルデザインも同じ考えに従っています。ECHOには<strong>3つの丁寧にデザインされたテーマと対応するアプリアイコン</strong>が含まれています。古びた紙、古い本、歴史的な文書に着想を得た<strong>Archiveテーマ</strong>もその一つです。</p>
        <p>ECHO を endless feed のようにではなく、小さな個人アーカイブを開くような体験にしたかったです。</p>
        <p>プライバシーも意図的にシンプルです。設定、ブックマーク、読書状態、その他のアプリ設定はすべてデバイスにローカル保存され、私に送信されることはありません。ECHOには現在、アカウントシステム、広告追跡、行動分析、または決済処理はありません。</p>
        <p><strong><a href="mailto:abc510433622@gmail.com">abc510433622@gmail.com</a></strong> からご連絡いただいた場合、返信とサポート提供のみに必要な情報を使用します。広告主やデータブローカーに個人情報を販売・提供することはありません。</p>
        <p>ECHOは新しい名言、人物、歴史的瞬間、そしてそれらを体験する方法で進化を続けます。</p>
        <p>過去と現在の距離が少し短く感じられる、小さな場所になってくれることを願っています。</p>
        <p class="closing-line"><strong>名言は残る。人は何かを残す。歴史の一瞬は響き続ける。</strong></p>
        <p>ECHO に場所を置いていただきありがとうございます。</p>
        <p class="signature"><strong>— ECHO の開発者</strong></p>
      {/if}
    </div>
  {:else}
    <div class="legal-content">
      {#each legal.sections as section}
        <section>
          <h2>{section.title}</h2>

          {#if section.paragraphs}
            {#each section.paragraphs as paragraph}
              <p>{paragraph}</p>
            {/each}
          {/if}

          {#if section.bullets}
            <ul>
              {#each section.bullets as bullet}
                <li>{bullet}</li>
              {/each}
            </ul>
          {/if}
        </section>
      {/each}
    </div>
  {/if}

  <footer class="legal-footer">
    <a href="/projects/echo">← {backLabel}</a>
  </footer>
</article>

<style>
  .legal-page {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem 1rem 4rem;
  }

  .legal-header {
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .eyebrow {
    margin: 0 0 0.75rem;
    color: var(--color-primary);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  h1 {
    margin: 0 0 0.75rem;
    font-size: clamp(2.1rem, 7vw, 3.25rem);
    letter-spacing: -0.03em;
  }

  .updated {
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    opacity: 0.65;
  }

  .summary {
    max-width: 65ch;
    margin: 0;
    font-size: 1.08rem;
    line-height: 1.75;
  }

  .document-switcher {
    display: inline-flex;
    gap: 0.25rem;
    margin: 1.5rem 0 0;
    padding: 0.25rem;
    border: 1px solid var(--color-border);
    border-radius: 999px;
  }

  .document-switcher a {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    color: var(--color-text);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
  }

  .document-switcher a.active {
    background: var(--color-primary);
    color: white;
  }

  .legal-content {
    padding-top: 1rem;
  }

  .legal-content section {
    padding: 1.75rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .legal-content h2 {
    margin: 0 0 1rem;
    font-size: 1.35rem;
    line-height: 1.4;
  }

  .legal-content p,
  .legal-content li {
    line-height: 1.8;
  }

  .legal-content p:last-child,
  .legal-content ul:last-child {
    margin-bottom: 0;
  }

  .legal-content ul {
    margin: 0;
    padding-left: 1.4rem;
  }

  .legal-content li + li {
    margin-top: 0.5rem;
  }

  .legal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 2rem;
  }

  .legal-footer a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    font-weight: 600;
  }

  /* Letter styles */
  .letter-content p {
    margin: 0 0 1.5rem;
    max-width: 65ch;
    font-size: 1.05rem;
    line-height: 1.9;
  }

  .letter-content p:last-child {
    margin-bottom: 0;
  }

  .letter-content .closing-line {
    margin-top: 2rem;
  }

  .letter-content .signature {
    margin-top: 2rem;
    font-style: italic;
  }

  .letter-content a {
    color: var(--color-primary);
    text-decoration: underline;
  }

  .letter-content a:hover {
    text-decoration: none;
  }

  @media (max-width: 640px) {
    .legal-page {
      padding: 1rem 0.25rem 3rem;
    }

    .legal-footer {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>
