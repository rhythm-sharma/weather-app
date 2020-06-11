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
          <h5 class="font-weight-bold">{{ item.name }}</h5>
          <p v-if="item.value && item.name === 'Pressure'" class="">
            {{ item.value }} hpa
          </p>
          <p v-if="item.value && item.name === 'Humidity'" class="">
            {{ item.value }} %
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pressureHumidity",

    props: {
      currentData: {
        type: Object,
        required: true,
      },
      selectedIndex: {
        default: null,
      },
      dailyData: {
        type: Array,
        default: () => [],
      },
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
      selectedIndex(newVal) {
        this.Values[0].value = this.dailyData[newVal].pressure;
        this.Values[1].value = this.dailyData[newVal].humidity;
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
