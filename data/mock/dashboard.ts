import type { DashboardKPI } from '~/types'

export const dashboardKPIs: DashboardKPI[] = [
  { label: 'Pacientes Ativos', value: 1247, change: '+12%', trend: 'up', icon: 'Users' },
  { label: 'Atendimentos Hoje', value: 38, change: '+5', trend: 'up', icon: 'Stethoscope' },
  { label: 'Internados', value: 24, change: '-2', trend: 'down', icon: 'Bed' },
  { label: 'Exames Pendentes', value: 15, change: '3 urgentes', trend: 'neutral', icon: 'FlaskConical' },
]

export const chartData = {
  atendimentosSemana: [
    { dia: 'Seg', valor: 42 },
    { dia: 'Ter', valor: 38 },
    { dia: 'Qua', valor: 45 },
    { dia: 'Qui', valor: 52 },
    { dia: 'Sex', valor: 38 },
    { dia: 'Sáb', valor: 18 },
    { dia: 'Dom', valor: 8 },
  ],
  especialidades: [
    { nome: 'Clínico Geral', percentual: 28, cor: '#2563eb' },
    { nome: 'Cardiologia', percentual: 22, cor: '#7c3aed' },
    { nome: 'Endocrinologia', percentual: 15, cor: '#0891b2' },
    { nome: 'Ginecologia', percentual: 12, cor: '#db2777' },
    { nome: 'Outros', percentual: 23, cor: '#64748b' },
  ],
}
