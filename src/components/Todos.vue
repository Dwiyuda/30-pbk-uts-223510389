<template>
  <q-page class="q-pa-md">
    <h1>Todos</h1>
    <q-input v-model="newActivity" label="New Activity" @keyup.enter="addActivity" />
    <q-list>
      <q-item v-for="activity in filteredActivities" :key="activity.id">
        <q-item-section>
          <q-checkbox v-model="activity.completed" />
          {{ activity.title }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { useMainStore } from '../store';
import { ref, computed } from 'vue';

export default {
  setup() {
    const store = useMainStore();
    const newActivity = ref('');

    const filteredActivities = computed(() => store.activities.filter(a => a.completed === store.showCompleted));

    const addActivity = () => {
      if (newActivity.value.trim()) {
        store.activities.push({
          id: Date.now(),
          title: newActivity.value.trim(),
          completed: false
        });
        newActivity.value = '';
      }
    };

    return {
      activities: store.activities,
      newActivity,
      filteredActivities,
      addActivity,
      showCompleted: store.showCompleted
    };
  }
};
</script>
