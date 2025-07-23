<template>
  <div class="modal fade" id="kt_modal_add_city" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Aggiungi Città</h2>
          <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="form">
          <div class="modal-body py-lg-10 px-lg-10">
            <div class="fv-row mb-7">
              <label class="required fw-semibold fs-6 mb-2">Nome Città</label>
              <input
                type="text"
                v-model="formData.Name"
                class="form-control form-control-solid mb-3 mb-lg-0"
                placeholder="Inserisci il nome della città"
                required
              />
            </div>
            <div class="fv-row mb-7">
              <label class="required fw-semibold fs-6 mb-2">Provincia</label>
              <select
                v-model="formData.ProvinceId"
                class="form-control form-control-solid mb-3 mb-lg-0"
                required
              >
                <option value="">Seleziona una provincia</option>
                <option v-for="province in provinces" :key="province.Id" :value="province.Id">
                  {{ province.Name }}
                </option>
              </select>
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
              <span v-else>Aggiungi Città</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { createCity, getAllProvinces, type CityCreateModel, type Province } from "@/core/data/locations";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "AddCityModal",
  emits: ["city-added"],
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const provinces = ref<Province[]>([]);
    const formData = ref<CityCreateModel>({
      Name: "",
      ProvinceId: 0,
    });

    const loadProvinces = async () => {
      try {
        provinces.value = await getAllProvinces();
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
      }
    };

    const handleSubmit = async () => {
      if (!formData.value.Name.trim()) {
        Swal.fire({
          text: "Il nome della città è obbligatorio",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      if (!formData.value.ProvinceId) {
        Swal.fire({
          text: "La provincia è obbligatoria",
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
        await createCity(formData.value);
        
        // Reset form
        formData.value.Name = "";
        formData.value.ProvinceId = 0;
        
        // Close modal
        const modal = document.getElementById("kt_modal_add_city");
        if (modal) {
          const modalElement = modal as HTMLElement;
          const modalInstance = (window as any).bootstrap?.Modal?.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }
        }

        // Show success message
        Swal.fire({
          text: "Città aggiunta con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });

        // Emit event
        emit("city-added");
      } catch (error) {
        console.error("Errore nella creazione della città:", error);
        Swal.fire({
          text: "Errore nella creazione della città",
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

    onMounted(() => {
      loadProvinces();
    });

    return {
      loading,
      provinces,
      formData,
      handleSubmit,
    };
  },
});
</script> 