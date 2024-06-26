import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';
import Albums from '../components/Albums.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';

const routes = [
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/albums/:id', component: AlbumPhotos }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
