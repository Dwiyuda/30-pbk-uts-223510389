<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          UAS DWI YUDA
        </q-toolbar-title>
        <q-btn flat @click="navigateTo('/todos')">Todos</q-btn>
        <q-btn flat @click="navigateTo('/posts')">Posts</q-btn>
        <q-btn flat @click="navigateTo('/albums')">Albums</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
    </q-footer>
  </q-layout>
</template>

<script>
import { useMainStore } from './store';

export default {
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  mounted() {
    const store = useMainStore();
    store.fetchUsers();
  }
};
</script>
