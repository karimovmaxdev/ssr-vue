<script setup lang="ts">
import {useSearchStore} from './store/store.ts'
import SearchInput from './components/SearchInput.vue';
import SearchResult from './components/SearchResult.vue';
import {computed} from "vue";

const searchStore = useSearchStore();
const loading = computed(() => searchStore.loading);
const error = computed(() => searchStore.error);
const results = computed(() => searchStore.results);
</script>

<template>
  <div>
    <h1>Location Search</h1>
    <SearchInput/>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="results.length > 0" class="results-list">
      <SearchResult v-for="result in results" :key="result.place_id" :result="result"/>
    </div>
  </div>
</template>

