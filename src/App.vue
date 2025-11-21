<script setup lang="ts">
import ErrorModal from "@/composables/Error/ErrorModal.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="p-4 bg-white shadow">
      <h1 class="text-xl font-semibold">InfoCaption Search</h1>
    </header>

    <main class="p-6">
      <router-view />
    </main>

    <ErrorModal />
  </div>
</template>
