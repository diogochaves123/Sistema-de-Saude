<script setup lang="ts">
import { CreditCard, ChevronRight, AlertTriangle } from 'lucide-vue-next'
import type { Patient } from '~/types'
import { statusToBadge } from '~/utils/status'

defineProps<{ patient: Patient; compact?: boolean }>()
</script>

<template>
  <NuxtLink
    :to="`/pacientes/${patient.id}`"
    class="glass-card group block p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
  >
    <div class="flex items-start gap-4">
      <div
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
        :class="patient.alergias.some((a) => a.severidade === 'critica') ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-hospital-600 to-hospital-800'"
      >
        {{ patient.avatarIniciais }}
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="truncate font-semibold text-slate-900 group-hover:text-hospital-700 dark:text-white dark:group-hover:text-hospital-400">
              {{ patient.nome }}
            </h3>
            <p class="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
              <CreditCard class="h-3.5 w-3.5" />
              {{ patient.carteirinha }}
            </p>
          </div>
          <UiStatusBadge v-bind="statusToBadge(patient.status)" dot />
        </div>
        <div v-if="!compact" class="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
          <span>{{ patient.idade }} anos</span>
          <span>·</span>
          <span>{{ patient.convenio }}</span>
          <span>·</span>
          <span class="font-medium text-hospital-600 dark:text-hospital-400">{{ patient.tipoSanguineo }}</span>
        </div>
        <div
          v-if="patient.alergias.some((a) => a.severidade === 'critica')"
          class="mt-3 flex items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 dark:bg-red-950/50 dark:text-red-400"
        >
          <AlertTriangle class="h-3.5 w-3.5" />
          Alergia crítica
        </div>
      </div>
      <ChevronRight class="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-hospital-500" />
    </div>
  </NuxtLink>
</template>
