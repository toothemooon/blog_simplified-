<script>
  import { language } from '../../i18n';
  import { getEchoLegalDocument } from '../../data/legal/echo.js';

  export let document = 'privacy';

  $: currentLanguage = $language;
  $: legal = getEchoLegalDocument(document, currentLanguage);
  $: alternateDocument = document === 'privacy' ? 'terms' : 'privacy';
  $: alternateLabel = document === 'privacy'
    ? { en: 'Read Terms of Service', ja: '利用規約を読む', zh: '查看服务条款' }[currentLanguage]
    : { en: 'Read Privacy Policy', ja: 'プライバシーポリシーを読む', zh: '查看隐私政策' }[currentLanguage];
  $: backLabel = { en: 'Back to ECHO', ja: 'ECHOに戻る', zh: '返回 ECHO 项目' }[currentLanguage] || 'Back to ECHO';
</script>

<svelte:head>
  <title>{legal.title} | Sarada's Blog</title>
  <meta name="description" content={legal.summary} />
</svelte:head>

<article class="legal-page">
  <header class="legal-header">
    <p class="eyebrow">{legal.eyebrow}</p>
    <h1>{legal.title}</h1>
    <p class="updated">{legal.updated}</p>
    <p class="summary">{legal.summary}</p>
  </header>

  <nav class="document-switcher" aria-label="ECHO legal documents">
    <a href="/projects/echo/privacy" class:active={document === 'privacy'}>
      {currentLanguage === 'ja' ? 'プライバシー' : currentLanguage === 'zh' ? '隐私政策' : 'Privacy'}
    </a>
    <a href="/projects/echo/terms" class:active={document === 'terms'}>
      {currentLanguage === 'ja' ? '利用規約' : currentLanguage === 'zh' ? '服务条款' : 'Terms'}
    </a>
  </nav>

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

  <footer class="legal-footer">
    <a href="/projects/echo">← {backLabel}</a>
    <a href="/projects/echo/{alternateDocument}">{alternateLabel} →</a>
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
