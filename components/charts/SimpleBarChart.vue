<script setup lang="ts">
const props = defineProps<{
  data: { label: string; value: number }[]
}>()

const maxValue = computed(() => Math.max(...props.data.map((d) => d.value), 1))
</script>

<template>
  <div class="flex h-48 items-end justify-between gap-2 px-2">
    <div
      v-for="item in data"
      :key="item.label"
      class="flex flex-1 flex-col items-center gap-2"
    >
      <div
        class="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-hospital-700 to-hospital-500 transition-all duration-500 hover:from-hospital-600 hover:to-hospital-400"
        :style="{ height: `${(item.value / maxValue) * 100}%`, minHeight: '8px' }"
      />
      <span class="text-[10px] font-medium text-slate-500 sm:text-xs">{{ item.label }}</span>
    </div>
  </div>
</template>
