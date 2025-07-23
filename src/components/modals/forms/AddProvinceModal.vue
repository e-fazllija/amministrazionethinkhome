<template>
  <div class="modal fade" id="kt_modal_add_province" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Aggiungi Provincia</h2>
          <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="form">
          <div class="modal-body py-lg-10 px-lg-10">
            <div class="fv-row mb-7">
              <label class="required fw-semibold fs-6 mb-2">Nome Provincia</label>
              <input
                type="text"
                v-model="formData.Name"
                class="form-control form-control-solid mb-3 mb-lg-0"
                placeholder="Inserisci il nome della provincia"
                required
              />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Annulla
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="indicator-progress">
                Attendi... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
              <span v-else>Aggiungi Provincia</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { createProvince, type ProvinceCreateModel } from "@/core/data/locations";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "AddProvinceModal",
  emits: ["province-added"],
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const formData = ref<ProvinceCreateModel>({
      Name: "",
    });

    const handleSubmit = async () => {
      if (!formData.value.Name.trim()) {
        Swal.fire({
          text: "Il nome della provincia è obbligatorio",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      try {
        loading.value = true;
        await createProvince(formData.value);
        
        // Reset form
        formData.value.Name = "";
        
        // Close modal
        const modal = document.getElementById("kt_modal_add_province");
        if (modal) {
          const modalElement = modal as HTMLElement;
          const modalInstance = (window as any).bootstrap?.Modal?.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }
        }

        // Show success message
        Swal.fire({
          text: "Provincia aggiunta con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });

        // Emit event
        emit("province-added");
      } catch (error) {
        console.error("Errore nella creazione della provincia:", error);
        Swal.fire({
          text: "Errore nella creazione della provincia",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      formData,
      handleSubmit,
    };
  },
});
</script> 