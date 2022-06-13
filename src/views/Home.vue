<template>
  <div>
      <h1>Home- {{ userStore.userData?.email }}</h1>
      <AddForm></AddForm>
      <p v-if="databaseStore.loadingDoc">loading docs...</p>

      <a-space
        v-if="!databaseStore.loadingDoc"
        direction="vertical"
        style="width: 100%"
      >
        <a-card
          v-for="item of databaseStore.documents" 
          :key="item.id"
          :title="item.short"
          style="width: 100%"
        >
          <template #extra>
            <a-space>
                <a-popconfirm
                  title="¿Estás seguro que deseas eliminar?"
                  ok-test="Sí"
                  cancel-text="No"
                  @confirm="confirm( item.id )"
                  @cancel="cancel"
                >
                  <a-button
                    danger
                    :disabled="databaseStore.loading"
                    :loading="databaseStore.loading"
                  >
                    Eliminar
                  </a-button>
                </a-popconfirm>
                <a-button
                  type="primary"
                  @click="router.push(`/editar/${item.id}`)"
                >
                  Editar
                </a-button>
            </a-space>
          </template>
          <p>{{ item.name }}</p>
        </a-card>
      </a-space>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database';
import { ref } from 'vue-demi';
import { useRouter } from 'vue-router';
import AddForm from '../components/AddForm.vue';
import { message } from 'ant-design-vue';


const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getUrls();
const router = useRouter();

const cancel = () => {
  message.error( 'No se elimino' );
}

const confirm = async ( id ) => {
  const error = await databaseStore.deleteUrl( id );
  if ( !error ) return message.success( 'Se eliminó con éxito' );
}
</script>

<style>

</style>