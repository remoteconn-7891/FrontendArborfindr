<template>
  <LayoutDiv>
    <div class="row justify-content-md-center mt-5">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Business Sign In</h5>
            <form @submit.prevent="loginAction">
              <p v-if="Object.keys(validationErrors).length !== 0" class="text-center">
                <small class="text-danger">Incorrect Email or Password</small>
              </p>
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
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Select Role</label>
                <select v-model="role" class="form-control">
                  <option value="arborist">Arborist</option>
                  <option value="property_manager">Property Manager</option>
                </select>
              </div>
              <div class="d-grid gap-2">
                <button :disabled="isSubmitting" type="submit" class="btn btn-primary btn-block">
                  Login
                </button>
                <p class="text-center">
                  Don't have an account?
                  <router-link to="/business-register">Register here</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </LayoutDiv>
</template>

<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";

export default {
  name: "BusinessLogin",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      email: "",
      password: "",
      role: "arborist", // Default selection
      validationErrors: {},
      isSubmitting: false,
    };
  },
  methods: {
    loginAction() {
      this.isSubmitting = true;
      const payload = {
        email: this.email,
        password: this.password,
        role: this.role, // Send role to backend
      };

      axios
        .post("/api/business-login", payload)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          if (response.data.role === "arborist") {
            this.$router.push("/arborist-dashboard");
          } else {
            this.$router.push("/property-manager-dashboard");
          }
        })
        .catch((error) => {
          this.isSubmitting = false;
          if (error.response?.data?.errors) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
  },
};
</script>

