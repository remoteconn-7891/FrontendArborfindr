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
  
  <script>
  import axios from 'axios';
  import LayoutDiv from '../LayoutDiv.vue';
  
  export default {
    name: 'ResetPasswordConfirm',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        new_password: '',
        confirm_password: '',
        isSubmitting: false,
        resetMessage: '',
        errorMessage: '',
      };
    },
    mounted() {
          this.token = this.$route.query.token;
    },
    methods: {
      resetPassword() {
        this.isSubmitting = true;
        if (this.new_password !== this.confirm_password) {
          this.errorMessage = "Passwords do not match.";
          this.isSubmitting = false;
          return;
        }
        axios
          .post(`/api/password_reset/confirm/`, {
            new_password: this.new_password,
            token: this.token,
          })
          .then(() => {
            this.resetMessage = 'Password reset successfully.';
            this.errorMessage = '';
            this.isSubmitting = false;
            this.$router.push('/login');
          })
          .catch((error) => {
            this.errorMessage =
              error.response?.data?.new_password?.[0] || 'An error occurred.';
            this.resetMessage = '';
            this.isSubmitting = false;
          });
      },
    },
  };
  </script>