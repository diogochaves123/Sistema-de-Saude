<script setup lang="ts">
import { Printer, ArrowLeft } from 'lucide-vue-next'
import { getPatientById } from '~/data/mock/patients'

const route = useRoute()
const patient = computed(() => getPatientById(route.params.id as string))

const { success } = useToast()

const handlePrint = () => {
  if (import.meta.client) window.print()
  success('Preparando impressão da carteirinha...')
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
        { label: patient.nome, to: `/pacientes/${patient.id}` },
        { label: 'Carteirinha Digital' },
      ]"
    />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Carteirinha Digital</h1>
        <p class="mt-1 font-mono text-sm text-hospital-600">{{ patient.carteirinha }}</p>
      </div>
      <div class="flex gap-2">
        <NuxtLink :to="`/pacientes/${patient.id}`" class="btn-secondary">
          <ArrowLeft class="h-4 w-4" />
          Voltar ao perfil
        </NuxtLink>
        <button type="button" class="btn-primary" @click="handlePrint">
          <Printer class="h-4 w-4" />
          Imprimir
        </button>
      </div>
    </div>

    <div class="glass-card p-6 lg:p-10">
      <p class="mb-6 text-center text-sm text-slate-500">
        Cartão de informações médicas — uso interno e identificação do paciente
      </p>
      <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p class="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Frente</p>
          <PatientPatientIDCard :patient="patient" side="front" />
        </div>
        <div>
          <p class="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Verso</p>
          <PatientPatientIDCard :patient="patient" side="back" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  aside,
  header,
  .btn-primary,
  .btn-secondary,
  nav {
    display: none !important;
  }
  main {
    padding: 0 !important;
  }
}
</style>
