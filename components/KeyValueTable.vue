<script lang="ts" setup>
defineProps<{
  data: Record<string, string>
}>()
</script>

<template>
  <div class="overflow-hidden sm:rounded-lg">
    <!-- Table Row 1 -->
    <div
      v-for="(value, key) in data"
      :key="key"
      role="row"
      class="grid grid-cols-2 p-2 border-b border-gray-200"
    >
      <div
        role="columnheader"
        class="font-bold"
      >
        <span class="hover:bg-gray-100 cursor-pointer p-1.5 transition rounded">
          {{ key }}
        </span>
      </div>
      <div role="cell">
        <span class="hover:bg-gray-100 cursor-pointer p-1.5 transition rounded">
          {{ value }}
        </span>
      </div>
    </div>
              
    <!-- Table Row 2 -->
  </div>
</template>

<style scoped></style>
