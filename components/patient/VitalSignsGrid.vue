<script setup lang="ts">
import { Activity, Heart, Thermometer, Wind } from 'lucide-vue-next'
import type { VitalSigns } from '~/types'

defineProps<{ vitals: VitalSigns }>()

const statusVariant = (status: string) => {
  const s = status.toLowerCase()
  if (s.includes('normal') || s.includes('ótimo') || s.includes('regular')) return 'success'
  if (s.includes('febre') || s.includes('atenção') || s.includes('elevad')) return 'warning'
  if (s.includes('baix') || s.includes('irregular')) return 'danger'
  return 'info'
}
</script>

<template>
  <div class="glass-card p-5">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="section-title">Sinais Vitais</h3>
      <span class="text-xs text-slate-500">{{ vitals.atualizadoEm }}</span>
    </div>
    <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
        <Activity class="h-5 w-5 text-hospital-500" />
        <p class="mt-2 text-xl font-bold text-slate-900 dark:text-white">{{ vitals.pressao }}</p>
        <p class="text-xs text-slate-500">Pressão arterial</p>
        <UiStatusBadge class="mt-2" :label="vitals.pressaoStatus" :variant="statusVariant(vitals.pressaoStatus)" size="sm" />
      </div>
      <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
        <Heart class="h-5 w-5 text-rose-500" />
        <p class="mt-2 text-xl font-bold text-slate-900 dark:text-white">{{ vitals.pulso }} <span class="text-sm font-normal text-slate-500">bpm</span></p>
        <p class="text-xs text-slate-500">Pulso</p>
        <UiStatusBadge class="mt-2" :label="vitals.pulsoStatus" :variant="statusVariant(vitals.pulsoStatus)" size="sm" />
      </div>
      <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
        <Thermometer class="h-5 w-5 text-amber-500" />
        <p class="mt-2 text-xl font-bold text-slate-900 dark:text-white">{{ vitals.temperatura }}°C</p>
        <p class="text-xs text-slate-500">Temperatura</p>
        <UiStatusBadge class="mt-2" :label="vitals.temperaturaStatus" :variant="statusVariant(vitals.temperaturaStatus)" size="sm" />
      </div>
      <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
        <Wind class="h-5 w-5 text-sky-500" />
        <p class="mt-2 text-xl font-bold text-slate-900 dark:text-white">{{ vitals.spo2 }}%</p>
        <p class="text-xs text-slate-500">SpO₂</p>
        <UiStatusBadge class="mt-2" :label="vitals.spo2Status" :variant="statusVariant(vitals.spo2Status)" size="sm" />
      </div>
    </div>
  </div>
</template>
