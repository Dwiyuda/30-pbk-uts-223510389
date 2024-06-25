<template>
  <q-page class="q-pa-md">
    <h1>Posts</h1>
    <q-select 
      v-model="localSelectedUserId" 
      @change="handleSelectUser" 
      :options="userOptions" 
      label="Select User" 
      :disable="!users || users.length === 0"
    />
    <q-list v-if="posts.length">
      <q-item v-for="post in posts" :key="post.id">
        <q-item-section>
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
        </q-item-section>
      </q-item>
    </q-list>
    <p v-else>Select a user to view posts</p>
  </q-page>
</template>

<script>
import { useMainStore } from '../store';
import { ref, computed } from 'vue';

export default {
  setup() {
    const store = useMainStore();
    const localSelectedUserId = ref(null);

    const userOptions = computed(() => {
      return store.users.map(user => ({
        label: user.name,
        value: user.id
      }));
    });

    const handleSelectUser = () => {
      store.selectedUserId = localSelectedUserId.value; // Update selectedUserId di store saat pengguna dipilih
    };

    return {
      users: store.users,
      posts: store.posts,
      userOptions,
      localSelectedUserId,
      handleSelectUser
    };
  }
};
</script>
