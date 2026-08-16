<template>
  <div />
</template>

<script setup lang="ts">
// Pretty shareable URL: /blog/<slug> forwards to the desktop deep link,
// which opens the blog app and the article without loading animations
const route = useRoute()

await navigateTo(
  { path: '/desktop', query: { article: String(route.params.slug) } },
  { replace: true, redirectCode: 302 },
)
</script>
