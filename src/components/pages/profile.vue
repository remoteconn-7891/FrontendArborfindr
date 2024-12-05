<template>
    <LayoutDiv>
      <div class="row justify-content-md-center mt-5">
        <div class="col-8">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Profile Information</h5>
            </div>
            <div class="card-body">
              <div v-if="user">
                <!-- Profile picture and upload section -->
                <div class="text-center">
                  <img :src="profilePicUrl" alt="Profile Pic" class="img-fluid rounded-circle" width="150" height="150" />
                  <div>
                    <input type="file" @change="uploadProfilePic" accept="image/*" class="mt-2" />
                  </div>
                </div>
  
                <p><strong>Name:</strong> {{ user.name }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Joined on:</strong> {{ user.created_at }}</p>
  
                <h6 class="mt-4">Saved Searches</h6>
                <ul v-if="savedSearches.length">
                  <li v-for="(search, index) in savedSearches" :key="index">
                    {{ search }}
                  </li>
                </ul>
                <p v-else>No saved searches yet.</p>
  
                <button class="btn btn-primary mt-3" @click="editProfile">Edit Profile</button>
              </div>
              <div v-else>
                <p>Loading profile...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDiv>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import LayoutDiv from '../LayoutDiv.vue';
  import { defineComponent } from 'vue';
  
  interface User {
    name: string;
    email: string;
    created_at: string; // Assuming the API provides this
  }
  
  export default defineComponent({
    name: 'ProfilePage',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        user: {} as User,
        savedSearches: [] as string[],
        profilePicUrl: 'https://via.placeholder.com/150', // Default image or API-provided URL
      };
    },
    created() {
      this.fetchUserProfile();
      this.fetchSavedSearches();
    },
    methods: {
      fetchUserProfile() {
        axios
          .get('/api/user', {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
          })
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.error('Error fetching profile:', error);
          });
      },
      fetchSavedSearches() {
        axios
          .get('/api/user/saved-searches', {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
          })
          .then((response) => {
            this.savedSearches = response.data.searches;
          })
          .catch(() => {
            console.log('No saved searches found.');
          });
      },
      uploadProfilePic(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profilePicUrl = e.target?.result as string; // Update image preview
          };
          reader.readAsDataURL(file);
  
          // Upload to server
          const formData = new FormData();
          formData.append('profilePic', file);
          axios
            .post('/api/user/upload-profile-pic', formData, {
              headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            })
            .then(() => {
              console.log('Profile picture updated.');
            })
            .catch((error) => {
              console.error('Error uploading profile picture:', error);
            });
        }
      },
      editProfile() {
        this.$router.push('/edit-profile');
      },
    },
  });
  </script>
  
  <style scoped>
  .card-header {
    background-color: #f8f9fa;
  }
  
  .img-fluid {
    max-width: 150px;
    height: auto;
  }
  
  input[type="file"] {
    display: inline-block;
    width: auto;
    margin-top: 10px;
  }
  </style>
  
  
  