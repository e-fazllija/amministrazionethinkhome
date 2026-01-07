<template>
  <!--begin::Charts Widget 4-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{title}}</span>    
      </h3>

    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 4-->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import type { ApexOptions } from "apexcharts";
import type VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "widget-4",
  props: {
    widgetClasses: String,
    datas: Object,
    title: String
  },
  components: {},
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};

    const preparedData = computed(() => {
      const entries = Object.entries(props.datas || {}).map(([k, v]) => ({
        key: k,
        value: Number(v),
      }));
      // ordina per valore desc e prende i primi 6 per leggibilità
      const top = entries
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)
        .filter((e) => !isNaN(e.value) && e.value > 0);

      return {
        labels: top.map((e) => e.key),
        series: top.map((e) => e.value),
      };
    });

    const series = computed(() => preparedData.value.series);

    return {
      chart,
      chartRef,
      series,
      chartOptions: computed<ApexOptions>(() => ({
        chart: {
          height: 320,
          type: "donut",
        },
        labels: preparedData.value.labels,
        legend: {
          show: true,
          position: "bottom",
          fontSize: "12px",
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
            fontWeight: "600",
          },
          dropShadow: {
            enabled: false,
          },
        },
        stroke: {
          width: 1,
          colors: ["transparent"],
        },
        plotOptions: {
          pie: {
            donut: {
              size: "55%",
            },
          },
        },
        responsive: [
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                height: 260,
              },
            },
          },
        ],
        noData: {
          text: "Nessun dato",
        },
      })),
    };
  }  
});


</script>
