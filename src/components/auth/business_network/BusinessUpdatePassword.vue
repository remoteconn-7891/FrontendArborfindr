<template>
  <layout-div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Forgot Password</h5>
            <form @submit.prevent="requestReset">
              <div class="mb-3">
                <label for="role" class="form-label">Select Role</label>
                <select v-model="role" class="form-select">
                  <option value="arborist">Arborist</option>
                  <option value="property_manager">Property Manager</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input v-model="email" type="email" class="form-control" id="email" />
              </div>
              <div class="d-grid gap-2">
                <button :disabled="isSubmitting" type="submit" class="btn btn-primary">
                  Send Reset Link
                </button>
                <p v-if="resetMessage" class="text-success">{{ resetMessage }}</p>
                <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
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
import LayoutDiv from '../LayoutDiv.vue';

const role = ref('');
const email = ref('');
const isSubmitting = ref(false);
const resetMessage = ref('');
const errorMessage = ref('');

const requestReset = async () => {
  isSubmitting.value = true;
  resetMessage.value = '';
  errorMessage.value = '';

  try {
    const response = await axios.post('/api/business_password_reset/', {
      email: email.value,
      role: role.value,
    });
    resetMessage.value = 'Password reset link sent to your email.';
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'An error occurred.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
