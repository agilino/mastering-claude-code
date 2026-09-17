<script setup lang="ts">
// D02 — One token at a time. Left: the prompt that grows. Right: the ranked
// probabilities for the next token. Each click appends the top pick and
// shows the new distribution.
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $clicks } = useSlideContext()

const steps = [
  { prompt: ['Fix the bell.'], out: [], cands: [['Sure', 62], ['I', 18], ['Okay', 9], ['Let', 7], ['The', 4]] },
  { prompt: ['Fix the bell.'], out: ['Sure'], cands: [[',', 71], ['!', 12], ['.', 9], ['—', 5], ['thing', 3]] },
  { prompt: ['Fix the bell.'], out: ['Sure', ','], cands: [['I', 58], ['let', 20], ['first', 11], ['the', 7], ['reading', 4]] },
  { prompt: ['Fix the bell.'], out: ['Sure', ',', 'I'], cands: [['will', 66], ['can', 14], ['need', 10], ['see', 6], ['read', 4]] },
] as const

const step = computed(() => steps[Math.min(Math.max($clicks.value, 0), steps.length - 1)])
</script>

<template>
  <div class="grid w-full max-w-4xl gap-10 items-center" style="grid-template-columns: 1fr 1.2fr">
    <!-- register three click steps with Slidev -->
    <span v-click="1" class="hidden" /><span v-click="2" class="hidden" /><span v-click="3" class="hidden" />
    <div class="na-card p-6">
      <div class="text-xs font-mono mb-3 uppercase tracking-wide" style="color: var(--na-fg-muted)">goes in</div>
      <div class="text-xl leading-relaxed">
        <span style="color: var(--na-fg)">{{ step.prompt[0] }}</span>
        <span
          v-for="(t, i) in step.out"
          :key="i"
          class="inline-block ml-2 px-2 rounded font-mono"
          :style="{ background: i === step.out.length - 1 ? 'var(--na-accent-500)' : 'var(--na-primary-600)', color: i === step.out.length - 1 ? 'var(--na-zinc-950)' : 'var(--na-fg)' }"
        >{{ t }}</span>
        <span class="inline-block ml-2 w-3 h-6 align-middle" style="background: var(--na-fg-muted); opacity: 0.6" />
      </div>
    </div>
    <div class="na-card p-6">
      <div class="text-xs font-mono mb-3 uppercase tracking-wide" style="color: var(--na-fg-muted)">next token? chances</div>
      <div class="flex flex-col gap-2">
        <div v-for="([tok, p], i) in step.cands" :key="tok + i" class="flex items-center gap-3">
          <span class="font-mono text-base w-20 text-right" :style="{ color: i === 0 ? 'var(--na-fg)' : 'var(--na-fg-muted)' }">{{ tok }}</span>
          <div class="flex-1 h-5 rounded" style="background: var(--na-zinc-800)">
            <div class="h-5 rounded" :style="{ width: p + '%', background: i === 0 ? 'var(--na-accent-500)' : 'var(--na-primary-500)', transition: 'width var(--na-duration-normal) var(--na-ease-out)' }" />
          </div>
          <span class="font-mono text-sm w-12" style="color: var(--na-fg-muted)">{{ p }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>
