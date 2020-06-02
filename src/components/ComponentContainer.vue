<template>
  <div class="hello">
    <h1>
      Welcome to
      <img class="logo" alt="logo" src="../assets/Richpanel.png" /> RichPanel
      waether App
    </h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <Search-bar />
  </div>
</template>

<script>
  import SearchBar from "../components/searchBar/searchBar";
  export default {
    name: "ComponentContainer",
    props: {
      msg: String,
    },
    components: {
      SearchBar,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .logo {
    height: 30px;
    width: 30px;
  }
</style>
