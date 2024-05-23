<template>
    <div>
      <h1>List film yang sudah ditonton</h1>
      <button @click="$emit('toggleShowCompleted')">
        {{ showCompleted ? 'Tampilkan yang belum Ditonton' : 'Tampilkan Semuanya' }}
      </button>
      <ul>
        <li v-for="activity in filteredActivities" :key="activity.id">
          <span :class="{ completed: activity.completed }">{{ activity.title }}</span>
          <button @click="$emit('toggleCompletion', activity)">
            {{ activity.completed ? 'Batal Checklist' : 'Checklist' }}
          </button>
          <button @click="$emit('removeActivity', activity)">Hapus</button>
        </li>
      </ul>
      <input v-model="localNewActivity" @keyup.enter="handleAddActivity" placeholder="Tambah Daftar film" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      activities: Array,
      newActivity: String,
      showCompleted: Boolean
    },
    data() {
      return {
        localNewActivity: this.newActivity
      };
    },
    computed: {
      filteredActivities() {
        return this.showCompleted ? this.activities : this.activities.filter(activity => !activity.completed);
      }
    },
    watch: {
      newActivity(newVal) {
        this.localNewActivity = newVal;
      }
    },
    methods: {
      handleAddActivity() {
        this.$emit('addActivity', this.localNewActivity);
        this.localNewActivity = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  