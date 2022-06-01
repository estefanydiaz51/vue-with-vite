<template>
  <div>
      <h1>Register</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="email" type="email"  placeholder="Ingrese email">
        <input v-model="password" type="password"  placeholder="Ingrese contraseña">
        <button type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
      </form>
  </div>
</template>

<script setup>
import { ref } from "vue-demi";
import { useUserStore } from '../stores/user';
// import { useRouter } from 'vue-router'

  const userStore = useUserStore();
  // const router = useRouter();
  const email = ref('test1@udenar.edu.co');
  const password = ref('');
  const handleSubmit = async() => {
    if ( !email.value || password.value.length < 6){
      return alert('Llena los campos');
    }
    await userStore.registerUser( email.value, password.value );
    // router.push('/');
  }
</script>

<style>

</style>