// ==========================================
// Check-up Mental — SPA
// ==========================================

(function() {
  const DATA = window.QUIZ_DATA;
  const app = document.getElementById('quiz-app');
  const STORAGE_KEY = 'checkup-mental-state';

  const state = {
    view: 'landing',        // landing | consent | section-intro | question | results | leadForm
    sectionIndex: 0,
    questionIndex: 0,
    answers: {},            // { qid: value }
    consented: false,
    startedAt: null
  };

  // ==========================================
  // Persistência (localStorage)
  // ==========================================
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch(e) { /* fail silently */ }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        Object.assign(state, saved);
      }
    } catch(e) {}
  }

  function clearState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
    state.view = 'landing';
    state.sectionIndex = 0;
    state.questionIndex = 0;
    state.answers = {};
    state.consented = false;
    state.startedAt = null;
  }

  // ==========================================
  // Navegação
  // ==========================================
  function goTo(view, opts) {
    state.view = view;
    if (opts) Object.assign(state, opts);
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function nextQuestion() {
    const currentSection = DATA.sections[state.sectionIndex];
    if (state.questionIndex < currentSection.questions.length - 1) {
      state.questionIndex++;
      goTo('question');
    } else if (state.sectionIndex < DATA.sections.length - 1) {
      state.sectionIndex++;
      state.questionIndex = 0;
      goTo('section-intro');
    } else {
      goTo('results');
      trackEvent('checkup_mental_completado');
    }
  }

  function prevQuestion() {
    if (state.questionIndex > 0) {
      state.questionIndex--;
      goTo('question');
    } else if (state.sectionIndex > 0) {
      state.sectionIndex--;
      state.questionIndex = DATA.sections[state.sectionIndex].questions.length - 1;
      goTo('question');
    } else {
      goTo('section-intro');
    }
  }

  // ==========================================
  // Scoring
  // ==========================================
  function calculateScores() {
    const areaScores = {};
    let totalRaw = 0;
    let totalMax = 0;

    DATA.sections.forEach(section => {
      let sectionRaw = 0;
      let sectionMax = 0;

      section.questions.forEach(q => {
        const scale = DATA.scales[q.scale];
        const ans = state.answers[q.id];
        if (ans === undefined) return;
        const val = q.invert ? (scale.max - ans) : ans;
        sectionRaw += val * (q.weight || 1);
        sectionMax += scale.max * (q.weight || 1);
      });

      const pct = sectionMax > 0 ? Math.round((sectionRaw / sectionMax) * 100) : 0;
      areaScores[section.id] = {
        raw: sectionRaw,
        max: sectionMax,
        percent: pct,
        section: section
      };

      totalRaw += sectionRaw;
      totalMax += sectionMax;
    });

    const totalScore = totalMax > 0 ? Math.round((totalRaw / totalMax) * 100) : 0;
    return { total: totalScore, areas: areaScores };
  }

  function getLevel(score) {
    return DATA.levels.find(l => score >= l.min && score <= l.max) || DATA.levels[0];
  }

  function getAreaLevel(score) {
    return DATA.areaLevels.find(l => score >= l.min && score <= l.max) || DATA.areaLevels[0];
  }

  function detectCrisisFlags() {
    const ct = DATA.crisisThreshold;
    const phqSum = ct.phqIds.reduce((sum, id) => sum + (state.answers[id] || 0), 0);
    const gadSum = ct.gadIds.reduce((sum, id) => sum + (state.answers[id] || 0), 0);
    return {
      phqPositive: phqSum >= ct.threshold,
      gadPositive: gadSum >= ct.threshold
    };
  }

  // ==========================================
  // Tracking (GTM/GA/Ads)
  // ==========================================
  function trackEvent(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params || {});
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
  }

  // ==========================================
  // Renderização
  // ==========================================

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === 'class') e.className = attrs[k];
        else if (k === 'html') e.innerHTML = attrs[k];
        else if (k.startsWith('on') && typeof attrs[k] === 'function') {
          e.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else e.setAttribute(k, attrs[k]);
      }
    }
    (children || []).forEach(c => {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
    return e;
  }

  function render() {
    app.innerHTML = '';
    switch (state.view) {
      case 'landing':       renderLanding(); break;
      case 'consent':       renderConsent(); break;
      case 'section-intro': renderSectionIntro(); break;
      case 'question':      renderQuestion(); break;
      case 'results':       renderResults(); break;
      case 'lead-form':     renderLeadForm(); break;
      case 'lead-sent':     renderLeadSent(); break;
      default:              renderLanding();
    }
  }

  // -----------  LANDING  -----------
  function renderLanding() {
    const totalQuestions = DATA.sections.reduce((sum, s) => sum + s.questions.length, 0);
    const container = el('section', { class: 'quiz-view landing-view' }, [
      el('div', { class: 'container quiz-narrow' }, [
        el('div', { class: 'quiz-hero' }, [
          el('span', { class: 'quiz-badge' }, ['Check-up Mental · Gratuito']),
          el('h1', {}, ['Como está a sua saúde mental?']),
          el('p', { class: 'quiz-lead' }, [
            'Um check-up em ',
            el('strong', {}, ['8 minutos']),
            ', baseado em escalas usadas por psiquiatras no mundo todo (WHO-5, PHQ, GAD, ASRS).'
          ]),
          el('p', { class: 'quiz-lead-secondary' }, [
            'Ao final, você vai receber seu ',
            el('strong', {}, ['Índice de Bem-Estar Mental']),
            ' com detalhamento por área e um caminho de leitura para cada uma.'
          ]),
          el('div', { class: 'quiz-author' }, [
            el('img', { src: '../img/sofia-principal.jpg', alt: 'Dra. Sofia Teixeira Gomes' }),
            el('div', { class: 'quiz-author-info' }, [
              el('strong', {}, ['Criado pela Dra. Sofia Teixeira Gomes']),
              el('span', {}, ['Médica em Saúde Mental · CRM-MS 14359'])
            ])
          ]),
        ]),
        el('div', { class: 'quiz-cta-group quiz-cta-top' }, [
          el('button', {
            class: 'btn btn-primary btn-quiz-primary',
            onclick: () => { state.startedAt = new Date().toISOString(); trackEvent('checkup_mental_iniciado'); goTo('consent'); }
          }, ['Começar Check-up Mental →']),
          el('p', { class: 'quiz-meta' }, ['⏱ 8 minutos · 25 perguntas · sem cadastro para ver o resultado']),
          el('p', { class: 'quiz-disclaimer' }, [
            '⚠️ Este material tem fim educativo e não substitui avaliação médica. Não é diagnóstico.'
          ])
        ]),
        el('div', { class: 'quiz-sections-preview' },
          DATA.sections.map((s, i) => el('div', { class: 'quiz-section-card' }, [
            el('div', { class: 'quiz-section-emoji' }, [s.illustration]),
            el('div', { class: 'quiz-section-info' }, [
              el('span', { class: 'quiz-section-num' }, [`Parte ${i+1}`]),
              el('h3', {}, [s.title]),
              el('p', {}, [`${s.questions.length} perguntas`])
            ])
          ]))
        ),
        el('div', { class: 'quiz-quote' }, [
          el('p', {}, ['“Desde a primeira consulta, me senti acolhido e compreendido. Ela escuta com empatia, explica tudo com clareza.”']),
          el('span', {}, ['— Felipe de Jesus, avaliação no Google'])
        ]),
        Object.keys(state.answers).length > 0
          ? el('div', { class: 'quiz-resume-notice' }, [
              el('p', {}, ['Você tem um Check-up Mental em andamento.']),
              el('div', { class: 'resume-actions' }, [
                el('button', { class: 'btn-link', onclick: () => goTo('question') }, ['Continuar de onde parei']),
                el('button', { class: 'btn-link btn-link-danger', onclick: () => { clearState(); render(); } }, ['Recomeçar'])
              ])
            ])
          : null
      ])
    ]);
    app.appendChild(container);
  }

  // -----------  CONSENT  -----------
  function renderConsent() {
    const container = el('section', { class: 'quiz-view consent-view' }, [
      el('div', { class: 'container quiz-narrow' }, [
        el('span', { class: 'quiz-badge' }, ['Transparência']),
        el('h1', {}, ['Antes de começar, 5 combinados rápidos.']),
        el('p', { class: 'quiz-lead' }, ['Para você saber exatamente como isso funciona:']),
        el('ol', { class: 'consent-list' }, [
          el('li', {}, [
            el('strong', {}, ['Seus dados são anônimos por padrão.']),
            ' As respostas ficam no seu navegador enquanto você faz o quiz. Se você optar por receber o relatório por e-mail no final, aí sim seu e-mail é armazenado.'
          ]),
          el('li', {}, [
            el('strong', {}, ['Este questionário foi desenhado para adultos.']),
            ' Se você tem menos de 18 anos, converse com um responsável antes de seguir.'
          ]),
          el('li', {}, [
            el('strong', {}, ['Não é diagnóstico médico.']),
            ' É uma ferramenta educativa. Para diagnóstico, é necessária uma consulta.'
          ]),
          el('li', {}, [
            el('strong', {}, ['Não use este material em situações de crise.']),
            ' Se você está com pensamentos de suicídio ou em risco imediato, ligue para o CVV: ',
            el('a', { href: 'tel:188' }, ['188']),
            ' (24h, gratuito) ou procure emergência.'
          ]),
          el('li', {}, [
            el('strong', {}, ['LGPD:']),
            ' seus dados serão tratados conforme a Lei Geral de Proteção de Dados. Você pode solicitar exclusão a qualquer momento.'
          ]),
        ]),
        el('div', { class: 'consent-actions' }, [
          el('button', {
            class: 'btn btn-primary btn-quiz-primary',
            onclick: () => { state.consented = true; goTo('section-intro'); }
          }, ['Concordo, começar avaliação']),
          el('button', {
            class: 'btn-link',
            onclick: () => goTo('landing')
          }, ['← Voltar'])
        ])
      ])
    ]);
    app.appendChild(container);
  }

  // -----------  SECTION INTRO  -----------
  function renderSectionIntro() {
    const section = DATA.sections[state.sectionIndex];
    const container = el('section', { class: 'quiz-view section-intro-view' }, [
      el('div', { class: 'container quiz-narrow' }, [
        el('span', { class: 'quiz-badge' }, [`Parte ${state.sectionIndex + 1} de ${DATA.sections.length}`]),
        el('div', { class: 'section-progress' },
          DATA.sections.map((_, i) => el('div', {
            class: 'section-progress-bar' + (i <= state.sectionIndex ? ' active' : '')
          }))
        ),
        el('div', { class: 'section-emoji-big', style: `color: ${section.color}` }, [section.illustration]),
        el('h1', {}, [section.title]),
        el('p', { class: 'quiz-lead' }, [section.subtitle]),
        el('p', {}, [section.description]),
        el('div', { class: 'quiz-cta-group' }, [
          el('button', {
            class: 'btn btn-primary btn-quiz-primary',
            onclick: () => { state.questionIndex = 0; goTo('question'); }
          }, ['Continuar →']),
          state.sectionIndex > 0
            ? el('button', { class: 'btn-link', onclick: prevQuestion }, ['← Voltar'])
            : null
        ])
      ])
    ]);
    app.appendChild(container);
  }

  // -----------  QUESTION  -----------
  function renderQuestion() {
    const section = DATA.sections[state.sectionIndex];
    const question = section.questions[state.questionIndex];
    const scale = DATA.scales[question.scale];
    const currentAnswer = state.answers[question.id];
    const qNumber = state.questionIndex + 1;
    const qTotal = section.questions.length;

    const container = el('section', { class: 'quiz-view question-view' }, [
      el('div', { class: 'container quiz-narrow' }, [
        el('div', { class: 'question-header' }, [
          el('span', { class: 'quiz-badge' }, [`Pergunta ${qNumber} de ${qTotal}`]),
          el('div', { class: 'question-progress' },
            section.questions.map((_, i) => el('div', {
              class: 'question-progress-bar' + (i < qNumber ? ' active' : ''),
              style: i < qNumber ? `background: ${section.color}` : ''
            }))
          )
        ]),
        el('div', { class: 'question-content' }, [
          el('p', { class: 'question-instruction' }, ['Em relação às últimas 2 semanas:']),
          el('h2', { class: 'question-text' }, [question.text]),
          el('div', { class: 'question-options' },
            scale.options.map(opt => {
              const isSelected = currentAnswer === opt.value;
              return el('button', {
                class: 'question-option' + (isSelected ? ' selected' : ''),
                onclick: () => {
                  state.answers[question.id] = opt.value;
                  saveState();
                  setTimeout(nextQuestion, 250);
                }
              }, [
                el('span', { class: 'option-label' }, [opt.label]),
                el('span', { class: 'option-radio' })
              ]);
            })
          )
        ]),
        el('div', { class: 'question-nav' }, [
          el('button', { class: 'btn-link', onclick: prevQuestion }, ['← Anterior'])
        ])
      ])
    ]);
    app.appendChild(container);
  }

  // -----------  RESULTS  -----------
  function renderResults() {
    const scores = calculateScores();
    const level = getLevel(scores.total);
    const crisis = detectCrisisFlags();

    trackEvent('checkup_mental_resultado', { score: scores.total, nivel: level.label });

    const container = el('section', { class: 'quiz-view results-view' }, [
      el('div', { class: 'container quiz-narrow' }, [
        el('span', { class: 'quiz-badge' }, ['Seu Índice de Bem-Estar Mental']),

        // Crise banner (se detectado)
        (crisis.phqPositive || crisis.gadPositive) ? el('div', { class: 'crisis-banner' }, [
          el('div', { class: 'crisis-icon' }, ['💛']),
          el('div', { class: 'crisis-content' }, [
            el('h3', {}, ['Se você está em sofrimento intenso agora']),
            el('p', {}, [
              'Suas respostas apontam sinais que merecem atenção clínica. Se você está com pensamentos de se machucar ou em crise, ligue para o ',
              el('strong', {}, ['CVV: 188']),
              ' (24h, gratuito) ou procure um pronto-socorro.'
            ])
          ])
        ]) : null,

        // Score central
        el('div', { class: 'score-card' }, [
          el('div', { class: 'score-value', style: `color: ${level.color}` }, [String(scores.total)]),
          el('div', { class: 'score-bar' },
            DATA.levels.map(l => el('div', {
              class: 'score-bar-segment' + (l.label === level.label ? ' active' : ''),
              style: `background: ${l.color}`,
              title: l.label
            }))
          ),
          el('h2', { class: 'score-label', style: `color: ${level.color}` }, [level.label]),
          el('p', { class: 'score-description' }, [level.description])
        ]),

        // Detalhamento por área
        el('h3', { class: 'areas-title' }, ['Detalhamento por área']),
        el('div', { class: 'areas-breakdown' },
          Object.values(scores.areas).map(area => {
            const areaLevel = getAreaLevel(area.percent);
            const suggestions = DATA.areaSuggestions[area.section.id];
            const suggestionKey = area.percent >= 70 ? 'good' : (area.percent >= 40 ? 'medium' : 'low');
            return el('div', { class: 'area-card' }, [
              el('div', { class: 'area-header' }, [
                el('span', { class: 'area-emoji', style: `background: ${area.section.color}22; color: ${area.section.color}` }, [area.section.illustration]),
                el('div', { class: 'area-title-block' }, [
                  el('h4', {}, [area.section.title]),
                  el('span', { class: 'area-level', style: `color: ${areaLevel.color}` }, [areaLevel.label])
                ]),
                el('div', { class: 'area-score', style: `color: ${areaLevel.color}` }, [`${area.percent}`])
              ]),
              el('div', { class: 'area-progress' }, [
                el('div', {
                  class: 'area-progress-fill',
                  style: `width: ${area.percent}%; background: ${areaLevel.color}`
                })
              ]),
              el('p', { class: 'area-comment' }, [suggestions[suggestionKey]]),
              el('a', { class: 'area-link', href: suggestions.linkUrl }, [suggestions.linkText, ' →'])
            ]);
          })
        ),

        // Próximos passos
        el('div', { class: 'next-steps' }, [
          el('h3', {}, ['Próximos passos']),
          el('div', { class: 'next-steps-grid' }, [
            el('div', { class: 'next-step-card next-step-primary' }, [
              el('div', { class: 'step-icon' }, ['📄']),
              el('h4', {}, ['Receba seu relatório por e-mail']),
              el('p', {}, ['Enviamos o resultado detalhado, com interpretação clínica e sugestões, para o seu e-mail. Grátis.']),
              el('button', {
                class: 'btn btn-primary',
                onclick: () => { trackEvent('checkup_mental_email_click'); goTo('lead-form'); }
              }, ['Quero receber por e-mail'])
            ]),
            el('div', { class: 'next-step-card' }, [
              el('div', { class: 'step-icon' }, ['💬']),
              el('h4', {}, ['Conversar com a Dra. Sofia']),
              el('p', {}, ['Uma avaliação médica olha para o conjunto: seu contexto, história e biologia. Atendimento online, particular.']),
              el('a', {
                class: 'btn btn-secondary',
                href: 'https://wa.me/5567981198225?text=Ol%C3%A1!%20Acabei%20de%20fazer%20o%20Check-up%20Mental%20no%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.',
                target: '_blank',
                onclick: () => trackEvent('click_whatsapp', { origem_clique: 'checkup_mental_resultado' })
              }, ['Agendar pelo WhatsApp'])
            ])
          ])
        ]),

        el('div', { class: 'results-footer' }, [
          el('button', { class: 'btn-link', onclick: () => { clearState(); render(); } }, ['↻ Refazer Check-up Mental']),
          el('a', { class: 'btn-link', href: '../index.html' }, ['← Voltar ao site'])
        ])
      ])
    ]);
    app.appendChild(container);
  }

  // -----------  LEAD FORM  -----------
  function renderLeadForm() {
    const scores = calculateScores();
    const level = getLevel(scores.total);

    const container = el('section', { class: 'quiz-view lead-view' }, [
      el('div', { class: 'container quiz-narrow' }, [
        el('span', { class: 'quiz-badge' }, ['Quase lá']),
        el('h1', {}, ['Pra onde envio seu relatório?']),
        el('p', { class: 'quiz-lead' }, [`Você fica com o resultado (${scores.total} — ${level.label}) e receberá conteúdos ocasionais sobre saúde mental. Sem spam.`]),
        el('form', {
          class: 'lead-form',
          id: 'lead-form',
          onsubmit: (e) => {
            e.preventDefault();
            const nomeInput = e.target.querySelector('input[name="NAME"]');
            const emailInput = e.target.querySelector('input[name="EMAIL"]');
            const honeypot = e.target.querySelector('input[name="email_address_check"]');
            if (honeypot && honeypot.value !== '') return;
            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            const formData = new FormData();
            formData.append('EMAIL', emailInput.value);
            formData.append('NAME', nomeInput.value);
            formData.append('email_address_check', '');
            formData.append('locale', 'pt');

            // Enviar pro Brevo (mesmo endpoint do site principal)
            fetch('https://a3e3e2c8.sibforms.com/serve/MUIFAMG6pO9RMbOLiI-SjBlQWJdLc_d3DjtdcVy3xAcqzEedbGuSpGP9UMFedBJqK9aZsDBobTvuHc_z48-kBL_-au5S1OI_q6T18byGKpsgRLdQLJkO68yY0R2Pavcs3OpyVvUCEZvvb5ZeGWa-SLn3z06_jis2-RUWHPAjE7rvHWSzTl3zfaKoxGQsEI9B783yViSFNkjjbcFhGA==', {
              method: 'POST',
              body: formData,
              mode: 'no-cors'
            }).catch(() => {});

            trackEvent('checkup_mental_lead_enviado', {
              score: scores.total,
              nivel: level.label
            });

            setTimeout(() => goTo('lead-sent'), 800);
          }
        }, [
          el('input', {
            type: 'text',
            name: 'NAME',
            placeholder: 'Seu nome',
            required: 'required'
          }),
          el('input', {
            type: 'email',
            name: 'EMAIL',
            placeholder: 'Seu melhor e-mail',
            required: 'required'
          }),
          el('input', {
            type: 'text',
            name: 'email_address_check',
            value: '',
            class: 'input--hidden',
            tabindex: '-1',
            autocomplete: 'off'
          }),
          el('button', { type: 'submit', class: 'btn btn-primary btn-quiz-primary' }, ['Enviar relatório 📨']),
          el('p', { class: 'quiz-disclaimer' }, ['Ao enviar, você concorda em receber o relatório e conteúdos ocasionais sobre saúde mental. Pode descadastrar a qualquer momento.'])
        ]),
        el('button', {
          class: 'btn-link',
          onclick: () => goTo('results')
        }, ['← Voltar ao resultado'])
      ])
    ]);
    app.appendChild(container);
  }

  // -----------  LEAD SENT  -----------
  function renderLeadSent() {
    const container = el('section', { class: 'quiz-view lead-sent-view' }, [
      el('div', { class: 'container quiz-narrow center-text' }, [
        el('div', { class: 'lead-sent-icon' }, ['✅']),
        el('h1', {}, ['Pronto! Recebi seu cadastro.']),
        el('p', { class: 'quiz-lead' }, ['O relatório detalhado está a caminho. Ele deve chegar na sua caixa de entrada nos próximos minutos.']),
        el('p', {}, ['Se não aparecer, confere a caixa de spam ou promoções.']),
        el('div', { class: 'quiz-cta-group' }, [
          el('a', {
            class: 'btn btn-primary',
            href: 'https://wa.me/5567981198225?text=Ol%C3%A1!%20Acabei%20de%20fazer%20o%20Check-up%20Mental%20e%20gostaria%20de%20agendar%20uma%20consulta.',
            target: '_blank'
          }, ['💬 Agendar consulta pelo WhatsApp']),
          el('a', { class: 'btn-link', href: '../index.html' }, ['← Voltar ao site'])
        ])
      ])
    ]);
    app.appendChild(container);
  }

  // ==========================================
  // Boot
  // ==========================================
  loadState();
  // Se já tem respostas mas não terminou, mostra landing (usuário decide continuar)
  if (state.view === 'question' || state.view === 'section-intro') {
    if (Object.keys(state.answers).length === 0) {
      state.view = 'landing';
    }
  }
  render();

})();
