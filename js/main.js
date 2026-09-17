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
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      const open = mobileNav.classList.contains('active');
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
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
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!wasActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Atribuição: persiste UTMs e anexa origem curta à mensagem do WhatsApp ---
  // Ex.: ?utm_source=meta&utm_campaign=ansiedade  ->  "... (ref: meta-ansiedade)"
  // A secretária vê de onde veio a conversa sem precisar de ferramenta extra.
  const UTM_KEY = 'stg_utm';
  const readUtm = () => {
    try {
      const q = new URLSearchParams(window.location.search);
      const found = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(k => {
        const v = q.get(k);
        if (v) found[k] = v.slice(0, 40);
      });
      if (Object.keys(found).length) {
        sessionStorage.setItem(UTM_KEY, JSON.stringify(found));
        return found;
      }
      const saved = sessionStorage.getItem(UTM_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (_) { return null; }
  };
  const utm = readUtm();
  const utmRef = utm
    ? [utm.utm_source, utm.utm_campaign || utm.utm_content].filter(Boolean).join('-').replace(/[^\w\-]/g, '')
    : '';

  if (utmRef) {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      try {
        const url = new URL(link.href);
        const text = url.searchParams.get('text') || '';
        if (text && !/\(ref:/.test(text)) {
          url.searchParams.set('text', text + ' (ref: ' + utmRef + ')');
          link.href = url.toString();
        }
      } catch (_) {}
    });
  }

  // --- Tracking de cliques no WhatsApp (único listener; alimenta GA4/GTM e a conversão do Google Ads) ---
  const ADS_CONVERSION = 'AW-11124369234/gxQ4COLSmaYcENLOwbgp';
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;

    // Identifica origem do clique pra segmentar relatórios
    let origem = 'outro';
    if (link.classList.contains('whatsapp-float')) origem = 'botao_flutuante';
    else if (link.classList.contains('nav-cta')) origem = 'navbar';
    else if (link.closest('.mobile-nav')) origem = 'menu_mobile';
    else if (link.closest('.hero') && !link.closest('.specialty-hero')) origem = 'hero_home';
    else if (link.closest('.specialty-hero')) origem = 'hero_especialidade';
    else if (link.closest('.cta-section')) origem = 'cta_final';
    else if (link.closest('.thanks-next-step')) origem = 'pagina_obrigado';
    else if (link.closest('.footer')) origem = 'rodape';
    else if (link.classList.contains('btn-primary')) origem = 'cta_secao';

    const payload = {
      origem_clique: origem,
      page_path: window.location.pathname,
      utm_ref: utmRef || '(direto)'
    };

    // Push para dataLayer (trigger no GTM -> GA4)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: 'click_whatsapp' }, payload));

    if (typeof gtag === 'function') {
      gtag('event', 'click_whatsapp', payload);
      // Conversão do Google Ads: só para CTAs de agendamento (o telefone do rodapé não conta como lead)
      if (origem !== 'rodape') {
        gtag('event', 'conversion', { 'send_to': ADS_CONVERSION, 'origem_clique': origem });
      }
    }
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
});
