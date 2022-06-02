<template>
  <div>
      <h1>Home- {{ userStore.userData?.email }}</h1>
      <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese Url" v-model="url">
        <button type="submit">
          Agregar
        </button>
      </form>
      <p v-if="databaseStore.loadingDoc">loading docs...</p>
      <ul v-else>
        <li v-for="item of databaseStore.documents" :key="item.id">
          {{ item.id }}
          <br>
          {{ item.name }}
          <br>
          {{ item.short }}
          <br>
          <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
          <button @click="router.push(`/editar/${item.id}`)">Editar</button>

        </li>
      </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database';
import { ref } from 'vue-demi';
import { useRouter } from 'vue-router';


const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getUrls();

const url = ref('');

const router = useRouter();

const handleSubmit = () => {
  console.log('formulario');

  databaseStore.addUrl( url.value );
}
</script>

<style>

</style>