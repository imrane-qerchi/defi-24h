import { ref, watch } from 'vue'
import { pb } from '@/backend' // PocketBase instance
import { useRouter } from 'vue-router'

export const isLoggedIn = ref(!!pb.authStore.model) // Réactif pour l'état de connexion
export const user = ref(pb.authStore.model) // Réactif pour l'utilisateur connecté

const router = useRouter()

// Mise à jour de l'état d'authentification
const refreshAuthState = () => {
  isLoggedIn.value = !!pb.authStore.model
  user.value = pb.authStore.model
}

// Connexion utilisateur
export const login = async (email: string, password: string) => {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password)
    pb.authStore.save(authData.token, authData.record)
    refreshAuthState()
    router.push('/') // Redirige vers la page d'accueil après connexion
  } catch (error) {
    console.error('Erreur de connexion :', error)
    throw new Error('Échec de la connexion. Veuillez vérifier vos informations.')
  }
}

// Déconnexion utilisateur
export const logout = () => {
  pb.authStore.clear()
  refreshAuthState()
  router.push('/') // Redirige vers la page d'accueil après déconnexion
}

// Écouter les changements de l'état d'authentification (utile pour des redirections)
watch(
  () => pb.authStore.model,
  () => refreshAuthState()
)
