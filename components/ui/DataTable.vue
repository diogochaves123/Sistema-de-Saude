<script setup lang="ts" generic="T extends Record<string, unknown>">
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-vue-next'
import type { TableColumn } from '~/types'

const props = defineProps<{
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
}>()

const sortKey = ref<string | null>(null)
const sortDir = ref<'asc' | 'desc'>('asc')

const sortedData = computed(() => {
  if (!sortKey.value) return props.data
  const key = sortKey.value
  return [...props.data].sort((a, b) => {
    const av = String(a[key] ?? '')
    const bv = String(b[key] ?? '')
    const cmp = av.localeCompare(bv, 'pt-BR', { numeric: true })
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

const toggleSort = (key: string, sortable?: boolean) => {
  if (!sortable) return
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}
</script>

<template>
  <div class="glass-card overflow-hidden">
    <!-- Desktop table -->
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30">
            <th
              v-for="col in columns"
              :key="String(col.key)"
              class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              :class="col.class"
            >
              <button
                v-if="col.sortable"
                type="button"
                class="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200"
                @click="toggleSort(String(col.key), col.sortable)"
              >
                {{ col.label }}
                <ChevronUp v-if="sortKey === col.key && sortDir === 'asc'" class="h-3.5 w-3.5" />
                <ChevronDown v-else-if="sortKey === col.key && sortDir === 'desc'" class="h-3.5 w-3.5" />
                <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-40" />
              </button>
              <span v-else>{{ col.label }}</span>
            </th>
            <th v-if="$slots.actions" class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <UiSkeletonLoader v-for="i in 5" :key="i" variant="table-row" />
          </template>
          <template v-else-if="sortedData.length === 0">
            <tr>
              <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="px-4 py-12 text-center text-slate-500">
                {{ emptyMessage ?? 'Nenhum registro encontrado.' }}
              </td>
            </tr>
          </template>
          <tr
            v-for="(row, idx) in sortedData"
            v-else
            :key="idx"
            class="border-b border-slate-50 transition-colors hover:bg-slate-50/80 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
          >
            <td v-for="col in columns" :key="String(col.key)" class="px-4 py-3.5" :class="col.class">
              <slot :name="`cell-${String(col.key)}`" :row="row" :value="row[col.key as keyof T]">
                {{ row[col.key as keyof T] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="px-4 py-3.5 text-right">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile cards -->
    <div class="divide-y divide-slate-100 dark:divide-slate-800 md:hidden">
      <template v-if="loading">
        <div v-for="i in 3" :key="i" class="p-4">
          <UiSkeletonLoader variant="card" :lines="2" />
        </div>
      </template>
      <template v-else-if="sortedData.length === 0">
        <p class="p-8 text-center text-sm text-slate-500">{{ emptyMessage ?? 'Nenhum registro encontrado.' }}</p>
      </template>
      <div
        v-for="(row, idx) in sortedData"
        v-else
        :key="idx"
        class="p-4 transition-colors active:bg-slate-50 dark:active:bg-slate-800/50"
      >
        <slot name="mobile" :row="row">
          <dl class="space-y-2">
            <div v-for="col in columns" :key="String(col.key)" class="flex justify-between gap-4 text-sm">
              <dt class="text-slate-500">{{ col.mobileLabel ?? col.label }}</dt>
              <dd class="font-medium text-slate-900 dark:text-white text-right">
                <slot :name="`cell-${String(col.key)}`" :row="row" :value="row[col.key as keyof T]">
                  {{ row[col.key as keyof T] }}
                </slot>
              </dd>
            </div>
          </dl>
        </slot>
        <div v-if="$slots.actions" class="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <slot name="actions" :row="row" />
        </div>
      </div>
    </div>
  </div>
</template>
