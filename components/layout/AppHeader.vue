<script setup lang="ts">
import { Menu, Search, Moon, Sun, CreditCard } from 'lucide-vue-next'
import { currentUser } from '~/data/mock/user'

const { toggle: toggleSidebar } = useSidebar()
const { isDark, toggleTheme } = useTheme()
const { searchQuery } = usePatients()
const route = useRoute()

const carteirinhaSearch = ref('')
const router = useRouter()
const { findByCarteirinha } = usePatients()
const { success, error } = useToast()

const searchByCarteirinha = () => {
  const patient = findByCarteirinha(carteirinhaSearch.value)
  if (patient) {
    success(`Paciente encontrado: ${patient.nome}`)
    router.push(`/pacientes/${patient.id}`)
    carteirinhaSearch.value = ''
  } else {
    error('Carteirinha não encontrada.')
  }
}

const showCarteirinhaSearch = computed(() =>
  ['/pacientes', '/'].some((p) => route.path === p || route.path.startsWith('/pacientes')),
)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
    <div class="flex h-16 items-center gap-3 px-4 lg:px-6">
      <button
        type="button"
        class="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
        @click="toggleSidebar"
      >
        <Menu class="h-5 w-5" />
      </button>

      <div class="hidden min-w-0 flex-1 sm:block">
        <slot name="breadcrumb" />
      </div>

      <div class="flex flex-1 items-center gap-2 sm:flex-none sm:gap-3">
        <!-- Busca carteirinha -->
        <form
          v-if="showCarteirinhaSearch"
          class="hidden min-w-0 flex-1 sm:flex sm:max-w-xs lg:max-w-sm"
          @submit.prevent="searchByCarteirinha"
        >
          <div class="relative w-full">
            <CreditCard class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hospital-500" />
            <input
              v-model="carteirinhaSearch"
              type="text"
              placeholder="Buscar carteirinha..."
              class="input-field pl-10 text-sm"
            />
          </div>
        </form>

        <!-- Busca geral pacientes -->
        <div v-if="route.path.startsWith('/pacientes') && route.path !== '/pacientes/novo'" class="relative hidden md:block md:w-48 lg:w-64">
          <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input v-model="searchQuery" type="search" placeholder="Buscar paciente..." class="input-field pl-10 text-sm" />
        </div>

        <button
          type="button"
          class="rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          :aria-label="isDark ? 'Modo claro' : 'Modo escuro'"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>

        <NotificationDropdown />

        <NuxtLink
          to="/perfil"
          class="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 pl-1.5 pr-3 transition-colors hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-hospital-600 text-xs font-bold text-white">
            {{ currentUser.avatarIniciais }}
          </div>
          <div class="hidden text-left lg:block">
            <p class="text-xs font-semibold text-slate-900 dark:text-white">{{ currentUser.nome }}</p>
            <p class="text-[10px] text-slate-500">{{ currentUser.cargo.split('—')[0].trim() }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
