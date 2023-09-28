<script setup lang="ts">
import type { Digimon } from '~/types'

definePageMeta({
  layout: 'single',
})

const route = useRoute()
const { slug } = route.params

const { data: digimon }: { data: Ref<Digimon> } = await useFetch(`/api/${slug}`)

useHead({
  title: digimon.value.name,
  meta: [
    {
      name: 'description',
      content: digimon.value.name,
    },
  ],
  link: {
    rel: 'icon',
    href: `/icons/${slug}.png`,
  },
})

const specs = computed(() => ({
  Type: digimon.value.name,
  Stage: digimon.value.stage,
  Attribute: digimon.value.attribute,
  Nature: digimon.value.nature,
}))

const conditionsKeys = computed(() => Object.keys(digimon.value.conditions).map(key => ({ key, label: key }) ))
const conditionsValues = computed(() => [digimon.value.conditions])

const evolutionsKeys = [
  {
    key: 'sprite',
  },
  {
    key: 'icon',
  }, {
    key: 'name',
    label: 'Name',
  }, {
    key: 'stage',
    label: 'Stage',
  }]

const hasEvolutionConditions = computed(() => !digimon.value.stage.includes('In-Training'))
</script>

<template>
  <SingleHeader
    :icon="digimon.sprite"
    :title="digimon.name"
  />
  <UContainer
    as="main"
    class="py-8 grid grid-cols-1 md:grid-cols-2 gap-8"
    :ui="{ constrained: 'max-w-5xl' }"
  >
    <section class="border p-4 rounded flex justify-between">
      <NuxtImg
        class="mb-4"
        :src="digimon.icon"
        :alt="digimon.name"
      />
      <KeyValueTable
        :data="specs"
        class="text-xs w-1/2"
      />
    </section>
    <section
      v-if="hasEvolutionConditions"
      class="border p-4 rounded"
    >
      <h3 class="text-xl font-bold mb-4">
        Evolution Conditions
      </h3>
      <UTable
        class="text-center"
        :ui="{
          th: {
            base: 'text-center uppercase',
          }, 
          td: {
            base: 'text-center',
          },
        }"
        :columns="conditionsKeys"
        :rows="conditionsValues"
      />
    </section>
    <section class="border p-4 rounded">
      <h3 class="text-xl font-bold mb-4">
        Evolves from
      </h3>
      <UTable
        class="text-center"
        :columns="evolutionsKeys"
        :rows="digimon.evolvesFrom"
        :ui="{
          th: {
            base: 'text-center',
          }, 
          td: {
            base: 'text-center',
          },
        }"
      >
        <template #sprite-data="{ row }">
          <NuxtImg
            class="w-8"
            :src="row.sprite"
            :alt="row.name"
          />
        </template>
        <template #icon-data="{ row }">
          <NuxtImg
            class="w-8"
            :src="row.icon"
            :alt="row.name"
          />
        </template>
        <template #name-data="{ row }">
          <NuxtLink
            :to="`/digimons/${row.slug}`"
          >
            {{ row.name }}
          </NuxtLink>
        </template>
      </UTable>
    </section>
    <section class="border p-4 rounded">
      <h3 class="text-xl font-bold mb-4">
        Evolves to
      </h3>
      <UTable
        class="text-center"
        :columns="evolutionsKeys"
        :rows="digimon.evolvesTo"
        :ui="{
          th: {
            base: 'text-center',
          }, 
          td: {
            base: 'text-center',
          },
        }"
      >
        <template #sprite-data="{ row }">
          <NuxtImg
            class="w-8"
            :src="row.sprite"
            :alt="row.name"
          />
        </template>
        <template #icon-data="{ row }">
          <NuxtImg
            class="w-8"
            :src="row.icon"
            :alt="row.name"
          />
        </template>
        <template #name-data="{ row }">
          <NuxtLink
            :to="`/digimons/${row.slug}`"
          >
            {{ row.name }}
          </NuxtLink>
        </template>
      </UTable>
    </section>
  </UContainer>
</template>
