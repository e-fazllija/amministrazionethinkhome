<template>
    <div
      class="modal fade"
      id="kt_modal_add_request"
      ref="addRequestModalRef"
      tabindex="-1"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_add_request_header">
            <!--begin::Modal title-->
            <h2 class="fw-bold">Aggiungi Richiesta</h2>
            <!--end::Modal title-->
  
            <!--begin::Close-->
            <div
              id="kt_modal_add_request_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->
          <div  v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <!--begin::Form-->
          <el-form v-else
            @submit.prevent="submit()"
            :model="formData"
            :rules="rules"
            ref="formRef"
          >
            <!--begin::Modal body-->
            <div class="modal-body py-10 px-lg-17">
              <!--begin::Scroll-->
              <div
                class="scroll-y me-n7 pe-7"
                id="kt_modal_add_request_scroll"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-max-height="auto"
                data-kt-scroll-dependencies="#kt_modal_add_request_header"
                data-kt-scroll-wrappers="#kt_modal_add_request_scroll"
                data-kt-scroll-offset="300px"
              >
                <!--begin::Input group-->
                <div class="fv-row mb-9">
                <!--begin::Label-->
                <span class="required">Cliente</span>
                <!--end::Label-->
                    <!--begin::Input-->
                    <Multiselect
                v-model="formData.CustomerId"
                :options="inserModel.Customers"
                label="label"
                valueProp="Id"
                :searchable="true"
                :close-on-select="true"
                :clear-on-select="false"
                placeholder="Seleziona il cliente"
              />
                    <!--end::Input-->
                </div>
                <!--end::Input group-->
                
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                        <span class="required">Contratto:</span>
                    </label>
                    <!--end::Label-->
  
                  <!--begin::Input-->
                  <select class="form-control" v-model="formData.Contract">
                        <option value="Vendita">Vendita</option>
                        <option value="Affitto">Affitto</option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                
               <!--begin::Input group-->
               <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                        <span class="required">Tipologia Immobiliare:</span>
                        </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                  <select class="form-select" multiple v-model="formData.PropertyType" style="height: auto;">
                       <option value="Appartamenti">Appartamenti</option>
                        <option value="AttivitaCommerciale">Attività Commerciale</option>
                        <option value="Box">Box</option>
                        <option value="CapannoniLocArtigianali">Capannoni, Loc. Artigianali</option>
                        <option value="CasaliRuderi">Casali e Ruderi</option>
                        <option value="CaseSemindipendenti">Case Semindipendenti</option>
                        <option value="LocaliCommerciali">Locali Commerciali</option>
                        <option value="NuoveCostruzioni">Nuove Costruzioni</option>
                        <option value="Terreni">Terreni</option>
                        <option value="VilleCaseIndipendenti">Ville e Case Indipendenti</option>
                  </select>
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
                    <select class="form-control" v-model="formData.Province">
                      <option value="">Seleziona provincia</option>
                      <option v-for="(province, index) in provinces" :key="index" :value="province.Id">{{ province.Name }}</option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
               <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                        <span class="required">Comune</span>
                        </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select class="form-select" multiple aria-label="Multiple select example" v-model="formData.Town" required>
                        <option v-for="(city, index) in cities" :key="index" :value="city.Id">{{ city.Name }} </option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
               <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                        <span class="required">Località</span>
                        </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select  class="form-select" multiple aria-label="Multiple select example" v-model="formData.Location">
                        <option v-for="(location, index) in locations" :key="index" :value="location.Id">{{ location.Name }} </option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Canone - Prezzo: Da</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="PriceFrom">
                    <el-input v-model="formData.PriceFrom" 
                    type= "number" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Canone - Prezzo: A</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="PriceTo">
                    <el-input v-model="formData.PriceTo" 
                    type= "number" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Archiviata</span>
                  </label>
                  <!--end::Label-->
  
                    <!--begin::Input-->
                    <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" value="" v-model="formData.Archived" />
                    </div>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Evasa</span>
                  </label>
                  <!--end::Label-->
  
                    <!--begin::Input-->
                    <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" value="" v-model="formData.Closed" />
                    </div>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Consulenza mutuo richiesta</span>
                  </label>
                  <!--end::Label-->
  
                    <!--begin::Input-->
                    <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" value="" v-model="formData.MortgageAdviceRequired" />
                    </div>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Numero Locali</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="RoomsNumber">
                    <el-input v-model="formData.RoomsNumber" 
                    type= "text" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Giardino Da</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="GardenFrom">
                    <el-input v-model="formData.GardenFrom" 
                    type= "number" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Giardino A</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="GardenTo">
                    <el-input v-model="formData.GardenTo" 
                    type= "number" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>MQ Da</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="MQFrom">
                    <el-input v-model="formData.MQFrom" 
                    type= "number" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>MQ A</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="MQTo">
                    <el-input v-model="formData.MQTo" 
                    type= "number" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Stato dell'immobile</span>
                  </label>
                  <!--end::Label-->
                    <select class="form-control" v-model="formData.PropertyState">
                        <option value="">Seleziona Stato Immobile</option>
                        <option value="0">Affittato</option>
                        <option value="1">In corso di costruzione</option>
                        <option value="2">Libero</option>
                        <option value="3">Libero al Rogito</option>
                        <option value="4">Nuda Proprietà</option>
                        <option value="5">Occupato</option>
                    </select>
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Riscaldamento</span>
                  </label>
                  <!--end::Label-->
                    <select class="form-control" v-model="formData.Heating">
                        <option value="">Seleziona Il Tipo Di Riscaldamento</option>
                        <option value="Autonomo">Autonomo</option>
                        <option value="Centralizzato">Centralizzato</option>
                        <option value="Inesistente">Inesistente</option>
                    </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                 <!--begin::Input group-->
                 <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Posto Auto</span>
                  </label>
                  <!--end::Label-->
                    <select class="form-control" v-model="formData.ParkingSpaces">
                        <option value="">Seleziona Posto Auto</option>
                        <option value="Assegnato">Assegnato</option>
                        <option value="Box Auto">Box Auto</option>
                        <option value="Condominiale">Condominiale</option>
                        <option value="Posto auto coperto">Posto auto coperto</option>
                        <option value="Posto auto scoperto">Posto auto scoperto</option>
                    </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                 <!--begin::Input group-->
                 <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Note</span>
                  </label>
                  <!--end::Label-->
                  <textarea class="form-control" v-model="formData.Notes"></textarea>
                </div>
                <!--end::Input group-->
  
              </div>
              <!--end::Scroll-->
            </div>
            <!--end::Modal body-->
  
            <!--begin::Modal footer-->
            <div class="modal-footer flex-center">
              <!--begin::Button-->
              <button
                type="reset"
                id="kt_modal_add_request_cancel"
                class="btn btn-light me-3"
              >
                Annulla
              </button>
              <!--end::Button-->
  
              <!--begin::Button-->
              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
              >
                <span v-if="!loading" class="indicator-label">
                  Crea
                  <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
                </span>
                <span v-if="loading" class="indicator-progress">
                  Attendere...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
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
  import { getAssetPath } from "@/core/helpers/assets";
  import { defineComponent, ref, watch, onMounted } from "vue";
  import { hideModal } from "@/core/helpers/dom";
  import { countries } from "@/core/data/countries";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import {createRequest, Request, InsertModel, getToInsert } from "@/core/data/requests";
  import { getCities, getLocationsByCity, getGroupedLocations, getProvincesForSelect, getCitiesByProvinceName, getLocationsByCityName } from "@/core/data/locations";
  
  import { useAuthStore, type User } from "@/stores/auth";
  import Multiselect from '@vueform/multiselect'

  
  export default defineComponent({
    name: "add-request-modal",
    components: {Multiselect},
    setup(_, { emit }) {
      const formRef = ref<null | HTMLFormElement>(null);
      const addRequestModalRef = ref<null | HTMLElement>(null);
      const loading = ref<boolean>(false);
      const store = useAuthStore();
      const provinces = ref<Array<{Id: string, Name: string}>>([]);
      const cities = ref<Array<{Id: string, Name: string}>>([]);
      const locations = ref<Array<{Id: string, Name: string}>>([]);
      const cityLocationsMap = ref<{[key: string]: Array<{Id: string, Name: string}>}>({});
      const formData = ref<Request>({
        CustomerId: null,  
        Contract: "Vendita",
        PropertyType: "",
        Province: "",
        Town:  "",
        PriceFrom: 0,
        PriceTo: 0,
        Archived: false,
        Closed: false,
        RoomsNumber: "",
        MQGarden: 0,
        GardenTo:0,
        GardenFrom:0,
        MQFrom: 0, 
        MQTo: 0, 
        PropertyState: "",
        Heating: "",
        ParkingSpaces: 0, 
        Notes: "",
        Location:"",
        MortgageAdviceRequired: false,
        AgencyId: store.user.AgencyId
      });

        const inserModel = ref<InsertModel>({
            Customers: [],
            Users: []
        });

        // Carica le province dal database
        const loadProvinces = async () => {
          try {
            const provincesData = await getProvincesForSelect();
            provinces.value = provincesData;
          } catch (error) {
            console.error("Errore nel caricamento delle province:", error);
          }
        };

        // Carica le città di una provincia specifica
        const loadCitiesByProvince = async (provinceName: string) => {
          try {
            if (provinceName) {
              const citiesData = await getCitiesByProvinceName(provinceName);
              cities.value = citiesData;
            } else {
              cities.value = [];
            }
          } catch (error) {
            console.error("Errore nel caricamento delle città:", error);
            cities.value = [];
          }
        };

        // Carica le località di una città specifica
        const loadLocationsByCity = async (cityName: string) => {
          try {
            if (cityName) {
              const locationsData = await getLocationsByCityName(cityName);
              locations.value = locationsData;
            } else {
              locations.value = [];
            }
          } catch (error) {
            console.error("Errore nel caricamento delle località:", error);
            locations.value = [];
          }
        };

        onMounted(async () => {
        loading.value = true;
        inserModel.value = await getToInsert(store.user.AgencyId);
        if(inserModel.value.Customers.length > 0){
          formData.value.CustomerId = inserModel.value.Customers[0].Id;
        } 
        
        // Carica le province dal database
        await loadProvinces();
        
        loading.value = false;
      })
        
      const rules = ref({
        Type: [
          {
            required: true,
            message: "Tipologia obligatoria",
            trigger: "change",
          },
        ],
        Name: [
          {
            required: true,
            message: "Nome obligatorio",
            trigger: "change",
          },
        ],
        LastName: [
          {
            required: true,
            message: "Cognome obligatorio",
            trigger: "change",
          },
        ],
        Phone: [
          {
            required: true,
            message: "Telefono obligatorio",
            trigger: "change",
          },
        ],
      });

      


      watch(
        () => formData.value.Province,
        async (newProvince) => {
            if (newProvince) {
                // Carica le città della provincia selezionata
                await loadCitiesByProvince(newProvince);
                formData.value.Town = null;
                formData.value.Location = null;
            } else {
                cities.value = [];
                locations.value = [];
                formData.value.Town = null;
                formData.value.Location = null;
            }
        }
        );

      watch(
        () => formData.value.Town,
        async (newTown) => {
          if (Array.isArray(newTown) && newTown.length > 0) {
            // Per le richieste, prendiamo la prima città selezionata per caricare le località
            const firstCity = newTown[0];
            await loadLocationsByCity(firstCity);
            formData.value.Location = null;
          } else {
            locations.value = [];
            formData.value.Location = null;
          }
        }
      );
  
      const submit = () => {
        if (!formRef.value) {
          return;
        }
        formRef.value.validate(async (valid: boolean) => {
          if (valid) {
            loading.value = true;
            formData.value.Town = formData.value.Town.toString()
            if(formData.value.Location != null && formData.value.Location != undefined){
              formData.value.Location = formData.value.Location.toString()
            }
            formData.value.PropertyType = formData.value.PropertyType.toString()

          await createRequest(formData.value);
  
          const error = store.errors;
          
          if (!error) {
              Swal.fire({
                text: "Il modulo è stato inviato con successo!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Continua!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semobold btn-light-primary",
                },
              }).then(function () {
                hideModal(addRequestModalRef.value);
                emit('formAddSubmitted', formData.value);
                loading.value = false;
              });
          } else {
            loading.value = false;
            Swal.fire({
              text: error,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          }
        }
      });
    };
        return {
        formData,
        rules,
        submit,
        formRef,
        loading,
        addRequestModalRef,
        getAssetPath,
        countries,
        cities,
        inserModel,
        provinces,
        locations,
        loadProvinces,
        loadCitiesByProvince,
        loadLocationsByCity,
      };
    },
  });
  </script>
  <style src="@vueform/multiselect/themes/default.css"></style>
  <style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

</style>

  