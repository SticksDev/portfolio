<template>
  <div ref="containerRef" class="shrimp w-full h-full cursor-pointer" @click="toggleRotation"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'

const containerRef = ref<HTMLDivElement | null>(null)
const isRotating = ref(false)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let effect: AsciiEffect
let model: THREE.Group
let animationId: number

const toggleRotation = () => {
  isRotating.value = !isRotating.value
}

onMounted(() => {
  if (!containerRef.value) return

  // Scene setup
  scene = new THREE.Scene()
  scene.background = null

  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    1,
    1000
  )
  camera.position.set(0, 50, 15)
  camera.lookAt(0, 0, 0)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // ASCII Effect
  effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: false })
  effect.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  effect.domElement.style.color = 'rgba(0, 255, 65, 0.7)'
  effect.domElement.style.backgroundColor = 'transparent'
  containerRef.value.appendChild(effect.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, Math.PI / 2)
  scene.add(ambientLight)

  // Load GLTF model
  const loader = new GLTFLoader()
  loader.load('/shrimp_smol.glb', (gltf) => {
    model = new THREE.Group()
    model.position.set(0, -1, 0)

    // Find and add the mesh
    const mesh = gltf.scene.getObjectByName('Mesh_Mesh_head_geo001_lambert2SG001')
    if (mesh) {
      mesh.rotation.x = -Math.PI / 2
      model.add(mesh)
    }

    scene.add(model)
  })

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    if (model) {
      model.rotation.z += 0.01
    }

    effect.render(scene, camera)
  }
  animate()

  // Handle window resize
  const handleResize = () => {
    if (!containerRef.value) return

    camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera.updateProjectionMatrix()

    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
    effect.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (effect && effect.domElement && containerRef.value) {
    containerRef.value.removeChild(effect.domElement)
  }

  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
.shrimp {
  min-height: 400px;
}
</style>
