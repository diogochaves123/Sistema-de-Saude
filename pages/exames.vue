<script setup lang="ts">
import { patients } from '~/data/mock/patients'
import { examStatusBadge } from '~/utils/status'

const allExams = computed(() =>
  patients.flatMap((p) =>
    p.exames.map((e) => ({
      ...e,
      pacienteNome: p.nome,
      pacienteId: p.id,
      carteirinha: p.carteirinha,
    })),
  ),
)

const statusFilter = ref<string | null>(null)
const filtered = computed(() => {
  if (!statusFilter.value) return allExams.value
  return allExams.value.filter((e) => e.status === statusFilter.value)
})

const columns = [
  { key: 'nome', label: 'Exame', sortable: true },
  { key: 'pacienteNome', label: 'Paciente', sortable: true },
  { key: 'data', label: 'Data', sortable: true },
  { key: 'laboratorio', label: 'Laboratório' },
  { key: 'status', label: 'Status' },
  { key: 'resultado', label: 'Resultado' },
]
</script>

<template>
  <div class="animate-fade-in space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Exames' }]" />

    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Exames</h1>
      <p class="mt-1 text-sm text-slate-500">{{ filtered.length }} registros</p>
    </div>

    <div class="flex gap-2 overflow-x-auto">
      <button
        v-for="opt in [null, 'pendente', 'em_analise', 'concluido']"
        :key="String(opt)"
        type="button"
        class="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize"
        :class="statusFilter === opt ? 'bg-hospital-600 text-white' : 'bg-slate-100 dark:bg-slate-800'"
        @click="statusFilter = opt"
      >
        {{ opt?.replace('_', ' ') ?? 'Todos' }}
      </button>
    </div>

    <UiDataTable :columns="columns" :data="filtered">
      <template #cell-pacienteNome="{ row }">
        <NuxtLink :to="`/pacientes/${row.pacienteId}`" class="text-hospital-600 hover:underline">{{ row.pacienteNome }}</NuxtLink>
      </template>
      <template #cell-status="{ row }">
        <UiStatusBadge v-bind="examStatusBadge(row.status)" />
      </template>
    </UiDataTable>
  </div>
</template>
