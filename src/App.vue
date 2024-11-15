<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router/auto'
import LogInOut from './components/LogInOut.vue';
</script>

<template>
  <h1 class="text-2xl">Template principale (Menu/Footer...)</h1>
  <LogInOut/>
  <nav>
    <ul>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/about">À propos</RouterLink>
    </ul>
  </nav>
  
  <main>
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component" :key="$route.path"/>
      </Suspense>
    </RouterView>
  </main>
</template>