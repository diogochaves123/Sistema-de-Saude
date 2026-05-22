<script setup lang="ts">
import {
  Share2,
  Printer,
  CreditCard,
  AlertTriangle,
  Pill,
  Syringe,
  Phone,
  FileText,
  Stethoscope,
  Copy,
  IdCard,
} from 'lucide-vue-next'
import { getPatientById } from '~/data/mock/patients'
import { statusToBadge, appointmentStatusBadge, examStatusBadge } from '~/utils/status'

const route = useRoute()
const patient = computed(() => getPatientById(route.params.id as string))
const activeTab = ref('resumo')
const { success } = useToast()

const tabs = computed(() => {
  if (!patient.value) return []
  return [
    { id: 'resumo', label: 'Resumo', icon: FileText },
    { id: 'atendimentos', label: 'Atendimentos', icon: Stethoscope, count: patient.value.atendimentos.length },
    { id: 'exames', label: 'Exames', icon: FileText, count: patient.value.exames.length },
    { id: 'receitas', label: 'Receitas', icon: Pill, count: patient.value.receitas.length },
  ]
})

const copySid = () => {
  if (patient.value?.sidAlergia) {
    navigator.clipboard?.writeText(patient.value.sidAlergia)
    success('SID copiado para a área de transferência.')
  }
}

const vaccineVariant = (s: string) => {
  if (s === 'em_dia') return 'success' as const
  if (s === 'pendente') return 'warning' as const
  return 'danger' as const
}
</script>

