<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    
      <router-link class="navbar-brand" to="/">Arborhub</router-link>>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="btn btn-primary" to="/">Home</router-link>
          </li>
          <li v-if="!authStore.isAuthenticated" class="nav-item">
            <router-link class="btn btn-success" to="/login">Sign in</router-link>
          </li>
          <li v-if="!authStore.isAuthenticated" class="nav-item">
            <router-link class="btn btn-success" to="/register">Sign up</router-link>
          </li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <router-link class="btn btn-success" to="/homeowner-dashboard">Homeowner Dashboard</router-link>
          </li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <router-link class="btn btn-success" to="/search-arborist">Find an arborist for tree services near you</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
import { useAuthStore } from '@/stores/auth.js';  // This should now resolve correctly


  const authStore = useAuthStore();  // Access the auth store
  // You can add Vue-specific logic or imports here later if needed
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  