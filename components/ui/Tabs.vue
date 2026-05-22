<script setup lang="ts">
import type { Component } from 'vue'

export interface TabItem {
  id: string
  label: string
  icon?: Component
  count?: number
}

const props = defineProps<{ tabs: TabItem[]; modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [id: string] }>()
</script>

<template>
  <div class="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-1 dark:border-slate-800 dark:bg-slate-900/80">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
      :class="
        modelValue === tab.id
          ? 'bg-white text-hospital-700 shadow-sm dark:bg-slate-800 dark:text-hospital-400'
          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
      "
      @click="emit('update:modelValue', tab.id)"
    >
      <component :is="tab.icon" v-if="tab.icon" class="h-4 w-4" />
      {{ tab.label }}
      <span
        v-if="tab.count !== undefined"
        class="rounded-full bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>
