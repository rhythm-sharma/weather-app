<template>
  <div class="temp-card ml-auto mr-auto">
    <!-- Custom information -->
    <div v-if="currentData" class="about text-left">
      <span class="lead"
        >{{ tempratureToDegree(currentData.feels_like) }} °C</span
      >
      <img
        :src="getWeatherImage(currentData.weather[0].icon)"
        alt=""
        class="ml-3 mb-4 w-15"
      />
    </div>

    <!-- Canvas -->
    <line-chart
      v-if="datasets && labels"
      :width="900"
      :height="300"
      :labels="labels"
      :datasets="datasets"
      :options="$options.options"
    ></line-chart>
  </div>
</template>

<script>
  import LineChart from "./lineChart";
  import Sun from "../../assets/sun.svg";
  import { tempratureToDegree, getWeatherImage } from "../../../utils/utils";

  const options = {
    responsive: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: true,
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: "black",
      displayColors: false,
      bodyFontSize: 14,
      callbacks: {
        label: function(tooltipItems) {
          return tooltipItems.yLabel + "°C";
        },
      },
    },
  };

  export default {
    name: "hourlyTemperature",
    options,
    components: {
      LineChart,
    },

    props: {
      hourData: {
        type: Array,
        default: () => [],
      },
      currentData: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        Sun,
        datasets: [],
        labels: [],
      };
    },

    mounted() {
      let hourlyTemprature = [];

      this.hourData.forEach((item) => {
        hourlyTemprature.push(tempratureToDegree(item.temp));
      });

      console.log("hourlyTemprature", hourlyTemprature);

      this.datasets = [
        {
          label: "Temperature",
          data: hourlyTemprature,
          fill: false,
          borderColor: "rgba(66, 133, 244, 0.2)",
          borderWidth: 3,
          pointBackgroundColor: "transparent",
          pointBorderColor: "#4285f4",
          pointBorderWidth: 3,
          pointHoverBorderColor: "rgba(66, 133, 244, 0.2)",
          pointHoverBorderWidth: 10,
          lineTension: 0,
        },
      ];

      let tempLabels = [];
      const date = new Date();

      this.hourData.forEach((item, index) => {
        tempLabels.push(this.formatAMPM(date.getHours() + index));
      });

      this.labels = tempLabels;
    },

    methods: {
      tempratureToDegree,
      getWeatherImage,
      formatAMPM(hours) {
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strTime = hours + ampm;
        return strTime;
      },
    },
  };
</script>

<style scoped>
  .temp-card {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    /* background: black; */
    position: relative;
    width: auto;
    max-width: 700px;
    border-radius: 10px;
    overflow: hidden;
  }

  .lead {
    font-size: 3.5rem;
    font-weight: 900;
  }

  /* hide limit values on X axis */
  .temp-card #canvas {
    margin-left: -30px;
    margin-right: -30px;
    width: 360px !important;
  }

  .temp-card .about {
    height: 185px;
    padding: 20px;
    box-sizing: border-box;
  }

  .temp-card .about h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
  }

  .temp-card .about h3 {
    font-size: 24px;
    /* color: #fff; */
  }

  .temp-card .info {
    float: left;
    padding: 10px 30px 10px 0;
  }

  .temp-card .info p {
    font-size: 11px;
    /* color: #aaa; */
    font-weight: 300;
  }

  .legends {
    padding-top: 20px;
    overflow: hidden;
  }

  .legend {
    display: block;
    width: 8px;
    height: 8px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 50%;
  }

  .axis {
    position: absolute;
    /* color: #fff; */
    z-index: 1;
    text-transform: uppercase;
    display: flex;
    width: 100%;
    bottom: 0;
    display: none;
  }

  .axis .tick {
    flex: 1;
    position: relative;
    font-size: 11px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 20px;
  }

  .axis .tick::after {
    content: "";
    position: absolute;
    display: block;
    right: 0px;
    bottom: 0;
    width: 1px;
    height: 200px;
    background: #e8e8e8;
  }

  .axis .tick .value {
    transform: translateY(-240px);
    opacity: 0;
    transition: all 0.3s;
    position: absolute;
    top: 20px;
    left: 0;
    /* color: #fff; */
    border-radius: 2px;
    width: 100%;
    line-height: 20px;
  }

  .axis .tick:hover .value.value--this {
    transform: translateY(-160px);
    display: block;
    opacity: 0.4;
  }

  .value.value--this {
    /* color: #fff; */
    font-weight: bold;
  }

  .day-number {
    display: block;
  }

  .day-name {
    display: block;
    opacity: 0.4;
  }

  .w-15 {
    width: 15% !important;
  }

  @media screen and (max-width: 700px) {
    .temp-card {
      width: 90vw;
    }
  }
</style>
