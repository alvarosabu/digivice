<script lang="ts" setup>
import type { Digimon } from '~/types'

const props = defineProps<{
  partner: Digimon
  digimon: Digimon
}>()

function getClass(stat, condition) {
  let classes = 'p-1 rounded text-xs '
  if (condition) {
    const refStat = parseInt(stat)
    const symbol = condition.split(' ')[0]
    const value = parseInt(condition.split(' ')[1])

    if (symbol === '≥') {
      if (refStat > value) {
        classes += 'bg-green-50 text-green-500'
      }
      else {
        classes += 'bg-red-50 text-red-500'
      }
    }
    else if (symbol === '≤') {
      if (refStat < value) {
        classes += 'bg-green-50 text-green-500'
      }
      else {
        classes += 'bg-red-50 text-red-500'
      }
    }
    else if (symbol === '=') {
      if (refStat === value) {
        classes += 'bg-green-50 text-green-500'
      }
      else {
        classes += 'bg-red-50 text-red-500'
      }
    }
  }
  return classes
}
</script>

<template>
  <div class="w-[400px] md:w-full overflow-x-scroll">
    <div
      role="table"
      class="w-full"
    >
      <div
        role="rowgroup"
        class="flex gap-4 p-4 border-b border-gray-200"
      >
        <div
          role="columnheader"
          class="flex flex-none md:flex-1 justify-center text-center font-medium text-xs leading-4 text-gray-500 uppercase tracking-wider py-2 px-4"
        />
        <div
          role="columnheader"
          class="flex flex-none md:flex-1 justify-center text-center font-medium text-xs leading-4 text-gray-500 uppercase tracking-wider py-2 px-4"
        >
          <img
            :src="digimon.sprite"
            :alt="`${digimon.name} sprite`"
            class="w-8 h-8"
          >
        </div>
        <template v-if="digimon.stage !== 'Mega'">
          <div
            v-for="digimonItem in digimon.evolvesTo"
            :key="digimonItem?.slug"
            role="columnheader"
            class="flex flex-none md:flex-1 justify-center text-center font-medium text-xs leading-4 text-gray-500 uppercase tracking-wider py-2 px-4"
          >
            <NuxtLink :to="`/digimons/${digimonItem?.slug}`">
              <UTooltip :text="digimonItem.name">
                <img
                  :title="digimonItem?.slug"
                  :src="digimonItem?.sprite"
                  :alt="`${digimonItem?.name} sprite`"
                  class="w-8 h-8"
                >
              </UTooltip>
            </NuxtLink>
          </div>
        </template>
      </div>
      <div
        v-for="key in Object.keys(partner.stats)"
        :key="key"
        role="row"
        class="flex gap-4 p-4 border-b border-gray-200"
      >
        <div
          role="columnheader"
          class="flex-1 text-center font-bold uppercase"
        >
          {{ key }}
        </div>
        <div
          role="cell"
          class="flex-1 text-center"
        >
          {{ partner.stats[key] }}
        </div>
        <template v-if="digimon.stage !== 'Mega'">
          <div
            v-for="digimonItem in digimon.evolvesTo"
            :key="digimonItem?.slug"
            role="cell"
            class="flex-1 text-center"
          >
            <span :class="getClass(partner.stats[key], digimonItem?.conditions[key])">{{ digimonItem?.conditions[key] }}</span>
          </div>
        </template>
      </div>
      <div
        role="row"
        class="flex gap-4 p-4 border-b border-gray-200"
      >
        <div
          role="columnheader"
          class="flex-1 text-center font-bold uppercase"
        >
          Key points
        </div>
        <div
          role="cell"
          class="flex-1 text-center"
        />
        <div
          v-for="digimonItem in digimon.evolvesTo"
          :key="digimonItem.name"
          role="cell"
          class="flex-1 text-center"
        >
          <span>{{ digimonItem?.conditions.keyPoints }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
