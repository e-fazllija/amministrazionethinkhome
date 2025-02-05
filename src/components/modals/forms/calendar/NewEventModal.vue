<template>
<div class="modal fade show" id="kt_modal_add_event" role="dialog" ref="newTargetModalRef" tabindex="-1" aria-hidden="false" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <el-form class="form fv-plugins-bootstrap5 fv-plugins-framework" id="kt_modal_add_event_form"
          @submit.prevent="submit()" :model="targetData" :rules="rules" ref="formRef">
          <div class="modal-header">
            <h2 class="fw-bold">Aggiungi evento</h2>
            <div
              class="btn btn-icon btn-sm btn-active-icon-primary"
              id="kt_modal_add_event_close"
              data-bs-dismiss="modal"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
          </div>
          <!--end::Modal header-->
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
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
              <el-select v-model="targetData.RealEstatePropertyId" placeholder="Seleziona l'immobile" size="large">
                <el-option v-for="item in inserModel.RealEstateProperties" :key="item.Id"
                  :label="item.Town + ', ' + item.AddressLine" :value="item.Id" />
              </el-select>
            </div>
            <!--end::Input-->
            <!--begin::Input group-->
            <div class="fv-row mb-9">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold mb-2">Richiesta</label>
              <!--end::Label-->
              <!--begin::Input-->
              <el-select v-model="targetData.RequestId" placeholder="Seleziona la richiesta" size="large">
                <el-option v-for="item in inserModel.Requests" :key="item.Id"
                  :label="item.Customer.Name + ' ' + item.Customer.LastName" :value="item.Id" />
              </el-select>
            </div>
            <!--end::Input-->
            <!--begin::Input group-->
            <div class="fv-row mb-9">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold mb-2">Cliente</label>
              <!--end::Label-->
              <!--begin::Input-->
              <el-select v-model="targetData.CustomerId" placeholder="Seleziona il cliente" size="large">
                <el-option v-for="item in inserModel.Customers" :key="item.Id" :label="item.Name + ' ' + item.LastName"
                  :value="item.Id" />
              </el-select>
              <!--end::Input-->
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
                  <el-date-picker v-model="targetData.DataInizioEvento" type="datetime" :teleported="false"
                    name="DataInizioEvento" prop="DataInizioEvento" />
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
                  <el-date-picker v-model="targetData.DataFineEvento" type="datetime" :teleported="false"
                    name="DataFineEvento" prop="DataFineEvento" />
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
            <button data-bs-dismiss="modal" type="reset" id="kt_modal_add_event_cancel" class="btn btn-light me-3">
              Chiudi
            </button>
            <!--end::Button-->
            <!--begin::Button-->
            <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
              <span v-if="!loading" class="indicator-label">
                Submit
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
import { hideModal, removeModalBackdrop } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import events, { todayDate, getToInsert, createEvent, InsertModel, Event } from "@/core/data/events";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "new-event-modal",
  components: {},
  props: {
    SelectedDateStart: { type: String, Required: true },
    SelectedDateEnd: { type: String, Required: true },
    UserId: { type: String, Required: true },
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();

    const targetData = ref<Event>({
      ApplicationUserId: "",
      NomeEvento: "",
      DescrizioneEvento: "",
      LuogoEvento: "",
      CustomerId: null,
      RequestId: null,
      RealEstatePropertyId: null,
      DataInizioEvento: new Date(todayDate.format("YYYY-MM-DD")),
      DataFineEvento: new Date(todayDate.format("YYYY-MM-DD")),
      Type: "Appuntamento"
    });

    watch(() => props.SelectedDateStart, async (first, second) => {
      if (first) {
        targetData.value.DataInizioEvento = new Date(first);
      }
    })

    watch(() => props.SelectedDateEnd, async (first, second) => {
      if (first) {
        targetData.value.DataFineEvento = new Date(first);
      }
    })

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
    });

    onMounted(async () => {
      inserModel.value = await getToInsert();
    })

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          targetData.value.ApplicationUserId = props.UserId
          await createEvent(targetData.value);

          const error = store.errors;

          if (!error) {
            targetData.value.ApplicationUserId= "";
            targetData.value.NomeEvento= "";
            targetData.value.DescrizioneEvento= "";
            targetData.value.LuogoEvento= "";
            targetData.value.CustomerId= null;
            targetData.value.RequestId= null;
            targetData.value.RealEstatePropertyId= null;
            targetData.value.DataInizioEvento= new Date(todayDate.format("YYYY-MM-DD"));
            targetData.value.DataFineEvento= new Date(todayDate.format("YYYY-MM-DD"));
            targetData.value.Type = "Appuntamento";
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
              hideModal(newTargetModalRef.value);
              emit('formAddSubmitted', targetData.value.ApplicationUserId);
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
    

    return {
      formRef,
      newTargetModalRef,
      loading,
      targetData,
      rules,
      submit,
      getAssetPath,
      inserModel,
      removeModalBackdrop
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
