<script setup lang="ts">
import CountdownTimer from '@/components/CountdownTimer.vue'
</script>

<template>
  <!-- En-tête de la page -->
  <div class="flex-1 lg:pl-20 flex flex-col items-start pb-10 mt-20">
    <div class="mt-12 mb-10 lg:mb-8 order-1 lg:order-2">
      <h1 class="text-3xl lg:text-5xl font-bold text-secondary">We are</h1>
      <h2 class="text-4xl lg:text-6xl font-bold text-secondary">Coming Soon.</h2>
      <p class="text-xl lg:text-2xl font-bold mt-4">17 Janvier 2025</p>
    </div>
    <CountdownTimer class="order-2 lg:order-1 mb-10 lg:mb-0 w-full max-w-screen-lg mx-auto" />
  </div>

  <!-- Bandeaux superposés dans une même div -->
  <div class="relative">
    <!-- Bandeau arrière-plan (blanc, défilant, avec rotation légère) -->
    <div
      class="absolute top-0 left-0 w-full bg-white text-secondary text-center py-6 font-bold text-lg lg:text-6xl transform rotate-3"
    >
      <div class="overflow-hidden whitespace-nowrap">
        <p class="animate-marquee-10s">
          Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie ?
        </p>
      </div>
    </div>
    <!-- Bandeau de présentation avant-plan (décalé et défilant) -->
    <div
      class="bg-secondary text-white text-center py-6 font-bold text-lg lg:text-6xl transform -rotate-3 mt-10"
    >
      <div class="overflow-hidden whitespace-nowrap">
        <p class="animate-marquee-10s">
          Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie ?
        </p>
      </div>
    </div>
  </div>

  <!-- Section principale -->
  <div class="bg-primary px-6 lg:px-24 py-14 lg:py-28">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2
          class="text-4xl lg:text-6xl font-bold text-transparent"
          style="-webkit-text-stroke: 1px #0029ff"
        >
          24 HEURES
        </h2>
        <h3 class="text-2xl lg:text-3xl font-bold text-secondary mt-2">
          Pour Créer, Rire… Et Ne Pas Dormir !
        </h3>
        <p class="text-sm lg:text-lg mt-6">
          Le Défi 24H, c’est l’événement incontournable du cursus MMI : 24 heures non-stop pour
          créer, imaginer et repousser vos limites sur un thème surprise. Que vous soyez fan de
          design, de montage, de développement ou juste là pour l’ambiance (et les pizzas), tout le
          monde a sa place !
        </p>
      </div>
      <div class="text-center">
        <p class="text-sm lg:text-lg font-bold text-black mb-6">
          Prêt à relever le challenge ?<br />Inscris-toi dès maintenant !
        </p>
        <router-link
          to="/inscription"
          class="bg-secondary text-white px-6 py-3 rounded-full text-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Inscription
        </router-link>
      </div>
    </div>

    <div class="mt-24 text-center">
      <h3 class="text-xl lg:text-3xl font-bold text-secondary mb-6">Un Pour Tous</h3>
      <h2
        class="text-4xl lg:text-8xl font-bold text-transparent"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        TOUS POUR<br />L’ÉQUIPE !
      </h2>
      <p class="text-sm lg:text-lg mt-6 text-left">
        Au Défi 24H, on joue en équipe ! Regroupe 4 ou 5 génies créatifs (ou juste tes potes, ça
        marche aussi), et prépare-toi à vivre une aventure intense. Chacun apporte ses talents, que
        ce soit pour le design, le montage ou simplement pour encourager. Une seule règle : pas plus
        de 5, sinon c’est la révolution !
      </p>
      <div class="flex justify-center space-x-4 mt-8">
        <router-link
          to="/creer-equipe"
          class="bg-secondary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Créer mon équipe
        </router-link>
        <router-link
          to="/integrer-equipe"
          class="bg-secondary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Intégrer une équipe
        </router-link>
      </div>
    </div>

    <!-- Partenaires -->
    <div class="mt-24 text-center">
      <h3 class="text-xl lg:text-3xl font-bold text-secondary mb-6">NOS PARTENAIRES</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
        <img src="#" alt="Maison des Étudiants de Montbéliard" class="mx-auto h-16" />
        <img src="#" alt="CROUS" class="mx-auto h-16" />
        <img src="#" alt="Littera" class="mx-auto h-16" />
        <img src="#" alt="Université Marie et Louis Pasteur" class="mx-auto h-16" />
      </div>
    </div>

    <!-- Section Contact -->
    <div class="mt-24 text-center">
      <h3 class="text-xl lg:text-6xl font-bold text-secondary mb-6">
        Une Question ? Besoin D’Infos ?
      </h3>
      <h2
        class="text-4xl lg:text-8xl font-bold text-transparent mb-4"
        style="-webkit-text-stroke: 2px #0029ff"
      >
        CONTACTEZ NOUS
      </h2>

      <div class="flex items-center justify-center space-x-4 mb-6">
        <router-link
          to="/contact"
          class="bg-secondary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Envoyer un message
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(75%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee-10s {
  0% {
    transform: translateX(75%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee-10s {
  display: inline-block;
  white-space: nowrap;
  animation: marquee-10s 15s linear infinite;
}
</style>
