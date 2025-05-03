<template>
  <layout-div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Reset Password</h5>
            <form @submit.prevent="resetPassword">
              <div class="mb-3">
                <label for="new_password" class="form-label">New Password</label>
                <input v-model="new_password" type="password" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="confirm_password" class="form-label">Confirm Password</label>
                <input v-model="confirm_password" type="password" class="form-control" />
              </div>
              <div class="d-grid gap-2">
                <button :disabled="isSubmitting" type="submit" class="btn btn-primary">
                  Reset Password
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import LayoutDiv from '../LayoutDiv.vue';

const route = useRoute();
const router = useRouter();
const new_password = ref('');
const confirm_password = ref('');
const isSubmitting = ref(false);
const resetMessage = ref('');
const errorMessage = ref('');

const resetPassword = async () => {
  isSubmitting.value = true;
  resetMessage.value = '';
  errorMessage.value = '';

  try {
    const response = await axios.post('/api/business_password_update/', {
      token: route.params.token,
      new_password: new_password.value,
      confirm_password: confirm_password.value,
    });
    resetMessage.value = response.data.message;

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'An error occurred.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
