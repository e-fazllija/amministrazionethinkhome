<template>
  <div class="card">
    <!--begin::Search-->
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <h3 class="fw-bold m-0 text-gray-800">
          <KTIcon icon-name="search" icon-class="fs-2 text-primary me-2" />
          Filtri di Ricerca
        </h3>
      </div>
    </div>
    
    <div class="card-body pt-0">
      <!-- Filtri principali -->
      <div class="row g-4 mb-6">
        <div class="col-md-6 col-lg-6">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="document" icon-class="fs-6 me-1" />
            Cerca Documento
          </label>
          <div class="position-relative">
            <input 
              type="text" 
              v-model="search" 
              @input="searchItems()"
              class="form-control form-control-solid ps-12" 
              placeholder="Nome file, tipo documento..." 
            />
            <KTIcon 
              icon-name="search" 
              icon-class="fs-4 position-absolute top-50 start-0 translate-middle-y ms-4 text-gray-500" 
            />
          </div>
        </div>
      </div>

      <!-- Pulsanti azione -->
      <div class="row g-4 mb-6">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <button 
              type="button" 
              @click="clearAllFilters" 
              class="btn btn-light-secondary me-3"
            >
              <KTIcon icon-name="cross" icon-class="fs-2 me-2" />
              Pulisci Filtri
            </button>
          </div>
          
          <div class="d-flex align-items-center">
            <div class="bg-light-primary rounded p-3 me-3">
              <span class="text-primary fw-bold fs-6">
                <KTIcon icon-name="chart-simple" icon-class="fs-4 me-2" />
                Risultati: {{ tableData.length }}
              </span>
            </div>
            
            <div class="d-flex align-items-center">
              <input 
                class="form-control me-3" 
                type="file" 
                multiple 
                @change="handleFileUpload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
              <span class="text-muted fs-7">Carica documenti</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Search-->
    
    <!--begin::Card toolbar-->
    <div class="card-toolbar">
      <!--begin::Group actions-->
      <div
        v-if="selectedIds.length > 0"
        class="d-flex justify-content-end align-items-center"
        data-kt-customer-table-toolbar="selected"
      >
        <div class="fw-bold me-5">
          <span class="me-2">{{ selectedIds.length }}</span>Selezionati
        </div>
        <button
          type="button"
          class="btn btn-danger"
          @click="deleteFewItems()"
        >
          Cancella Selezionati
        </button>
      </div>
      <!--end::Group actions-->
    </div>
    <!--end::Card toolbar-->
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :loading="loading" :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="Id">
        <template v-slot:FileName="{ row: documentations }">
          {{ documentations.FileName.split("/")[1] }}
        </template>
        <template v-slot:Actions="{ row: documentations }">
          <a class="btn btn-light-info me-1" download :href="documentations.FileUrl">Scarica</a>
          <button @click="deleteItem(documentations.Id)" class="btn btn-light-danger me-1">Elimina</button>
        </template>
        <!--begin::Menu-->
        <div
          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
          data-kt-menu="true">
          <!--end::Menu item-->
        </div>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { Documentation, getDocumentations, uploadFile, deleteDocumentation } from "@/core/data/documentations";
import Swal from "sweetalert2";
import { defineComponent, ref, onMounted } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import arraySort from "array-sort";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "DocumentTable",
  components: { Datatable },

  setup() {
    const store = useAuthStore();
    const selectedIds = ref<Array<number>>([]);
    const fileInput = ref<HTMLInputElement | null>(null);
    let loading = ref<boolean>(true);
    const tableData = ref<Array<Documentation>>([]);
    const initItems = ref([]);

    const formData = ref<Documentation>({
      File: null,
      FileName: "",
      FolderName: "Moduli",
    });

    const tableHeader = ref([
      {
        columnName: "File",
        columnLabel: "FileName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);

    const handleFileUpload = async (event: Event) => {
      loading.value = true;
      const input = event.target as HTMLInputElement;
      if (input?.files) {
        formData.value.File = input.files[0];
        event = null;
        await addFile();
        loading.value = false;
      }
    };

    const getItems = async () => {
      try {
        const result = await getDocumentations();
        tableData.value = result || [];
        initItems.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error('Error fetching documentations:', error);
        tableData.value = [];
        initItems.value = [];
      }
    };

    onMounted(async () => {
      loading.value = true;
      await getItems();
      loading.value = false;

    });

    const addFile = async () => {
      await uploadFile(formData.value);
      Swal.fire({
        text: "File caricati con successo!",
        icon: "success",
        confirmButtonText: "Continua!",
      });
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
        }).then(async function () {
          await getItems();
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
    };

    const deleteFewItems = async () => {
      loading.value = true;
      selectedIds.value.forEach(async (item) => {
        await deleteDocumentation(item)
      });
      selectedIds.value.length = 0;
      await getItems();
      loading.value = false;
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initItems.value);
      if (search.value !== "") {
        let results: Array<Documentation> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          (typeof obj[key] === "string" || typeof obj[key] === "number" || Array.isArray(obj[key]))
        ) {
          if (obj[key].toString().toLowerCase().indexOf(value) !== -1) {
            return true;
          }
        }
      }
      return false;
    };
    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const clearAllFilters = () => {
      search.value = "";
      searchItems();
    };

    async function deleteItem(id: number) {
      loading.value = true;
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
        await deleteDocumentation(id)
        await getItems();
        loading.value = false;
        MenuComponent.reinitialization();
      });
    }


    return {
      handleFileUpload,
      fileInput,
      addFile,
      loading,
      tableData,
      search,
      searchItems,
      selectedIds,
      deleteFewItems,
      sort,
      onItemSelect,
      tableHeader,
      deleteItem,
      clearAllFilters
    };
  },
});
</script>

<style>
/* Stili per i filtri a cascata */
.form-control:disabled,
.form-select:disabled {
  background-color: #f8f9fa;
  opacity: 0.6;
  cursor: not-allowed;
}

/* Stili per i campi di input con icone */
.position-relative .form-control {
  padding-left: 3rem;
}

/* Stili per i pulsanti */
.btn {
  transition: all 0.2s ease;
  border-radius: 0.5rem;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Stili per il contatore risultati */
.bg-light-primary {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 1px solid #90caf9;
}

/* Animazioni per i filtri */
.form-label {
  transition: color 0.2s ease;
}

.form-label:hover {
  color: #1976d2;
}

/* Stili per i dropdown */
.form-select {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-select:focus {
  border-color: #1976d2;
  box-shadow: 0 0 0 0.2rem rgba(25, 118, 210, 0.25);
}

/* Responsive design */
@media (max-width: 768px) {
  .row.g-4 {
    margin: 0;
  }
  
  .col-md-2, .col-md-3, .col-md-4, .col-md-6 {
    margin-bottom: 1rem;
  }
  
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }
  
  .d-flex.justify-content-between > div {
    width: 100%;
    justify-content: center;
  }
}
</style>
