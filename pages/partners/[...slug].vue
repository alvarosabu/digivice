<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

definePageMeta({
  layout: 'single',
})
const gl = {
  clearColor: '#ffffff',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const route = useRoute()

const { slug } = route.params

const { data: partner } = await useAsyncData('partners', () => queryContent(route.path).findOne())

/* const { data: digimon } = await useFetch(`/api/${partner.value.specie}`)
const isDigimonDataReady = ref(false) */

const { data: digimon } = await useAsyncData('digimons', 
  () => queryContent(`digimons/${partner?.value?.specie}`).findOne())

useHead({
  title: partner.value.name,
  meta: [
    {
      name: 'description',
      content: partner.value.name,
    },
  ],
  link: {
    rel: 'icon',
    href: `/icons/${partner.value.specie}.png`,
  },
})

const evolvesTo = await Promise.all(digimon.value.evolvesTo
  .map(async ({ slug }) => queryContent(`digimons/${slug}`)))
 
digimon.value.evolvesTo = evolvesTo.map(({ data }) => data.value).filter(Boolean)

const chart = await Promise.all(partner.value.chart
  .map(async slug => queryContent(`digimons/${slug}`)))

const evolutionChart = chart.map(({ data }) => data.value).filter(Boolean)
</script>

<template>
  <SingleHeader
    :icon="digimon.sprite"
    :title="`${partner.name} (${digimon.name})`"
  />
      
  <UContainer
    as="main"
    class="py-8 flex flex-wrap md:flex-nowrap gap-8"
    :ui="{ constrained: 'max-w-5xl' }"
  >
    <div class="w-full sm:w-1/3 mb-16 sm:mb-0">
      <!-- <TheExperience
        v-if="partner.model"
        :digimon="digimon.slug"
      /> -->
      <div
        v-if="partner.model"
        class="h-[300px] w-[300px] border mb-8"
      >
        <TresCanvas v-bind="gl">
          <TresPerspectiveCamera
            :position="[3, 3, 3]"
            :look-at="[0, 1.5, 0]"
          />
          <OrbitControls />
          <Suspense>
            <DigimonModel :digimon="digimon.slug" />
          </Suspense>
          <TresGridHelper />
          <TresAmbientLight :intensity="2" />
        </TresCanvas>
      </div>
      <NuxtImg
        v-else
        class="w-350px mb-8"
        :src="partner.thumbnail"
        :alt="partner.name"
      />
      <p class="b-dark p-2 border border-gray-500 rounded text-gray-600">
        {{ digimon.description }}
      </p>
      <EvolutionChart
        v-if="evolutionChart.length > 0"
        :evolutions="evolutionChart"
      />
    </div>
    <div class="w-full sm:w-2/3 overflow-x-scroll">
      <h3 class="text-xl font-bold mb-4">
        Evolution Planner
      </h3>
      <EvolutionTable
        :partner="partner"
        :digimon="digimon"
      />
    </div>
  </UContainer>
</template>