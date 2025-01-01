<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/backend'
import CardDefi from '@/components/cardDefi.vue'

const teams = ref([])

// Fonction pour récupérer les données des équipes depuis Pocketbase
const fetchTeams = async () => {
  try {
    const response = await pb.collection('teams').getFullList({
      expand: 'chef,membres' // Récupère les relations des chefs et membres
    })

    // Formate les données pour les adapter au composant CardDefi
    teams.value = response.map((team) => ({
      teamName: team.nom,
      imageSrc: team.photo ? pb.files.getUrl(team, team.photo) : null,
      members: team.expand.membres.map((member: any) => ({
        name: `${member.prenom} ${member.nom}`,
        avatar: member.avatar ? pb.files.getUrl(member, member.avatar) : null
      }))
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error)
  }
}

onMounted(fetchTeams)
</script>

<template>
  <div class="min-h-screen bg-primary px-8 py-12 pl-16">
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
        class="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-8 mb-12"
      >
        <button
          type="button"
          class="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Créer mon équipe
        </button>
        <button
          type="button"
          class="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Intégrer une équipe
        </button>
      </div>

      <!-- Cards -->
      <div v-if="teams.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

<style scoped>
/* Styles pour la photo de profil (empêche la déformation) */
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
