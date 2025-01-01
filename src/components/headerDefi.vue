<script setup lang="ts">
import { ref, computed } from 'vue'
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'

// État pour gérer l'ouverture/fermeture du menu mobile
const isMenuOpen = ref(false)

// Fonction pour basculer l'état du menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Fonction pour fermer le menu
const closeMenu = () => {
  isMenuOpen.value = false
}

// Vérification de l'état de connexion de l'utilisateur
const isLoggedIn = computed(() => !!pb.authStore.model)

const router = useRouter()

// Fonction pour gérer la déconnexion
const logout = () => {
  pb.authStore.clear()
  router.push('/') // Redirection vers la page d'accueil après déconnexion
}
</script>

<template> 
  <div class="h-8 bg-primary"></div>

  <!-- Header -->
  <header class="relative mx-auto flex items-center justify-between bg-black text-white px-6 py-4 rounded-full lg:space-x-4 lg:py-6 lg:px-10 max-w-[90%]">
    <!-- Logo avec espace ajouté à droite -->
    <div class="mr-8">
      <router-link to="/">
        <img src="/logo-defi24h.svg" alt="Défi 24H" class="h-14" />
      </router-link>
    </div>

    <!-- Navigation pour Desktop -->
    <nav class=" items-center space-x-6 hidden lg:flex">
      <router-link to="/equipes" class="text-lg font-medium hover:text-secondary transition">
        Équipes
      </router-link>
      <router-link to="/classement" class="text-lg font-medium hover:text-secondary transition">
        Classement
      </router-link>
      <router-link to="/programme" class="text-lg font-medium hover:text-secondary transition">
        Programme
      </router-link>
      <router-link to="/creations" class="text-lg font-medium hover:text-secondary transition">
        Créations
      </router-link>
      <router-link to="/galerie" class="text-lg font-medium hover:text-secondary transition">
        Galerie
      </router-link>
    </nav>

    <!-- Boutons pour Desktop -->
    <div class=" items-center space-x-2 hidden lg:flex">
      <router-link
        v-if="!isLoggedIn"
        to="/inscription"
        class="text-lg font-medium text-white hover:text-secondary transition"
      >
        Inscription
      </router-link>
      <button
        v-else
        @click="logout"
        class="text-lg font-medium text-white hover:text-secondary transition"
      >
        Déconnexion
      </button>
      <router-link
        v-if="!isLoggedIn"
        to="/connexion"
        class="bg-secondary text-white px-4 py-2 rounded-full hover:opacity-90 transition"
      >
        Connexion
      </router-link>
      <router-link
        v-else
        to="/mon-compte"
        class="bg-secondary text-white px-4 py-2 rounded-full hover:opacity-90 transition"
      >
        Mon compte
      </router-link>
    </div>

    <!-- Icône du menu mobile avec espace ajouté à gauche -->
    <div class="cursor-pointer lg:hidden ml-4" @click="toggleMenu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        class="h-8 w-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </div>
  </header>

  <!-- Menu latéral mobile -->
  <div
    v-if="isMenuOpen"
    class="fixed right-0 top-0 z-40 h-screen w-2/3 bg-black text-white transition-transform transform ease-in-out duration-300"
  >
    <div class="flex justify-end p-4">
      <!-- Icône de fermeture -->
      <div class="cursor-pointer" @click="closeMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          class="h-8 w-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
    <nav class="p-6">
      <ul class="flex flex-col space-y-6">
        <li>
          <router-link
            to="/equipes"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Équipes
          </router-link>
        </li>
        <li>
          <router-link
            to="/classement"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Classement
          </router-link>
        </li>
        <li>
          <router-link
            to="/programme"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Programme
          </router-link>
        </li>
        <li>
          <router-link
            to="/creations"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Créations
          </router-link>
        </li>
        <li>
          <router-link
            to="/galerie"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Galerie
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn"
            to="/inscription"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Inscription
          </router-link>
          <button v-else @click="logout" class="text-xl font-semibold hover:text-secondary">
            Déconnexion
          </button>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn"
            to="/connexion"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Connexion
          </router-link>
          <router-link
            v-else
            to="/mon-compte"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Mon compte
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
