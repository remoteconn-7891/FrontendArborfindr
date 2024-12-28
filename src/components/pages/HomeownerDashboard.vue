<script setup lang="ts">

</script>

<template>
  <LayoutDiv>
    <div class="row justify-content-md-center mt-5">
      <div class="col-10">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Homeowner Dashboard</h5>
          </div>
          <div v-if="dashboardData">
            <p><strong>Welcome, {{  dashboardData.name }}!</strong></p>
            <p>Your current location: {{  dashboardData.city }}, {{ dashboardData.state }}, {{ dashboardData.zip }}, {{ dashboardData.profilePic }}</p>

            <h6 class="mt-4">Pending Service Requests</h6>
            <ul v-if="dashboardData.pendingRequests.length">
              <li v-for="(request, index) in dashboardData.pendingRequests" :key="index">
                {{  request.description  }} - {{ request.date }}
              </li>
            </ul>
            <p v-else>No pending service requests.</p>

            <h6 class="mt-4">Your Saved Arborists</h6>
            <ul v-if="dashboardData.savedArborists.length">
              <li v-for="(arborist, index) in dashboardData.savedArborists" :key="index">
                {{ arborist.name }} ({{ arborist.companyName }})
              </li>
            </ul>
            <p v-else>No saved arborists yet.</p>

            <button class="btn btn-primary mt-3" @click="viewSearchArborists">Find Arborists</button>
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
import { defineComponent, DefineComponent } from 'vue';
import { error } from 'console';

interface DashboardData {
  name: string;
  city: string;
  state: string;
  zip: string;
  profilePic: string;
  pendingRequests: { description: string; date: string }[];
  savedArborists: { name: string; companyName: string }[];
}

export default defineComponent({
  name: 'HomeownerDashboard',
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
        .get('/api/homeowner-dashboard', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        })
        .then((response) => {
          this.dashboardData = response.data;
        })
        .catch((error) => {
          console.error('Error fetching dashboard data:', error);
        });
    },
    viewSearchArborists() {
      this.$router.push('/search');
    },
  },
});
</script>

<style scoped>
.card-header {
  background-color: #f8f9fa;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

button {
  display: block;
  margin: 0 auto;
}
</style>