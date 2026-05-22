<script setup lang="ts">
import { Pill } from 'lucide-vue-next'
import { patients } from '~/data/mock/patients'

const allPrescriptions = computed(() =>
  patients.flatMap((p) =>
    p.receitas.map((r) => ({
      ...r,
      pacienteNome: p.nome,
      pacienteId: p.id,
    })),
  ),
)
</script>

<template>
  <div class="animate-fade-in space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Receitas' }]" />

    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Receitas Médicas</h1>
      <p class="mt-1 text-sm text-slate-500">Prescrições emitidas no sistema</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="r in allPrescriptions"
        :key="r.id + r.pacienteId"
        class="glass-card p-5 transition-all hover:shadow-card-hover"
      >
        <Pill class="h-5 w-5 text-violet-500" />
        <p class="mt-3 text-lg font-bold text-slate-900 dark:text-white">{{ r.medicamento }}</p>
        <p class="text-sm text-slate-500">{{ r.dosagem }}</p>
        <div class="mt-4 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
          <NuxtLink :to="`/pacientes/${r.pacienteId}`" class="font-medium text-hospital-600 hover:underline">
            {{ r.pacienteNome }}
          </NuxtLink>
          <p class="mt-1 text-slate-500">{{ r.medico }}</p>
          <p class="text-xs text-slate-400">Emitida {{ r.data }} · Válida até {{ r.validade }}</p>
        </div>
      </div>
    </div>

    <p v-if="!allPrescriptions.length" class="text-center text-slate-500">Nenhuma receita registrada.</p>
  </div>
</template>
