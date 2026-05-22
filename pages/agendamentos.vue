<script setup lang="ts">
import { Plus, Calendar } from 'lucide-vue-next'
import { scheduledAppointments } from '~/data/mock/appointments'
import { appointmentStatusBadge } from '~/utils/status'

const filter = ref<string | null>(null)
const showModal = ref(false)
const { success } = useToast()

const filtered = computed(() => {
  if (!filter.value) return scheduledAppointments
  return scheduledAppointments.filter((a) => a.status === filter.value)
})

const columns = [
  { key: 'data', label: 'Data', sortable: true },
  { key: 'hora', label: 'Hora', sortable: true },
  { key: 'pacienteNome', label: 'Paciente', sortable: true },
  { key: 'especialidade', label: 'Especialidade' },
  { key: 'medico', label: 'Médico' },
  { key: 'status', label: 'Status' },
]

const newAppointment = () => {
  showModal.value = false
  success('Agendamento criado com sucesso! (simulação)')
}
</script>

<template>
  <div class="animate-fade-in space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Agendamentos' }]" />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Agendamentos</h1>
        <p class="mt-1 text-sm text-slate-500">Gerenciamento de consultas e retornos</p>
      </div>
      <button type="button" class="btn-primary" @click="showModal = true">
        <Plus class="h-4 w-4" />
        Novo Agendamento
      </button>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-4">
        <div class="flex gap-2 overflow-x-auto">
          <button
            v-for="opt in [null, 'confirmado', 'pendente', 'cancelado']"
            :key="String(opt)"
            type="button"
            class="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium"
            :class="filter === opt ? 'bg-hospital-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800'"
            @click="filter = opt"
          >
            {{ opt ?? 'Todos' }}
          </button>
        </div>
        <UiDataTable :columns="columns" :data="filtered">
          <template #cell-pacienteNome="{ row }">
            <NuxtLink v-if="row.pacienteId" :to="`/pacientes/${row.pacienteId}`" class="font-medium text-hospital-600 hover:underline">
              {{ row.pacienteNome }}
            </NuxtLink>
          </template>
          <template #cell-status="{ row }">
            <UiStatusBadge v-bind="appointmentStatusBadge(row.status)" />
          </template>
        </UiDataTable>
      </div>
      <CalendarWidget />
    </div>

    <UiModal v-model="showModal" title="Novo Agendamento" size="md">
      <div class="space-y-4">
        <UiFormInput label="Paciente" placeholder="Nome do paciente" />
        <div class="grid grid-cols-2 gap-4">
          <UiFormInput label="Data" type="date" />
          <UiFormInput label="Hora" type="time" />
        </div>
        <UiFormInput label="Especialidade" placeholder="Ex: Cardiologia" />
        <UiFormInput label="Médico" placeholder="Nome do médico" />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button type="button" class="btn-secondary" @click="showModal = false">Cancelar</button>
          <button type="button" class="btn-primary" @click="newAppointment">Confirmar</button>
        </div>
      </template>
    </UiModal>
  </div>
</template>
