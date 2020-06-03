<template>
  <div class="d-flex flex-row justify-content-center">
    <div class="bg-white d-flex flex-row mb-5 ml-auto mr-auto p-3 w-430px">
      <div
        v-for="(item, index) in Values"
        :key="index"
        class="text-left bg-blue w-50 pl-2 pt-2"
        :class="{ 'mr-4': index === 0 }"
      >
        <div v-if="item.value && item.name">
          <h4 class="">{{ item.name }}</h4>
          <p v-if="item.value && item.name === 'Pressure'" class="">
            {{ item.value }} hpa
          </p>
          <p v-if="item.value && item.name === 'Humidity'" class="">
            {{ item.value }} %
          </p>
        </div>
        <ContentLoader
          v-else
          :width="400"
          :height="150"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="8" y="8" rx="3" ry="3" width="108" height="16" />
        </ContentLoader>
      </div>
    </div>
  </div>
</template>

<script>
  import { ContentLoader } from "vue-content-loader";

  export default {
    name: "pressureHumidity",

    props: {
      currentData: {
        type: Object,
        required: true,
      },
    },

    components: {
      ContentLoader,
    },

    data() {
      return {
        Values: [
          {
            name: "Pressure",
            value: `${this.currentData && this.currentData.pressure}` || "",
          },
          {
            name: "Humidity",
            value: `${this.currentData && this.currentData.humidity}` || "",
          },
        ],
      };
    },
    watch: {
      currentData(newCurrentData) {
        this.Values[0].value = newCurrentData.pressure;
        this.Values[1].value = newCurrentData.humidity;
      },
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
