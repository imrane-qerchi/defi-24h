<script setup lang="ts">
import { pb } from '@/backend'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { UsersResponse } from '@/pocketbase-types'
import ImgPb from '@/components/ImgPb.vue'

// Références réactives pour l'utilisateur et ses informations
const user = ref<UsersResponse | null>(null)
const editableFields = ref<Record<string, boolean>>({
  prenom: false,
  nom: false,
  email: false,
  promotion: false
})

// Initialisation de Vue Router
const router = useRouter()

// Chargement des informations de l'utilisateur
const fetchUser = async () => {
  try {
    const authModel = pb.authStore.model as UsersResponse
    const userData = await pb.collection('users').getOne(authModel.id)

    // Charger les détails de l'équipe séparément
    if (userData.equipe) {
      const teamData = await pb.collection('teams').getOne(userData.equipe)
      user.value = { ...userData, expand: { equipe: teamData } }
    } else {
      user.value = userData
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error)
  }
}

// Fonction pour mettre à jour les informations utilisateur
const updateUser = async (field: keyof UsersResponse, value: string) => {
  if (!user.value) return

  try {
    user.value = await pb.collection('users').update(user.value.id, { [field]: value })
    editableFields.value[field] = false
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  }
}

// Basculer l'édition d'un champ
const enableEdit = (field: keyof UsersResponse) => {
  editableFields.value[field] = true
}

// Redirection vers la page de création d'équipe
const goToCreateTeam = () => {
  router.push('/creation-equipe')
}

// Redirection vers la page de modification d'équipe
const goToEditTeam = () => {
  if (user.value?.expand?.equipe) {
    router.push(`/edit-equipe/${user.value.equipe.id}`)
  }
}

// Fonction pour quitter l'équipe
const leaveTeam = async () => {
  if (!user.value) return

  try {
    await pb.collection('users').update(user.value.id, { equipe: null }) // Supprime l'équipe de l'utilisateur
    user.value.expand = { ...user.value.expand, equipe: null } // Met à jour localement
    fetchUser() // Recharge les données utilisateur
  } catch (error) {
    console.error("Erreur lors de la tentative de quitter l'équipe:", error)
  }
}

onMounted(fetchUser)
</script>

<template>
  <div class="min-h-screen bg-primary px-8 py-12">
    <!-- Titre principal -->
    <div class="mb-12 pl-16">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        MON COMPTE.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <div
      class="flex flex-col lg:flex-row items-center mb-12 space-y-6 lg:space-y-0 lg:space-x-8 pl-24"
    >
      <!-- Photo de profil -->
      <div class="relative w-32 h-32 rounded-full overflow-hidden">
        <ImgPb
          v-if="user"
          :record="{ id: user.id, collectionName: 'users' }"
          :filename="user.avatar"
          width="128"
          height="128"
        />
        <button
          class="absolute bottom-[-10px] right-[-10px] bg-transparent text-secondary border border-secondary rounded-full p-2"
          @click="() => console.log('Feature à implémenter')"
        >
          ✎
        </button>
      </div>

      <!-- Nom et Email -->
      <div>
        <h2 class="text-2xl font-bold">{{ user?.prenom }} {{ user?.nom }}</h2>
        <p class="text-lg text-gray-700">{{ user?.email }}</p>
      </div>
    </div>

    <div class="mb-12 pl-24">
      <h3 class="text-xl font-bold text-secondary mb-6">Informations</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Prénom</label>
          <div class="relative">
            <input
              type="text"
              :disabled="!editableFields.prenom"
              :value="user?.prenom"
              @blur="(e) => updateUser('prenom', e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button class="absolute right-2 top-2 text-gray-500" @click="enableEdit('prenom')">
              ✎
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Nom</label>
          <div class="relative">
            <input
              type="text"
              :disabled="!editableFields.nom"
              :value="user?.nom"
              @blur="(e) => updateUser('nom', e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button class="absolute right-2 top-2 text-gray-500" @click="enableEdit('nom')">
              ✎
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <div class="relative">
            <input
              type="email"
              :disabled="!editableFields.email"
              :value="user?.email"
              @blur="(e) => updateUser('email', e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button class="absolute right-2 top-2 text-gray-500" @click="enableEdit('email')">
              ✎
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Année de promotion</label>
          <div class="relative">
            <input
              type="text"
              :disabled="!editableFields.promotion"
              :value="user?.promotion"
              @blur="(e) => updateUser('promotion', e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button class="absolute right-2 top-2 text-gray-500" @click="enableEdit('promotion')">
              ✎
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Mot de passe</label>
          <div class="relative">
            <input
              type="password"
              value="********"
              disabled
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              class="absolute right-2 top-2 text-gray-500"
              @click="() => console.log('Feature à implémenter')"
            >
              ✎
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Équipe</label>
          <p class="text-gray-700 bg-white border rounded-lg px-4 py-2">
            {{ user?.expand?.equipe?.nom || "Vous n'avez pas encore d'équipe." }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Statut</label>
          <p
            class="text-gray-700 bg-white border rounded-lg px-4 py-2 italic"
            v-if="!user?.expand?.equipe"
          >
            Vous n’avez pas encore d’équipe.
          </p>
          <p
            class="text-gray-700 bg-white border rounded-lg px-4 py-2"
            v-else-if="user?.expand?.equipe?.chef === user.id"
          >
            Chef d'équipe
          </p>
          <p class="text-gray-700 bg-white border rounded-lg px-4 py-2" v-else>Membre</p>
        </div>
      </div>
    </div>

    <!-- Boutons dynamiques -->
    <div class="flex justify-center space-x-4 pl-24">
      <button
        v-if="!user?.equipe"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        @click="goToCreateTeam"
      >
        Créer mon équipe
      </button>

      <button
        v-if="user?.equipe && user?.equipe.chef === user.id"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        @click="goToEditTeam"
      >
        Modifier mon équipe
      </button>

      <button
        v-if="user?.equipe && user?.equipe.chef !== user.id"
        class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        @click="leaveTeam"
      >
        Quitter l'équipe
      </button>
    </div>
  </div>
</template>
