import { createPinia, defineStore } from 'pinia';

const pinia = createPinia();

export const useMainStore = defineStore('main', {
  state: () => ({
    activities: [
      { id: 1, title: 'Naruto', completed: false },
      { id: 2, title: 'Spongebob', completed: true }
    ],
    newActivity: '',
    showCompleted: false,
    currentView: 'todos',
    users: [],
    posts: [],
    selectedUserId: '',
    albums: [],
    photos: {}
  }),
  actions: {
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
    async fetchAlbums() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        this.albums = await response.json();
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
    async fetchPhotos(albumId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        this.photos = {
          ...this.photos,
          [albumId]: await response.json()
        };
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    }
  }
});

export default pinia;
