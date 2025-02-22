<template>
    <layout-div>
      <div class="row justify-content-md-center mt-5">
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Register</h5>
              <form>
                <div class="mb-3">
                  <label htmlFor="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    v-model="username"
                  />
                  <div v-if="validationErrors.username" class="flex flex-col">
                    <small class="text-danger">{{ validationErrors?.username[0] }}</small>
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
                    <small class="text-danger">{{ validationErrors?.email[0] }}</small>
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
                    <small class="text-danger">{{ validationErrors?.password[0] }}</small>
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
                </div>
                <div class="d-grid gap-2">
                   <button
                    :disabled="isSubmitting"
                    type="button"
                    @click="registerAction">Register</button>
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
  import LayoutDiv from '../LayoutDiv.vue';
  
  export default {
    name: 'RegisterPage',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        validationErrors: {},
        isSubmitting: false,
      };
    },
    created() {
      this.isAuthenticated = !!localStorage.getItem('access_token');
      if (this.isAuthenticated) {
        this.$router.push('/homeowner-dashboard');
      }
    },
    methods: {
      registerAction() {
        this.isSubmitting = true;
        const payload = {
          username: this.username,
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,

        };

        console.log("Payload:", payload);

        //fetch("https://jsonplaceholder.typicode.com/todos/")
        //.then(r => r.json())
        //.then(console.log)
  
        axios
          .post('/api/register/', payload)
          .then((response) => {
            this.isSubmitting = false;
            //localStorage.setItem('access_token', response.data.access_token);
          //this.$router.push({ name: 'homeownerDashboard'});
          if (response.data.success) {
            localStorage.setItem('access_token', response.data.access_token);
            this.$router.push({ name: 'homeownerDashboard'});
            console.log("Registration successful");
          } else {
            console.error("Registration failed:", response.data.message);
          }
          })
          .catch((error) => {
            this.isSubmitting = false;
            console.error("Error:", error);
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
                console.error("Error Response Headers:", error.response.headers);
            }
          });
      },
      redirectToLogin() {
        this.$router.push('/login');
      },
    },
  };
  </script>
  