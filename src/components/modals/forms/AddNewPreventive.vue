<template>
  <div class="modal fade" id="kt_modal_preventivo" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <!-- Header -->
        <div id="pdf-content">
          <!-- Logo -->
          <div style="display: flex; align-items: center; width: 100%; justify-content: flex-start;">
            <img src="/src/pic5.png" alt="Logo" style="width: 100px; margin-left: 30px; margin-right: -120px;">
            <h2 class="fw-bold text-dark" style="flex: 1; text-align: center; margin: 0;">PREVENTIVO</h2>
          </div>

          <!-- Contenuto della modale -->
          <div class="modal-body py-5 px-7 overflow-auto" style="max-height: 70vh;">
            <!-- Sezioni del contenuto -->
            <div class="mb-10">
              <h4 class="fw-bold text-dark mb-5">NOTAIO</h4>
              <textarea class="form-control form-control-solid" rows="3" v-model="notaioNotes"></textarea>
            </div>

            <div class="mb-10">
              <h4 class="fw-bold text-dark mb-5">RISTRUTTURAZIONI</h4>
              <textarea class="form-control form-control-solid" rows="3" v-model="ristrutturazioniNotes"></textarea>
            </div>

            <div class="mb-10">
              <h4 class="fw-bold text-dark mb-5">PRATICHE TECNICHE</h4>
              <textarea class="form-control form-control-solid" rows="3" v-model="praticheTecnicheNotes"></textarea>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary me-auto"
            @click="printWithBrowser">
            <i class="fas fa-print me-2"></i> Stampa
          </button>

          <button 
            type="button" 
            class="btn btn-light me-3" 
            data-bs-dismiss="modal">
            Chiudi
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="saveNotes">
            Salva Preventivo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { defineComponent } from 'vue';


export default {
  data() {
    return {
      notaioNotes: '',
      ristrutturazioniNotes: '',
      praticheTecnicheNotes: ''
    }
  },
  methods: {
    saveNotes() {
      console.log({
        notaio: this.notaioNotes,
        ristrutturazioni: this.ristrutturazioniNotes,
        praticheTecniche: this.praticheTecnicheNotes
      });
    },
    
    printWithBrowser() {
  const pdfContent = document.getElementById("pdf-content");
  if (!pdfContent) return;

  // Clona l'elemento e convertilo esplicitamente a HTMLElement
  const printContent = pdfContent.cloneNode(true) as HTMLElement;
  
  // Applica stili per la stampa
  printContent.style.width = "210mm";
  printContent.style.padding = "20mm";
  printContent.style.margin = "0 auto";
  printContent.style.display = "block";

  // Sostituisci tutte le textarea con div
  const textareas = printContent.querySelectorAll("textarea");
  textareas.forEach(textarea => {
    const div = document.createElement("div");
    div.style.whiteSpace = "pre-wrap";
    div.style.padding = "10px";
    div.style.border = "1px solid #eee";
    div.textContent = textarea.value;
    textarea.parentNode?.replaceChild(div, textarea);
  });

  // Crea la finestra di stampa
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Permetti i popup per visualizzare l'anteprima di stampa");
    return;
  }

  // Prepara il documento di stampa con DOCTYPE corretto
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Preventivo</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial; margin: 0; padding: 20mm; }
          @page { size: A4; margin: 10mm; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);

  // Chiudi il documento e avvia la stampa
  printWindow.document.close();
  
  // Timer per assicurarsi che il contenuto sia completamente caricato
  setTimeout(() => {
    printWindow.print();
    // printWindow.close(); // Opzionale: chiudi dopo la stampa
  }, 500);
}
   
  }
}
</script>

<style scoped>
.mb-10 {
  margin-bottom: 2.5rem;
}

@media print {
  .modal-footer, .modal-header {
    display: none !important;
  }
}
</style>