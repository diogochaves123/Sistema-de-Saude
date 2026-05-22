<script setup lang="ts">
import { Plus, Filter, Eye, CreditCard } from 'lucide-vue-next'
import { statusToBadge } from '~/utils/status'

const { filteredPatients, searchQuery, statusFilter, isLoading, simulateLoading } = usePatients()
const router = useRouter()

onMounted(() => simulateLoading(500))

const statusOptions = [
  { value: null, label: 'Todos' },
  { value: 'ativo', label: 'Ativo' },
  { value: 'em_atendimento', label: 'Em atendimento' },
  { value: 'internado', label: 'Internado' },
  { value: 'alta', label: 'Alta' },
]

const columns = [
  { key: 'nome', label: 'Paciente', sortable: true, mobileLabel: 'Nome' },
  { key: 'carteirinha', label: 'Carteirinha', sortable: true },
  { key: 'convenio', label: 'Convênio', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'ultimoAtendimento', label: 'Último atendimento', sortable: true, mobileLabel: 'Último atend.' },
]
</script>

<template>
  <div class="animate-fade-in space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Pacientes' }]" />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Pacientes</h1>
        <p class="mt-1 text-sm text-slate-500">{{ filteredPatients.length }} registros</p>
      </div>
      <NuxtLink to="/pacientes/novo" class="btn-primary">
        <Plus class="h-4 w-4" />
        Novo Paciente
      </NuxtLink>
    </div>

    <!-- Filtros -->
    <div class="glass-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <div class="relative flex-1 md:hidden">
        <input v-model="searchQuery" type="search" placeholder="Buscar paciente ou carteirinha..." class="input-field" />
      </div>
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter class="h-4 w-4 shrink-0 text-slate-400" />
        <button
          v-for="opt in statusOptions"
          :key="String(opt.value)"
          type="button"
          class="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
          :class="
            statusFilter === opt.value
              ? 'bg-hospital-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
          "
          @click="statusFilter = opt.value"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <UiDataTable :columns="columns" :data="filteredPatients" :loading="isLoading">
      <template #cell-nome="{ row }">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-hospital-600 text-xs font-bold text-white">
            {{ row.avatarIniciais }}
          </div>
          <div>
            <p class="font-medium text-slate-900 dark:text-white">{{ row.nome }}</p>
            <p class="text-xs text-slate-500">{{ row.idade }} anos · {{ row.sexo }}</p>
          </div>
        </div>
      </template>
      <template #cell-carteirinha="{ row }">
        <span class="inline-flex items-center gap-1 font-mono text-xs text-hospital-600 dark:text-hospital-400">
          <CreditCard class="h-3.5 w-3.5" />
          {{ row.carteirinha }}
        </span>
      </template>
      <template #cell-status="{ row }">
        <UiStatusBadge v-bind="statusToBadge(row.status)" dot />
      </template>
      <template #actions="{ row }">
        <button type="button" class="btn-secondary !py-1.5 !px-3 text-xs" @click="router.push(`/pacientes/${row.id}`)">
          <Eye class="h-3.5 w-3.5" />
          Ver
        </button>
      </template>
      <template #mobile="{ row }">
        <NuxtLink :to="`/pacientes/${row.id}`" class="block">
          <PatientPatientCard :patient="row" compact />
        </NuxtLink>
      </template>
    </UiDataTable>
  </div>
</template>
