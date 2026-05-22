<script setup lang="ts">
import { Users, Stethoscope, Bed, FlaskConical, ArrowRight, AlertTriangle } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import { dashboardKPIs, chartData } from '~/data/mock/dashboard'
import { appointmentStatusBadge } from '~/utils/status'
import { patients } from '~/data/mock/patients'
import { scheduledAppointments } from '~/data/mock/appointments'
import { notifications } from '~/data/mock/notifications'

const iconMap: Record<string, Component> = {
  Users: LucideIcons.Users,
  Stethoscope: LucideIcons.Stethoscope,
  Bed: LucideIcons.Bed,
  FlaskConical: LucideIcons.FlaskConical,
}

const barChartData = chartData.atendimentosSemana.map((d) => ({ label: d.dia, value: d.valor }))
const criticalPatients = patients.filter((p) => p.alergias.some((a) => a.severidade === 'critica'))
const unreadNotifs = notifications.filter((n) => !n.lida).slice(0, 3)
</script>

<template>
  <div class="animate-fade-in space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
        <p class="mt-1 text-sm text-slate-500">Visão geral do hospital — {{ new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
      </div>
      <NuxtLink to="/pacientes/novo" class="btn-primary shrink-0">
        Novo Paciente
      </NuxtLink>
    </div>

    <!-- KPIs -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <UiStatsCard
        v-for="kpi in dashboardKPIs"
        :key="kpi.label"
        :label="kpi.label"
        :value="kpi.value"
        :change="kpi.change"
        :trend="kpi.trend"
        :icon="iconMap[kpi.icon] ?? Users"
      />
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Chart -->
      <div class="glass-card p-5 lg:col-span-2">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="section-title">Atendimentos da Semana</h3>
          <span class="text-xs text-slate-500">Últimos 7 dias</span>
        </div>
        <ChartsSimpleBarChart :data="barChartData" />
      </div>

      <CalendarWidget />
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Especialidades -->
      <div class="glass-card p-5">
        <h3 class="section-title mb-4">Por Especialidade</h3>
        <ChartsSimpleDonutChart :data="chartData.especialidades" />
      </div>

      <!-- Agendamentos -->
      <div class="glass-card p-5 lg:col-span-2">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="section-title">Agendamentos de Hoje</h3>
          <NuxtLink to="/agendamentos" class="flex items-center gap-1 text-sm font-medium text-hospital-600 hover:underline">
            Ver todos <ArrowRight class="h-4 w-4" />
          </NuxtLink>
        </div>
        <div class="space-y-2">
          <div
            v-for="apt in scheduledAppointments.filter((a) => a.data.startsWith('22/05')).slice(0, 4)"
            :key="apt.id"
            class="flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/30"
          >
            <div class="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-hospital-50 text-hospital-700 dark:bg-hospital-950 dark:text-hospital-400">
              <span class="text-xs font-bold">{{ apt.hora }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-slate-900 dark:text-white">{{ apt.pacienteNome }}</p>
              <p class="text-sm text-slate-500">{{ apt.especialidade }} — {{ apt.medico }}</p>
            </div>
            <UiStatusBadge v-bind="appointmentStatusBadge(apt.status)" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Alertas -->
      <div class="glass-card p-5">
        <div class="mb-4 flex items-center gap-2">
          <AlertTriangle class="h-5 w-5 text-red-500" />
          <h3 class="section-title">Alertas Críticos</h3>
        </div>
        <div class="space-y-3">
          <NuxtLink
            v-for="p in criticalPatients"
            :key="p.id"
            :to="`/pacientes/${p.id}`"
            class="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 p-3 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:bg-red-950/20"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-xs font-bold text-white">
              {{ p.avatarIniciais }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-slate-900 dark:text-white">{{ p.nome }}</p>
              <p class="text-xs text-red-600 dark:text-red-400">
                {{ p.alergias.filter((a) => a.severidade === 'critica').map((a) => a.nome).join(', ') }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Notificações -->
      <div class="glass-card p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="section-title">Notificações Recentes</h3>
          <NuxtLink to="/notificacoes" class="text-sm text-hospital-600 hover:underline">Ver todas</NuxtLink>
        </div>
        <div class="space-y-2">
          <div
            v-for="n in unreadNotifs"
            :key="n.id"
            class="rounded-xl border border-slate-100 p-3 dark:border-slate-800"
            :class="{ 'border-l-4 border-l-hospital-500': !n.lida }"
          >
            <p class="text-sm font-medium">{{ n.titulo }}</p>
            <p class="mt-0.5 text-xs text-slate-500">{{ n.mensagem }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
