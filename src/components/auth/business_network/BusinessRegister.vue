<template>
  <LayoutDiv>
    <div class="row justify-content-md-center mt-5">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Business Register</h5>
            <form @submit.prevent="registerAction">
              <div class="mb-3">
                <label for="name" class="form-label">Business Name</label>
                <input type="text" v-model="name" class="form-control" id="name" name="name" />
              </div>
              <div v-if="validationErrors.name" class="flex flex-col">
                <small class="text-danger">{{ validationErrors?.name[0] }}</small>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Business Email</label>
                <input type="email" v-model="email" class="form-control" id="email" name="email" />
              </div>
              <div v-if="validationErrors.email" class="flex flex-col">
                <small class="text-danger">{{ validationErrors?.email[0] }}</small>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" name="password" />
              </div>
              <div v-if="validationErrors.password" class="flex flex-col">
                <small class="text-danger">{{ validationErrors?.password[0] }}</small>
              </div>
              <div class="mb-3">
                <label for="confirm_password">Confirm Password</label>
                <input type="password" v-model="confirmPassword" class="form-control" id="confirm_password" name="confirm_password" />
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Business Role</label>
                <select v-model="role" class="form-control">
                  <option value="arborist">Arborist</option>
                  <option value="property_manager">Property Manager</option>
                </select>
              </div>
              <div class="d-grid gap-2">
                <button :disabled="isSubmitting" type="submit" class="btn btn-primary btn-block">
                  Register
                </button>
                <p class="text-center">
                  Already have an account?
                  <router-link to="/business-login">Sign in</router-link>
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
  name: "BusinessRegister",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "arborist", // Default selection
      validationErrors: {},
      isSubmitting: false,
    };
  },
  methods: {
    registerAction() {
      this.isSubmitting = true;
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirmPassword,
        role: this.role, // Send role to backend
      };

      axios
        .post("/api/business-register", payload)
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
