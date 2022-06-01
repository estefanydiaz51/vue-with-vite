<template>
  <div>
    <h1>App</h1>
    <nav v-if="!userStore.loadingSession">
      <router-link v-if="userStore.userData" to="/">Home</router-link> |
      <router-link to="/login" v-if="!userStore.userData">Login</router-link> |
      <router-link to="/register" v-if="!userStore.userData">Register</router-link> 
      <button v-if="userStore.userData" @click="userStore.logoutUser">Logout</button>
    </nav>
    <div v-else>
      Loading user...
    </div>
    <router-view></router-view>
  </div>  
</template>

<script setup>
import { useUserStore } from './stores/user'
  const userStore = useUserStore();


</script>

<style>

</style>
