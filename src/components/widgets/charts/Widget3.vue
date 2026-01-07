<template>
  <!--begin::Charts Widget 3-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{ title }}</span>

        <span class="text-muted fw-semobold fs-7"
          >{{ subTitle }}</span
        >
      </h3>

      <!--begin::Toolbar-->
      <!-- <div class="card-toolbar" data-kt-buttons="true">
        <a
          class="btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1"
          id="kt_charts_widget_3_year_btn"
          >Year</a
        >

        <a
          class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1"
          id="kt_charts_widget_3_month_btn"
          >Month</a
        >

        <a
          class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"
          id="kt_charts_widget_3_week_btn"
          >Week</a
        >
      </div> -->
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        type="area"
        :options="chart"
        :series="series"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 3-->
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "widget-3",
  props: {
    widgetClasses: String,
    datas: Object,
    title: String,
    subTitle: String,
  },
  components: {},
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useThemeStore();

    const categories = computed(() => {
      const entries = Object.entries(props.datas || {}).map(([key, value]) => {
        const [m, y] = key.split("/").map((v) => parseInt(v));
        return { key, value: Number(value), year: y, month: m };
      });

      // Ordina cronologicamente; se parsing fallisce, mantiene l'ordine originale
      const sorted = entries.every((e) => !isNaN(e.year) && !isNaN(e.month))
        ? entries.sort((a, b) =>
            a.year === b.year ? a.month - b.month : a.year - b.year
          )
        : entries;

      return {
        keys: sorted.map((e) => e.key),
        values: sorted.map((e) => e.value),
      };
    });

    const series = computed(() => [
      {
        name: "Inserimenti",
        data: categories.value.values,
      },
    ]);

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions());
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions());
      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    const chartOptions = (): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const borderColor = getCSSVariableValue("--bs-gray-200");
  const baseColor = getCSSVariableValue("--bs-info");
  const lightColor = getCSSVariableValue("--bs-info-light");

  return {
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: 350,
      toolbar: {
        show: false,
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
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [15, 80, 100],
        colorStops: [
          {
            offset: 0,
            color: lightColor,
            opacity: 0.8,
          },
          {
            offset: 50,
            color: baseColor,
            opacity: 0.25,
          },
          {
            offset: 100,
            color: baseColor,
            opacity: 0.05,
          },
        ],
      },
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: categories.value.keys,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        position: "front",
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      padding: {
        top: 10,
      },
    },
    markers: {
      size: 4,
      colors: [baseColor],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
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
      shared: true,
      intersect: false,
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return val?.toString?.() ?? "0";
        },
      },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
};

    return {
      chart,
      series,
      chartRef,
    };
  },
});


</script>
