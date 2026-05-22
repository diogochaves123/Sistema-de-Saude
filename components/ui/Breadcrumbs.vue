<script setup lang="ts">
import { ChevronRight, Home } from 'lucide-vue-next'

export interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{ items: BreadcrumbItem[] }>()
</script>

<template>
  <nav class="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
    <NuxtLink to="/" class="flex items-center transition-colors hover:text-hospital-600 dark:hover:text-hospital-400">
      <Home class="h-4 w-4" />
    </NuxtLink>
    <template v-for="(item, index) in items" :key="index">
      <ChevronRight class="h-3.5 w-3.5 shrink-0 text-slate-300" />
      <NuxtLink
        v-if="item.to && index < items.length - 1"
        :to="item.to"
        class="transition-colors hover:text-hospital-600 dark:hover:text-hospital-400"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="font-medium text-slate-900 dark:text-white">{{ item.label }}</span>
    </template>
  </nav>
</template>
