export type StatusType = 'ativo' | 'inativo' | 'internado' | 'alta' | 'pendente' | 'em_atendimento'
export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary'
export type AppointmentStatus = 'confirmado' | 'pendente' | 'cancelado' | 'concluido'
export type ExamStatus = 'concluido' | 'pendente' | 'em_analise'
export type SeverityLevel = 'critica' | 'moderada' | 'leve'

export interface Patient {
  id: string
  carteirinha: string
  nome: string
  cpf: string
  dataNascimento: string
  idade: number
  sexo: 'Masculino' | 'Feminino' | 'Outro'
  convenio: string
  plano?: string
  foto?: string
  avatarIniciais: string
  status: StatusType
  telefone: string
  email?: string
  endereco?: string
  medicoResponsavel?: string
  tipoSanguineo: string
  fatorRh: string
  alergias: Allergy[]
  condicoes: Condition[]
  medicamentos: Medication[]
  vacinas: Vaccine[]
  sinaisVitais: VitalSigns
  contatosEmergencia: EmergencyContact[]
  atendimentos: Appointment[]
  exames: Exam[]
  receitas: Prescription[]
  sidAlergia?: string
  ultimoAtendimento?: string
}

export interface Allergy {
  id: string
  nome: string
  reacao: string
  cid: string
  severidade: SeverityLevel
}

export interface Condition {
  id: string
  nome: string
  cid: string
  anoDiagnostico: number
  status: 'controlada' | 'ativa' | 'monitoramento'
}

export interface Medication {
  id: string
  nome: string
  dosagem: string
  frequencia: string
  categoria?: string
}

export interface Vaccine {
  id: string
  nome: string
  data: string
  proximaDose?: string
  status: 'em_dia' | 'pendente' | 'atrasada'
}

export interface VitalSigns {
  pressao: string
  pressaoStatus: string
  pulso: number
  pulsoStatus: string
  temperatura: number
  temperaturaStatus: string
  spo2: number
  spo2Status: string
  atualizadoEm: string
}

export interface EmergencyContact {
  id: string
  nome: string
  parentesco: string
  telefone: string
  prioridade: 'principal' | 'secundario'
}

export interface Appointment {
  id: string
  data: string
  hora: string
  especialidade: string
  medico: string
  notas: string
  tipo: 'consulta' | 'exame' | 'retorno' | 'emergencia'
  status?: AppointmentStatus
  pacienteId?: string
  pacienteNome?: string
}

export interface Exam {
  id: string
  nome: string
  data: string
  resultado?: string
  status: ExamStatus
  laboratorio?: string
}

export interface Prescription {
  id: string
  medicamento: string
  dosagem: string
  medico: string
  data: string
  validade: string
}

export interface Doctor {
  id: string
  nome: string
  crm: string
  especialidade: string
  email: string
  telefone: string
  status: 'disponivel' | 'ocupado' | 'ausente'
  avatarIniciais: string
  pacientesAtivos: number
}

export interface Notification {
  id: string
  titulo: string
  mensagem: string
  tipo: 'info' | 'alerta' | 'sucesso' | 'urgente'
  lida: boolean
  data: string
  link?: string
}

export interface DashboardKPI {
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: string
}

export interface UserProfile {
  id: string
  nome: string
  email: string
  cargo: string
  departamento: string
  avatarIniciais: string
  telefone: string
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string
  label: string
  sortable?: boolean
  class?: string
  mobileLabel?: string
}
