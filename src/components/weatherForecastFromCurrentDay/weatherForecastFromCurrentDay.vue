<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-row main-weather-forcast-container mb-5 pb-3 mb-5">
      <div
        v-for="(item, index) in dailyData"
        :key="index"
        :ref="index"
        class="weather-forcast-container m-2 py-1"
        @click="
          () => {
            addBorders(index, dailyData.length);
            handleHourlyDataOnSelectedCard(index);
          }
        "
      >
        <div
          class="day-name font-weight-bold"
          style=""
          :aria-label="days[index]"
        >
          {{ days[index] }}
        </div>
        <div class="temperature">
          <div class="temp-max">
            <span class="temp-text font-weight-bold">{{
              tempratureToDegree(item.temp.max)
            }}</span>
            <span>&#176;</span>
          </div>
          <div class="temp-min">
            <span class="temp-text text-muted">{{
              tempratureToDegree(item.temp.min)
            }}</span>
            <span>&#176;</span>
          </div>
        </div>
        <div class="weather-icon-container">
          <img
            class="weather-icon"
            :src="getWeatherImage(item.weather[0].icon)"
          />
        </div>
        <span class="weather-type">
          {{ item.weather[0].main }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { tempratureToDegree, getWeatherImage } from "../../../utils/utils";

  export default {
    name: "weatherForecastFromCurrentDay",
    props: {
      dailyData: {
        type: Array,
        default: () => [],
      },
    },

    data() {
      return {
        forCastData: [],
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      };
    },

    mounted() {
      // this.addBorders(0, this.dailyData.length);
      this.forCastData = this.dailyData;
      this.forCastData = this.forCastData.slice(0, -1);

      let today = new Date();
      let index = 0;
      let a1 = [];
      let a2 = [];
      let newDays = [];

      today = new Date();
      index = today.getDay() + 1;

      a1 = this.days.slice(0, index);
      a2 = this.days.slice(index);
      a2 = a2.slice(1);

      newDays.push(this.days[index]);

      a2.forEach((i) => {
        newDays.push(i);
      });

      a1.forEach((i) => {
        newDays.push(i);
      });

      this.days = newDays;
    },

    methods: {
      tempratureToDegree,
      getWeatherImage,
      addBorders(idx, len) {
        for (let index = 0; index < len; index++) {
          this.$refs[index][0].classList.remove("blue-border");
        }
        this.$refs[idx][0].classList.add("blue-border");
      },
      handleHourlyDataOnSelectedCard(index) {
        this.$emit("handleHourlyDataOnSelectedCard", index);
      },
    },
  };
</script>

<style scoped>
  .weather-forcast-container {
    display: inline-block;
    line-height: 1;
    text-align: center;
    /* transition-duration: 50ms, 50ms, 50ms; */
    /* transition-property: background-image, border, font-weight; */
    font-weight: 13px;
    width: 73px;
  }

  .blue-border {
    border-style: solid;
    border-color: #59bbff;
    border-width: 2px;
  }

  .day-name {
    padding-top: 7px;
    line-height: 15px;
  }

  .weather-icon-container {
    display: inline-block;
  }

  .weather-icon {
    margin: 1px 4px 0;
    height: 48px;
    width: 48px;
  }

  .temperature,
  .weather-type {
    font-weight: normal;
    line-height: 15px;
    font-size: 13px;
  }

  .weather-type {
    font-weight: 500;
    color: darkgray;
  }

  .temp-max {
    display: inline-block;
    padding-right: 5px;
  }

  .temp-min {
    display: inline-block;
  }

  .temp-text {
    display: inline;
  }

  @media screen and (max-width: 700px) {
    .main-weather-forcast-container {
      max-width: 95vw;
      overflow: scroll;
    }
  }
</style>
