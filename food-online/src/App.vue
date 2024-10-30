<template>
  <div class="my-6">
    <Navbar />

    <div class="content-wrapper">
      <Menu />
    </div>
  </div>
  <div>
    <!-- <Login /> -->
  </div>
  <div>
    <!-- <Register /> -->
  </div>
</template>

<script setup>
import Navbar from './components/Navbar/Navbar.vue';
import Menu from './components/Menu/Menu.vue';
import Login from './components/Login/Login.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import Register from './components/Register/Register.vue';
</script>

<style scoped>
.content-wrapper {
  padding: 20px;
}

</style>
