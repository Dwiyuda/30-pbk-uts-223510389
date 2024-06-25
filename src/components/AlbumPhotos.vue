<template>
    <q-page class="q-pa-md">
      <h1>Photos in Album</h1>
      <q-list>
        <q-item v-for="photo in photos" :key="photo.id">
          <q-item-section>
            <img :src="photo.thumbnailUrl" @click="viewPhoto(photo.url)" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-dialog v-model="dialog">
        <q-card>
          <q-card-section>
            <img :src="currentPhoto" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Close" @click="dialog = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  import { useMainStore } from '../store';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const store = useMainStore();
      const route = useRoute();
      const dialog = ref(false);
      const currentPhoto = ref('');
  
      onMounted(() => {
        store.fetchPhotos(route.params.id);
      });
  
      const viewPhoto = (url) => {
        currentPhoto.value = url;
        dialog.value = true;
      };
  
      return {
        photos: store.photos[route.params.id] || [],
        dialog,
        currentPhoto,
        viewPhoto
      };
    }
  };
  </script>
  