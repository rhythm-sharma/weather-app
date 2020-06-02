<template>
  <div class="bar mb-4">
    <input class="searchbar" type="text" title="Search" />
    <i v-if="UserIstyping" class="fas fa-times"></i>
    <i v-else class="fas fa-search"></i>
  </div>
</template>

<script>
  export default {
    name: "SearchBar",

    data() {
      return {
        UserIstyping: false,
      };
    },
  };
</script>

<style>
  .bar {
    margin: 0 auto;
    width: 575px;
    border-radius: 0.75rem !important;
    border: 1px solid #dcdcdc;
    box-shadow: 1px 1px 8px 1px #dcdcdc;
  }
  .bar:focus-within {
    box-shadow: 1px 1px 8px 1px #dcdcdc;
    outline: none;
  }
  .searchbar {
    height: 45px;
    border: none;
    width: 500px;
    font-size: 16px;
    outline: none;
  }
  .voice {
    height: 20px;
    position: relative;
    top: 5px;
    left: 10px;
  }
</style>
