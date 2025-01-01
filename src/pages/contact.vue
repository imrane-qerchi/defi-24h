<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// Fonction pour gérer l'envoi du formulaire
const handleSubmit = (event: Event) => {
  event.preventDefault()
  alert('Message envoyé !')
}
</script>

<template>
  <div class="mt-10 bg-primary flex flex-col px-8 py-12">
    <!-- Titre principal -->
    <div class="mb-12 lg:pl-16">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        CONTACT.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Contenu principal -->
    <div
      class="flex flex-col lg:flex-row lg:items-start w-full max-w-5xl mx-auto space-y-8 lg:space-y-0 lg:space-x-8"
    >
      <!-- Section gauche : Sous-titre -->
      <div class="flex flex-col justify-start">
        <h2 class="text-5xl lg:text-8xl font-extrabold text-black mb-4 text-left">
          Une question ?
        </h2>
      </div>

      <!-- Section droite : Formulaire -->
      <form class="lg:w-1/2 space-y-6" @submit="handleSubmit">
        <!-- Champ Nom -->
        <div>
          <label for="name" class="block text-sm lg:text-2xl font-bold text-black mb-2">NOM</label>
          <input
            type="text"
            id="name"
            placeholder="Entre ton nom"
            class="w-full px-4 py-3 bg-white border lg:text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        <!-- Champ Email -->
        <div>
          <label for="email" class="block text-sm lg:text-2xl font-bold text-black mb-2"
            >EMAIL</label
          >
          <input
            type="email"
            id="email"
            placeholder="Entre ton email"
            class="w-full px-4 py-3 bg-white border lg:text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        <!-- Champ Objet -->
        <div>
          <label for="subject" class="block text-sm lg:text-2xl font-bold text-black mb-2"
            >OBJET</label
          >
          <input
            type="text"
            id="subject"
            placeholder="Entre l'objet du message"
            class="w-full px-4 py-3 bg-white border lg:text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        <!-- Champ Message -->
        <div>
          <label for="message" class="block text-sm lg:text-2xl font-bold text-black mb-2"
            >MESSAGE</label
          >
          <textarea
            id="message"
            rows="5"
            placeholder="Entre ton message"
            class="w-full px-4 py-3 bg-white border lg:text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          ></textarea>
        </div>

        <!-- Bouton Envoyer -->
        <div class="flex justify-start">
          <button
            type="submit"
            class="px-14 py-4 text-white bg-secondary rounded-full text-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
