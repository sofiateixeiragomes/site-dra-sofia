// ============================================
// Site Dra. Sofia Teixeira Gomes — Main JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Hamburger menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!wasActive) item.classList.add('active');
    });
  });

  // --- Tracking de cliques no WhatsApp (conversão Google Ads) ---
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      // Identifica origem do clique pra segmentar relatórios
      let origem = 'outro';
      if (link.classList.contains('whatsapp-float')) origem = 'botao_flutuante';
      else if (link.classList.contains('nav-cta')) origem = 'navbar';
      else if (link.classList.contains('btn-primary')) origem = 'cta_principal';
      else if (link.closest('.cta-section')) origem = 'cta_final';
      else if (link.closest('.thanks-next-step')) origem = 'pagina_obrigado';
      else if (link.closest('.specialty-hero')) origem = 'hero_especialidade';
      else if (link.closest('.hero')) origem = 'hero_home';

      // Evento gtag (Google Ads + GA via GTM podem ouvir)
      if (typeof gtag === 'function') {
        gtag('event', 'click_whatsapp', {
          'origem_clique': origem,
          'page_path': window.location.pathname
        });
      }

      // Push para dataLayer (pra usar como trigger no GTM se quiser)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_whatsapp',
        origem_clique: origem,
        page_path: window.location.pathname
      });
    });
  });

  // --- E-book form (Brevo) ---
  const ebookForm = document.getElementById('ebook-form');
  if (ebookForm) {
    ebookForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Anti-bot: se o honeypot foi preenchido, ignora silenciosamente
      const honeypot = ebookForm.querySelector('input[name="email_address_check"]');
      if (honeypot && honeypot.value !== '') return;

      const action = ebookForm.dataset.brevoAction;
      const redirect = ebookForm.dataset.redirect || 'obrigado-ebook.html';
      const submitBtn = ebookForm.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.innerHTML = '⏳ Enviando...';
      }

      // Submit no-cors pro Brevo (fire-and-forget — não conseguimos ler a resposta,
      // mas o lead é adicionado à lista do mesmo jeito).
      const formData = new FormData(ebookForm);
      fetch(action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      }).catch(() => {/* ignora erros de rede — Brevo recebe mesmo assim */});

      // Pequeno delay pra garantir que a request saia antes do redirect
      setTimeout(() => {
        window.location.href = redirect;
      }, 600);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
