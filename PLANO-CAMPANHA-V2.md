# PLANO DE CAMPANHA — GOOGLE ADS V2

**Dra. Sofia Teixeira Gomes** · CRM-MS 14359
Atendimento 100% Online — Todo o Brasil
*Versão revisada · Abril 2026*

---

## ⚠️ Mudanças vs. plano original

| O que mudou | Por quê |
|---|---|
| Conversão principal = clique WhatsApp | A conversão antes era genérica "Lead+WhatsApp" sem implementação. Agora WhatsApp tem tracking real (já no site). |
| Conversão secundária = lead e-book | Já configurada (`Lead - E-book TDAH` apontando pra obrigado-ebook.html). |
| Estratégia inicial = **Maximizar Cliques** com CPC máx | "Maximizar Conversões" exige 30+ conversões/mês pra funcionar. Começamos coletando dados, depois migramos. |
| Estrutura: **3 grupos** (não 5) | R$40/dia distribuído em 5 grupos = ~R$8/grupo = volume insuficiente pra qualquer um deles aprender. |
| Programação: **24/7** nas primeiras 2 semanas | Saúde mental tem busca alta em horários "incomuns" (madrugada, fim de semana). Cortar perde conversões. |
| E-book "TDAH" → "**Sobrecarga Digital**" | O e-book do site mudou. |
| Adiciona ad variation com **gancho do e-book grátis** | Captura quem ainda não está pronto pra agendar — vira lead na sua lista do Brevo. |

---

## 1. Resumo Executivo

Campanha de **Rede de Pesquisa do Google** focada em capturar pacientes com alta intenção de busca por consulta psiquiátrica online. Duas vias de conversão:

1. **Conversão dura:** clique em WhatsApp para agendar consulta (objetivo principal)
2. **Conversão branda:** download do e-book "Sobrecarga Digital" via formulário de e-mail (lead que entra na newsletter)

Por que duas? A maioria dos pacientes em saúde mental não decide agendar na primeira visita. Capturando o e-mail, você nutre essa pessoa via newsletter (Brevo) até ela estar pronta.

| Item | Detalhe |
|---|---|
| Profissional | Dra. Sofia Teixeira Gomes — CRM-MS 14359 |
| Especialidade | Psiquiatria — Saúde Mental |
| Atendimento | 100% online (todo o Brasil) via videochamada |
| Tipo de Campanha | Google Search (Rede de Pesquisa apenas) |
| Landing Page | `https://sofiateixeiragomes.github.io/site-dra-sofia/` |
| WhatsApp | (85) 9117-3462 |
| **Orçamento sugerido inicial** | **R$ 40/dia (R$ 1.200/mês)** |
| CPC médio estimado | R$ 4,00 a R$ 7,00 (psiquiatria é competitivo) |
| Meta inicial | Coletar 50 conversões em 30 dias para otimização automática |

---

## 2. Estrutura da Campanha

### 2.1 Configurações gerais

| Configuração | Valor |
|---|---|
| Nome | `[Search] Consulta Psiquiatria — Dra. Sofia` |
| Rede | **Apenas Pesquisa** (desmarcar Display, parceiros e YouTube) |
| Localização | Brasil — **excluir áreas onde a busca é cara mas converte mal**: ver §2.4 |
| Idioma | Português |
| **Estratégia de lance inicial** | **Maximizar Cliques** com **CPC máximo manual de R$ 6,00** |
| **Estratégia depois de 50 conversões** | Migrar para **CPA desejado** com meta de R$ 80/agendamento |
| Orçamento Diário | R$ 40 |
| Programação | **24/7 por 2 semanas** → depois ajustar com base nos dados |
| Dispositivos | Todos. Ajuste de lance mobile **+15%** (não +20% — testar primeiro) |
| Conversões | `click_whatsapp` (primária) + `Lead - E-book TDAH` (secundária) |

### 2.2 Conversões — pré-requisitos no Google Ads

**Antes de subir a campanha**, você precisa criar a conversão de WhatsApp no Google Ads:

1. Em **Metas → Conversões** → **+ Nova ação** → **Site**
2. URL: `https://sofiateixeiragomes.github.io/site-dra-sofia/`
3. Configure:
   - **Categoria:** Contato
   - **Nome:** `Click WhatsApp`
   - **Valor:** R$ 100 (estimativa de valor de um agendamento — ajusta conforme sua realidade)
   - **Contagem:** Uma
   - **Modo de criação:** Manual (Google Tag Manager, com **evento personalizado**: `click_whatsapp`)
