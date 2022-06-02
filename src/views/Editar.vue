<template>
  <div>
    <h1>Editar id: {{ route.params?.id }}</h1>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese Url" v-model="url">
        <button type="submit">
          Editar
        </button>
      </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue-demi';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database'

const route = useRoute();

const databaseStore = useDatabaseStore();

const url = ref('');
// console.log( route.params.id ) 

const handleSubmit = () => {
  databaseStore.updateUrl( route.params?.id, url.value );
}


onMounted( async () => {
  url.value = await databaseStore.leerUrl( route.params?.id );
})
</script>

<style>

</style>