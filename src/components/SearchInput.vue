<script setup lang="ts">
import {ref} from 'vue';
import { useSearchStore } from '../store/store.ts';
import {debounce} from "../utils.ts";

const searchStore = useSearchStore();

const query = ref(searchStore.query);

const onKeyUp = debounce(() => {
  searchStore.query = query.value;
  searchStore.searchLocations();

  const url = new URL(window.location.href);

  // Обновляем параметр query в адресной строке
  if (query.value) {
    url.searchParams.set('query', query.value);
  } else {
    url.searchParams.delete('query');
  }

  window.history.replaceState(null, '', url);
}, 500);
</script>

<template>
  <div class="search-input">
    <input
        v-model="query"
        type="text"
        placeholder="Search for a location"
        @keyup="onKeyUp"
    />
  </div>
</template>

<style scoped lang="scss">
.search-input {
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
