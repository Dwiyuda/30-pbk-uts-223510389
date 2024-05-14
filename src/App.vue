<template>
  <header>
      <nav>
        <ul>
          <li @click="setView('todos')">Todos</li>
          <li @click="setView('posts')">Post</li>
        </ul>
      </nav>
    </header>
  <div class="app">
    <div v-if="currentView === 'todos'">
      <h1>List film yang sudah ditonton</h1>
      <button @click="toggleShowCompleted">
        {{ showCompleted ? 'Tampilkan yang belum Ditonton' : 'Tampilkan Semuanya' }}
      </button>
      <ul>
        <li v-for="activity in filteredActivities" :key="activity.id">
          <span :class="{ completed: activity.completed }">{{ activity.title }}</span>
          <button @click="toggleCompletion(activity)">
            {{ activity.completed ? 'Batal Checklist' : 'Checklist' }}
          </button>
          <button @click="removeActivity(activity)">Hapus</button>
        </li>
      </ul>
      <input v-model="newActivity" @keyup.enter="addActivity" placeholder="Tambah Daftar film" />
    </div>

    <div v-if="currentView === 'posts'">
      <h1>Post</h1>
      <select v-model="selectedUserId" @change="fetchPosts">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        { id: 1, title: 'Naruto', completed: false },
        { id: 2, title: 'Spongebob', completed: true },
        // ... daftar kegiatan lainnya
      ],
      newActivity: '',
      showCompleted: false,
      currentView: 'todos',
      users: [],
      posts: [],
      selectedUserId: '',
    };
  },
  computed: {
    filteredActivities() {
      if (this.showCompleted) {
        return this.activities;
      } else {
        return this.activities.filter((activity) => !activity.completed);
      }
    },
  },
  methods: {
    setView(view) {
      this.currentView = view;
      if (view === 'posts') {
        this.fetchUsers();
      }
    },
    addActivity() {
      if (this.newActivity.trim()) {
        this.activities.push({
          id: Date.now(),
          title: this.newActivity,
          completed: false,
        });
        this.newActivity = '';
      }
    },
    toggleCompletion(activity) {
      activity.completed = !activity.completed;
    },
    removeActivity(activity) {
      this.activities = this.activities.filter((a) => a.id !== activity.id);
    },
    toggleShowCompleted() {
      this.showCompleted = !this.showCompleted;
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchPosts() {
      if (this.selectedUserId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`);
          this.posts = await response.json();
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      } else {
        this.posts = [];
      }
    },
  },
};
</script>

<style scoped>
/* Tambahkan CSS sesuai keinginan Anda */
.app {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
}

header {
  margin-bottom: 20px;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

nav ul li {
  margin-right: 20px;
  cursor: pointer;
  font-weight: bold;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.completed {
  text-decoration: line-through;
}

input {
  width: 100%;
  padding: 5px;
  margin-top: 10px;
}

select {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
