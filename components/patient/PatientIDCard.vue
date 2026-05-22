<script setup lang="ts">
import { QrCode, AlertTriangle, Phone, Droplets, Heart } from 'lucide-vue-next'
import type { Patient } from '~/types'

defineProps<{ patient: Patient; side?: 'front' | 'back' }>()
</script>

<template>
  <!-- Frente -->
  <div
    v-if="side !== 'back'"
    class="mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-premium transition-transform duration-300 hover:scale-[1.02]"
  >
    <div class="bg-gradient-to-r from-hospital-900 to-hospital-700 px-5 py-4 text-white">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <span class="text-lg font-bold">+</span>
          </div>
          <div>
            <p class="text-[10px] font-medium uppercase tracking-wider opacity-80">SisMed</p>
            <p class="text-xs font-semibold">Cartão de Informações Médicas</p>
          </div>
        </div>
        <QrCode class="h-10 w-10 opacity-90" />
      </div>
    </div>
    <div class="bg-white p-5 dark:bg-slate-900">
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-hospital-100 text-lg font-bold text-hospital-800 dark:bg-hospital-950 dark:text-hospital-300">
          {{ patient.avatarIniciais }}
        </div>
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white">{{ patient.nome }}</h3>
          <p class="text-xs text-slate-500">{{ patient.idade }} anos · {{ patient.sexo }}</p>
          <p class="mt-0.5 font-mono text-xs font-medium text-hospital-600">{{ patient.carteirinha }}</p>
        </div>
      </div>

      <div
        v-if="patient.alergias.length"
        class="mt-4 rounded-xl border-2 border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/30"
      >
        <div class="flex items-center gap-1.5 text-xs font-bold uppercase text-red-700 dark:text-red-400">
          <AlertTriangle class="h-4 w-4" />
          Alergias Graves
        </div>
        <ul class="mt-2 space-y-1">
          <li v-for="a in patient.alergias.filter((x) => x.severidade === 'critica')" :key="a.id" class="text-sm font-semibold text-red-800 dark:text-red-300">
            {{ a.nome }}
          </li>
        </ul>
      </div>

      <div class="mt-4 grid grid-cols-3 gap-2 text-center">
        <div class="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
          <Droplets class="mx-auto h-4 w-4 text-red-500" />
          <p class="mt-1 text-lg font-bold text-slate-900 dark:text-white">{{ patient.tipoSanguineo }}</p>
          <p class="text-[10px] text-slate-500">Sangue</p>
        </div>
        <div class="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
          <Heart class="mx-auto h-4 w-4 text-rose-500" />
          <p class="mt-1 text-sm font-bold text-slate-900 dark:text-white">{{ patient.sinaisVitais.pressao }}</p>
          <p class="text-[10px] text-slate-500">PA</p>
        </div>
        <div class="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
          <Phone class="mx-auto h-4 w-4 text-hospital-500" />
          <p class="mt-1 text-[10px] font-bold text-slate-900 dark:text-white">
            {{ patient.contatosEmergencia[0]?.telefone.slice(-4) ?? '—' }}
          </p>
          <p class="text-[10px] text-slate-500">SOS</p>
        </div>
      </div>

      <div v-if="patient.sidAlergia" class="mt-4 rounded-lg border border-dashed border-slate-200 p-2 dark:border-slate-700">
        <div class="flex h-8 items-end justify-center gap-0.5">
          <div v-for="i in 32" :key="i" class="bg-slate-800 dark:bg-slate-300" :style="{ width: '2px', height: `${8 + Math.random() * 16}px` }" />
        </div>
        <p class="mt-1 text-center font-mono text-[10px] text-slate-500">SID: {{ patient.sidAlergia }}</p>
      </div>
    </div>
  </div>

  <!-- Verso -->
  <div
    v-else
    class="mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-premium"
  >
    <div class="bg-gradient-to-r from-slate-800 to-slate-700 px-5 py-3 text-white">
      <p class="text-xs font-semibold uppercase tracking-wider">Informações Médicas — Verso</p>
    </div>
    <div class="space-y-3 bg-white p-5 text-sm dark:bg-slate-900">
      <div v-if="patient.condicoes.length">
        <p class="text-xs font-semibold uppercase text-slate-500">Condições</p>
        <ul class="mt-1 space-y-0.5">
          <li v-for="c in patient.condicoes" :key="c.id" class="text-slate-800 dark:text-slate-200">{{ c.nome }}</li>
        </ul>
      </div>
      <div v-if="patient.medicamentos.length">
        <p class="text-xs font-semibold uppercase text-slate-500">Medicamentos</p>
        <ul class="mt-1 space-y-0.5">
          <li v-for="m in patient.medicamentos" :key="m.id" class="text-slate-800 dark:text-slate-200">
            {{ m.nome }} {{ m.dosagem }} — {{ m.frequencia }}
          </li>
        </ul>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase text-slate-500">Convênio</p>
        <p class="mt-1 font-medium text-slate-800 dark:text-slate-200">{{ patient.convenio }}</p>
        <p v-if="patient.medicoResponsavel" class="text-xs text-slate-500">Médico: {{ patient.medicoResponsavel }}</p>
      </div>
      <div class="border-t border-dashed border-slate-200 pt-3 dark:border-slate-700">
        <p class="text-center text-[10px] text-slate-400">Documento emitido pelo SisMed — Uso interno hospitalar</p>
      </div>
    </div>
  </div>
</template>
