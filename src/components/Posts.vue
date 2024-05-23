<template>
    <div>
      <h1>Post</h1>
      <select v-model="localSelectedUserId" @change="handleFetchPosts">
        <option value="" disabled>Pilih User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <ul v-if="posts.length">
        <li v-for="post in posts" :key="post.id">
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
        </li>
      </ul>
      <p v-else>Pilih user untuk melihat postingan</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: Array,
      posts: Array,
      selectedUserId: String
    },
    data() {
      return {
        localSelectedUserId: this.selectedUserId
      };
    },
    watch: {
      selectedUserId(newVal) {
        this.localSelectedUserId = newVal;
      }
    },
    methods: {
      handleFetchPosts() {
        this.$emit('fetchPosts', this.localSelectedUserId);
      }
    }
  };
  </script>
  