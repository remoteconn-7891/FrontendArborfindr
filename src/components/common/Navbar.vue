<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Welcome to Arborhub</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
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
          <router-link class="btn btn-success" to="/search-arborist">Find an arborist</router-link>
        </li>
        <li v-if="authStore.isAuthenticated" class="nav-item">
          <router-link class="btn btn-success" to="/update-password">Forgot password?</router-link>
        </li>
        </ul>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'; // Import your auth store

const authStore = useAuthStore();
</script>