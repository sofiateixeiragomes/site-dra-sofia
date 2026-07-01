// ==========================================
// Autoavaliação de Saúde Mental
// Escalas: WHO-5, PHQ-2, GAD-2, ASRS-6 (adaptações validadas)
// ==========================================

window.QUIZ_DATA = {

  sections: [
    {
      id: 'emocional',
      title: 'Estado Emocional',
      subtitle: 'Como você tem se sentido nas últimas 2 semanas',
      description: 'Esta parte olha para o seu humor, energia e satisfação com a vida no período recente. Usa escalas validadas mundialmente (WHO-5, PHQ-2, GAD-2).',
      illustration: '🌤️',
      color: '#7A8B6F',
      maxRaw: 40,
      questions: [
        // WHO-5 (bem-estar) — 5-point (0=nunca, 5=sempre)
        { id: 'e1', text: 'Senti-me alegre e de bom humor', scale: 'freq6', invert: false, weight: 1, source: 'WHO-5' },
        { id: 'e2', text: 'Senti-me calmo(a) e relaxado(a)', scale: 'freq6', invert: false, weight: 1, source: 'WHO-5' },
        { id: 'e3', text: 'Senti-me com energia e ativo(a)', scale: 'freq6', invert: false, weight: 1, source: 'WHO-5' },
        { id: 'e4', text: 'Acordei descansado(a) e revigorado(a)', scale: 'freq6', invert: false, weight: 1, source: 'WHO-5' },
        { id: 'e5', text: 'Meu dia esteve cheio de coisas que me interessam', scale: 'freq6', invert: false, weight: 1, source: 'WHO-5' },
        // PHQ-2 (rastreio depressão) — invertidas
        { id: 'e6', text: 'Tive pouco interesse ou prazer em fazer as coisas', scale: 'freq4', invert: true, weight: 1.25, source: 'PHQ-2' },
        { id: 'e7', text: 'Senti-me para baixo, deprimido(a) ou sem esperança', scale: 'freq4', invert: true, weight: 1.25, source: 'PHQ-2' },
        // GAD-2 (rastreio ansiedade) — invertidas
        { id: 'e8', text: 'Senti-me nervoso(a), ansioso(a) ou muito tenso(a)', scale: 'freq4', invert: true, weight: 1.25, source: 'GAD-2' },
        { id: 'e9', text: 'Não consegui parar ou controlar as preocupações', scale: 'freq4', invert: true, weight: 1.25, source: 'GAD-2' },
        // Satisfação global
        { id: 'e10', text: 'De modo geral, estou satisfeito(a) com como minha vida está indo', scale: 'agree5', invert: false, weight: 1, source: 'Satisfação' },
      ]
    },
    {
      id: 'cognicao',
      title: 'Foco e Cognição',
      subtitle: 'Sua atenção, organização e autorregulação',
      description: 'Esta parte olha para funções executivas: foco, memória de trabalho, gestão de tempo e regulação emocional. Baseado no ASRS-6, escala da OMS para rastreio de TDAH em adultos.',
      illustration: '🧠',
      color: '#A3B18A',
      maxRaw: 32,
      questions: [
        // ASRS-6 (rastreio TDAH) — 5-point (0=nunca, 4=muito frequentemente) — invertidas
        { id: 'c1', text: 'Tive dificuldade em finalizar os detalhes de um projeto, depois que as partes mais desafiadoras já foram feitas', scale: 'freq5', invert: true, weight: 1, source: 'ASRS-6' },
        { id: 'c2', text: 'Tive dificuldade em manter as coisas organizadas quando precisei fazer tarefas que exigem organização', scale: 'freq5', invert: true, weight: 1, source: 'ASRS-6' },
        { id: 'c3', text: 'Tive problemas para lembrar de compromissos ou obrigações', scale: 'freq5', invert: true, weight: 1, source: 'ASRS-6' },
        { id: 'c4', text: 'Ao começar uma tarefa que exige muito pensamento, evitei ou adiei o começo', scale: 'freq5', invert: true, weight: 1, source: 'ASRS-6' },
        { id: 'c5', text: 'Senti-me agitado(a) ou inquieto(a), com necessidade de me mexer, quando precisei ficar sentado(a) por longo período', scale: 'freq5', invert: true, weight: 1, source: 'ASRS-6' },
        { id: 'c6', text: 'Senti-me com energia excessiva, como se fosse movido(a) por um motor', scale: 'freq5', invert: true, weight: 1, source: 'ASRS-6' },
        // Complementares (percepção de tempo, sensibilidade)
        { id: 'c7', text: 'Perdi a noção do tempo ou subestimei quanto uma tarefa levaria', scale: 'freq5', invert: true, weight: 1, source: 'Complementar' },
        { id: 'c8', text: 'Uma crítica ou sinal de rejeição me afetou de forma desproporcional', scale: 'freq5', invert: true, weight: 1, source: 'Complementar' },
      ]
    },
    {
      id: 'estilo',
      title: 'Estilo de Vida',
      subtitle: 'A base biológica e social que sustenta seu cérebro',
      description: 'Sono, movimento, vínculos, alimentação e nível de estresse afetam diretamente sua saúde mental. Não são "dicas de bem-estar", são pilares.',
      illustration: '🌱',
      color: '#C4A35A',
      maxRaw: 28,
      questions: [
        { id: 'l1', text: 'Durmo em média entre 7 e 9 horas por noite', scale: 'freq5', invert: false, weight: 1, source: 'Sono' },
        { id: 'l2', text: 'Faço pelo menos 150 minutos de atividade física moderada por semana (caminhada rápida, corrida, dança, esportes...)', scale: 'freq5', invert: false, weight: 1, source: 'Movimento' },
        { id: 'l3', text: 'Como refeições variadas e regulares durante o dia', scale: 'freq5', invert: false, weight: 1, source: 'Alimentação' },
        { id: 'l4', text: 'Tenho pessoas com quem posso contar e conversar sobre coisas importantes', scale: 'freq5', invert: false, weight: 1, source: 'Vínculos' },
        { id: 'l5', text: 'Consigo separar tempo para atividades que trazem prazer ou sentido', scale: 'freq5', invert: false, weight: 1, source: 'Propósito' },
        { id: 'l6', text: 'Minha situação financeira ou de trabalho me causa estresse significativo', scale: 'freq5', invert: true, weight: 1, source: 'Estresse' },
        { id: 'l7', text: 'Uso álcool, tabaco ou outras substâncias mais do que gostaria', scale: 'freq5', invert: true, weight: 1, source: 'Substâncias' },
      ]
    }
  ],

  // Escalas de resposta
  scales: {
    freq6: {
      // WHO-5: 0-5, quanto maior melhor (quando invert=false)
      options: [
        { label: 'Sempre', value: 5 },
        { label: 'Na maior parte do tempo', value: 4 },
        { label: 'Mais da metade do tempo', value: 3 },
        { label: 'Menos da metade do tempo', value: 2 },
        { label: 'Raramente', value: 1 },
        { label: 'Nunca', value: 0 },
      ],
      max: 5
    },
    freq5: {
      // 0-4, quanto menor melhor (quando invert=true) ou maior (quando invert=false)
      options: [
        { label: 'Muito frequentemente', value: 4 },
        { label: 'Frequentemente', value: 3 },
        { label: 'Às vezes', value: 2 },
        { label: 'Raramente', value: 1 },
        { label: 'Nunca', value: 0 },
      ],
      max: 4
    },
    freq4: {
      // PHQ/GAD: 0-3
      options: [
        { label: 'Quase todo dia', value: 3 },
        { label: 'Mais da metade dos dias', value: 2 },
        { label: 'Vários dias', value: 1 },
        { label: 'Nenhum dia', value: 0 },
      ],
      max: 3
    },
    agree5: {
      // Concordância 0-4
      options: [
        { label: 'Concordo totalmente', value: 4 },
        { label: 'Concordo', value: 3 },
        { label: 'Neutro', value: 2 },
        { label: 'Discordo', value: 1 },
        { label: 'Discordo totalmente', value: 0 },
      ],
      max: 4
    }
  },

  // Interpretações do score final (0-100)
  levels: [
    {
      min: 0, max: 25,
      label: 'Precisa de Atenção',
      color: '#c85050',
      description: 'Vários sinais indicam que sua saúde mental está sob pressão significativa neste momento. Isso não define quem você é, mas sinaliza que buscar avaliação médica especializada faz muito sentido.',
      recommend: 'consulta'
    },
    {
      min: 26, max: 50,
      label: 'Se Cuidando',
      color: '#d4a04a',
      description: 'Há sinais importantes de sobrecarga em algumas áreas. Este é um bom momento para olhar com mais atenção para o que está acontecendo e considerar uma avaliação.',
      recommend: 'consulta'
    },
    {
      min: 51, max: 75,
      label: 'Em Equilíbrio',
      color: '#7A8B6F',
      description: 'Você está indo bem no geral, com algumas áreas que podem se beneficiar de atenção. Ajustes pequenos podem trazer diferenças grandes.',
      recommend: 'ajustes'
    },
    {
      min: 76, max: 100,
      label: 'Florescendo',
      color: '#5C6B4F',
      description: 'Excelente! Você mantém uma base sólida de bem-estar mental em várias dimensões. Continue investindo no que já está funcionando.',
      recommend: 'manutencao'
    }
  ],

  // Interpretações por área (0-100 dentro da seção)
  areaLevels: [
    { min: 0, max: 40, label: 'Precisa de atenção', color: '#c85050' },
    { min: 41, max: 60, label: 'Merece cuidado', color: '#d4a04a' },
    { min: 61, max: 80, label: 'Base razoável', color: '#7A8B6F' },
    { min: 81, max: 100, label: 'Excelente', color: '#5C6B4F' }
  ],

  // Sugestões de leitura conforme área
  areaSuggestions: {
    emocional: {
      title: 'Sobre seu estado emocional',
      good: 'Sua base emocional está bem. Manter rotina de sono, vínculos e prazer diário são pilares que sustentam isso.',
      medium: 'Alguns sinais de humor rebaixado ou ansiedade elevada apareceram. Vale observar se persistem por mais de 2 semanas.',
      low: 'Vários sinais compatíveis com quadros de humor ou ansiedade. Isso não é fraqueza, é biologia pedindo cuidado. Uma avaliação médica pode identificar o que está por trás.',
      linkText: 'Ver mais sobre depressão e ansiedade',
      linkUrl: '../especialidades/depressao.html'
    },
    cognicao: {
      title: 'Sobre seu foco e cognição',
      good: 'Suas funções executivas estão funcionando bem. Continue respeitando os limites naturais do seu cérebro.',
      medium: 'Alguns sinais de dificuldade com foco, organização e regulação emocional. Pode ser TDAH, exaustão ou ambos.',
      low: 'Vários sinais compatíveis com o padrão de TDAH no adulto. Isso não é falta de esforço, é uma diferença neurobiológica que responde muito bem ao cuidado certo.',
      linkText: 'Ver mais sobre TDAH no adulto',
      linkUrl: '../especialidades/tdah-adulto.html'
    },
    estilo: {
      title: 'Sobre seu estilo de vida',
      good: 'Você mantém pilares importantes: sono, movimento, vínculos. Isso protege seu cérebro.',
      medium: 'Alguns pilares estão fragilizados. Sono, movimento e vínculos afetam diretamente humor e cognição.',
      low: 'Vários pilares biológicos e sociais estão comprometidos. Isso amplifica qualquer sintoma emocional ou cognitivo. Cuidar desses pilares é parte do tratamento.',
      linkText: 'Como funciona o atendimento',
      linkUrl: '../index.html#como-funciona'
    }
  },

  // Sinais de crise (se PHQ/GAD altos, mostrar CVV em destaque)
  crisisThreshold: {
    // Se e6+e7 >= 5 (PHQ-2 positivo), sinaliza rastreio de depressão importante
    // Se e8+e9 >= 5 (GAD-2 positivo), sinaliza rastreio de ansiedade importante
    phqIds: ['e6', 'e7'],
    gadIds: ['e8', 'e9'],
    threshold: 5
  }
};
