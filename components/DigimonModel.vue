<script setup lang="ts">
import { Mesh, MeshBasicMaterial } from 'three'

const props = defineProps<{
  digimon: string
}>()
const { scene, nodes, animations } = await useGLTF(`/models/${props.digimon}.glb`, { draco: true })

const model = nodes.body
const texture = await useTexture([`/models/${props.digimon}.png`])
const { actions, mixer } = useAnimations(animations, model)

Object.keys(actions).forEach((key) => {
  if (key.includes('idle')) {
    actions[key].play()
  }
})

texture.flipY = false

const baked = new MeshBasicMaterial({
  map: texture,
})

model.material = baked
</script>

<template>
  <primitive :object="scene" />
</template>