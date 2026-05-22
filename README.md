# SisMed — Sistema de Gestão Hospitalar

<p align="center">
  <strong>Sistema web interno para clínicas e hospitais</strong><br>
  Interface moderna, responsiva e pronta para uso pela equipe hospitalar
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-3-00DC82?style=flat-square&logo=nuxt.js&logoColor=white" alt="Nuxt 3" />
  <img src="https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Frontend-Only-8B5CF6?style=flat-square" alt="Frontend Only" />
</p>

---

## Sobre o projeto

O **SisMed** é um sistema de gestão hospitalar desenvolvido para uso **interno** em clínicas e hospitais — por recepcionistas, médicos e equipe administrativa. Cada paciente possui uma **carteirinha hospitalar** com número de identificação, integrada à busca e ao perfil clínico.

Este repositório contém uma aplicação **100% frontend**: dados mockados localmente, sem backend, banco de dados ou autenticação real. O foco é **UX/UI premium**, componentes reutilizáveis, performance e experiência semelhante a plataformas SaaS médicas modernas.

### Público-alvo

- Recepção e cadastro de pacientes
- Consulta rápida de informações clínicas
- Visualização de alergias críticas, sinais vitais e medicamentos
- Gestão visual de agendamentos, exames e receitas
- Identificação por **número da carteirinha**

---

## Demonstração rápida

| Ação | Como testar |
|------|-------------|
| Dashboard | Acesse `/` após iniciar o projeto |
| Perfil completo | `/pacientes/1` — Maria Helena Russo |
| Carteirinha digital | `/pacientes/1/carteirinha` |
| Busca por carteirinha | No header, digite `HSP-2024-001982` |

---

## Funcionalidades

### Módulos principais

| Módulo | Rota | Descrição |
|--------|------|-----------|
| Dashboard | `/` | KPIs, gráficos, calendário, alertas críticos |
| Pacientes | `/pacientes` | Lista, busca, filtros por status |
| Novo paciente | `/pacientes/novo` | Cadastro com geração de carteirinha |
| Perfil do paciente | `/pacientes/:id` | Prontuário resumido com abas |
| Carteirinha digital | `/pacientes/:id/carteirinha` | Cartão médico frente/verso |
| Agendamentos | `/agendamentos` | Consultas e modal de agendamento |
| Médicos | `/medicos` | Corpo clínico e disponibilidade |
| Histórico | `/historico` | Atendimentos consolidados |
| Exames | `/exames` | Status e resultados |
| Receitas | `/receitas` | Prescrições emitidas |
| Notificações | `/notificacoes` | Central de avisos |
| Configurações | `/configuracoes` | Preferências e tema |
| Perfil do usuário | `/perfil` | Dados do profissional logado |

### Recursos de interface

- Sidebar elegante (desktop) e **drawer** (mobile)
- Busca por **nome, CPF, convênio ou carteirinha**
- Tabelas interativas com ordenação (desktop) e **cards** (mobile)
- Badges de status coloridos
- Modais, toasts, skeleton loading e breadcrumbs
- Abas no perfil do paciente
- Gráficos simulados (barras e donut)
- Widget de calendário com agendamentos
- **Dark mode** funcional com persistência local
- Transições suaves entre páginas
- Microinterações e hover states

### Dados clínicos no perfil

- Sinais vitais (PA, pulso, temperatura, SpO₂)
- Alergias com severidade e CID
- SID de alergia (identificação de emergência)
- Tipo sanguíneo e fator Rh
- Condições crônicas e medicamentos contínuos
- Vacinação com status (em dia / pendente)
- Contatos de emergência
- Últimos atendimentos, exames e receitas

---

## Tecnologias

