<template>
    <layout-div>
      <div class="row justify-content-md-center mt-5">
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Forgot Password</h5>
              <form @submit.prevent="requestReset">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                  />
                </div>
                <div class="d-grid gap-2">
                  <button
                    :disabled="isSubmitting"
                    type="submit"
                    class="btn btn-primary btn-block"
                  >
                    Send Password Reset Link
                  </button>
                  <p v-if="resetMessage" class="text-center text-success">
                    {{ resetMessage }}
                  </p>
                  <p v-if="errorMessage" class="text-center text-danger">
                    {{ errorMessage }}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </layout-div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue'; // Import your layout component

const email = ref('');
const isSubmitting = ref(false);
const resetMessage = ref('');
const errorMessage = ref('');

const requestReset = async () => {
  isSubmitting.value = true;
  resetMessage.value = ''; // Clear previous messages
  errorMessage.value = '';

  try {
    const response = await axios.post('/api/password_reset/', { email: email.value }); // Corrected URL
    resetMessage.value = 'Password reset link sent to your email.';
  } catch (error) {
    // Improved error handling:
    if (error.response && error.response.data && error.response.data.email && error.response.data.email[0]) {
        errorMessage.value = error.response.data.email[0];
    } else if (error.response) {
      errorMessage.value = error.response.data.detail || 'An error occurred.'; // Check for a more specific detail message.
    } else {
      errorMessage.value = 'An error occurred.';
    }

  } finally {
    isSubmitting.value = false;
  }
};
</script>