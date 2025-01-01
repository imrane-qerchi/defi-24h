<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// Importation de PocketBase et de Vue
import { pb } from '@/backend'
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'

// Données réactives pour le formulaire et les états
const formData = ref({
  nom: '',
  prenom: '',
  email: '',
  promotion: '',
  password: '',
  passwordConfirm: ''
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

// Fonction pour basculer la visibilité du mot de passe
function togglePasswordVisibility(target: 'password' | 'confirmPassword') {
  if (target === 'password') {
    showPassword.value = !showPassword.value
  } else if (target === 'confirmPassword') {
    showConfirmPassword.value = !showConfirmPassword.value
  }
}

// Fonction pour envoyer les données à PocketBase
async function registerUser() {
  errorMessage.value = ''
  successMessage.value = ''

  if (formData.value.password !== formData.value.passwordConfirm) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  try {
    await pb.collection('users').create({
      email: formData.value.email,
      password: formData.value.password,
      passwordConfirm: formData.value.passwordConfirm,
      nom: formData.value.nom,
      prenom: formData.value.prenom,
      promotion: formData.value.promotion
    })

    successMessage.value = 'Inscription réussie ! Vous allez être redirigé.'

    // Redirection après succès
    setTimeout(() => {
      router.push('/connexion')
    }, 2000)
  } catch (error: any) {
    errorMessage.value = error.message || 'Une erreur est survenue.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
    <!-- Titre principal -->
    <h1 class="text-3xl lg:text-5xl font-bold text-secondary mb-8">S’inscrire</h1>
    <p class="text-sm lg:text-lg font-light text-black text-center mb-12">
      Rejoins l'aventure Défi 24h et constitue ton équipe !
    </p>

    <!-- Formulaire -->
    <form
      @submit.prevent="registerUser"
      class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mb-12"
    >
      <input
        v-model="formData.nom"
        type="text"
        placeholder="Entre ton nom"
        class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
      />
      <input
        v-model="formData.prenom"
        type="text"
        placeholder="Entre ton prénom"
        class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
      />
      <input
        v-model="formData.email"
        type="email"
        placeholder="Entre ton email (universitaire)"
        class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
      />
      <input
        v-model="formData.promotion"
        type="text"
        placeholder="Entre ton année de promotion"
        class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
      />
      <div class="relative">
        <input
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Choisis un mot de passe"
          class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
        />
        <button
          type="button"
          class="absolute top-3 right-4 text-white focus:outline-none"
          @click="togglePasswordVisibility('password')"
        >
          👁️
        </button>
      </div>
      <div class="relative">
        <input
          v-model="formData.passwordConfirm"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Confirme ton mot de passe"
          class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
        />
        <button
          type="button"
          class="absolute top-3 right-4 text-white focus:outline-none"
          @click="togglePasswordVisibility('confirmPassword')"
        >
          👁️
        </button>
      </div>
    </form>

    <!-- Messages d'erreur et de succès -->
    <div v-if="errorMessage" class="text-red-500 mb-4 text-center">{{ errorMessage }}</div>
    <div v-if="successMessage" class="text-green-500 mb-4 text-center">{{ successMessage }}</div>

    <!-- Bouton de soumission -->
    <button
      type="submit"
      class="w-full max-w-xs py-3 px-6 text-white bg-secondary rounded-full text-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary"
      @click="registerUser"
    >
      S’inscrire
    </button>
  </div>
</template>
