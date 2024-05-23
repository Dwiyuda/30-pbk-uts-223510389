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
    <Todos 
      v-if="currentView === 'todos'" 
      :activities="activities"
      :newActivity="newActivity"
      :showCompleted="showCompleted"
      @addActivity="addActivity"
      @toggleCompletion="toggleCompletion"
      @removeActivity="removeActivity"
      @toggleShowCompleted="toggleShowCompleted"
    />

    <Posts 
      v-if="currentView === 'posts'" 
      :users="users"
      :posts="posts"
      :selectedUserId="selectedUserId"
      @fetchPosts="fetchPosts"
    />
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

export default {
  components: {
    Todos,
    Posts
  },
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
  methods: {
    setView(view) {
      this.currentView = view;
      if (view === 'posts') {
        this.fetchUsers();
      }
    },
    addActivity(newActivity) {
      if (newActivity.trim()) {
        this.activities.push({
          id: Date.now(),
          title: newActivity,
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
    async fetchPosts(userId) {
      if (userId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
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