4. Após salvar, **me passa o novo Conversion Label** que eu adiciono o disparo no site

### 2.3 Grupos de Anúncios (3, não 5)

#### G1 — Busca direta de psiquiatra (alta intenção)
**Objetivo:** capturar quem JÁ decidiu que quer um psiquiatra.

#### G2 — Por condição (TDAH, Depressão, Ansiedade)
**Objetivo:** capturar quem busca tratamento mas ainda não decidiu profissional.

#### G3 — Modalidade online / Telemedicina
**Objetivo:** capturar quem prioriza atendimento remoto.

> **Por que só 3?** Cada grupo precisa de volume suficiente pra o algoritmo aprender. R$40/dia ÷ 3 grupos = R$13/grupo. Com 5 grupos, cada um teria R$8 = nenhum aprende.

> **Quando expandir?** Após 30 dias com 50+ conversões totais, separar G2 em 3 grupos por condição (TDAH, Depressão, Ansiedade).

### 2.4 Localização — exclusões recomendadas

Brasil inteiro **exceto**:
- Áreas com baixa renda média ou pouca penetração de telemedicina (avaliar após 30 dias)
- Inicialmente, manter Brasil todo. Após 30 dias, **excluir cidades/estados com CTR < 2% e CPA > R$ 150**.

---

## 3. Palavras-chave

### 3.1 Grupo 1 — Busca Direta

**Correspondência de frase** (entre `"aspas"`):
```
"agendar consulta psiquiatra"
"consulta psiquiatra online"
"psiquiatra particular online"
"médica psiquiatra online"
"teleconsulta psiquiatria"
"consulta psiquiátrica online"
"psiquiatra atende online"
```

**Correspondência exata** (entre `[colchetes]`):
```
[psiquiatra online]
[consulta psiquiatra]
[agendar psiquiatra]
```

### 3.2 Grupo 2 — Por Condição

**TDAH:**
```
"psiquiatra tdah adulto"
"tdah adulto tratamento"
"avaliação tdah online"
"diagnóstico tdah adulto"
[tdah adulto]
```

**Depressão:**
```
"psiquiatra para depressão"
"tratamento depressão online"
"depressão tratamento médico"
"depressão refratária tratamento"
[psiquiatra depressão]
```

**Ansiedade:**
```
"psiquiatra para ansiedade"
"ansiedade tratamento online"
"síndrome do pânico tratamento"
"toc tratamento online"
[psiquiatra ansiedade]
```

### 3.3 Grupo 3 — Online / Telemedicina

```
"psiquiatra online brasil"
"saúde mental online"
"atendimento psiquiátrico online"
"consulta médica saúde mental online"
"psiquiatra telemedicina"
[psiquiatra online]
```

### 3.4 Palavras-chave **Negativas** (ampliada)

Adicionar em **nível de campanha** (não de grupo):

**Buscas informacionais (sem intenção de compra):**
```
o que é, sintomas de, como saber, teste, quiz
autodiagnóstico, autoavaliação
significa, definição, wikipedia
```

**Públicos com baixo poder aquisitivo:**
```
SUS, posto de saúde, UBS, gratuito, grátis, gratuita
barato, preço baixo, mais barato, menor preço
plano de saúde, convênio, unimed, amil, bradesco saúde
```
> ⚠️ Se você atende plano, **remova essas últimas**.

**Carreira/curso (não pacientes):**
```
curso, faculdade, graduação, formação
residência, residente, vaga, emprego, salário
quanto ganha, onde estudar
```

**Genéricos que confundem:**
```
psicólogo, psicóloga, psicoterapia, terapeuta
remédio, medicamento, bula, genérico, posologia
```

**Localizações que você NÃO atende (se houver):**
- Adicione cidades/estados específicos como negativos

---

## 4. Anúncios Responsivos (RSA)

> **Estrutura RSA:** o Google precisa de **15 títulos** e **4 descrições** por anúncio. Quanto mais variações, melhor o algoritmo otimiza.

### 4.1 Anúncio para Grupo 1 — Busca Direta

