<script setup lang="ts">
import { AlertCircle, CheckCircle, Info, Bell } from 'lucide-vue-next'
import { notifications } from '~/data/mock/notifications'

const typeIcons = { urgente: AlertCircle, alerta: AlertCircle, info: Info, sucesso: CheckCircle }
const typeColors = {
  urgente: 'border-l-red-500',
  alerta: 'border-l-amber-500',
  info: 'border-l-sky-500',
  sucesso: 'border-l-emerald-500',
}

const localNotifs = ref([...notifications])

const markAllRead = () => {
  localNotifs.value = localNotifs.value.map((n) => ({ ...n, lida: true }))
  useToast().success('Todas as notificações marcadas como lidas.')
}
</script>

<template>
  <div class="animate-fade-in space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Notificações' }]" />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Notificações</h1>
        <p class="mt-1 text-sm text-slate-500">{{ localNotifs.filter((n) => !n.lida).length }} não lidas</p>
      </div>
      <button type="button" class="btn-secondary" @click="markAllRead">Marcar todas como lidas</button>
    </div>

    <div class="space-y-2">
      <NuxtLink
        v-for="n in localNotifs"
        :key="n.id"
        :to="n.link ?? '#'"
        class="glass-card flex gap-4 border-l-4 p-5 transition-all hover:shadow-card-hover"
        :class="[typeColors[n.tipo], { 'opacity-70': n.lida }]"
      >
        <component :is="typeIcons[n.tipo]" class="h-6 w-6 shrink-0 text-slate-400" />
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-2">
            <p class="font-semibold text-slate-900 dark:text-white">{{ n.titulo }}</p>
            <span v-if="!n.lida" class="h-2 w-2 shrink-0 rounded-full bg-hospital-500" />
          </div>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ n.mensagem }}</p>
          <p class="mt-2 text-xs text-slate-400">{{ n.data }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
