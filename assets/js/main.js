/**
 * MAIN CLIENT JAVASCRIPT
 * Glassmorphism Practical Programs Website
 * Student: Yogendra | Reg No: CDS/2025/1554 | Section: 5
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Search & Filter on Experiment Listing Pages
  const searchInput = document.getElementById('searchExperiments');
  if (searchInput) {
    const cards = document.querySelectorAll('.experiment-card');
    const noResultsMsg = document.getElementById('noResultsMessage');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let visibleCount = 0;

      cards.forEach((card) => {
        const title = card.querySelector('.exp-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.exp-desc')?.textContent.toLowerCase() || '';
        const num = card.querySelector('.exp-num')?.textContent.toLowerCase() || '';

        if (title.includes(query) || desc.includes(query) || num.includes(query)) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  // 2. Smooth active link highlighting based on current path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });
});

/**
 * Toast Notification Utility for interactive demos
 * @param {string} message 
 * @param {'success'|'info'|'warning'|'error'} type 
 */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const colors = {
    success: 'rgba(52, 211, 153, 0.9)',
    info: 'rgba(56, 189, 248, 0.9)',
    warning: 'rgba(251, 191, 36, 0.9)',
    error: 'rgba(251, 113, 133, 0.9)'
  };

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: rgba(15, 23, 42, 0.92);
    border: 1px solid ${colors[type] || colors.info};
    backdrop-filter: blur(16px);
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    font-size: 0.9rem;
    font-family: var(--font-sans);
    display: flex;
    align-items: center;
    gap: 0.6rem;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: auto;
  `;

  toast.innerHTML = `<span>●</span> <span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(10px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
