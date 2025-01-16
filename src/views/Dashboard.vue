<template>
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <!--begin::Row-->
  <div v-if="!loading" class="row gy-5 g-xl-10">
    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Immobili totali"
        bgColor="#f7d9e3" :total="data.RealEstatePropertyHomeDetails.Total"
        :difference="data.RealEstatePropertyHomeDetails.TotalRent" differenceTitle="Affitto"
        :percentage="(data.RealEstatePropertyHomeDetails.TotalRent / data.RealEstatePropertyHomeDetails.Total) * 100" />
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Immobili totali"
        bgColor="#cbf0f4" :total="data.RealEstatePropertyHomeDetails.Total"
        :difference="data.RealEstatePropertyHomeDetails.TotalSale" differenceTitle="Vendita"
        :percentage="(data.RealEstatePropertyHomeDetails.TotalSale / data.RealEstatePropertyHomeDetails.Total) * 100" />
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-2">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Totale clienti"
        bgColor="#cbd4f4" :total="data.TotalCustomers" />
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-2">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Totale agenti"
        bgColor="#cbd4f4" :total="data.TotalAgents" />
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

  <!--begin::Row-->
  <div v-if="!loading" class="row gy-5 g-xl-10">
    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Richieste totali"
        bgColor="#f7d9e3" :total="data.RequestHomeDetails.Total" :difference="data.RequestHomeDetails.TotalActive"
        differenceTitle="Attive"
        :percentage="(data.RequestHomeDetails.TotalActive / data.RequestHomeDetails.Total) * 100" />
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Richieste totali"
        bgColor="#cbf0f4" :total="data.RequestHomeDetails.Total" :difference="data.RequestHomeDetails.TotalArchived"
        differenceTitle="Archiviate"
        :percentage="(data.RequestHomeDetails.TotalArchived / data.RequestHomeDetails.Total) * 100" />
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Richieste totali"
        bgColor="#cbd4f4" :total="data.RequestHomeDetails.Total" :difference="data.RequestHomeDetails.TotalClosed"
        differenceTitle="Evase"
        :percentage="(data.RequestHomeDetails.TotalClosed / data.RequestHomeDetails.Total) * 100" />
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

<!--begin::Row-->
<div v-if="!loading" class="row gy-5 g-xl-10">
  <!--begin::Col-->
  <div class="col-xl-4">
<Chart3 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" title="Immobili"
subTitle="Andamento immobili inseriti" :datas="data.RealEstatePropertyHomeDetails.TotalCreatedPerMonth"/>
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-4">
<Chart3 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" title="Richieste"
subTitle="Andamento richieste inserite" :datas="data.RequestHomeDetails.TotalCreatedPerMonth"/>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

  <!--begin::Row-->
<div v-if="!loading" class="row gy-5 g-xl-10">
  <!--begin::Col-->
  <div class="col-xl-12 text-center">
    <h2>Informazioni Immobili</h2>
</div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-4">
      <Chart4 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" :datas="data.RealEstatePropertyHomeDetails.DistinctByTownSale" title="Immobli in vendita per città"/>
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-4">
      <Chart4 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" :datas="data.RealEstatePropertyHomeDetails.DistinctByTypeSale" title="Immobli in vendita per tipologia"/>
    </div>
    <!--end::Col-->

     <!--begin::Col-->
     <div class="col-xl-4">
      <Chart4 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" :datas="data.RealEstatePropertyHomeDetails.DistinctByTownRent" title="Immobli in affitto per città"/>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

   <!--begin::Row-->
<div v-if="!loading" class="row gy-5 g-xl-10">
  <!--begin::Col-->
  <div class="col-xl-12 text-center">
    <h2>Informazioni Richieste</h2>
</div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-4">
      <Chart4 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" :datas="data.RequestHomeDetails.DistinctByTownSale" title="Richieste vendita per città"/>
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-4">
      <Chart4 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" :datas="data.RequestHomeDetails.DistinctByTypeSale" title="Richieste vendita per tipologia"/>
    </div>
    <!--end::Col-->

     <!--begin::Col-->
     <div class="col-xl-4">
      <Chart4 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" :datas="data.RequestHomeDetails.DistinctByTownRent" title="Richieste affitto per città"/>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Widget1 from "@/components/dashboard-default-widgets/Widget1.vue";
import MixedWidget7 from "@/components/widgets/mixed/Widget7.vue";
import MixedWidget10 from "@/components/widgets/mixed/Widget10.vue";
import MixedWidget11 from "@/components/widgets/mixed/Widget11.vue";


import MixedWidget12 from "@/components/widgets/mixed/Widget12.vue";
import MixedWidget13 from "@/components/widgets/mixed/Widget13.vue";
import MixedWidget14 from "@/components/widgets/mixed/Widget14.vue";

import Chart1 from "@/components/widgets/charts/Widget1.vue";
import Chart2 from "@/components/widgets/charts/Widget2.vue";
import Chart3 from "@/components/widgets/charts/Widget3.vue";
import Chart4 from "@/components/widgets/charts/Widget4.vue";
import Chart5 from "@/components/widgets/charts/Widget5.vue";
import Chart6 from "@/components/widgets/charts/Widget6.vue";
import Chart7 from "@/components/widgets/charts/Widget7.vue";
import Chart8 from "@/components/widgets/charts/Widget8.vue";

import { getAssetPath } from "@/core/helpers/assets";
import { getDetails, DashboardDetails } from "@/core/data/dashboard";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Widget1,
    MixedWidget11,
    MixedWidget10,
    MixedWidget7,

    MixedWidget12,
    MixedWidget13,
    MixedWidget14,

    Chart1,
    Chart2,
    Chart3,
    Chart4,
    Chart5,
    Chart6,
    Chart7,
    Chart8
  },
  setup() {
    const loading = ref<boolean>(true);
    const data = ref<DashboardDetails>();

    async function getItems() {
      loading.value = true;
      data.value = await getDetails();
      loading.value = false;
    }

    onMounted(async () => {
      await getItems();
    });

    // onUnmounted(() => {
    //   if (!localStorage.getItem(LS_CONFIG_NAME_KEY)) {
    //     LayoutService.disableToolbar();
    //   }
    // });
    return {
      getAssetPath,
      loading,
      data
    }
  },
});
</script>
