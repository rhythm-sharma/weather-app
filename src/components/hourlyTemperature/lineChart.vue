<template>
  <div style="overflow: scroll;">
    <canvas class="canvas pb-3" ref="myChart"></canvas>
  </div>
</template>

<script>
  import Chart from "chart.js";

  export default {
    name: "LineChart",
    props: {
      // The canvas's width.
      width: {
        type: Number,
        validator: (value) => value > 0,
      },

      // The canvas's height.
      height: {
        type: Number,
        validator: (value) => value > 0,
      },

      // The chart's data.labels
      labels: {
        type: Array,
        required: true,
      },

      // The chart's data.datasets
      datasets: {
        type: Array,
        required: true,
      },

      // The chart's options.
      options: Object,

      hourData: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        chart: null,
      };
    },
    watch: {
      datasets(newDatasets) {
        // Replace the datasets and call the update() method on Chart.js
        // instance to re-render the chart.
        this.chart.data.datasets = newDatasets;
        this.chart.update();
      },
      labels(newLabels) {
        this.chart.data.labels = newLabels;
        this.chart.update();
      },
    },
    mounted() {
      this.chart = new Chart(this.$refs.myChart, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: this.options,
      });
    },
    beforeDestroy() {
      // destroy the Chart.js instance.
      if (this.chart) {
        this.chart.destroy();
      }
    },
  };
</script>

<style scoped>
  .canvas {
    overflow: scroll;
    width: 700px;
    height: 300px;
  }
  @media screen and (max-width: 700px) {
    .canvas {
      width: 100% !important;
      height: 260px !important;
    }
  }
</style>
