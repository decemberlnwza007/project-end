<template>
    <div v-if="visible" class="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-bold">{{ title }}</h2>
          <p>{{ message }}</p>
        </div>
        <button @click="closeAlert" class="ml-4 text-red-500 hover:text-red-400">
          ×
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps(['title', 'message']);
  const emit = defineEmits(['close']);
  const visible = ref(true);
  
  const closeAlert = () => {
    visible.value = false;
    emit('close');
  };
  </script>
  
  <style scoped>
  </style>
  