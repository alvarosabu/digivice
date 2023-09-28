<script setup lang="ts">
useHead({
  title: 'Partners',
  link: {
    rel: 'icon',
    href: '/icons/meramon.png',
  },
})
const { data: partners } = await useAsyncData('/partners', () => queryContent('/partners').sort({ status: 1 }).find())
</script>

<template>
  <UContainer
    as="main"
    :ui="{ constrained: 'max-w-5xl' }"
  >
    <section class="grid grid-cols-1 md:gid-cols-4 gap-8 py-8">
      <NuxtLink
        v-for="(partner, $index) in partners"
        :key="partner.slug"
        :to="partner._path"
      >
        <div
          class="flex justify-between border p-4 rounded"
          :class="{ 'bg-lime-50 border-lime-200 text-lime-500': $index < 2 }"
        >
          <NuxtImg
          
            class="w-32"
            :src="partner.thumbnail"
            :alt="partner.name"
          />
          <div class="w-1/2">
            <h3 class="text-xl font-bold">
              {{ partner.name }}
            </h3>
            <p>
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ partner.status }}
              </UBadge>
            </p>
          </div>
        </div>
      </NuxtLink>
    </section>
  </UContainer>
</template>