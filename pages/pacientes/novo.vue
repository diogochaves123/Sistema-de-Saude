<script setup lang="ts">
import { Save, User } from 'lucide-vue-next'

const form = reactive({
  nome: '',
  cpf: '',
  dataNascimento: '',
  sexo: '',
  convenio: '',
  telefone: '',
  email: '',
  carteirinha: `HSP-2026-${String(Math.floor(Math.random() * 900000) + 100000)}`,
})

const { success } = useToast()
const router = useRouter()

const submit = () => {
  success(`Paciente ${form.nome || 'novo'} cadastrado com sucesso! (simulação)`)
  setTimeout(() => router.push('/pacientes/1'), 800)
}
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-3xl space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Pacientes', to: '/pacientes' }, { label: 'Novo Paciente' }]" />

    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Cadastro de Paciente</h1>
      <p class="mt-1 text-sm text-slate-500">Preencha os dados para gerar a carteirinha hospitalar</p>
    </div>

    <form class="glass-card space-y-6 p-6" @submit.prevent="submit">
      <div class="flex items-center gap-4 rounded-xl bg-hospital-50 p-4 dark:bg-hospital-950/30">
        <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-hospital-600 text-white">
          <User class="h-7 w-7" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300">Número da carteirinha (gerado automaticamente)</p>
          <p class="font-mono text-lg font-bold text-hospital-700 dark:text-hospital-400">{{ form.carteirinha }}</p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <UiFormInput v-model="form.nome" label="Nome completo" placeholder="Nome do paciente" required />
        <UiFormInput v-model="form.cpf" label="CPF" placeholder="000.000.000-00" required />
        <UiFormInput v-model="form.dataNascimento" label="Data de nascimento" type="date" required />
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Sexo</label>
          <select v-model="form.sexo" class="input-field" required>
            <option value="">Selecione</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <UiFormInput v-model="form.convenio" label="Convênio" placeholder="Ex: Amil Saúde" />
        <UiFormInput v-model="form.telefone" label="Telefone" placeholder="(00) 00000-0000" />
        <UiFormInput v-model="form.email" label="E-mail" type="email" placeholder="email@exemplo.com" class="sm:col-span-2" />
      </div>

      <div class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end dark:border-slate-800">
        <NuxtLink to="/pacientes" class="btn-secondary text-center">Cancelar</NuxtLink>
        <button type="submit" class="btn-primary">
          <Save class="h-4 w-4" />
          Salvar Paciente
        </button>
      </div>
    </form>
  </div>
</template>
