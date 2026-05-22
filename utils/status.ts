import type { BadgeVariant, StatusType } from '~/types'

export function statusToBadge(status: StatusType): { label: string; variant: BadgeVariant } {
  const map: Record<StatusType, { label: string; variant: BadgeVariant }> = {
    ativo: { label: 'Ativo', variant: 'success' },
    inativo: { label: 'Inativo', variant: 'neutral' },
    internado: { label: 'Internado', variant: 'danger' },
    alta: { label: 'Alta', variant: 'info' },
    pendente: { label: 'Pendente', variant: 'warning' },
    em_atendimento: { label: 'Em atendimento', variant: 'primary' },
  }
  return map[status] ?? { label: status, variant: 'neutral' }
}

export function appointmentStatusBadge(status?: string): { label: string; variant: BadgeVariant } {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    confirmado: { label: 'Confirmado', variant: 'success' },
    pendente: { label: 'Pendente', variant: 'warning' },
    cancelado: { label: 'Cancelado', variant: 'danger' },
    concluido: { label: 'Concluído', variant: 'info' },
  }
  return map[status ?? ''] ?? { label: status ?? '—', variant: 'neutral' }
}

export function examStatusBadge(status: string): { label: string; variant: BadgeVariant } {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    concluido: { label: 'Concluído', variant: 'success' },
    pendente: { label: 'Pendente', variant: 'warning' },
    em_analise: { label: 'Em análise', variant: 'info' },
  }
  return map[status] ?? { label: status, variant: 'neutral' }
}
