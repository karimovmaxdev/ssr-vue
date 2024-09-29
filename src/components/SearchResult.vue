<script setup lang="ts">

defineProps<{
  result: {
    display_name: string;
    type: string;
    class: string;
    lat: string;
    lon: string;
  };
}>();

</script>

<template>
  <div class="search-result">
    <h4>{{ result.display_name }}</h4>
    <div class="description">
      <p><span>Class: </span>{{ result.class }}</p>
      <p><span>Type: </span>{{ result.type }}</p>
      <p><span>Coords: </span>{{ result.lat }} {{ result.lon }}</p>
    </div>

  </div>
</template>

<style scoped lang="scss">
.search-result {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: left;

  h4 {
    margin: 0;
    font-size: 24px;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #ccc;

    span {
      font-size: 18px;
      font-weight: 500;
      color: #eee;
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
