<template>
  <a-form
    name="addForm"
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
            Agregar
        </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>

import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import { useDatabaseStore  } from '../stores/database';
const databaseStore = useDatabaseStore();

const formState = reactive({
    url: ''
})

const exprUrl =  ref(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

const onFinish = async( value ) => {
    console.log( value );
    const error = await databaseStore.addUrl( formState.url );
    if ( !error ){
        formState.url = '';
        return message.success('URL agregada');
    }
    switch ( error ) {
        // buscar errores de firestore

        default:
            message.error( 'Ha ocurrido un error en el servidor, intentalo más tarde' );
            break;
    }
}

</script>

<style>

</style>