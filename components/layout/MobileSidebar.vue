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
  X,
  Activity,
} from 'lucide-vue-next'

const { isOpen, close } = useSidebar()
const route = useRoute()

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/pacientes/novo', label: 'Novo Paciente', icon: UserPlus },
  { to: '/agendamentos', label: 'Agendamentos', icon: Calendar },
  { to: '/medicos', label: 'Médicos', icon: Stethoscope },
  { to: '/historico', label: 'Histórico', icon: History },
  { to: '/exames', label: 'Exames', icon: FlaskConical },
  { to: '/receitas', label: 'Receitas', icon: FileText },
  { to: '/notificacoes', label: 'Notificações', icon: Bell },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
  { to: '/perfil', label: 'Meu Perfil', icon: User },
]

watch(() => route.path, () => close())

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="close" />
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-250 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <aside
            v-if="isOpen"
            class="absolute left-0 top-0 flex h-full w-[min(280px,85vw)] flex-col bg-white shadow-premium dark:bg-slate-900"
          >
            <div class="flex h-16 items-center justify-between border-b border-slate-100 px-4 dark:border-slate-800">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-hospital-600 to-hospital-800 text-white">
                  <Activity class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">SisMed</p>
                  <p class="text-[10px] text-slate-500">Gestão Hospitalar</p>
                </div>
              </div>
              <button type="button" class="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800" @click="close">
                <X class="h-5 w-5" />
              </button>
            </div>
            <nav class="flex-1 space-y-1 overflow-y-auto p-3">
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                :class="
                  isActive(item.to)
                    ? 'bg-hospital-50 text-hospital-700 dark:bg-hospital-950/50 dark:text-hospital-400'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                "
              >
                <component :is="item.icon" class="h-5 w-5" />
                {{ item.label }}
              </NuxtLink>
            </nav>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
