<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  Stethoscope,
  History,
  FlaskConical,
  FileText,
  Settings,
  Bell,
  User,
  ChevronLeft,
  Activity,
} from 'lucide-vue-next'

const route = useRoute()
const { isCollapsed, toggleCollapse } = useSidebar()

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/pacientes/novo', label: 'Novo Paciente', icon: UserPlus },
  { to: '/agendamentos', label: 'Agendamentos', icon: Calendar },
  { to: '/medicos', label: 'Médicos', icon: Stethoscope },
  { to: '/historico', label: 'Histórico', icon: History },
  { to: '/exames', label: 'Exames', icon: FlaskConical },
  { to: '/receitas', label: 'Receitas', icon: FileText },
]

const bottomItems = [
  { to: '/notificacoes', label: 'Notificações', icon: Bell },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
  { to: '/perfil', label: 'Meu Perfil', icon: User },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside
    class="hidden h-screen shrink-0 flex-col border-r border-slate-200/80 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 lg:flex"
    :class="isCollapsed ? 'w-[72px]' : 'w-64'"
  >
    <!-- Logo -->
    <div class="flex h-16 items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800" :class="isCollapsed ? 'justify-center' : ''">
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hospital-600 to-hospital-800 text-white shadow-sm">
        <Activity class="h-5 w-5" />
      </div>
      <div v-if="!isCollapsed" class="min-w-0">
        <p class="text-sm font-bold text-slate-900 dark:text-white">SisMed</p>
        <p class="text-[10px] text-slate-500">Gestão Hospitalar</p>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 space-y-1 overflow-y-auto p-3">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
        :class="[
          isActive(item.to)
            ? 'bg-hospital-50 text-hospital-700 shadow-sm dark:bg-hospital-950/50 dark:text-hospital-400'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
          isCollapsed ? 'justify-center px-2' : '',
        ]"
        :title="isCollapsed ? item.label : undefined"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />
        <span v-if="!isCollapsed">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <!-- Bottom -->
    <div class="space-y-1 border-t border-slate-100 p-3 dark:border-slate-800">
      <NuxtLink
        v-for="item in bottomItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
        :class="[
          isActive(item.to)
            ? 'bg-hospital-50 text-hospital-700 dark:bg-hospital-950/50 dark:text-hospital-400'
            : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800',
          isCollapsed ? 'justify-center px-2' : '',
        ]"
        :title="isCollapsed ? item.label : undefined"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />
        <span v-if="!isCollapsed">{{ item.label }}</span>
      </NuxtLink>
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
        :class="isCollapsed ? 'justify-center' : ''"
        @click="toggleCollapse"
      >
        <ChevronLeft class="h-5 w-5 transition-transform" :class="isCollapsed ? 'rotate-180' : ''" />
        <span v-if="!isCollapsed">Recolher</span>
      </button>
    </div>
  </aside>
</template>
