// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/content', '@tresjs/nuxt'],
  css: ['~/styles/main.css'],
  image: {
    provider: 'netlify',
  },
})