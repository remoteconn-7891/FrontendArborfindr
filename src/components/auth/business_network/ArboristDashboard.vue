<template>
  <LayoutDiv>
    <div class="row justify-content-md-center mt-5">
      <div class="col-10">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Arborist Dashboard</h5>
          </div>
          <div v-if="dashboardData">
            <p>
              <strong>Welcome, {{ dashboardData.first_name }} {{ dashboardData.last_name }}!</strong>
            </p>
            <p>Your current location: {{ dashboardData.city }}, {{ dashboardData.state }} {{ dashboardData.zip_code }}</p>
            <div>
              <img
                v-if="dashboardData.profile_pic"
                :src="dashboardData.profile_pic"
                alt="Profile Picture"
                class="profile-pic"
              />
              <p v-else>No profile picture available.</p>
            </div>
            <button class="btn btn-primary mt-3" @click="viewClientRequests">View Client Requests</button>
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
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import { defineComponent } from 'vue';

interface DashboardData {
  first_name: string;
  last_name: string;
  profile_pic: string;
  city: string;
  state: string;
  zip_code: string;
  pendingJobs: { description: string; date: string }[];
  clientRequests: { name: string; details: string }[];
}

export default defineComponent({
  name: 'ArboristDashboard',
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
        .get('/arborist/profile/', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        })
        .then((response) => {
          this.dashboardData = response.data;
        })
        .catch((error) => {
          console.error('Error fetching dashboard data:', error);
        });
    },
    viewClientRequests() {
      this.$router.push('/client-requests');
    },
  },
});
</script>

<style scoped>
.card-header {
  background-color: #f8f9fa;
}
.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
button {
  display: block;
  margin: 0 auto;
}
</style>
