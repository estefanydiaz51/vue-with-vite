<template>
  <a-row>
      <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6}"> 
        <h1 class="text-center">Login</h1>
        <a-form
          name="basicLogin"
          autocomplete="off"
          layout="vertical"
          :model="formState"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="email"
            label="Ingresa tu correo"
            :rules="{ 
              required: true, 
              whitespace: true,
              type: email,
              message: 'Ingresa un correo válido'
            }"
          >
            <a-input 
              v-model:value="formState.email" 
            ></a-input>
          </a-form-item>
          <a-form-item
            name="password"
            label="Ingrese contraseña"
            :rules="{ 
              required: true,
              min: 6,
              whitespace: true,
              message: 'Ingresa una contraseña con minimo 6 caracteres'
            }"
          >
            <a-input-password v-model:value="formState.password"></a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary" 
              html-type="submit"
              :loading="userStore.loadingUser"
            >
              Ingresar
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
  </a-row>
</template>

<script setup>
import { reactive, ref } from "vue-demi";
import { useUserStore } from '../stores/user';
import { message } from 'ant-design-vue';

  const userStore = useUserStore();
  // const email = ref('test1@udenar.edu.co');
  // const password = ref('');

  const formState = reactive({
    email: 'test1@udenar.edu.co',
    password: 123456
  })
  const onFinish = async( values ) => {
    console.log( 'success', values );
    const respuesta = await userStore.loginUser( formState.email , formState.password );
    if ( !respuesta ) {
      return message.success( 'Bienvenido a la super app!!!' );
    }
    switch( respuesta ) {
      case 'auth/user-not-found':
        message.error( 'No existe esa cuenta' );
        break;
      case 'auth/wrong-password':
        message.error( 'La contraseña no es correcta' );
        break;
      default:
        message.error( 'Fallo algo desde firebase' );
        break;
    }
  }

  const onFinishFailed = ( errorInfo ) => {
    console.log( errorInfo, 'error' )
  }
</script>

<style>
.text-center {
  text-align: center;
}
</style>