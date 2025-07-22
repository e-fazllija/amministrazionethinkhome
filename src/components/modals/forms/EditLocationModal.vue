<template>
  <div class="modal fade show" style="display: block;" id="kt_modal_edit_location" ref="editLocationModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_location_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Modifica Località</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_edit_location_close" @click="closeModal" class="btn btn-icon btn-sm btn-active-icon-primary">
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
            <div class="scroll-y me-n7 pe-7" id="kt_modal_edit_location_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_edit_location_header"
              data-kt-scroll-wrappers="#kt_modal_edit_location_scroll" data-kt-scroll-offset="300px">

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Nome Località</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input v-model="formData.name" type="text" placeholder="Inserisci il nome della località" />
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
                <el-form-item prop="city">
                  <el-input v-model="formData.city" type="text" placeholder="Inserisci la città" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">Ordine</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="orderIndex">
                  <el-input v-model="formData.orderIndex" type="number" placeholder="Inserisci l'ordine di visualizzazione" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">Stato</label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="formData.isActive" id="locationActiveEdit">
                  <label class="form-check-label" for="locationActiveEdit">
                    Attiva
                  </label>
                </div>
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
            <button type="button" @click="closeModal" class="btn btn-light me-3">
              Annulla
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
  <!--begin::Modal backdrop-->
  <div class="modal-backdrop fade show"></div>
  <!--end::Modal backdrop-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { updateLocation, type LocationUpdateModel, type Location } from "@/core/data/locations";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "edit-location-modal",
  props: {
    location: {
      type: Object as () => Location,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const editLocationModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const loading = ref<boolean>(false);

    const formData = ref<LocationUpdateModel>({
      id: 0,
      name: "",
      city: "",
      isActive: true,
      orderIndex: 0,
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Il nome della località è obbligatorio",
          trigger: "change",
        },
      ],
      city: [
        {
          required: true,
          message: "La città è obbligatoria",
          trigger: "change",
        },
      ],
    });

    // Watch for location prop changes
    watch(() => props.location, (newLocation) => {
      if (newLocation) {
        formData.value = {
          id: newLocation.id,
          name: newLocation.name,
          city: newLocation.city,
          isActive: newLocation.isActive,
          orderIndex: newLocation.orderIndex,
        };
      }
    }, { immediate: true });

    const closeModal = () => {
      emit('modal-closed');
    };

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          try {
            await updateLocation(formData.value);
            
            const error = store.errors;
            if (!error) {
              Swal.fire({
                text: "Località aggiornata con successo!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Continua!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semobold btn-light-primary",
                },
              }).then(function () {
                loading.value = false;
                emit('location-updated');
                closeModal();
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
            }
          } catch (error) {
            loading.value = false;
            console.error("Errore nell'aggiornamento della località:", error);
          }
        }
      });
    };

    return {
      formRef,
      editLocationModalRef,
      formData,
      rules,
      loading,
      submit,
      closeModal,
    };
  },
});
</script> 