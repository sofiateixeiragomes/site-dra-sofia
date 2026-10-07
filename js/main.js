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

  // Identifica origem do clique pra segmentar relatórios
  const origemDoLink = (link) => {
    if (link.classList.contains('whatsapp-float')) return 'botao_flutuante';
    if (link.classList.contains('nav-cta')) return 'navbar';
    if (link.closest('.mobile-nav')) return 'menu_mobile';
    if (link.closest('.hero') && !link.closest('.specialty-hero')) return 'hero_home';
    if (link.closest('.specialty-hero')) return 'hero_especialidade';
    if (link.closest('.cta-section')) return 'cta_final';
    if (link.closest('.thanks-next-step')) return 'pagina_obrigado';
    if (link.closest('.footer')) return 'rodape';
    if (link.classList.contains('btn-primary')) return 'cta_secao';
    return 'outro';
  };

  // --- Pré-triagem antes do WhatsApp ---
  // Três toques montam a mensagem: quem só clicou por curiosidade tende a parar aqui,
  // e a secretária recebe contexto para uma primeira resposta pessoal.
  // As respostas vão apenas para o texto do WhatsApp. Nada é salvo nem enviado a
  // analytics, porque o motivo da consulta é dado de saúde.
  const TRIAGEM = [
    {
      id: 'quem',
      pergunta: 'Para quem é a consulta?',
      opcoes: [
        { rotulo: 'Para mim', linha: 'A consulta é para mim.' },
        { rotulo: 'Para um familiar', linha: 'A consulta é para um familiar.' }
      ]
    },
    {
      id: 'motivo',
      pergunta: 'O que te traz agora?',
      opcoes: [
        { rotulo: 'Ansiedade', linha: 'Motivo: ansiedade.' },
        { rotulo: 'Tristeza ou desânimo', linha: 'Motivo: tristeza ou desânimo.' },
        { rotulo: 'Atenção e foco', linha: 'Motivo: atenção e foco.' },
        { rotulo: 'Oscilações de humor', linha: 'Motivo: oscilações de humor.' },
        { rotulo: 'Outro motivo', linha: 'Motivo: outro.' },
        { rotulo: 'Prefiro contar na consulta', linha: '' }
      ]
    },
    {
      id: 'momento',
      pergunta: 'Em que momento você está?',
      opcoes: [
        { rotulo: 'Quero agendar o quanto antes', linha: 'Quero agendar o quanto antes.' },
        { rotulo: 'Quero entender o atendimento antes de decidir', linha: 'Antes de agendar, quero entender como funciona o atendimento.' }
      ]
    }
  ];

  const triagem = { dialog: null, corpo: null, passos: [], respostas: [], etapa: 0, base: '', ref: '', destino: '', origem: '' };

  const criar = (tag, classe, texto) => {
    const node = document.createElement(tag);
    if (classe) node.className = classe;
    if (texto) node.textContent = texto;
    return node;
  };

  const mensagemTriagem = () =>
    [triagem.base].concat(triagem.respostas.filter(Boolean)).join('\n') + triagem.ref;

  const renderTriagem = () => {
    const { corpo, passos, etapa } = triagem;
    corpo.textContent = '';

    if (etapa < passos.length) {
      const passo = passos[etapa];
      corpo.append(
        criar('p', 'triagem-progresso', 'Pergunta ' + (etapa + 1) + ' de ' + passos.length),
        criar('h2', 'triagem-pergunta', passo.pergunta)
      );
      const opcoes = criar('div', 'triagem-opcoes');
      passo.opcoes.forEach(opcao => {
        const botao = criar('button', 'triagem-opcao', opcao.rotulo);
        botao.type = 'button';
        botao.addEventListener('click', () => {
          triagem.respostas[etapa] = opcao.linha;
          triagem.etapa = etapa + 1;
          renderTriagem();
        });
        opcoes.append(botao);
      });
      corpo.append(opcoes);
    } else {
      const mensagem = mensagemTriagem();
      const enviar = criar('a', 'btn btn-primary triagem-enviar', '💬 Continuar no WhatsApp');
      enviar.href = triagem.destino + '?text=' + encodeURIComponent(mensagem);
      enviar.target = '_blank';
      enviar.rel = 'noopener';
      enviar.addEventListener('click', () => triagem.dialog.close());
      corpo.append(
        criar('p', 'triagem-progresso', 'Tudo pronto'),
        criar('h2', 'triagem-pergunta', 'Sua mensagem para a equipe'),
        criar('p', 'triagem-mensagem', mensagem),
        enviar,
        criar('p', 'triagem-aviso', 'Consulta online, por videochamada. Atendimento particular, sem convênios. A equipe responde no horário comercial com os horários disponíveis e o valor.')
      );
    }

    if (etapa > 0) {
      const voltar = criar('button', 'triagem-voltar', '← Voltar');
      voltar.type = 'button';
      voltar.addEventListener('click', () => {
        triagem.etapa = etapa - 1;
        renderTriagem();
      });
      corpo.append(voltar);
    }

    const foco = corpo.querySelector('.triagem-opcao, .triagem-enviar');
    if (foco) foco.focus();
  };

  const abrirTriagem = (link) => {
    if (!triagem.dialog) {
      const dialog = criar('dialog', 'triagem');
      dialog.setAttribute('aria-label', 'Antes de ir para o WhatsApp');
      const caixa = criar('div', 'triagem-caixa');
      const fechar = criar('button', 'triagem-fechar', '×');
      fechar.type = 'button';
      fechar.setAttribute('aria-label', 'Fechar');
      fechar.addEventListener('click', () => dialog.close());
      triagem.corpo = criar('div', 'triagem-corpo');
      caixa.append(fechar, triagem.corpo);
      dialog.append(caixa);
      // Clique fora da caixa fecha
      dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
      document.body.append(dialog);
      triagem.dialog = dialog;
    }

    const url = new URL(link.href);
    const texto = url.searchParams.get('text') || '';
    const ref = texto.match(/\s*\(ref: [^)]*\)$/);
    triagem.ref = ref ? ref[0] : '';
    triagem.base = ref ? texto.slice(0, ref.index) : texto;
    triagem.destino = url.origin + url.pathname;
    triagem.origem = origemDoLink(link);
    // Nas páginas de especialidade a mensagem já diz o motivo
    triagem.passos = TRIAGEM.filter(p => !(p.id === 'motivo' && /página sobre/i.test(triagem.base)));
    triagem.respostas = [];
    triagem.etapa = 0;

    renderTriagem();
    triagem.dialog.showModal();

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'triagem_whatsapp_inicio', origem_clique: triagem.origem, page_path: window.location.pathname });
  };

  // O rodapé continua com link direto, para quem só quer o número.
  const passaPelaTriagem = (link) =>
    typeof HTMLDialogElement === 'function' && !link.closest('.triagem') && !link.closest('.footer');

  // --- Tracking de cliques no WhatsApp (único listener; alimenta GA4/GTM e a conversão do Google Ads) ---
  // Com a pré-triagem, o clique só é contado quando a pessoa conclui as perguntas.
  const ADS_CONVERSION = 'AW-11124369234/gxQ4COLSmaYcENLOwbgp';
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;

    if (passaPelaTriagem(link)) {
      e.preventDefault();
      abrirTriagem(link);
      return;
    }

    const origem = link.closest('.triagem') ? triagem.origem : origemDoLink(link);

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
