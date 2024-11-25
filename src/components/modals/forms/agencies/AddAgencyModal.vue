<template>
  <div
    class="modal fade"
    id="kt_modal_add_agency"
    ref="addAgencyModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_agency_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Aggiungi Agenzia</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_agency_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
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
              id="kt_modal_add_agency_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_agency_header"
              data-kt-scroll-wrappers="#kt_modal_add_agency_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Nome</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="formData.Name"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Cognome</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="lastName">
                  <el-input
                    v-model="formData.Lastname"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Email</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="indirizzo email non valido"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="email">
                  <el-input v-model="formData.Email" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

               <!--begin::Input group-->
               <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Telefono</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="numero di telefono non valido "
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="phone">
                  <el-input v-model="formData.PhoneNumber" 
                  type= "number" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span>Cellulare</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="numero di telefono non valido "
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="phone">
                  <el-input v-model="formData.MobilePhoneNumber" 
                  type= "number" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">Referente</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="referent">
                  <el-input v-model="formData.Referent" type="text" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div
                class="fw-bold fs-3 rotate collapsible mb-7"
                data-bs-toggle="collapse"
                href="#kt_modal_add_agency_billing_info"
                role="button"
                aria-expanded="false"
                aria-controls="kt_agent_view_details">
                Maggiori Informazioni
                <span class="ms-2 rotate-180">
                  <KTIcon icon-name="down" icon-class="fs-3" />
                </span>
              </div>
              <!--end::Billing toggle-->

              <!--begin::Billing form-->
              <div
                id="kt_modal_add_agency_billing_info"
                class="collapse show"
              >
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required">Indirizzo</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="addressLine">
                    <el-input v-model="formData.Address" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required">Comune</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="town">
                    <el-input v-model="formData.Town" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label>Provincia</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="state">
                      <el-input v-model="formData.Region" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                </div>
                <!--end::Input group-->

              </div>
              <!--end::Billing form-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_agency_cancel"
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
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {createAgency, Agency } from "@/core/data/agencies";


export default defineComponent({
  name: "add-agency-modal",
  components: {},
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addAgencyModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref<Agency>({
      Code: "",
      Name: "",
      Lastname: "",
      Email: "",
      PhoneNumber: null,
      MobilePhoneNumber: null,
      Referent: "",
      Address: "",
      Town: "",
      Region: "",
      Password: ""
    });

    const rules = ref({
      Name: [
        {
          required: true,
          message: "Nome obligatorio",
          trigger: "change",
        },
      ],
      Lastname: [
        {
          required: true,
          message: "Cognome obligatorio",
          trigger: "change",
        },
      ],
      Email: [
        {
          required: true,
          message: "Email obligatorio",
          trigger: "change",
        },
      ],
      PhoneNumber: [
        {
          required: true,
          message: "Telefono obligatorio",
          trigger: "change",
        },
      ],
      Address: [
        {
          required: true,
          message: "Indirizzo obligatorio",
          trigger: "change",
        },
      ],
      Town: [
        {
          required: true,
          message: "Città obligatoria",
          trigger: "change",
        },
      ]
    });

    const submit = async () => {
      if (!formRef.value) {
        return;
      }
      await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          formData.value.Password = Math.random().toString(36).slice(-8);
          console.log(formData);
          formData.value.Role = "Agency"
          await createAgency(formData.value);
          setTimeout(() => {
            loading.value = false;

            Swal.fire({
              text: "Il modulo è stato inviato con successo!",
              icon: "Successo",
              buttonsStyling: false,
              confirmButtonText: "Ok!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            }).then(() => {
              hideModal(addAgencyModalRef.value);
            });
          }, 2000);
        } else {
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
          return false;
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addAgencyModalRef,
      getAssetPath,
      countries,
    };
  },
});
</script>
