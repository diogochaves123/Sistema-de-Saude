import type { Notification } from '~/types'

export const notifications: Notification[] = [
  {
    id: 'n1',
    titulo: 'Alergia crítica registrada',
    mensagem: 'Paciente Maria Helena Russo — reação anafilática à Penicilina.',
    tipo: 'urgente',
    lida: false,
    data: 'Há 15 min',
    link: '/pacientes/1',
  },
  {
    id: 'n2',
    titulo: 'Exame pendente',
    mensagem: 'Glicemia em jejum de Maria Helena aguarda coleta.',
    tipo: 'alerta',
    lida: false,
    data: 'Há 1 hora',
    link: '/exames',
  },
  {
    id: 'n3',
    titulo: 'Internação',
    mensagem: 'Roberto Ferreira Lima internado — Cardiologia.',
    tipo: 'info',
    lida: true,
    data: 'Há 3 horas',
    link: '/pacientes/4',
  },
  {
    id: 'n4',
    titulo: 'Agendamento confirmado',
    mensagem: 'Consulta de Fernanda Costa confirmada para 23/05.',
    tipo: 'sucesso',
    lida: true,
    data: 'Ontem',
    link: '/agendamentos',
  },
  {
    id: 'n5',
    titulo: 'Vacina pendente',
    mensagem: 'Herpes Zóster — Maria Helena precisa agendar dose.',
    tipo: 'alerta',
    lida: false,
    data: 'Ontem',
    link: '/pacientes/1',
  },
]
