<template>
    <q-page class="q-pa-md">
      <h1>Albums</h1>
      <q-list>
        <q-item v-for="album in albums" :key="album.id">
          <q-item-section @click="fetchPhotos(album.id)">
            <h2>{{ album.title }}</h2>
            <q-list v-if="photos[album.id]">
              <q-item v-for="photo in photos[album.id]" :key="photo.id">
                <q-item-section>
                  <img :src="photo.thumbnailUrl" :alt="photo.title" />
                  <p>{{ photo.title }}</p>
                </q-item-section>
              </q-item>
            </q-list>
          </q-item-section>
        </q-item>
      </q-list>
    </q-page>
  </template>
  
  <script>
  import { useMainStore } from '../store';
  import { computed } from 'vue';
  
  export default {
    setup() {
      const store = useMainStore();
  
      return {
        albums: computed(() => store.albums),
        photos: computed(() => store.photos),
        fetchPhotos: store.fetchPhotos,
        fetchAlbums: store.fetchAlbums
      };
    },
    mounted() {
      this.fetchAlbums();
    }
  };
  </script>
  