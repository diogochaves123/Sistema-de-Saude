<script setup lang="ts">
import { Stethoscope } from 'lucide-vue-next'
import { patients } from '~/data/mock/patients'
import { appointmentStatusBadge } from '~/utils/status'

const allAppointments = computed(() =>
  patients.flatMap((p) =>
    p.atendimentos.map((a) => ({
      ...a,
      pacienteNome: p.nome,
      pacienteId: p.id,
      carteirinha: p.carteirinha,
    })),
  ).sort((a, b) => b.data.localeCompare(a.data)),
)

const search = ref('')
const filtered = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return allAppointments.value
  return allAppointments.value.filter(
    (a) =>
      a.pacienteNome?.toLowerCase().includes(q) ||
      a.especialidade.toLowerCase().includes(q) ||
      a.medico.toLowerCase().includes(q),
  )
})
</script>

<template>
  <div class="animate-fade-in space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Histórico Médico' }]" />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Histórico Médico</h1>
        <p class="mt-1 text-sm text-slate-500">Registro consolidado de atendimentos</p>
      </div>
      <input v-model="search" type="search" placeholder="Buscar paciente, médico..." class="input-field max-w-xs" />
    </div>

    <div class="space-y-3">
      <div
        v-for="at in filtered"
        :key="at.id + at.pacienteId"
        class="glass-card flex flex-col gap-4 p-5 transition-all hover:shadow-card-hover sm:flex-row sm:items-center"
      >
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hospital-50 dark:bg-hospital-950">
          <Stethoscope class="h-6 w-6 text-hospital-600" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <NuxtLink :to="`/pacientes/${at.pacienteId}`" class="font-semibold text-hospital-600 hover:underline">
              {{ at.pacienteNome }}
            </NuxtLink>
            <span class="font-mono text-xs text-slate-400">{{ at.carteirinha }}</span>
          </div>
          <p class="mt-1 font-medium text-slate-900 dark:text-white">{{ at.especialidade }} — {{ at.medico }}</p>
          <p class="text-sm text-slate-500">{{ at.data }} às {{ at.hora }}</p>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ at.notas }}</p>
        </div>
        <UiStatusBadge v-bind="appointmentStatusBadge(at.status)" />
      </div>
    </div>
  </div>
</template>
