<template>
  <!--begin::Mixed Widget 7-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body d-flex flex-column p-0">
      <!--begin::Stats-->
      <div class="flex-grow-1 card-p pb-0">
        <div class="d-flex flex-stack flex-wrap">
          <div class="me-2">
            <a href="#" class="text-dark text-hover-primary fw-bold fs-3"
              >{{ title }}</a
            >

            <div class="text-muted fs-7 fw-semobold">
              {{ description }}
            </div>
          </div>

          <div :class="`text-${chartColor}`" class="fw-bold fs-3">{{ details.Total }}</div>
        </div>
      </div>
      <!--end::Stats-->

      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        class="mixed-widget-7-chart card-rounded-bottom"
        :options="chart"
        :series="series"
        type="area"
        :height="chartHeight"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Mixed Widget 7-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useThemeStore } from "@/stores/theme";

export default defineComponent({
  name: "widget-7",
  props: {
    widgetClasses: String,
    chartColor: String,
    chartHeight: String,
    details: Object,
    title: String,
    description: String
  },
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const color = ref(props.chartColor);
    let chart: ApexOptions = {};
    const store = useThemeStore();
    const datas = props.details.TotalCreatedPerMonth as Array<number>

    const series = ref([
      {
        name: "Net Profit",
        data: datas,
      },
    ]);

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(color.value, props.chartHeight));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(color.value, props.chartHeight));

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      series,
      chartRef,
      refreshChart,
      getAssetPath,
    };
  },
});

const chartOptions = (
  color: string = "primary",
  chartHeight: string = "auto"
): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const strokeColor = getCSSVariableValue("--bs-gray-300");
  const baseColor = getCSSVariableValue(`--bs-${color}`);
  const lightColor = getCSSVariableValue(`--bs-${color}-light`);

  return {
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return val.toString();
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
};
</script>
