<template>
  <layout-div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Register</h5>
            <form>
              <div class="mb-3">
                <label htmlFor="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  v-model="name"
                />
                <div v-if="validationErrors.name" class="flex flex-col">
                  <small class="text-danger">{{ validationErrors.name[0] }}</small>
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  v-model="email"
                />
                <div v-if="validationErrors.email" class="flex flex-col">
                  <small class="text-danger">{{ validationErrors.email[0] }}</small>
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  v-model="password"
                />
                <div v-if="validationErrors.password" class="flex flex-col">
                  <small class="text-danger">{{ validationErrors.password[0] }}</small>
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="confirm_password">Confirm password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  v-model="confirmPassword"
                />
                <div v-if="validationErrors.confirm_password" class="flex flex-col">
                  <small class="text-danger">{{ validationErrors.confirm_password[0] }}</small>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button
                  :disabled="isSubmitting"
                  type="button"
                  @click="registerAction"
                >
                  Register
                </button>
                <p class="text-center">
                  Already have an account
                  <a href="#" @click.prevent="redirectToLogin">Sign in</a>
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

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      validationErrors: {},
      isSubmitting: false,
    };
  },
  methods: {
    async registerAction() {
      this.isSubmitting = true;
      this.validationErrors = {};

      try {
        const response = await axios.post('api/register', {
          name: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
        });

        // Handle successful registration (e.g., redirect to login)
        console.log('Registration successful:', response.data);
        this.$router.push('/login'); // Example: redirect to login
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.validationErrors = error.response.data.errors;
        } else {
          console.error('Registration error:', error);
          // Handle other errors (e.g., display a generic error message)
        }
      } finally {
        this.isSubmitting = false;
      }
    },
    redirectToLogin() {
      this.$router.push('/login');
    },
  },
  created() {
    //The code inside of the created hook was not doing what a registration page should do.
    //If you want to fetch user data after login you should do that in a component that is loaded after login.
  }
};
</script>