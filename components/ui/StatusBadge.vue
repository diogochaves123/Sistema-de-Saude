<script setup lang="ts">
import type { BadgeVariant } from '~/types'

const props = withDefaults(
  defineProps<{
    label: string
    variant?: BadgeVariant
    dot?: boolean
    size?: 'sm' | 'md'
  }>(),
  { variant: 'neutral', dot: false, size: 'sm' },
)

const classes: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-400',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/50 dark:text-amber-400',
  danger: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400',
  info: 'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-950/50 dark:text-sky-400',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-400',
  primary: 'bg-hospital-50 text-hospital-700 ring-hospital-600/20 dark:bg-hospital-950/50 dark:text-hospital-400',
}

const dotClasses: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-sky-500',
  neutral: 'bg-slate-400',
  primary: 'bg-hospital-500',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset"
    :class="[
      classes[variant],
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
    ]"
  >
    <span v-if="dot" class="h-1.5 w-1.5 rounded-full" :class="dotClasses[variant]" />
    {{ label }}
  </span>
</template>
