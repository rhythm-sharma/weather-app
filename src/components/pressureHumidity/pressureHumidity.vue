<template>
  <div class="d-flex flex-row justify-content-center">
    <div class="bg-white d-flex flex-row mb-5 ml-auto mr-auto p-3 w-430px">
      <div
        v-for="(item, index) in Values"
        :key="index"
        class="text-left bg-blue w-50 pl-2 pt-2"
        :class="{ 'mr-4': index === 0 }"
      >
        <h4 class="">{{ item.name }}</h4>
        <p class="">{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pressureHumidity",

    data() {
      return {
        Values: [
          {
            name: "Pressure",
            value: "1013",
          },
          {
            name: "Humidity",
            value: "93%",
          },
        ],
      };
    },
  };
</script>

<style>
  .w-430px {
    width: 430px;
  }
  .bg-blue {
    background-color: #edf6ff !important;
  }
</style>
