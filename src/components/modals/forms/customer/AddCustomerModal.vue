<template>
  <div
    class="modal fade"
    id="kt_modal_add_customer"
    ref="addCustomerModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Aggiungi Cliente</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
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
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Nome</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Name">
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
                <el-form-item prop="LastName">
                  <el-input
                    v-model="formData.LastName"
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
                  <span>Email</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Email">
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
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Phone">
                  <el-input v-model="formData.Phone" 
                  type= "number" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Aquirente</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.Buyer" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Venditore</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.Seller" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Costruttore</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.Builder" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Altro</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.Other" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                
                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Cliente gold</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.GoldCustomer" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Acquisizione svolta</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.AcquisitionDone" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                
                
                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Incarico in corso</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.OngoingAssignment" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">Note</label>
                <!--end::Label-->
                
                <!--begin::Input-->
                <textarea class="form-control" v-model="formData.Description"></textarea>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div
                class="fw-bold fs-3 rotate collapsible mb-7"
                data-bs-toggle="collapse"
                href="#kt_modal_add_customer_billing_info"
                role="button"
                aria-expanded="false"
                aria-controls="kt_customer_view_details">
                Maggiori Informazioni
                <span class="ms-2 rotate-180">
                  <KTIcon icon-name="down" icon-class="fs-3" />
                </span>
              </div>
              <!--end::Billing toggle-->

              <!--begin::Billing form-->
              <div
                id="kt_modal_add_customer_billing_info"
                class="collapse show"
              >
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label >Indirizzo</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="AdressLine">
                    <el-input v-model="formData.AdressLine" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label >Comune</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="Town">
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
                    <label >Provincia</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="State">
                      <el-input v-model="formData.State" />
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
              id="kt_modal_add_customer_cancel"
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
import {createCustomer, Customer } from "@/core/data/customers";
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addCustomerModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    const formData = ref<Customer>({
      Buyer: false,
      Seller: false,
      Builder: false,
      Other: false,
      GoldCustomer: false,
      Name: "",
      LastName:"",
      Email: "",
      Phone:null,
      Description: "",
      AdressLine: "",
      Town: "",
      State: "",
      Code: "0",
      AcquisitionDone: false,
      OngoingAssignment: false
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

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;

        await createCustomer(formData.value);

        const error = store.errors;

        console.log(error)
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
              hideModal(addCustomerModalRef.value);
              emit('formAddSubmitted', formData.value);
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
      addCustomerModalRef,
      getAssetPath,
      countries,
    };
  },
});
</script>
