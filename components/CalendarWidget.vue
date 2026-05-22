<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { scheduledAppointments } from '~/data/mock/appointments'

const currentDate = ref(new Date(2026, 4, 22)) // May 22, 2026

const monthName = computed(() =>
  currentDate.value.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
)

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)
  return cells
})

const appointmentDays = computed(() => {
  const month = currentDate.value.getMonth() + 1
  const year = currentDate.value.getFullYear()
  return scheduledAppointments
    .filter((a) => {
      const [d, m, y] = a.data.split('/').map(Number)
      return m === month && y === year
    })
    .map((a) => Number(a.data.split('/')[0]))
})

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const today = 22
</script>

<template>
  <div class="glass-card p-5">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="section-title capitalize">{{ monthName }}</h3>
      <div class="flex gap-1">
        <button type="button" class="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" @click="prevMonth">
          <ChevronLeft class="h-4 w-4" />
        </button>
        <button type="button" class="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" @click="nextMonth">
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-7 gap-1 text-center text-xs">
      <span v-for="d in weekDays" :key="d" class="py-1 font-medium text-slate-400">{{ d }}</span>
      <template v-for="(day, i) in daysInMonth" :key="i">
        <span v-if="day === null" />
        <button
          v-else
          type="button"
          class="relative rounded-lg py-1.5 text-sm transition-colors"
          :class="[
            day === today ? 'bg-hospital-600 font-semibold text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800',
            appointmentDays.includes(day) && day !== today ? 'font-semibold text-hospital-600' : 'text-slate-700 dark:text-slate-300',
          ]"
        >
          {{ day }}
          <span
            v-if="appointmentDays.includes(day) && day !== today"
            class="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-hospital-500"
          />
        </button>
      </template>
    </div>
    <div class="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
      <p class="text-xs font-semibold uppercase text-slate-500">Próximos</p>
      <div
        v-for="apt in scheduledAppointments.slice(0, 3)"
        :key="apt.id"
        class="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/50"
      >
        <div class="text-center">
          <p class="text-xs font-bold text-hospital-600">{{ apt.hora }}</p>
          <p class="text-[10px] text-slate-400">{{ apt.data.split('/')[0] }}/{{ apt.data.split('/')[1] }}</p>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">{{ apt.pacienteNome }}</p>
          <p class="truncate text-xs text-slate-500">{{ apt.especialidade }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
