<template>
    <div
      class="modal fade"
      id="kt_modal_update_request"
      ref="updateRequestModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_update_request_header">
            <!--begin::Modal title-->
            <h2 class="fw-bold">Aggiungi Richiesta</h2>
            <!--end::Modal title-->
  
            <!--begin::Close-->
            <div
              id="kt_modal_update_request_close"
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
                id="kt_modal_update_request_scroll"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-max-height="auto"
                data-kt-scroll-dependencies="#kt_modal_update_request_header"
                data-kt-scroll-wrappers="#kt_modal_update_request_scroll"
                data-kt-scroll-offset="300px"
              >
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                        <span class="required">Cliente</span>
                        </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select class="form-control" v-model="formData.CustomerId">
                        <option v-for="(user, index) in inserModel.Customers" :key="index" :value="user.Id">{{ user.Name }} {{ user.LastName }}</option>
                    </select>
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
                    <select class="form-control" v-model="formData.PropertyType">
                        <option value="Qualsiasi">Qualsiasi</option>
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
                        <option value="Arezzo">Arezzo</option>
                        <option value="Caserta">Caserta</option>
                        <option value="Chieti">Chieti</option>
                        <option value="Firenze">Firenze</option>
                        <option value="Frosinone">Frosinone</option>
                        <option value="LAquila">L'Aquila</option>
                        <option value="Latina">Latina</option>
                        <option value="Napoli">Napoli</option>
                        <option value="Perugia">Perugia</option>
                        <option value="Rieti">Rieti</option>
                        <option value="Roma">Roma</option>
                        <option value="Sassari">Sassari</option>
                        <option value="Terni">Terni</option>
                        <option value="Trento">Trento</option>
                        <option value="Viterbo">Viterbo</option>
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
                    <select class="form-control" v-model="formData.City">
                        <option v-for="(city, index) in cities" :key="index" :value="city.Id">{{ city.Name }} </option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span class="required"> 
                        Canone Mensile €
                        Prezzo - Massimo:
                    </span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="Price">
                    <el-input v-model="formData.Price" 
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
                    <span>Numero Locali</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="RoomsNumber">
                    <el-input v-model="formData.RoomsNumber" 
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
  
                  <!--begin::Input-->
                  <textarea class="form-control" v-model="formData.Notes"></textarea>
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
              <button
                type="reset"
                id="kt_modal_update_request_cancel"
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
  import { Request, InsertModel, getToInsert, getRequest, updateRequest } from "@/core/data/requests";
  import { provinceCities } from "@/core/data/provinces";
  import { useAuthStore, type User } from "@/stores/auth";
  
  export default defineComponent({
    name: "update-request-modal",
    components: {},
    props:{Id:{type:Number,Required:true}},
    setup(props, { emit }) {
      const formRef = ref<null | HTMLFormElement>(null);
      const updateRequestModalRef = ref<null | HTMLElement>(null);
      const loading = ref<boolean>(false);
      const store = useAuthStore();
      const cities = ref([]);
      const formData = ref<Request>({
        CustomerId: 0,  
        Contract: "",
        PropertyType: "",
        Province: "",
        City:  "",
        Price: 0, 
        Archived: false,
        Closed: false,
        RoomsNumber: "",
        MQFrom: 0, 
        MQTo: 0, 
        PropertyState: "",
        Heating: "",
        ParkingSpaces: 0, 
        Notes: ""
      });

        const inserModel = ref<InsertModel>({
            Customers: [],
            Users: []
        });
  
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

      onMounted(async () => {
        loading.value = true;
        inserModel.value = await getToInsert();
        
        loading.value = false;
      })
      const firtLoad = ref(false);
      watch(() => props.Id, async (first, second) => {
          if (first > 0){
            firtLoad.value = true;
            formData.value = await getRequest(props.Id)
            if(inserModel.value.Customers.length > 0){
                formData.value.CustomerId = inserModel.value.Customers[0].Id;
            }
            if (formData.value.Province && provinceCities[formData.value.Province]) {
              cities.value = provinceCities[formData.value.Province];
            } else {
              cities.value = [];
              formData.value.City = null;
            }
          }
          else{
            formData.value = null;
          }

      })

      watch(
        () => formData.value.Province,
        (newProvince) => {
          
          if(!firtLoad.value){
            if (newProvince && provinceCities[newProvince]) {
            cities.value = provinceCities[newProvince];
            formData.value.City = cities.value[0].Id;
            } else {
            cities.value = [];
            formData.value.City = null;
            }
          }else {
            firtLoad.value = false;
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
  
          await updateRequest(formData.value);
  
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
                hideModal(updateRequestModalRef.value);
                emit('formUpdateSubmitted', formData.value);
                loading.value = false;
              });
          } else {
            loading.value = false;
            Swal.fire({
              text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
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
        updateRequestModalRef,
        getAssetPath,
        countries,
        cities,
        inserModel
      };
    },
  });
  </script>
  