<template>
  <div class="modal fade" id="kt_modal_add_location" ref="addLocationModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_location_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Aggiungi Località</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_add_location_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Form-->
        <el-form @submit.prevent="submit()" :model="formData" :rules="rules" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_location_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_location_header"
              data-kt-scroll-wrappers="#kt_modal_add_location_scroll" data-kt-scroll-offset="300px">

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Nome Località</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Name">
                  <el-input v-model="formData.Name" type="text" placeholder="Inserisci il nome della località" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Provincia</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="ProvinceId">
                  <el-select 
                    v-model="formData.ProvinceId" 
                    placeholder="Seleziona una provincia" 
                    class="w-100"
                    :loading="provincesLoading"
                    @change="handleProvinceChange"
                    clearable
                  >
                    <el-option
                      v-for="province in provinces"
                      :key="province.Id"
                      :label="province.Name"
                      :value="province.Id"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Città</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="CityId">
                  <el-select 
                    v-model="formData.CityId" 
                    placeholder="Seleziona una città" 
                    class="w-100"
                    :loading="citiesLoading"
                    :disabled="!formData.ProvinceId"
                    clearable
                  >
                    <el-option
                      v-for="city in filteredCities"
                      :key="city.Id"
                      :label="city.Name"
                      :value="city.Id"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="reset" id="kt_modal_add_location_cancel" class="btn btn-light me-3">
              Scarta
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
              <span v-if="!loading" class="indicator-label">
                Salva
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Attendere...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { 
  createLocation, 
  type LocationCreateModel, 
  getAllCities, 
  getAllProvinces,
  type City,
  type Province
} from "@/core/data/locations";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "add-location-modal",
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addLocationModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const loading = ref<boolean>(false);
    const citiesLoading = ref<boolean>(false);
    const provincesLoading = ref<boolean>(false);
    const cities = ref<City[]>([]);
    const provinces = ref<Province[]>([]);

    // Computed per filtrare le città in base alla provincia selezionata
    const filteredCities = computed(() => {
      if (!formData.value.ProvinceId) {
        return [];
      }
      return cities.value.filter(city => city.ProvinceId === formData.value.ProvinceId);
    });

    // Carica le province dal database
    const loadProvinces = async () => {
      provincesLoading.value = true;
      try {
        provinces.value = await getAllProvinces();
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
      } finally {
        provincesLoading.value = false;
      }
    };

    // Carica le città dal database
    const loadCities = async () => {
      citiesLoading.value = true;
      try {
        cities.value = await getAllCities();
      } catch (error) {
        console.error("Errore nel caricamento delle città:", error);
      } finally {
        citiesLoading.value = false;
      }
    };

    // Gestisce il cambio di provincia
    const handleProvinceChange = (provinceId: number) => {
      // Reset della città selezionata quando cambia la provincia
      formData.value.CityId = 0;
    };

    onMounted(() => {
      loadProvinces();
      loadCities();
    });

    const formData = ref<LocationCreateModel & { ProvinceId: number }>({
      Name: "",
      CityId: 0,
      ProvinceId: 0,
    });

    const rules = ref({
      Name: [
        {
          required: true,
          message: "Il nome della località è obbligatorio",
          trigger: "change",
        },
      ],
      ProvinceId: [
        {
          required: true,
          message: "La provincia è obbligatoria",
          trigger: "change",
        },
      ],
      CityId: [
        {
          required: true,
          message: "La città è obbligatoria",
          trigger: "change",
        },
      ],
    });

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          try {
            // Rimuovi ProvinceId dal formData prima di inviare
            const { ProvinceId, ...locationData } = formData.value;
            const result = await createLocation(locationData);
            
            if (result) {
              Swal.fire({
                text: "Località creata con successo!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Continua!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semobold btn-light-primary",
                },
              }).then(function () {
                loading.value = false;
                hideModal(addLocationModalRef.value);
                emit('location-added');
                
                // Reset form
                formData.value = {
                  Name: "",
                  CityId: 0,
                  ProvinceId: 0,
                };
              });
            } else {
              loading.value = false;
              const error = store.errors;
              Swal.fire({
                text: error || "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, capito!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
            }
          } catch (error) {
            loading.value = false;
            console.error("Errore nella creazione della località:", error);
          }
        }
      });
    };

    return {
      formRef,
      addLocationModalRef,
      formData,
      rules,
      loading,
      cities,
      citiesLoading,
      provinces,
      provincesLoading,
      filteredCities,
      handleProvinceChange,
      submit,
    };
  },
});
</script> 