**Títulos (15):**
```
1.  Psiquiatra Online | Agende
2.  Dra. Sofia | Médica Psiquiatra
3.  Consulta Psiquiátrica Online
4.  Atendimento Online — Brasil
5.  Agende Pelo WhatsApp Hoje
6.  CRM-MS 14359 | Online
7.  Consulta Por Videochamada
8.  Sem Lista de Espera
9.  Psiquiatria + Neurociência
10. Cuidado Real, Não Protocolo
11. Plano Personalizado Pra Você
12. Mais Que Um Diagnóstico
13. Avaliação Psiquiátrica Online
14. Atendimento Acolhedor
15. Saúde Mental Em Boas Mãos
```

**Descrições (4):**
```
1. Medicina da mente com olhar para o ser inteiro. Atendimento online para todo o Brasil.
2. Neurociência e escuta humana juntas. Sem lista de espera. Agende pelo WhatsApp.
3. Plano terapêutico personalizado para sua biologia e sua história. Consulta online.
4. CRM-MS 14359. Avaliação completa, sem julgamento, baseada em evidência científica.
```

**Ativos a fixar (Pinning):**
- Título 1 (`Psiquiatra Online | Agende`) → **Posição 1**
- Título 6 (`CRM-MS 14359 | Online`) → **Posição 3**
> Isso garante que credenciais e ação principal apareçam sempre.

### 4.2 Anúncio para Grupo 2 — Por Condição

**Títulos (15):**
```
1.  Tratamento Para [Condição]
2.  Já Tentou de Tudo? Há Saída
3.  Não É Falta de Esforço
4.  Avaliação Médica Especializada
5.  Você É Mais Que Um Diagnóstico
6.  Psiquiatra Online — Brasil
7.  Tratamento Baseado em Ciência
8.  Dra. Sofia | CRM-MS 14359
9.  Atendimento Sem Julgamento
10. Agende Pelo WhatsApp
11. Casos Refratários Atendidos
12. Neurociência + Acolhimento
13. Plano Construído Pra Você
14. Sua Biologia E Sua História
15. Cuidado Integral Online
```

> **Substituir `[Condição]`** dinamicamente — o Google faz isso via inserção de palavra-chave: `{KeyWord:Tratamento Especializado}`

**Descrições (4):**
```
1. Existe tratamento eficaz, inclusive para casos que não responderam antes. Agende avaliação.
2. Abordagem que une farmacologia de precisão e cuidado humanizado. Online para todo o Brasil.
3. Avaliação completa, sem lista de espera. Plano terapêutico baseado em evidência científica.
4. CRM-MS 14359. Atendimento online por videochamada. Sem julgamento, com escuta real.
```

### 4.3 Anúncio Variation — Gancho do E-book Gratuito (todos os grupos)

**Por que existe:** captura quem ainda não está pronto pra agendar mas vira lead na newsletter.

**Títulos (15):**
```
1.  E-book Grátis: Sobrecarga Digital
2.  Sua Atenção De Volta
3.  Por Que Você Não Foca Mais?
4.  Material Gratuito por Médica
5.  Receba Por E-mail | Grátis
6.  Dra. Sofia | Saúde Mental
7.  CRM-MS 14359 — Online
8.  Neurociência Da Concentração
9.  E-book + Avaliação Online
10. Recupere Seu Foco
11. Baseado em Ciência
12. Atendimento Online Brasil
13. Material De Médica Psiquiatra
14. Comece Pelo E-book Grátis
15. Dúvidas? Comece Aqui
```

**Descrições (4):**
```
1. E-book gratuito por médica psiquiatra. Entenda por que sua atenção está fugindo. Baixe agora.
2. Material baseado em neurociência. Após ler, opção de agendar consulta online se quiser.
3. Sem spam. Receba o e-book na hora e conteúdos sobre saúde mental. Por Dra. Sofia.
4. CRM-MS 14359. Atendimento 100% online. Comece pelo e-book ou agende direto.
```

> **Landing page deste anúncio:** `https://sofiateixeiragomes.github.io/site-dra-sofia/#ebook` (rola direto pra seção do form)

---

## 5. Extensões / Ativos

