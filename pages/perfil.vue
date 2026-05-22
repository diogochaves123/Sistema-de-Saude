<script setup lang="ts">
import { Mail, Phone, Building, Save } from 'lucide-vue-next'
import { currentUser } from '~/data/mock/user'

const user = reactive({ ...currentUser })
const { success } = useToast()

const save = () => success('Perfil atualizado com sucesso! (simulação)')
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-3xl space-y-6">
    <UiBreadcrumbs :items="[{ label: 'Meu Perfil' }]" />

    <div class="glass-card overflow-hidden">
      <div class="bg-gradient-to-r from-hospital-800 to-hospital-600 px-6 py-10">
        <div class="flex items-center gap-5">
          <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold text-white">
            {{ user.avatarIniciais }}
          </div>
          <div class="text-white">
            <h1 class="text-2xl font-bold">{{ user.nome }}</h1>
            <p class="mt-1 text-white/80">{{ user.cargo }}</p>
            <p class="text-sm text-white/60">{{ user.departamento }}</p>
          </div>
        </div>
      </div>
      <form class="space-y-4 p-6" @submit.prevent="save">
        <UiFormInput v-model="user.nome" label="Nome" />
        <UiFormInput v-model="user.email" label="E-mail" type="email" :icon="Mail" />
        <UiFormInput v-model="user.telefone" label="Telefone" :icon="Phone" />
        <div>
          <label class="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Building class="h-4 w-4" />
            Departamento
          </label>
          <input v-model="user.departamento" class="input-field" readonly />
        </div>
        <button type="submit" class="btn-primary">
          <Save class="h-4 w-4" />
          Salvar
        </button>
      </form>
    </div>
  </div>
</template>
