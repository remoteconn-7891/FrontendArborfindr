<template>
  <LayoutDiv>
    <div class="row justify-content-md-center mt-5">
      <div class="col-10">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Property Manager Dashboard</h5>
          </div>
          <div v-if="dashboardData">
            <p>
              <strong>Welcome, {{ dashboardData.first_name }} {{ dashboardData.last_name }}!</strong>
            </p>
            <p>Managed Properties: {{ dashboardData.total_properties }}</p>
            <div>
              <img
                v-if="dashboardData.profile_pic"
                :src="dashboardData.profile_pic"
                alt="Profile Picture"
                class="profile-pic"
              />
              <p v-else>No profile picture available.</p>
            </div>
            <button class="btn btn-primary mt-3" @click="manageArboristContracts">Manage Arborist Contracts</button>
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
  total_properties: number;
  currentContracts: { arborist: string; status: string }[];
}

export default defineComponent({
  name: 'PropertyManagerDashboard',
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
        .get('/property_manager/profile/', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        })
        .then((response) => {
          this.dashboardData = response.data;
        })
        .catch((error) => {
          console.error('Error fetching dashboard data:', error);
        });
    },
    manageArboristContracts() {
      this.$router.push('/manage-arborist-contracts');
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
