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
            <p>
              <strong>Welcome, {{ dashboardData.first_name }} {{ dashboardData.last_name }}!</strong>
            </p>
            <p>Your current location: {{ dashboardData.street_address }}{{ dashboardData.homeowner_city }}, {{ dashboardData.homeowner_state }} {{ dashboardData.homeowner_zip_code }}</p>
            <div>
              <img
                v-if="dashboardData.profile_pic"
                :src="dashboardData.profile_pic"
                alt="Profile Picture"
                class="profile-pic"
              />
              <p v-else>No profile picture available.</p>
            </div>
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
  first_name: string;
  last_name: string;
  profile_pic: string,
  street_address: string;
  homeowner_city: string;
  homeowner_state: string;
  homeowner_zip_code: string;
  pendingRequest: { description: string; date: string }[];
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
        .get('homeowner/profile/', {
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