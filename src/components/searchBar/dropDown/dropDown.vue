<template>
  <div class="bg-white" @click="setWeatherData">
    <div class="drop-down border-bottom d-flex flex-row">
      <div
        class="drop-down-bar text-left mt-3 ml-3"
        v-html="highLighter(cityData.city.findname)"
      ></div>
      <div
        v-if="suggestedCityWeatherStatus === 'success' && suggestedCityWeather"
        class="ml-auto temp-info-container"
      >
        <div class="d-flex flex-row justify-content-end m-1">
          <div class="">
            <span class="temp font-weight-bold" :aria-label="`x`">
              {{
                tempratureToDegree(suggestedCityWeather.data.current.feels_like)
              }}
              °C
            </span>
            <div class="weather-type">
              {{ suggestedCityWeather.data.current.weather[0].main }}
            </div>
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
      <div
        v-else-if="suggestedCityWeatherStatus === 'loading'"
        class="temp-info-container"
      >
        <content-loader
          :width="400"
          :height="160"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="183" y="81" rx="3" ry="3" width="126" height="28" />
          <rect x="182" y="41" rx="3" ry="3" width="128" height="28" />
        </content-loader>
      </div>
    </div>
  </div>
</template>

<script>
  import { tempratureToDegree, getWeatherImage } from "../../../../utils/utils";
  import { mapActions, mapGetters } from "vuex";
  import { ContentLoader } from "vue-content-loader";

  export default {
    name: "DropDown",

    props: {
      cityData: {
        type: Object,
        default: () => {},
      },
      searchStr: {
        type: String,
        default: "",
      },
    },

    data() {
      return {
        baseUrl: "https://api.openweathermap.org/data/2.5/onecall?",
        suggestedCityWeather: {},
        suggestedCityWeatherStatus: "",
      };
    },

    components: {
      ContentLoader,
    },

    computed: {
      ...mapGetters(["appId"]),
    },

    mounted() {
      this.getCurrentWeather();
    },

    methods: {
      ...mapActions([
        "handleStatus",
        "handleWeatherData",
        "handleCityName",
        "handleSuggestedCityGlobally",
      ]),
      getWeatherImage,
      tempratureToDegree,
      async getCurrentWeather() {
        this.suggestedCityWeatherStatus = "loading";
        let SuggestedCityWeatherResponse = [];
        try {
          SuggestedCityWeatherResponse = await this.$http.get(
            `${this.baseUrl}lat=${this.cityData.city.coord.lat}&lon=${this.cityData.city.coord.lon}&appid=${this.appId}`
          );
          this.suggestedCityWeather = SuggestedCityWeatherResponse;
          this.suggestedCityWeatherStatus = "success";
        } catch (error) {
          this.suggestedCityWeatherStatus = "error";
          console.log("Request failed.  Returned status of", error);
        }
      },
      setWeatherData() {
        // this will run if suggestedCityWeatherStatus is loading
        if (this.suggestedCityWeatherStatus === "loading") {
          this.handleSuggestedCityGlobally({
            coord: this.cityData.city.coord,
            that: this,
            cityName: this.cityData.city.findname,
          });
          // this.$emit("selectCityName", this.cityData.city.findname);

          // this.$emit("clearSuggestions");
        } else if (this.suggestedCityWeatherStatus === "success") {
          // this will run if suggestedCityWeatherStatus is success
          this.$emit("selectCityName", this.cityData.city.findname);
          this.handleStatus("loading");
          this.handleWeatherData(this.suggestedCityWeather.data);
          this.handleStatus("success");
          this.$emit("clearSuggestions");
        } else if (this.suggestedCityWeatherStatus === "error") {
          this.handleStatus("error");
        }
      },
      highLighter(cityName) {
        let capitalizeCityName = cityName.toLowerCase();
        capitalizeCityName =
          capitalizeCityName[0].toUpperCase() + capitalizeCityName.slice(1);
        const searchStr = JSON.parse(JSON.stringify(this.searchStr));
        const reg = new RegExp(searchStr, "gi");
        return capitalizeCityName.replace(reg, (str) => "<b>" + str + "</b>");
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
    border: none;
    width: 600px;
    max-width: 600px;
    font-size: 16px;
    outline: none;
    font-weight: 500;
  }

  .weather-icon {
    height: 48px;
    width: 48px;
  }

  .weather-type {
    font-weight: normal;
    line-height: 15px;
    font-size: 11px;
    font-weight: 500;
    color: #696969;
    margin-top: -5px;
  }

  .temp {
    font-size: 14px;
  }

  .temp-info-container {
    width: 120px;
  }

  @media screen and (max-width: 800px) {
    .drop-down {
      width: 95vw;
    }
    .drop-down-bar {
      width: 85vw;
    }
    .temp-info-container {
      width: 130px;
    }
  }
</style>
