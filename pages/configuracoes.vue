<script setup lang="ts">
import { Bell, Moon, Globe, Building2, Shield } from 'lucide-vue-next'

const { isDark, toggleTheme } = useTheme()
const { success } = useToast()

const settings = reactive({
  notificacoesEmail: true,
  notificacoesPush: true,
  alertasAlergia: true,
  idioma: 'pt-BR',
  unidade: 'Hospital Central — SP',
})

const save = () => success('Configurações salvas com sucesso!')
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-3xl space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Configurações' }]" />

    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h1>
      <p class="mt-1 text-sm text-slate-500">Preferências do sistema hospitalar</p>
    </div>

    <div class="space-y-4">
      <section class="glass-card p-6">
        <div class="mb-4 flex items-center gap-2">
          <Building2 class="h-5 w-5 text-hospital-600" />
          <h2 class="section-title">Instituição</h2>
        </div>
        <UiFormInput v-model="settings.unidade" label="Unidade hospitalar" />
      </section>

      <section class="glass-card p-6">
        <div class="mb-4 flex items-center gap-2">
          <Bell class="h-5 w-5 text-hospital-600" />
          <h2 class="section-title">Notificações</h2>
        </div>
        <div class="space-y-4">
          <label v-for="key in ['notificacoesEmail', 'notificacoesPush', 'alertasAlergia'] as const" :key="key" class="flex items-center justify-between">
            <span class="text-sm text-slate-700 dark:text-slate-300">
              {{ key === 'notificacoesEmail' ? 'E-mail' : key === 'notificacoesPush' ? 'Push no sistema' : 'Alertas de alergia crítica' }}
            </span>
            <input v-model="settings[key]" type="checkbox" class="h-5 w-5 rounded border-slate-300 text-hospital-600 focus:ring-hospital-500" />
          </label>
        </div>
      </section>

      <section class="glass-card p-6">
        <div class="mb-4 flex items-center gap-2">
          <Moon class="h-5 w-5 text-hospital-600" />
          <h2 class="section-title">Aparência</h2>
        </div>
        <button type="button" class="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700" @click="toggleTheme">
          <span class="text-sm font-medium">Modo escuro</span>
          <span class="text-sm text-slate-500">{{ isDark ? 'Ativado' : 'Desativado' }}</span>
        </button>
      </section>

      <section class="glass-card p-6">
        <div class="mb-4 flex items-center gap-2">
          <Globe class="h-5 w-5 text-hospital-600" />
          <h2 class="section-title">Regional</h2>
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium">Idioma</label>
          <select v-model="settings.idioma" class="input-field">
            <option value="pt-BR">Português (Brasil)</option>
          </select>
        </div>
      </section>

      <section class="glass-card border-amber-200 p-6 dark:border-amber-900/50">
        <div class="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <Shield class="h-5 w-5" />
          <p class="text-sm font-medium">Sistema interno — sem autenticação real (demonstração frontend)</p>
        </div>
      </section>

      <button type="button" class="btn-primary w-full sm:w-auto" @click="save">Salvar alterações</button>
    </div>
  </div>
</template>
