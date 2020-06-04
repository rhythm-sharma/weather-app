import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    status: "",
    weatherData: {},
    appId: "3e235f332dbb113f10b747e66f2a40da",
    geoLocationCityName: "",
  },

  getters: {
    status: (state) => {
      return state.status;
    },
    weatherData: (state) => {
      return state.weatherData;
    },
    appId: (state) => {
      return state.appId;
    },
    geoLocationCityName: (state) => {
      return state.geoLocationCityName;
    },
  },

  mutations: {
    changeStatus: (state, status) => {
      state.status = status;
    },
    changeWeatherData: (state, data) => {
      state.weatherData = data;
    },
    changeCityName: (state, name) => {
      state.geoLocationCityName = name;
    },
  },

  actions: {
    handleStatus: ({ commit }, status) => {
      commit("changeStatus", status);
    },
    handleWeatherData: ({ commit }, data) => {
      commit("changeWeatherData", data);
    },
    handleCityName: ({ commit }, name) => {
      commit("changeCityName", name);
    },
  },
});
