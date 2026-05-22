<script setup lang="ts">
useTheme()
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 dark:bg-slate-950">
    <LayoutAppSidebar />
    <LayoutMobileSidebar />
    <div class="flex min-w-0 flex-1 flex-col">
      <LayoutAppHeader>
        <template #breadcrumb>
          <slot name="breadcrumb" />
        </template>
      </LayoutAppHeader>
      <main class="flex-1 p-4 lg:p-6">
        <slot />
      </main>
    </div>
    <UiToastContainer />
  </div>
</template>
