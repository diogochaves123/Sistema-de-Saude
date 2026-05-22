<script setup lang="ts">
import type { Component } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

const props = defineProps<{
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: Component
  color?: string
}>()

const trendIcon = computed(() => {
  if (props.trend === 'up') return TrendingUp
  if (props.trend === 'down') return TrendingDown
  return Minus
})

const trendColor = computed(() => {
  if (props.trend === 'up') return 'text-emerald-600 dark:text-emerald-400'
  if (props.trend === 'down') return 'text-red-600 dark:text-red-400'
  return 'text-slate-500'
})
</script>

<template>
  <div class="glass-card group p-5 transition-all duration-300 hover:shadow-card-hover">
    <div class="flex items-start justify-between">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        :class="color ?? 'bg-hospital-50 text-hospital-600 dark:bg-hospital-950 dark:text-hospital-400'"
      >
        <component :is="icon" class="h-5 w-5" />
      </div>
      <div v-if="change" class="flex items-center gap-1 text-xs font-medium" :class="trendColor">
        <component :is="trendIcon" class="h-3.5 w-3.5" />
        {{ change }}
      </div>
    </div>
    <p class="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
      {{ value }}
    </p>
    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ label }}</p>
  </div>
</template>
