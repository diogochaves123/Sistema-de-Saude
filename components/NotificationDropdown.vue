<script setup lang="ts">
import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-vue-next'
import { notifications } from '~/data/mock/notifications'

const isOpen = ref(false)
const unread = computed(() => notifications.filter((n) => !n.lida).length)

const typeIcons = {
  urgente: AlertCircle,
  alerta: AlertCircle,
  info: Info,
  sucesso: CheckCircle,
}

const typeColors = {
  urgente: 'text-red-500',
  alerta: 'text-amber-500',
  info: 'text-sky-500',
  sucesso: 'text-emerald-500',
}

onMounted(() => {
  const handler = (e: MouseEvent) => {
    const el = document.getElementById('notif-dropdown')
    if (el && !el.contains(e.target as Node)) isOpen.value = false
  }
  document.addEventListener('click', handler)
  onUnmounted(() => document.removeEventListener('click', handler))
})
</script>

<template>
  <div id="notif-dropdown" class="relative">
    <button
      type="button"
      class="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
      @click.stop="isOpen = !isOpen"
    >
      <Bell class="h-5 w-5" />
      <span
        v-if="unread > 0"
        class="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
      >
        {{ unread }}
      </span>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-premium dark:border-slate-700 dark:bg-slate-900 sm:w-96"
        @click.stop
      >
        <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <h3 class="font-semibold text-slate-900 dark:text-white">Notificações</h3>
          <NuxtLink to="/notificacoes" class="text-xs font-medium text-hospital-600 hover:underline" @click="isOpen = false">
            Ver todas
          </NuxtLink>
        </div>
        <div class="max-h-80 overflow-y-auto">
          <NuxtLink
            v-for="n in notifications.slice(0, 5)"
            :key="n.id"
            :to="n.link ?? '/notificacoes'"
            class="flex gap-3 border-b border-slate-50 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
            :class="{ 'bg-hospital-50/50 dark:bg-hospital-950/20': !n.lida }"
            @click="isOpen = false"
          >
            <component :is="typeIcons[n.tipo]" class="mt-0.5 h-5 w-5 shrink-0" :class="typeColors[n.tipo]" />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-slate-900 dark:text-white">{{ n.titulo }}</p>
              <p class="mt-0.5 truncate text-xs text-slate-500">{{ n.mensagem }}</p>
              <p class="mt-1 text-[10px] text-slate-400">{{ n.data }}</p>
            </div>
            <span v-if="!n.lida" class="mt-2 h-2 w-2 shrink-0 rounded-full bg-hospital-500" />
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