| Extensão | Conteúdo |
|---|---|
| **Sitelinks** (mín. 4) | "Sobre a Dra. Sofia" → `/#sobre` · "Especialidades" → `/#especialidades` · "Como Funciona" → `/#como-funciona` · "E-book Grátis" → `/#ebook` |
| **Frases de destaque** (4) | "Atendimento Humanizado" · "Online Todo Brasil" · "CRM-MS 14359" · "Sem Lista de Espera" |
| **Snippets estruturados** (Tipo: "Serviços") | Depressão · Ansiedade · TDAH · Bipolar · Dependência Química · Esquizofrenia |
| **Chamada (telefone)** | (85) 9117-3462 — só ativar em mobile |
| **Imagens** | Foto profissional da Dra. Sofia + capa do e-book |
| **Promoção** (opcional) | "E-book grátis com cadastro" |

---

## 6. Otimizações na Landing Page (status atual)

| Otimização | Status |
|---|---|
| ✅ CTA WhatsApp visível | Pronto (botão flutuante + hero + footer) |
| ✅ Depoimentos reais | Pronto (4 do Google Reviews) |
| ✅ E-book de captura de lead | Pronto (Brevo + obrigado page) |
| ✅ Especialidades com páginas próprias | Pronto (`/especialidades/*`) |
| ✅ Tracking de conversão Google Ads | Pronto (lead + WhatsApp) |
| 🟡 Selo CRM no topo | Pode melhorar — só aparece no badge da home |
| 🟡 PageSpeed otimizado | Avaliar com PageSpeed Insights |
| 🔴 FAQ na home | Não tem (só nas páginas de especialidade) |
| 🔴 Domínio próprio | Ainda em github.io |

---

## 7. Orçamento e Projeções (corrigidas)

> **Nota:** projeções psiquiatria online no Brasil em 2026, baseadas em médias de mercado.

| Cenário | Conservador | Moderado | Agressivo |
|---|---|---|---|
| Orçamento/dia | R$ 40 | R$ 70 | R$ 120 |
| Orçamento/mês | R$ 1.200 | R$ 2.100 | R$ 3.600 |
| CPC médio | R$ 5,50 | R$ 4,80 | R$ 4,20 |
| Cliques/mês | ~218 | ~437 | ~857 |
| Conv. rate (lead OU WhatsApp) | 6% | 8% | 10% |
| Conversões totais/mês | ~13 | ~35 | ~85 |
| Distribuição (estimada) | 5 WhatsApp + 8 leads | 12 WhatsApp + 23 leads | 30 WhatsApp + 55 leads |
| Custo por agendamento real | ~R$ 240 | ~R$ 175 | ~R$ 120 |

> **Realismo:** psiquiatria tem CPC alto e ciclo de decisão longo. Os primeiros 2-3 meses costumam ter CPA mais alto. **Conta R$ 200-300 por agendamento real nos primeiros 60 dias** — depois o algoritmo aprende e o custo cai.

---

## 8. KPIs por etapa

### Fase 1 — Aprendizado (semanas 1-2)
| Métrica | Meta |
|---|---|
| Conversões totais | 10+ |
| CTR | > 4% |
| Quality Score médio | > 5 |
| **Foco:** | identificar palavras-chave que convertem |

### Fase 2 — Otimização (semanas 3-6)
| Métrica | Meta |
|---|---|
| CPA agendamento (WhatsApp) | < R$ 200 |
| CPL e-book | < R$ 30 |
| CTR | > 6% |
| **Ação:** | migrar para `CPA desejado` |

### Fase 3 — Escala (semana 7+)
| Métrica | Meta |
|---|---|
| CPA agendamento | < R$ 120 |
| Conversões/dia | > 2 |
| **Ação:** | aumentar orçamento + expandir grupos |

---

## 9. Checklist de Implementação Atualizado

- [x] Site no ar com tracking
- [x] Tag base do Google Ads (`AW-11124369234`)
- [x] Conversão `Lead - E-book TDAH` configurada
- [x] Tracking de cliques WhatsApp (evento `click_whatsapp` no site)
- [x] Reativar conta Google Ads
- [ ] **Criar conversão `Click WhatsApp`** no Google Ads (evento personalizado via GTM)
- [ ] **Me passar o Conversion Label** dessa nova conversão pra eu adicionar o disparo
- [ ] Criar campanha conforme §2 e §3
- [ ] Subir RSAs conforme §4
- [ ] Configurar todas as extensões (§5)
- [ ] Adicionar todas as palavras negativas (§3.4)
- [ ] Ativar campanha
- [ ] **Não mexer na campanha por 7 dias** (deixar o algoritmo aprender)
- [ ] Revisar dados na semana 2 e ajustar lances/keywords ruins