<template>
  <div v-if="!patient" class="py-20 text-center">
    <p class="text-lg font-medium text-slate-600">Paciente não encontrado.</p>
    <NuxtLink to="/pacientes" class="btn-primary mt-4 inline-flex">Voltar à lista</NuxtLink>
  </div>
  <div v-else class="animate-fade-in space-y-6">
    <UiBreadcrumbs
      :items="[
        { label: 'Pacientes', to: '/pacientes' },
        { label: patient.nome },
      ]"
    />

    <!-- Header paciente -->
    <div class="glass-card overflow-hidden">
      <div class="bg-gradient-to-r from-hospital-800 to-hospital-600 px-6 py-8 text-white">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-center gap-5">
            <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur-sm">
              {{ patient.avatarIniciais }}
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <h1 class="text-2xl font-bold">{{ patient.nome }}</h1>
                <UiStatusBadge v-bind="statusToBadge(patient.status)" />
              </div>
              <p class="mt-1 flex items-center gap-2 text-sm text-white/80">
                <CreditCard class="h-4 w-4" />
                Carteirinha: <span class="font-mono font-semibold">{{ patient.carteirinha }}</span>
              </p>
              <p class="mt-1 text-sm text-white/70">
                {{ patient.idade }} anos · {{ patient.sexo }} · Nasc. {{ patient.dataNascimento }} · CPF {{ patient.cpf }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <NuxtLink :to="`/pacientes/${patient.id}/carteirinha`" class="btn-secondary !border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
              <IdCard class="h-4 w-4" />
              Carteirinha
            </NuxtLink>
            <button type="button" class="btn-secondary !border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
              <Share2 class="h-4 w-4" />
              Compartilhar
            </button>
            <button type="button" class="btn-secondary !border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
              <Printer class="h-4 w-4" />
              Imprimir
            </button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 border-t border-slate-100 p-4 sm:grid-cols-4 dark:border-slate-800">
        <div class="text-center sm:text-left">
          <p class="text-xs text-slate-500">Convênio</p>
          <p class="font-semibold text-slate-900 dark:text-white">{{ patient.convenio }}</p>
        </div>
        <div class="text-center sm:text-left">
          <p class="text-xs text-slate-500">Tipo sanguíneo</p>
          <p class="text-xl font-bold text-red-600">{{ patient.tipoSanguineo }}</p>
        </div>
        <div class="text-center sm:text-left">
          <p class="text-xs text-slate-500">Médico responsável</p>
          <p class="font-semibold text-slate-900 dark:text-white">{{ patient.medicoResponsavel ?? '—' }}</p>
        </div>
        <div class="text-center sm:text-left">
          <p class="text-xs text-slate-500">Telefone</p>
          <p class="font-semibold text-slate-900 dark:text-white">{{ patient.telefone }}</p>
        </div>
      </div>
    </div>

    <UiTabs v-model="activeTab" :tabs="tabs" />

    <!-- Tab: Resumo -->
    <div v-show="activeTab === 'resumo'" class="space-y-6">
      <PatientVitalSignsGrid :vitals="patient.sinaisVitais" />

      <div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <!-- Alergias -->
        <div class="glass-card border-2 border-red-200 p-5 dark:border-red-900/50 lg:col-span-1">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <AlertTriangle class="h-5 w-5 text-red-500" />
              <h3 class="section-title">Alergias</h3>
            </div>
            <UiStatusBadge label="Crítica" variant="danger" />
          </div>
          <ul v-if="patient.alergias.length" class="space-y-3">
            <li v-for="a in patient.alergias" :key="a.id" class="rounded-xl bg-red-50 p-3 dark:bg-red-950/30">
              <p class="font-bold text-red-800 dark:text-red-300">{{ a.nome }}</p>
              <p class="text-sm text-red-600 dark:text-red-400">{{ a.reacao }}</p>
              <p class="mt-1 font-mono text-xs text-slate-500">CID {{ a.cid }}</p>
            </li>
          </ul>
          <p v-else class="text-sm text-slate-500">Nenhuma alergia registrada.</p>
          <div v-if="patient.sidAlergia" class="mt-4 rounded-xl border border-dashed border-red-200 p-3 dark:border-red-800">
            <p class="text-xs font-semibold text-slate-500">SID da Alergia</p>
            <p class="font-mono text-sm font-bold text-slate-900 dark:text-white">{{ patient.sidAlergia }}</p>
            <button type="button" class="mt-2 flex items-center gap-1 text-xs font-medium text-hospital-600 hover:underline" @click="copySid">
              <Copy class="h-3.5 w-3.5" /> Copiar
            </button>
          </div>
        </div>

        <!-- Vacinação -->
        <div class="glass-card p-5">
          <div class="mb-4 flex items-center gap-2">
            <Syringe class="h-5 w-5 text-emerald-500" />
            <h3 class="section-title">Vacinação</h3>
          </div>
          <ul class="space-y-2">
            <li v-for="v in patient.vacinas" :key="v.id" class="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/50">
              <div>
                <p class="text-sm font-medium">{{ v.nome }}</p>
                <p class="text-xs text-slate-500">{{ v.data }}</p>
              </div>
              <UiStatusBadge :label="v.status === 'em_dia' ? 'Em dia' : 'Pendente'" :variant="vaccineVariant(v.status)" />
            </li>
          </ul>
        </div>

        <!-- Tipo sanguíneo -->
        <div class="glass-card p-5 text-center">
          <h3 class="section-title mb-4">Tipo Sanguíneo</h3>
          <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-3xl font-bold text-red-600 dark:bg-red-950/50">
            {{ patient.tipoSanguineo }}
          </div>
          <p class="mt-2 text-sm font-medium text-slate-600">{{ patient.fatorRh }}</p>
          <p class="mt-4 text-xs text-slate-500">Fenótipo RhD · Compatibilidade registrada no prontuário</p>
        </div>

        <!-- Condições -->
        <div class="glass-card p-5">
          <h3 class="section-title mb-4">Problemas / Condições</h3>
          <ul class="space-y-2">
            <li v-for="c in patient.condicoes" :key="c.id" class="rounded-lg border border-slate-100 p-3 dark:border-slate-800">
              <p class="font-medium text-slate-900 dark:text-white">{{ c.nome }}</p>
              <p class="text-xs text-slate-500">CID {{ c.cid }} · Desde {{ c.anoDiagnostico }}</p>
            </li>
          </ul>
        </div>

        <!-- Medicamentos -->
        <div class="glass-card p-5">
          <div class="mb-4 flex items-center gap-2">
            <Pill class="h-5 w-5 text-violet-500" />
            <h3 class="section-title">Medicamentos Contínuos</h3>
          </div>
          <ul class="space-y-2">
            <li v-for="m in patient.medicamentos" :key="m.id" class="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
              <p class="font-medium">{{ m.nome }} {{ m.dosagem }}</p>
              <p class="text-xs text-slate-500">{{ m.frequencia }}</p>
            </li>
          </ul>
        </div>

        <!-- Contatos -->
        <div class="glass-card p-5">
          <div class="mb-4 flex items-center gap-2">
            <Phone class="h-5 w-5 text-hospital-500" />
            <h3 class="section-title">Contatos de Emergência</h3>
          </div>
          <ul class="space-y-3">
            <li v-for="c in patient.contatosEmergencia" :key="c.id" class="flex items-center justify-between">
              <div>
                <p class="font-medium">{{ c.nome }}</p>
                <p class="text-xs text-slate-500">{{ c.parentesco }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-hospital-600">{{ c.telefone }}</p>
                <UiStatusBadge :label="c.prioridade === 'principal' ? 'Principal' : 'Secundário'" :variant="c.prioridade === 'principal' ? 'primary' : 'neutral'" size="sm" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Últimos atendimentos preview -->
      <div class="glass-card p-5">
        <h3 class="section-title mb-4">Últimos Atendimentos</h3>
        <div class="space-y-3">
          <div
            v-for="at in patient.atendimentos.slice(0, 3)"
            :key="at.id"
            class="flex flex-col gap-2 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center dark:border-slate-800"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-hospital-50 dark:bg-hospital-950">
              <Stethoscope class="h-5 w-5 text-hospital-600" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium">{{ at.especialidade }} — {{ at.medico }}</p>
              <p class="text-sm text-slate-500">{{ at.data }} às {{ at.hora }}</p>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ at.notas }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Atendimentos -->
    <div v-show="activeTab === 'atendimentos'" class="glass-card divide-y divide-slate-100 dark:divide-slate-800">
      <div v-for="at in patient.atendimentos" :key="at.id" class="flex flex-col gap-2 p-5 sm:flex-row sm:items-center">
        <div class="flex-1">
          <p class="font-semibold">{{ at.especialidade }}</p>
          <p class="text-sm text-slate-500">{{ at.medico }} · {{ at.data }} {{ at.hora }}</p>
          <p class="mt-2 text-sm">{{ at.notas }}</p>
        </div>
        <UiStatusBadge v-bind="appointmentStatusBadge(at.status)" />
      </div>
    </div>

    <!-- Tab: Exames -->
    <div v-show="activeTab === 'exames'">
      <UiDataTable
        :columns="[
          { key: 'nome', label: 'Exame' },
          { key: 'data', label: 'Data' },
          { key: 'status', label: 'Status' },
          { key: 'resultado', label: 'Resultado' },
        ]"
        :data="patient.exames"
        empty-message="Nenhum exame registrado."
      >
        <template #cell-status="{ row }">
          <UiStatusBadge v-bind="examStatusBadge(row.status)" />
        </template>
      </UiDataTable>
    </div>

    <!-- Tab: Receitas -->
    <div v-show="activeTab === 'receitas'" class="grid gap-4 sm:grid-cols-2">
      <div v-for="r in patient.receitas" :key="r.id" class="glass-card p-5">
        <Pill class="h-5 w-5 text-violet-500" />
        <p class="mt-3 font-bold text-slate-900 dark:text-white">{{ r.medicamento }}</p>
        <p class="text-sm text-slate-500">{{ r.dosagem }}</p>
        <p class="mt-2 text-xs text-slate-500">Dr(a). {{ r.medico }}</p>
        <p class="text-xs text-slate-400">Emitida {{ r.data }} · Válida até {{ r.validade }}</p>
      </div>
    </div>
  </div>
</template>
