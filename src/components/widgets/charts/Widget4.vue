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
import { defineComponent, ref } from "vue";
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
    const keys = Object.keys(props.datas).slice(1);
    const values = Object.values(props.datas).slice(1);
    
    const series = values;

    return {
      chart,
      series,
      chartRef,
      chartOptions: {
        chart: {
          height: 100,
          width: 380,
          type: "pie",
        },
        labels: keys, // Etichette
        
      },
    };
  }  
});


</script>
