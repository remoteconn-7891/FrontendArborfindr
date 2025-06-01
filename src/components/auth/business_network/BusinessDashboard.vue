<template>
  <LayoutDiv>
    <div class="row justify-content-md-center mt-5">
      <div class="col-10">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Business Dashboard</h5>
          </div>
          <div v-if="dashboardData">
            <p><strong>Welcome, {{ dashboardData.name }}!</strong></p>
            <p>Business Role: {{ dashboardData.role }}</p>
            <div>
              <img
                v-if="dashboardData.company_logo"
                :src="dashboardData.company_logo"
                alt="Company Logo"
                class="company-logo"
              />
              <p v-else>No company logo available.</p>
            </div>

            <h6>Pending Requests:</h6>
            <ul>
              <li v-for="request in dashboardData.requests" :key="request.id">
                {{ request.description }} - {{ request.date }}
              </li>
            </ul>
            <button class="btn btn-primary mt-3" @click="manageMessages">Manage Messages</button>
          </div>
          <div v-else>
            <p>Loading Dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  </LayoutDiv>
</template>

<script lang="ts">
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";
import { defineComponent } from "vue";

interface DashboardData {
  name: string;
  role: string;
  profile_pic: string;
  requests: { id: number; description: string; date: string }[];
}

export default defineComponent({
  name: "BusinessDashboard",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      dashboardData: null as DashboardData | null,
    };
  },
  created() {
    this.fetchDashboardData();
  },
  methods: {
    fetchDashboardData() {
      axios
        .get("/api/business-profile/", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          this.dashboardData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    },
    manageMessages() {
      this.$router.push("/business-messages");
    },
  },
});
</script>

<style scoped>
.card-header {
  background-color: #f8f9fa;
}
.company-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
button {
  display: block;
  margin: 0 auto;
}
</style>
