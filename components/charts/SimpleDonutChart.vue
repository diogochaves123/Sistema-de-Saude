<script setup lang="ts">
const props = defineProps<{
  data: { nome: string; percentual: number; cor: string }[]
}>()

const segments = computed(() => {
  let offset = 0
  const circumference = 2 * Math.PI * 40
  return props.data.map((item) => {
    const dash = (item.percentual / 100) * circumference
    const segment = {
      ...item,
      dasharray: `${dash} ${circumference - dash}`,
      dashoffset: -offset,
    }
    offset += dash
    return segment
  })
})
</script>

<template>
  <div class="flex flex-col items-center gap-6 sm:flex-row">
    <svg viewBox="0 0 100 100" class="h-36 w-36 -rotate-90 shrink-0">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" class="text-slate-100 dark:text-slate-800" stroke-width="12" />
      <circle
        v-for="(seg, i) in segments"
        :key="i"
        cx="50"
        cy="50"
        r="40"
        fill="none"
        :stroke="seg.cor"
        stroke-width="12"
        :stroke-dasharray="seg.dasharray"
        :stroke-dashoffset="seg.dashoffset"
        class="transition-all duration-700"
      />
    </svg>
    <ul class="space-y-2">
      <li v-for="item in data" :key="item.nome" class="flex items-center gap-2 text-sm">
        <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: item.cor }" />
        <span class="text-slate-600 dark:text-slate-400">{{ item.nome }}</span>
        <span class="ml-auto font-semibold text-slate-900 dark:text-white">{{ item.percentual }}%</span>
      </li>
    </ul>
  </div>
</template>
