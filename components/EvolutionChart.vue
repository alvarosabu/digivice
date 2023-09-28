<script lang="ts" setup>
defineProps<{
  evolutions: Record<string, string>[]
}>()
</script>

<template>
  <div role="table">
    <div
      role="rowgroup"
      class="grid grid-cols-6 w-full gap-4 p-4 border-b border-gray-200"
    >
      <div
        v-for="header in ['Baby I', 'Baby II', 'Rookie', 'Champion', 'Ultimate', 'Mega']"
        :key="header"
        role="columnheader"
        class="flex flex-1 justify-center text-center font-medium text-xs word-break text-gray-500 uppercase tracking-wider py-2 px-4"
      >
        {{ header }}
      </div>
    </div>
    <div
      role="row"
      class="grid grid-cols-6 w-full gap-4 p-4 border-b border-gray-200"
    >
      <div
        v-for="digimon in evolutions"
        :key="digimon?.slug"
        role="cell"
        class="flex-1 text-center"
      >
        <NuxtLink :to="`/digimons/${digimon?.slug}`">
          <UTooltip :text="digimon.name">
            <NuxtImg
              :src="digimon?.sprite"
              :alt="`${digimon?.name}`"
              class="h-8"
            />
          </UTooltip>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
