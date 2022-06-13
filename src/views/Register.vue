<template>
  <a-row>
      <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6}"> 
        <h1 class="text-center">Registro</h1>
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
          <a-form-item
            name="repassword"
            label="Repita contraseña"
            :rules="{ 
              required: true,
              validator: validatePass
            }"
          >
            <a-input-password v-model:value="formState.repassword"></a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary" 
              html-type="submit"
              :loading="userStore.loadingUser"
            >
              Crear usuario
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
  </a-row>
</template>

<script setup>
import { reactive, ref } from "vue-demi";
import { useUserStore } from '../stores/user';
// import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';


  const userStore = useUserStore();
  // const router = useRouter();
  // const email = ref('test1@udenar.edu.co');
  // const password = ref('');

  const formState = reactive({
    email: 'test1@udenar.edu.co',
    password: '',
    repassword: ''
  })
  const onFinish = async( values) => {
    console.log( ' sucess', values);
    const respuesta = await userStore.registerUser( formState.email, formState.password );
    // router.push('/');
    if ( !respuesta ) {
      return message.success( 'Revisa tu correo electronico y verificalo' );
    }
    switch( respuesta ) {
      case 'auth/email-already-in-use':
        message.error( 'El correo ya esta registrado' );
        break;
      default:
        message.error( 'Fallo algo desde firebase' );
        break;
    }
  }

  const validatePass = async( _rule, value ) => {
    if ( value === '' ) {
      return Promise.reject( 'Repita contraseña' );
    }
    if ( value !== formState.password ) {
      return Promise.reject( 'No coinciden las contraseñas' );
    }
    return Promise.resolve();
  }
</script>

<style>
.text-center {
  text-align: center;
}
</style>