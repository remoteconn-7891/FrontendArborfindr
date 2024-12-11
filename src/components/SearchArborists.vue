<template>
<LayoutDiv>
    <div class="col-8">
        <div class="input-group mb-3">
            <input
            v-memo="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search for arborists by location, services"
            @keyup.enter="performSearch"
            />
            <button class="btn btn-primary" @click="performSearch">Search arborists</button>           
        </div>
        <div v-if="results.length" class="list-group">
            <a
            v-for="(result, index) in results"
            :key="index"
            href="#"
            class="list-group-item list-group-item-action"
            >
            <h5>{{ result.name }}</h5>
            <p>{{ result.location }}</p>
            <p>{{ result.services }}</p>
        </a>
        </div>
        <div v-else-if="hasSearched" class="text-center">
            <p>No results found for "{{ searchQuery }}".</p>           
        </div>
    </div>
</LayoutDiv>
</template>

<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';

export default {
    name: 'SearchArborists',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            searchQuery: '',
            results: [],
            hasSearched: false,
        };
    },
    methods: {
        performSearch() {
            if (!this.searchQuery) return;


            // Simulate API call
            axios
                .get('/api/search', {
                    params: { q: this.searchQuery },
                })
                .then((response) => {
                    this.results = response.data.results;
                    this.hasSearched = true;
                })
                .catch((error) => {
                    console.error('Error running search query:', error);
                    this.results = [];
                    this.hasSearched = true;
                })
            },
    },
}
</script>

<style scoped>
.input-group {
    margin-top: 20px;
}


.list-group-item h5 {
    margin: 0;
}
    </style>