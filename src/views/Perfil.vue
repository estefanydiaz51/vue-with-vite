<template>
    <!-- {{ userStore.userData }} -->
    <div class="text-center mb-5">
        <h1>Mi perfil</h1>
        <a-avatar 
            :src="userStore.userData.photoUrl" 
            :size="150"
        >
        </a-avatar>

    </div>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6}">   
            <a-form
                name="basicPerfil"
                autocomplete="off"
                layout="vertical"
                :model="userStore.userData"
                @finish="onFinish"
            >
                <a-form-item
                    name="email"
                    label="Tu correo (no modificable)"
                    :rules="{ 
                        required: true, 
                        whitespace: true,
                        type: 'email',
                        message: 'Ingresa un correo válido'
                    }"
                >
                    <a-input
                        disabled
                        v-model:value="userStore.userData.email" 
                    ></a-input>
                </a-form-item>
                <a-form-item
                    name="displayName"
                    label="Ingresa tu nickName"
                    :rules="{ 
                        required: true, 
                        whitespace: true,
                        message: 'Ingresa un nick válido'
                    }"
                >
                    <a-input 
                        v-model:value="userStore.userData.displayName" 
                    ></a-input>
                </a-form-item>
                <a-upload
                    v-model:file-list="fileList"
                    list-type="picture"
                    :file-list="fileList"
                    :before-upload="beforeUpload"
                    :max-count="1"
                    @change="handleChange"
                >
                    <a-button>
                        Subir foto perfil
                    </a-button>
                </a-upload>
                <a-form-item class="mt-5">
                    <a-button
                        type="primary" 
                        html-type="submit"
                        :loading="userStore.loadingUser"
                    >
                        Actualizar información
                    </a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { ref } from 'vue-demi';
import { useUserStore } from '../stores/user';
const  userStore = useUserStore();

const fileList = ref([]);

const beforeUpload = ( file ) => {
    fileList.value = [ ...fileList.value, file ];
    return false;

}

const onFinish = async () => {
    console.log( fileList.value[0] );
    const error = await userStore.updateUser( userStore.userData.displayName );
    // fileList.value.forEach( file => {
    //     console.log( file );
    // })
    if ( fileList.value[0] ) {
        const error = await userStore.updateImg( fileList.value[0] );
        if ( error ) {
            return message.error( 'Problemas al subir la imagen, intentelo más tarde' );
        }
        message.success( 'Se actualizo tu imagen' );
    }
    if ( !error ) {
        return message.success( 'Se actualizo tu información de perfil' );
    }
    message.error( 'Ocurrio un error al actualizar el perfil' );
}

const handleRemove = ( file ) => {
    const index = fileList.value.indexOf( file );
    const newFileList = fileList.value.slice();
    newFileList.splice( index, 1 );
    fileList.value = newFileList;
}

const handleChange = (info)  => {

    // Validar el tipo de imagen
    if ( info.file.status !== "uploading" ){
        console.log( info.file );
        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
        if ( !isJpgOrPng ) {
            message.error( 'Solamente puedes subir archivos JPG' );
            handleRemove( info.file );
            return;
        }
        const isLt2M = info.file.size / 1024 / 1024 < 2;
        if ( !isLt2M ) {
            message.error( 'Máximo 2MB!' );
            return;
        }
    }

    // valida que sea sólo una imagen, reemplaza siempre la imagen subida
    let resFileList = [ ...info.fileList ];

    resFileList = resFileList.slice( -1 );

    resFileList = resFileList.map((file) => {
        if ( file.response ) {
            file.url = file.response.url;
        }
        return file;
    });
    fileList.value = resFileList;
}

</script>

<style>
.mb-5 {
    margin-bottom: 5px;
}

.mt-5  {
    margin-top: 10px;
}
</style>