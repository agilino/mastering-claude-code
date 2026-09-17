<script setup lang="ts">
// layout: section — a divider. The heading plus whatever map the slide
// passes in the #map slot (JourneyMap on part dividers, ToolkitMap on the
// primitive dividers in the control and orchestrate parts). The highlight
// lives on the component in the slot, so the layout takes no other props.
//
// Frontmatter:
//   heading: string
defineProps<{ heading?: string }>()
</script>

<template>
  <div class="slidev-layout w-full h-full flex flex-col justify-center px-16 py-10 gap-8">
    <h1 class="text-5xl">{{ heading }}</h1>
    <slot name="map" />
  </div>
</template>
