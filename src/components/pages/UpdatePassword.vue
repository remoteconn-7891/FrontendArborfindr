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
                    Send Reset Link
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
  
  <script>
  import axios from 'axios';
  import LayoutDiv from '../LayoutDiv.vue';
  
  export default {
    name: 'ForgotPassword',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        email: '',
        isSubmitting: false,
        resetMessage: '',
        errorMessage: '',
      };
    },
    methods: {
      requestReset() {
        this.isSubmitting = true;
        axios
          .post('/api/password_reset/', { email: this.email })
          .then(() => {
            this.resetMessage = 'Password reset link sent to your email.';
            this.errorMessage = '';
            this.isSubmitting = false;
          })
          .catch((error) => {
            this.errorMessage =
              error.response?.data?.email?.[0] || 'An error occurred.';
            this.resetMessage = '';
            this.isSubmitting = false;
          });
      },
    },
  };
  </script>