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
                  <input
                    v-model="new_password"
                    type="password"
                    class="form-control"
                    id="new_password"
                    name="new_password"
                  />
                </div>
                <div class="mb-3">
                  <label for="confirm_password" class="form-label"
                    >Confirm Password</label
                  >
                  <input
                    v-model="confirm_password"
                    type="password"
                    class="form-control"
                    id="confirm_password"
                    name="confirm_password"
                  />
                </div>
                <div class="d-grid gap-2">
                  <button
                    :disabled="isSubmitting"
                    type="submit"
                    class="btn btn-primary btn-block"
                  >
                    Reset Password
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter
import LayoutDiv from '../LayoutDiv.vue';

const route = useRoute();
const router = useRouter(); // Initialize the router
const message = ref(null);
const error = ref(null);

onMounted(async () => {
  const token = route.params.token;

  try {
    const response = await axios.post('/update/password', {
      action: 'confirm',
      token: token,
    });
    message.value = response.data.message;

    // Redirect after successful password update (optional but recommended):
    setTimeout(() => {
     router.push('/login'); // Or wherever you want to redirect
    }, 2000); // Redirect after 2 seconds (adjust as needed)


  } catch (err) {
    console.error(err);
    if (err.response && err.response.data && err.response.data.error) {
       error.value = err.response.data.error;
    } else if (err.response) {
      error.value = err.response.data.detail || 'An error occurred.';
    }
     else {
       error.value = 'An error occurred.';
     }
  }
});
</script>