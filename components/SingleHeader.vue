<script lang="ts" setup>
defineProps<{
  icon: string
  title: string
}>()
</script>

<template>
  <header class="w-full border-b py-8 mb-16">
    <UContainer
      :ui="{ constrained: 'max-w-5xl' }"
    >
      <div class="flex items-center">
        <img
          :src="icon"
          class="mr-8"
          :alt="title"
        >
        <h2 class="text-4xl font-bold text-gray-600">
          {{ title }}
        </h2>
      </div>
    </UContainer>
  </header>
</template>

<style scoped></style>
