<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'text' | 'card' | 'avatar' | 'table-row'
    lines?: number
  }>(),
  { variant: 'text', lines: 3 },
)
</script>

<template>
  <div v-if="variant === 'card'" class="glass-card animate-pulse p-6">
    <div class="mb-4 h-4 w-1/3 rounded-lg bg-slate-200 dark:bg-slate-700" />
    <div class="space-y-3">
      <div v-for="i in lines" :key="i" class="h-3 rounded-lg bg-slate-200 dark:bg-slate-700" :style="{ width: `${100 - i * 15}%` }" />
    </div>
  </div>

  <div v-else-if="variant === 'avatar'" class="h-12 w-12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />

  <div v-else-if="variant === 'table-row'" class="flex animate-pulse gap-4 border-b border-slate-100 px-4 py-4 dark:border-slate-800">
    <div class="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />
    <div class="flex flex-1 flex-col gap-2">
      <div class="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-700" />
      <div class="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  </div>

  <div v-else class="space-y-2">
    <div
      v-for="i in lines"
      :key="i"
      class="h-3 animate-pulse rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"
      :class="{ 'animate-shimmer': true }"
      :style="{ width: `${100 - (i - 1) * 12}%` }"
    />
  </div>
</template>
