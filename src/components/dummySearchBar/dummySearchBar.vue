<template>
  <div class="mb-5">
    <div class="bar">
      <img class="mb-1 location-icon" :src="locationIcon" />
      <input class="searchbar pl-2" title="Search" />
      <i type="submit" class="fas fa-search"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DummySearchBar",

    data() {
      return {
        locationIcon: require("../../assets/location.svg"),
      };
    },
  };
</script>

<style></style>