| Tecnologia | Uso |
|------------|-----|
| [Nuxt 3](https://nuxt.com/) | Framework Vue com SSR, rotas e estrutura |
| [Vue 3](https://vuejs.org/) | Composition API e reatividade |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utility-first |
| [Lucide Icons](https://lucide.dev/) | Ícones consistentes |

---

## Pré-requisitos

- **Node.js** 18.x ou superior (recomendado 20+)
- **npm** 9+ (ou pnpm/yarn)

---

## Instalação e execução

### 1. Clonar o repositório

```bash
git clone https://github.com/diogochaves123/Sistema-de-Saude.git
cd Sistema-de-Saude
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Modo desenvolvimento

```bash
npm run dev
```

Abra no navegador: **http://localhost:3000**

### 4. Build de produção

```bash
npm run build
npm run preview
```

### Outros scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build para produção |
| `npm run preview` | Preview do build local |
| `npm run generate` | Geração estática (SSG) |

---

## Estrutura do projeto

```
├── assets/css/          # Estilos globais e utilitários Tailwind
├── components/
│   ├── charts/          # Gráficos simulados (barra, donut)
│   ├── layout/          # Sidebar, Header, MobileSidebar
│   ├── patient/         # PatientCard, PatientIDCard, VitalSignsGrid
│   └── ui/              # DataTable, Modal, Toast, Tabs, etc.
├── composables/         # useTheme, useToast, usePatients, useSidebar
├── data/mock/           # Pacientes, médicos, agendamentos (JSON-like)
├── layouts/             # Layout padrão com navegação
├── pages/               # Rotas automáticas do Nuxt
├── types/               # Interfaces TypeScript
├── utils/               # Helpers (status badges, etc.)
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Componentes reutilizáveis

| Componente | Descrição |
|------------|-----------|
| `AppSidebar` | Navegação lateral recolhível (desktop) |
| `MobileSidebar` | Menu drawer para telas pequenas |
| `AppHeader` | Barra superior com busca e tema |
| `PatientCard` | Card resumido do paciente |
| `PatientIDCard` | Carteirinha digital (frente/verso) |
| `DataTable` | Tabela responsiva com ordenação |
| `StatsCard` | KPI do dashboard |
| `Modal` | Diálogo moderno |
| `FormInput` | Campo de formulário padronizado |
| `StatusBadge` | Badge de status colorido |
| `CalendarWidget` | Calendário com agendamentos |
| `NotificationDropdown` | Dropdown de notificações |
| `ToastContainer` | Notificações toast |
| `SkeletonLoader` | Estados de carregamento |

---

## Composables

| Composable | Função |
|------------|--------|
| `useTheme()` | Dark mode com `localStorage` |
| `useToast()` | Mensagens success / error / info / warning |
| `usePatients()` | Busca, filtros e listagem de pacientes |
| `useSidebar()` | Estado do menu mobile e colapso |
| `useModal()` | Controle de modais globais |

---

## Pacientes de demonstração (mock)

| Nome | Carteirinha | Status | Destaque |
|------|---------------|--------|----------|
| Maria Helena Russo | `HSP-2024-001982` | Ativo | Alergias críticas, perfil completo do design |
| Carlos Eduardo Mendes | `HSP-2024-002145` | Em atendimento | Diabetes |
| Ana Beatriz Oliveira | `HSP-2024-003087` | Ativo | Perfil saudável |
| Roberto Ferreira Lima | `HSP-2024-004521` | Internado | Cardiologia / emergência |
| Fernanda Costa Silva | `HSP-2024-005890` | Ativo | Hipotireoidismo |

Os dados estão em `data/mock/patients.ts` e podem ser editados livremente.

---

## Responsividade

O sistema foi projetado **mobile-first** e testado para:

- Desktop e notebooks
- Tablets
- Smartphones

No mobile: sidebar vira drawer, tabelas viram cards empilhados, botões e inputs com área de toque adequada.

---

## Paleta e identidade visual

- **Primária:** azul hospitalar (`hospital-*` no Tailwind)
- **Alerta:** vermelho para alergias críticas
- **Sucesso / aviso:** verde e âmbar para status
- **Tipografia:** Inter (Google Fonts)
- **Estilo:** cards com sombra suave, bordas arredondadas, visual SaaS premium

---

## Limitações (por design)

Este projeto é uma **demonstração frontend**:

- Não há API, banco de dados ou persistência real
- Cadastros e ações exibem toasts de simulação
- Autenticação não está implementada
- Ideal para protótipo, portfólio e evolução futura com backend

---

## Roadmap sugerido

- [ ] API REST ou GraphQL (Node, .NET, etc.)
- [ ] Autenticação e perfis (recepção, médico, admin)
- [ ] Banco de dados (PostgreSQL / Supabase)
- [ ] Impressão/PDF da carteirinha
- [ ] Integração com laboratórios e PACS
- [ ] Auditoria e LGPD

---

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m "feat: descrição da alteração"`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## Licença

Este projeto está disponível para fins educacionais e de portfólio. Consulte o autor para uso comercial.

---

## Autor

**Diogo Chaves**

- Repositório: [github.com/diogochaves123/Sistema-de-Saude](https://github.com/diogochaves123/Sistema-de-Saude)

---

<p align="center">
  Desenvolvido com foco em experiência do usuário e qualidade visual para ambientes hospitalares modernos.
</p>
