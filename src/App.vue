<template>
  <div class="app">
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
</style>