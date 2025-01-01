<script setup lang="ts">
import { ref } from 'vue'

// Date cible : 17 janvier à 18h00
const targetDate = new Date('2025-01-17T18:00:00')

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate.getTime() - now

  if (distance > 0) {
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
  } else {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
  }
}

// Mise à jour initiale et intervalle
updateCountdown()
setInterval(updateCountdown, 1000)

const countdownUnits = [
  { label: 'j', value: days },
  { label: 'h', value: hours },
  { label: 'm', value: minutes },
  { label: 's', value: seconds }
]
</script>

<template>
  <div
    class="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-4 font-poppins text-transparent opacity-90"
    style="-webkit-text-stroke: 3px #0029ff"
  >
    <div v-for="(unit, index) in countdownUnits" :key="index" class="flex items-baseline">
      <p class="text-6xl sm:text-8xl md:text-9xl lg:text-[200px] font-bold">{{ unit.value }}</p>
      <span class="ml-2 text-4xl sm:text-5xl lg:text-6xl font-medium">{{ unit.label }}</span>
    </div>
  </div>
</template>
