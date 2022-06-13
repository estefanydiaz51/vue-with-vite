<template>
  <div>
    <h1>Editar id: {{ route.params?.id }}</h1>
    <a-form
      name="editForm"
      autocomplete="off" 
      layout="vertical"
      :model="formState"
      @finish="onFinish"
    >
      <a-form-item
          name="url"
          label="Ingrese una URL"
          :rules="[{
              required: true,
              whitespace: true,
              pattern: exprUrl,
              message: 'Ingrese una URL válida'
          }]"
      >
          <a-input v-model:value="formState.url"></a-input>
      </a-form-item>
      <a-form-item>
          <a-button
              type="primary"
              html-type="submit"
              :loading="databaseStore.loading"
              :disabled="databaseStore.loading"
          >
              Editar
          </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue-demi';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database'

const route = useRoute();

const databaseStore = useDatabaseStore();

const formState = reactive({
  url: ''
})


const onFinish = async( value ) => {
    console.log( value );
    const error = await databaseStore.updateUrl( route.params?.id, formState.url );
    if ( !error ){
        formState.url = '';
        return message.success('URL editada');
    }
    switch ( error ) {
        // buscar errores de firestore

        default:
            message.error( 'Ha ocurrido un error en el servidor, intentalo más tarde' );
            break;
    }
}


onMounted( async () => {
  formState.url = await databaseStore.leerUrl( route.params?.id );
})
</script>

<style>

</style>