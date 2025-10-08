<script>
  import { t } from '../i18n';
  
  // ETH address for USDC donations
  const ethAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  
  let copied = false;
  
  function copyAddress() {
    navigator.clipboard.writeText(ethAddress).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
  }
</script>

<div class="donation-section">
  <h3 class="donation-title">{$t('donation.title')}</h3>
  <p class="donation-description">{$t('donation.description')}</p>
  
  <div class="donation-box">
    <div class="address-label">{$t('donation.address_label')}</div>
    <div class="address-container">
      <code class="address">{ethAddress}</code>
      <button class="copy-button" on:click={copyAddress} aria-label={$t('donation.copy')}>
        {#if copied}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{$t('donation.copied')}</span>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>{$t('donation.copy')}</span>
        {/if}
      </button>
    </div>
    <div class="amount-suggestion">{$t('donation.amount')}</div>
  </div>
</div>

<style>
  .donation-section {
    margin: 2rem 0;
    padding: 1.5rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-bg-secondary, var(--color-bg));
  }
  
  .donation-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
  
  .donation-description {
    font-size: 0.95rem;
    margin-bottom: 1rem;
    color: var(--color-text);
    opacity: 0.9;
  }
  
  .donation-box {
    background-color: var(--color-bg);
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid var(--color-border);
  }
  
  .address-label {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text);
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .address-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .address {
    flex: 1;
    min-width: 200px;
    padding: 0.5rem 0.75rem;
    background-color: var(--color-bg-secondary, var(--color-bg));
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.85rem;
    word-break: break-all;
    color: var(--color-text);
  }
  
  .copy-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: background-color 0.2s ease, transform 0.1s ease;
    white-space: nowrap;
  }
  
  .copy-button:hover {
    background-color: var(--color-primary-dark, var(--color-primary));
    filter: brightness(1.1);
  }
  
  .copy-button:active {
    transform: scale(0.98);
  }
  
  .icon {
    width: 16px;
    height: 16px;
  }
  
  .amount-suggestion {
    margin-top: 0.75rem;
    font-size: 0.9rem;
    color: var(--color-primary);
    font-weight: 600;
  }
  
  @media (max-width: 640px) {
    .address {
      font-size: 0.75rem;
      min-width: 100%;
    }
    
    .copy-button {
      width: 100%;
      justify-content: center;
    }
  }
</style>
