<template>
  <div class="card theme-dark-bg-body">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title">
        <span class="card-label fw-bold fs-3">Invia Segnalazione</span>
      </h3>
    </div>
    <div class="card-body">
      <VForm id="kt_segnalazione_form" class="form" novalidate @submit="sendSegnalazione()"
        :validation-schema="segnalazioneValidator">
        <div class="row mb-6">
          <label class="col-lg-3 col-form-label required fw-semibold fs-6">Messaggio</label>
          <div class="col-lg-9 fv-row">
            <Field 
              as="textarea" 
              name="Body" 
              class="form-control form-control-lg form-control-solid" 
              rows="8"
              placeholder="Inserisci qui la tua segnalazione..."
              v-model="message" 
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="Body" />
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button type="reset" class="btn btn-light btn-active-light-primary me-2">
            Reset
          </button>
          <button type="submit" id="kt_segnalazione_submit" ref="submitButton" class="btn btn-primary">
            <span class="indicator-label">Invia Segnalazione</span>
            <span class="indicator-progress">
              Invio in corso...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { sendSegnalazione as sendSegnalazioneApi } from "@/core/data/segnalazione";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "segnalazione",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const authStore = useAuthStore();
    const submitButton = ref<HTMLElement | null>(null);
    
    const message = ref("");

    const segnalazioneValidator = Yup.object().shape({
      Body: Yup.string().required("Il messaggio è obbligatorio").min(10, "Il messaggio deve contenere almeno 10 caratteri").label("Messaggio"),
    });

    const sendSegnalazione = async () => {
      if (submitButton.value) {
        submitButton.value.setAttribute("data-kt-indicator", "on");

        await sendSegnalazioneApi(message.value)
          .then(() => {
            Swal.fire({
              text: "Segnalazione inviata con successo!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "OK",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            // Reset del form
            message.value = "";
            submitButton.value?.removeAttribute("data-kt-indicator");
          })
          .catch(({ response }) => {
            console.error(response);
            Swal.fire({
              text: "Si è verificato un errore durante l'invio della segnalazione.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "OK",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            submitButton.value?.removeAttribute("data-kt-indicator");
          });
      }
    };

    return {
      authStore,
      message,
      segnalazioneValidator,
      sendSegnalazione,
      submitButton,
    };
  },
});
</script>

