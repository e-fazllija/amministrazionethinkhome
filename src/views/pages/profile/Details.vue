<template>
<div v-if="loading" class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
    <!--begin::Navbar-->
    <div v-if="!loading" class="card mb-5 mb-xl-10">
      <div class="card-body pt-9 pb-0">
        <!--begin::Details-->
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
       
          <!--begin::Info-->
          <div class="flex-grow-1">
            <!--begin::Title-->
            <div
              class="d-flex justify-content-between align-items-start flex-wrap mb-2"
            >
              <!--begin::User-->
              <div class="d-flex flex-column">
                <!--begin::Name-->
                <div class="d-flex align-items-center mb-2">
                  <a
                    href="#"
                    class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                    >Max Smith</a
                  >
                  <a href="#">
                    <KTIcon icon-name="verify" icon-class="fs-1 text-primary" />
                  </a>
  
                  <a
                    href="#"
                    class="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_upgrade_plan"
                    >Upgrade to Pro</a
                  >
                </div>
                <!--end::Name-->
  
                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                  <a
                    href="#"
                    class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <KTIcon icon-name="profile-circle" icon-class="fs-4 me-1" />
                    Agente
                  </a>
                  <a
                    href="#"
                    class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <KTIcon icon-name="geolocation" icon-class="fs-4 me-1" />
                    SF, Bay Area
                  </a>
                  <a
                    href="#"
                    class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                  >
                    <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                    max@kt.com
                  </a>
                </div>
                <!--end::Info-->
              </div>
              <!--end::User-->
  
              <!--begin::Actions-->
              <div class="d-flex my-4">
               
                <!--begin::Menu-->
                <!-- <div class="me-0">
                  <button
                    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-end"
                    data-kt-menu-flip="top-end"
                  >
                    <i class="bi bi-three-dots fs-3"></i>
                  </button>
                  <Dropdown3></Dropdown3>
                </div> -->
                <!--end::Menu-->
              </div>
              <!--end::Actions-->
            </div>
            <!--end::Title-->
  
            <!--begin::Stats-->
            <div class="d-flex flex-wrap flex-stack">
              <!--begin::Wrapper-->
              <div class="d-flex flex-column flex-grow-1 pe-8">
                <!--begin::Stats-->
                <div class="d-flex flex-wrap">
                  <!--begin::Stat-->
                  <div
                    class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                  >
                    <!--begin::Number-->
                    <div class="d-flex align-items-center">
                      <KTIcon
                        icon-name="arrow-up"
                        icon-class="fs-3 text-success me-2"
                      />
                      <div class="fs-2 fw-bold">4500$</div>
                    </div>
                    <!--end::Number-->
  
                    <!--begin::Label-->
                    <div class="fw-semobold fs-6 text-gray-400">Earnings</div>
                    <!--end::Label-->
                  </div>
                  <!--end::Stat-->
  
                  <!--begin::Stat-->
                  <div
                    class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                  >
                    <!--begin::Number-->
                    <div class="d-flex align-items-center">
                      <KTIcon
                        icon-name="arrow-down"
                        icon-class="fs-3 text-danger me-2"
                      />
                      <div
                        class="fs-2 fw-bold"
                        data-kt-countup="true"
                        data-kt-countup-value="75"
                      >
                        75
                      </div>
                    </div>
                    <!--end::Number-->
  
                    <!--begin::Label-->
                    <div class="fw-semobold fs-6 text-gray-400">Projects</div>
                    <!--end::Label-->
                  </div>
                  <!--end::Stat-->
  
                  <!--begin::Stat-->
                  <div
                    class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                  >
                    <!--begin::Number-->
                    <div class="d-flex align-items-center">
                      <KTIcon
                        icon-name="arrow-up"
                        icon-class="fs-3 text-success me-2"
                      />
                      <div
                        class="fs-2 fw-bold"
                        data-kt-countup="true"
                        data-kt-countup-value="60"
                        data-kt-countup-prefix="%"
                      >
                        60%
                      </div>
                    </div>
                    <!--end::Number-->
  
                    <!--begin::Label-->
                    <div class="fw-semobold fs-6 text-gray-400">Success Rate</div>
                    <!--end::Label-->
                  </div>
                  <!--end::Stat-->
                </div>
                <!--end::Stats-->
              </div>
              <!--end::Wrapper-->
  
            </div>
            <!--end::Stats-->
          </div>
          <!--end::Info-->
        </div>
        <!--end::Details-->
      </div>
    </div>
    <!--end::Navbar-->
    <Settings v-if="!loading" :profileDetails=formData></Settings>
    <router-view></router-view>
  </template>
  
  <script lang="ts">
  import { getAssetPath } from "@/core/helpers/assets";
  import { defineComponent, ref, onMounted } from "vue";
  import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
  import Settings from "@/views/pages/profile/Settings.vue"
  import { useRoute, useRouter } from "vue-router";
  import { useAuthStore, type User } from "@/stores/auth";
  import { getAgent, Agent } from "@/core/data/agents"

  export default defineComponent({
    name: "kt-account",
    components: {
      Dropdown3,
      Settings
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const id = route.params.id;
        console.log(route.params.id)
        const formData = ref<Agent>();
        const loading = ref<boolean>(true);

        onMounted(async () => {
            loading.value = true;
            formData.value = await getAgent(id.toString())
            loading.value = false;
        })

      return {
        getAssetPath,
        id,
        formData,
        loading
      };
    },
  });
  </script>
  