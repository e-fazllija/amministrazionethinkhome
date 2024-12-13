<template>
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <!--begin::Row-->
  <!-- <div v-if="!loading" class="row gy-5 g-xl-8">
    <div class="col-xxl-4">
      <MixedWidget11 widget-classes="card-xl-stretch mb-5 mb-xl-8" widget-color="primary" chart-height="450"
        title="Immobili" :details="data.RealEstatePropertyHomeDetails" />
    </div>
    <div class="col-xxl-4">
      <MixedWidget5 widget-classes="h-md-230 mb-5 mb-xl-10 card-xxl-stretch" chart-color="warning" chart-height="230" />
    </div> 
    <div class="col-xxl-4">
      <MixedWidget7 widget-classes="card-xxl-stretch-50 mb-5 mb-xl-8" chart-color="primary" chart-height="150"
        :details="data.RealEstatePropertyHomeDetails" title="Immobili" description="Totale immobili utlimo anno">
      </MixedWidget7>
      <MixedWidget7 widget-classes="card-xxl-stretch-50 mb-5 mb-xl-8" chart-color="primary" chart-height="150"
        :details="data.RequestHomeDetails" title="Richieste" description="Totale richieste ultimo anno"></MixedWidget7>
      <MixedWidget10
        widget-classes="card-xxl-stretch-50 mb-5 mb-xl-8"
        chart-color="primary"
        chart-height="168"
      ></MixedWidget10>
    </div>
    <div class="col-xxl-4">
      <MixedWidget11 widget-classes="card-xl-stretch mb-5 mb-xl-8" widget-color="primary" chart-height="450"
        title="Richieste" :details="data.RequestHomeDetails" />
    </div>
  </div> -->
  <!--end::Row-->

  <!--begin::Row-->
  <div v-if="!loading" class="row gy-5 g-xl-10">
    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Immobili totali"
        bgColor="#f7d9e3" :total="data.RealEstatePropertyHomeDetails.Total" :difference="data.RealEstatePropertyHomeDetails.TotalRent"
        differenceTitle="Affitto"
        :percentage="(data.RealEstatePropertyHomeDetails.TotalRent / data.RealEstatePropertyHomeDetails.Total) * 100" />
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget1 className="card-xl-stretch mb-xl-10 card theme-dark-bg-body" description="Immobili totali"
        bgColor="#cbf0f4" :total="data.RealEstatePropertyHomeDetails.Total" :difference="data.RealEstatePropertyHomeDetails.TotalSale"
        differenceTitle="Vendita"
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Widget1 from "@/components/dashboard-default-widgets/Widget1.vue";
import MixedWidget7 from "@/components/widgets/mixed/Widget7.vue";
import MixedWidget10 from "@/components/widgets/mixed/Widget10.vue";
import MixedWidget11 from "@/components/widgets/mixed/Widget11.vue";
import { getAssetPath } from "@/core/helpers/assets";
import { getDetails, DashboardDetails } from "@/core/data/dashboard";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Widget1,
    MixedWidget11,
    MixedWidget10,
    MixedWidget7
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
