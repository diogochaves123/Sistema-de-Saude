<script setup lang="ts">
import { Mail, Phone, Users } from 'lucide-vue-next'
import { doctors } from '~/data/mock/doctors'

const statusVariant = (s: string) => {
  if (s === 'disponivel') return { label: 'Disponível', variant: 'success' as const }
  if (s === 'ocupado') return { label: 'Ocupado', variant: 'warning' as const }
  return { label: 'Ausente', variant: 'neutral' as const }
}
</script>

<template>
  <div class="animate-fade-in space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Médicos' }]" />

    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Corpo Clínico</h1>
      <p class="mt-1 text-sm text-slate-500">{{ doctors.length }} profissionais cadastrados</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="doc in doctors"
        :key="doc.id"
        class="glass-card p-5 transition-all duration-300 hover:shadow-card-hover"
      >
        <div class="flex items-start gap-4">
          <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-hospital-600 to-hospital-800 text-sm font-bold text-white">
            {{ doc.avatarIniciais }}
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-semibold text-slate-900 dark:text-white">{{ doc.nome }}</h3>
            <p class="text-sm text-hospital-600 dark:text-hospital-400">{{ doc.especialidade }}</p>
            <p class="mt-0.5 font-mono text-xs text-slate-500">{{ doc.crm }}</p>
            <UiStatusBadge class="mt-2" v-bind="statusVariant(doc.status)" dot />
          </div>
        </div>
        <div class="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
          <p class="flex items-center gap-2 text-slate-500">
            <Mail class="h-4 w-4 shrink-0" />
            <span class="truncate">{{ doc.email }}</span>
          </p>
          <p class="flex items-center gap-2 text-slate-500">
            <Phone class="h-4 w-4 shrink-0" />
            {{ doc.telefone }}
          </p>
          <p class="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <Users class="h-4 w-4 shrink-0 text-hospital-500" />
            {{ doc.pacientesAtivos }} pacientes ativos
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
