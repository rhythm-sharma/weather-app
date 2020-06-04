<template>
  <div>
    <div class="drop-down border-bottom d-flex flex-row">
      <div class="drop-down-bar text-left mt-3 ml-3 font-weight-bolder">
        {{ cityData.city.findname }}
      </div>
      <div v-if="suggestedCityWeather" class="">
        <div class="d-flex flex-row m-1">
          <div class="">
            <div class="temp font-weight-bold" :aria-label="`x`">
              {{
                tempratureToDegree(
                  suggestedCityWeather.data.current.feels_like
                )
              }}<span>&#176;</span>
            </div>
            <span class="weather-type">
              {{ suggestedCityWeather.data.current.weather[0].main }}
            </span>
          </div>
          <div class="">
            <img
              class="weather-icon"
              :src="
                getWeatherImage(
                  suggestedCityWeather.data.current.weather[0].icon
                )
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { tempratureToDegree, getWeatherImage } from "../../../../utils/utils";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "DropDown",

    props: {
      cityData: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        baseUrl: "https://api.openweathermap.org/data/2.5/onecall?",
        suggestedCityWeather: {},
      };
    },

    computed: {
      ...mapGetters(["appId"]),
    },

    mounted() {
      this.getCurrentWeather();
    },

    methods: {
      ...mapActions(["handleStatus", "handleWeatherData", "handleCityName"]),
      getWeatherImage,
      tempratureToDegree,
      async getCurrentWeather() {
        let SuggestedCityWeatherResponse = [];
        try {
          SuggestedCityWeatherResponse = await this.$http.get(
            `${this.baseUrl}lat=${this.cityData.city.coord.lat}&lon=${this.cityData.city.coord.lon}&appid=${this.appId}`
          );
          console.log(
            "SuggestedCityWeatherResponse: ",
            SuggestedCityWeatherResponse
          );
          this.suggestedCityWeather = SuggestedCityWeatherResponse;
        } catch (error) {
          console.log("Request failed.  Returned status of", error);
        }
      },
    },
  };
</script>

<style>
  .drop-down {
    margin: 0 auto;
    width: auto;
    max-width: 700px;
    max-height: 45px;
  }
  .drop-down:focus-within {
    outline: none;
  }
  .drop-down-bar {
    cursor: pointer;
    height: 45px;
    border: none;
    width: 650px;
    max-width: 650px;
    font-size: 16px;
    outline: none;
  }

  .weather-icon {
    height: 48px;
    width: 48px;
  }

  .weather-type {
    font-weight: normal;
    line-height: 15px;
    font-size: 13px;
    font-weight: 600;
    color: darkgray;
  }

  .temp {
    font-size: 14px;
  }

  @media screen and (max-width: 800px) {
    .drop-down {
      width: 95vw;
    }
    .drop-down-bar {
      width: 85vw;
    }
  }
</style>
