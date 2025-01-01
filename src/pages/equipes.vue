<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pb } from '@/backend'
import CardDefi from '@/components/cardDefi.vue'

interface Member {
  prenom: string
  nom: string
  avatar?: string | null // Peut être une chaîne ou null
}

interface Team {
  nom: string
  photo?: string | null // Peut être une chaîne ou null
  expand?: {
    membres: Member[] // Liste des membres
  }
}

const router = useRouter()
const teams = ref<
  {
    teamName: string
    imageSrc: string
    members: { name: string; avatar: string }[]
  }[]
>([])

// Vérifie si l'utilisateur est connecté
const isLoggedIn = ref(false)

const checkLoginStatus = () => {
  isLoggedIn.value = !!pb.authStore.token // Vérifie si un token d'auth existe
}

// Fonction pour gérer la redirection au clic sur "Créer mon équipe"
const handleCreateTeam = () => {
  if (isLoggedIn.value) {
    router.push('/creation-equipe') // Redirige vers la création d'équipe si connecté
  } else {
    router.push('/connexion') // Redirige vers la connexion si non connecté
  }
}

// Fonction pour récupérer les données des équipes depuis PocketBase
const fetchTeams = async () => {
  try {
    const response: Team[] = await pb.collection('teams').getFullList({
      expand: 'membres' // Récupère les relations des membres
    })

    // Formate les données pour les adapter au composant CardDefi
    teams.value = response.map((team) => ({
      teamName: team.nom,
      imageSrc: team.photo ? pb.files.getUrl(team, team.photo) : '', // Fournit une chaîne vide si null
      members: (team.expand?.membres || []).map((member) => ({
        name: `${member.prenom} ${member.nom}`,
        avatar: member.avatar ? pb.files.getUrl(member, member.avatar) : '' // Fournit une chaîne vide si null
      }))
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error)
  }
}

onMounted(() => {
  checkLoginStatus()
  fetchTeams()
})
</script>

<template>
  <div class="mt-10 bg-primary px-8 py-12 lg:pl-16">
    <!-- Titre principal -->
    <div class="mb-12">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        ÉQUIPES.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Contenu -->
    <div class="mt-12 max-w-7xl">
      <p class="text-sm lg:text-2xl text-black mb-8">
        Juste en dessous, découvre la liste des équipes déjà créées et leurs membres.
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Tu peux choisir de créer ta propre équipe en cliquant sur “Créer mon équipe”, tu deviens
        alors automatiquement chef d’équipe.
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Si ton équipe est déjà créée clique simplement sur "Intégrer une équipe" pour en devenir
        membre. Si jamais tu changes d’avis, tu peux quitter ton équipe à tout moment depuis ta page
        "Mon compte".
      </p>

      <!-- Boutons -->
      <div
        class="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-32 my-12"
      >
        <button
          type="button"
          @click="handleCreateTeam"
          class="flex items-center justify-center bg-secondary text-white py-4 px-28 rounded-full text-2xl font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600"
          style="white-space: nowrap"
        >
          Créer mon équipe
        </button>
        <button
          type="button"
          class="flex items-center justify-center bg-secondary text-white py-4 px-28 rounded-full text-2xl font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600"
          style="white-space: nowrap"
        >
          Intégrer une équipe
        </button>
      </div>

      <!-- Cards -->
      <div
        v-if="teams.length"
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mt-20"
      >
        <CardDefi
          v-for="(team, index) in teams"
          :key="index"
          :teamName="team.teamName"
          :imageSrc="team.imageSrc"
          :members="team.members"
        />
      </div>
      <p v-else class="text-center text-lg text-black">Chargement des équipes...</p>
    </div>
  </div>
</template>
