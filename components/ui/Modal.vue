<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  { size: 'md' },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const close = () => emit('update:modelValue', false)

watch(
  () => props.modelValue,
  (open) => {
    if (import.meta.client) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
        @click.self="close"
      >
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
        <Transition
          enter-active-class="transition duration-250 ease-out"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="modelValue"
            class="relative z-10 w-full animate-slide-up rounded-2xl bg-white shadow-premium dark:bg-slate-900"
            :class="sizeClasses[size]"
            role="dialog"
            aria-modal="true"
          >
            <div v-if="title" class="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ title }}</h2>
              <button
                type="button"
                class="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                @click="close"
              >
                <X class="h-5 w-5" />
              </button>
            </div>
            <div class="max-h-[80vh] overflow-y-auto p-6">
              <slot />
            </div>
            <div v-if="$slots.footer" class="border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
