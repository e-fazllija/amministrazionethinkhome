<template>
  <div class="modal fade show" id="kt_modal_update_event" aria-modal="true" role="dialog" ref="updateTargetModalRef">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <el-form class="form fv-plugins-bootstrap5 fv-plugins-framework" id="kt_modal_update_event_form"
          @submit.prevent="submit()" :model="targetData" :rules="rules" ref="formRef">
          <div class="modal-header">
            <h2 class="fw-bold">Aggiorna evento</h2>
            <div class="btn btn-icon btn-sm btn-active-icon-primary" id="kt_modal_update_event_close"
              data-bs-dismiss="modal">
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
          </div>
          <!--end::Modal header-->
          <!--begin::Modal body-->
          <div v-if="!loading" class="modal-body py-10 px-lg-17">
            <!--begin::Input group-->
            <div class="fv-row mb-9 fv-plugins-icon-container">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold required mb-2">Nome evento</label>
              <!--end::Label-->
              <!--begin::Input-->
              <el-form-item prop="NomeEvento">
                <el-input v-model="targetData.NomeEvento" type="text" name="NomeEvento" />
              </el-form-item>
              <!--end::Input-->
              <div class="fv-plugins-message-container invalid-feedback"></div>
            </div>
            <!--end::Input group-->
            <div class="d-flex align-items-center mb-7">
                 <label class="required fs-6 fw-sembold me-3">Seleziona il colore:</label>
                  <select v-model="targetData.Color" class="fs-6 fw-sembold mb-2" style="width: 100px;"
                         :style="{ backgroundColor: targetData.Color, color: '#fff' }">
                    <option v-for="(color, index) in colorOptions" :key="index" 
                         :value="color.hex" :style="{ backgroundColor: color.hex, color: '#fff' }">
                         {{ color.name }}
                    </option>
                  </select>
            </div>
            <!--begin::Input group-->
            <div class="fv-row mb-9">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold mb-2">Descrizione evento</label>
              <!--end::Label-->
              <!--begin::Input-->
              <el-input v-model="targetData.DescrizioneEvento" type="text" placeholder="" name="DescrizioneEvento" />
              <!--end::Input-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row mb-9">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold mb-2">Luogo evento</label>
              <!--end::Label-->
              <!--begin::Input-->
              <el-input v-model="targetData.LuogoEvento" type="text" placeholder="" name="LuogoEvento" />
              <!--end::Input-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row mb-9">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold mb-2">Immobile</label>
              <!--end::Label-->
              <!--begin::Input-->

              <Multiselect
                v-model="targetData.RealEstatePropertyId"
                :options="inserModel.RealEstateProperties"
                label="label"
                valueProp="Id"
                :searchable="true"
                :close-on-select="true"
                :clear-on-select="false"
                placeholder="Seleziona l'immobile"
              />

              <!-- <el-select v-model="targetData.RealEstatePropertyId" placeholder="Seleziona l'immobile" size="large">
                <el-option v-for="item in inserModel.RealEstateProperties" :key="item.Id"
                  :label="item.Town + ', ' + item.AddressLine" :value="item.Id" />
              </el-select> -->
            </div>
            <!--end::Input-->
            <!--begin::Input group-->
            <div class="fv-row mb-9">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold mb-2">Richiesta</label>
              <!--end::Label-->
              <!--begin::Input-->

              <Multiselect
                v-model="targetData.RequestId"
                :options="inserModel.Requests"
                label="label"
                valueProp="Id"
                :searchable="true"
                :close-on-select="true"
                :clear-on-select="false"
                placeholder="Seleziona la richiesta"
              />

              <!-- <el-select v-model="targetData.RequestId" placeholder="Seleziona la richiesta" size="large">
                <el-option v-for="item in inserModel.Requests" :key="item.Id"
                  :label="item.Customer.Name + ' ' + item.Customer.LastName" :value="item.Id" />
              </el-select> -->
            </div>
            <!--end::Input-->
            <!--begin::Input group-->
            <div class="fv-row mb-9">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold mb-2">Cliente</label>
              <!--end::Label-->
              <!--begin::Input-->

              <Multiselect
                v-model="targetData.CustomerId"
                :options="inserModel.Customers"
                label="label"
                valueProp="Id"
                :searchable="true"
                :close-on-select="true"
                :clear-on-select="false"
                placeholder="Seleziona il cliente"
              />

              <!-- <el-select v-model="targetData.CustomerId" placeholder="Seleziona il cliente" size="large">
                <el-option v-for="item in inserModel.Customers" :key="item.Id" :label="item.Name + ' ' + item.LastName"
                  :value="item.Id" />
              </el-select> -->
              <!--end::Input-->
            </div>
            <!--end::Input group-->

             <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Confermata</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="targetData.Confirmed" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Disdetto</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="targetData.Cancelled" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Rimandato</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="targetData.Postponed" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

            <!--begin::Input group-->
            <div class="fv-row mb-9">
              <!--begin::Checkbox-->
              <!-- <label class="form-check form-check-custom form-check-solid">
                  <el-checkbox v-model="targetData.allDay" type="checkbox" />
                  <span class="form-check-label fw-semobold">Tutto il giorno</span>
                </label> -->
              <!--end::Checkbox-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row row-cols-lg-2 g-10">
              <div class="col">
                <div class="fv-row mb-9 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2 required">Inizio</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <input class="form-control" v-model="targetData.DataInizioEvento" type="datetime-local" />
                  <!-- <el-date-picker v-model="targetData.DataInizioEvento" type="datetime" :teleported="false"
                    name="DataInizioEvento" prop="DataInizioEvento" /> -->
                  <!--end::Input-->
                  <div class="fv-plugins-message-container invalid-feedback"></div>
                </div>
              </div>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row row-cols-lg-2 g-10">
              <div class="col">
                <div class="fv-row mb-9 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2 required">Fine</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <input class="form-control" v-model="targetData.DataFineEvento" type="datetime-local" />
                  <!-- <el-date-picker v-model="targetData.DataFineEvento" type="datetime" :teleported="false"
                    name="DataFineEvento" prop="DataFineEvento" /> -->
                  <!--end::Input-->
                  <div class="fv-plugins-message-container invalid-feedback"></div>
                </div>
              </div>
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Modal body-->
          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button data-bs-dismiss="modal" type="reset" id="kt_modal_update_event_cancel" class="btn btn-light me-3">
              Chiudi
            </button>
            <!--end::Button-->
            <!--begin::Button-->
            <button v-if="user.Id == targetData.ApplicationUserId || user.Role == 'Admin' || user.Role == 'Agency'" @click="deleteItem(targetData.Id)" data-bs-dismiss="modal" type="button" class="btn btn-danger me-3">
              Elimina
            </button>
            <!--end::Button-->
            <!--begin::Button-->
            <button v-if="user.Id == targetData.ApplicationUserId || user.Role == 'Admin' || user.Role == 'Agency'" :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
              <span v-if="!loading" class="indicator-label">
                Salva
                <KTIcon icon-name="arrow-right" icon-class="fs-3 ms-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Attendere...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
          <div></div>
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import events, { TODAY, getToInsert, updateEvent, InsertModel, getEvent, Event, deleteEvent } from "@/core/data/events";
import { useAuthStore } from "@/stores/auth";
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "update-event-modal",
  components: { Multiselect },
  props: { Id: { type: Number, Required: true } },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    const user = store.user;
    const colorOptions = [
  { name: '', hex: '#408441' },       
  { name: '', hex: '#3412F2' },           
  { name: '', hex: '#FBC8FF' },          
  { name: '', hex: '#23D8F4' },        
  { name: '', hex: '#E70F86' },         
  { name: '', hex: '#8973AE' },           
  { name: '', hex: '#559F6D' },     
  { name: '', hex: '#D6D00C' },          
  { name: '', hex: '#676769' },          
  { name: '', hex: '#8B1AD7' },          
  { name: '', hex: '#F5730F' },      
  { name: '', hex: '#FF5733' },          
  { name: '', hex: '#C70039' },     
  { name: '', hex: '#900C3F' },        
  { name: '', hex: '#581845' },         
  { name: '', hex: '#D5A6BD' },    
  { name: '', hex: '#FF8C00' },   
  { name: '', hex: '#FF0000' },     
  { name: '', hex: '#800080' },     
  { name: '', hex: '#00FF00' }       
];
    const targetData = ref<Event>({
      Id: 0,
      ApplicationUserId: "",
      NomeEvento: "",
      DescrizioneEvento: "",
      LuogoEvento: "",
      CustomerId: null,
      RequestId: null,
      RealEstatePropertyId: null,
      DataInizioEvento: null,
      DataFineEvento: null,
      Type: "Appuntamento",
      Color:"##5e97fd",
      Confirmed: false,
      Cancelled: false,
      Postponed: false,
    });

    const rules = ref({
      NomeEvento: [
        {
          required: true,
          message: "Inserisci il nome dell'evento",
          trigger: "blur",
        },
      ],
      DataInizioEvento: [
        {
          required: true,
          message: "Inserisci la data",
          trigger: "blur",
        },
      ],
      DataFineEvento: [
        {
          required: true,
          message: "Inserisci la data",
          trigger: "blur",
        },
      ],
    });

    const inserModel = ref<InsertModel>({
      Customers: [],
      Requests: [],
      RealEstateProperties: [],
      // Agents: []
    });

    onMounted(async () => {
      loading.value = true;
      inserModel.value = await getToInsert();
      loading.value = false;
    })

    watch(() => props.Id, async (first, second) => {
      if (first > 0) {
        targetData.value = await getEvent(props.Id)
      }
      else {
        targetData.value = null;
      }
    })

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          targetData.value.DataInizioEvento = targetData.value.DataInizioEvento;
          targetData.value.DataFineEvento = targetData.value.DataFineEvento;

          await updateEvent(targetData.value);

          const error = store.errors;

          if (!error) {
            Swal.fire({
              text: "Operazione completata!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(function () {
              loading.value = false;
              hideModal(updateTargetModalRef.value);
              emit('formUpdateSubmitted', targetData.value);
            });
          } else {
            loading.value = false;
            Swal.fire({
              text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, capito!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            return false;
          }

        } else {
          loading.value = false;
          Swal.fire({
            text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, capito!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          return false;
        }
      });
    };

    async function deleteItem(id: number) {
      Swal.fire({
        text: "Confermare l'eliminazione?",
        icon: "warning",
        buttonsStyling: false,
        confirmButtonText: "Continua!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      }).then(async () => {
        await deleteEvent(id);
        emit('formUpdateSubmitted', targetData.value);
      });
    }

    return {
      formRef,
      updateTargetModalRef,
      loading,
      targetData,
      rules,
      submit,
      getAssetPath,
      inserModel,
      deleteItem,
      user,
      colorOptions
    };
  },
});
</script>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>