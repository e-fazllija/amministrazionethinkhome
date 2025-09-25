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
            <KTIcon icon-name="user" icon-class="fs-6 me-1" />
            Cerca Agenzia
          </label>
          <div class="position-relative">
            <input 
              type="text" 
              v-model="search" 
              @input="searchItems()"
              class="form-control form-control-solid ps-12" 
              placeholder="Nome agenzia, email, telefono..." 
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
            <!-- Professional Results Counter -->
            <div class="results-counter me-4">
              <div class="results-badge">
                <KTIcon icon-name="chart-line" icon-class="fs-5 me-2" />
                <span class="results-number">{{ tableData.length }}</span>
                <span class="results-label">risultati</span>
              </div>
            </div>

            <!-- Professional Add Button -->
            <button
              type="button"
              class="btn btn-primary professional-btn"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_add_agency"
            >
              <KTIcon icon-name="plus" icon-class="fs-3 me-2" />
              <span class="btn-text">Nuova Agenzia</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end::Search-->
    
    <!--begin::Professional Selection Toolbar-->
    <div class="selection-toolbar" v-if="selectedIds.length > 0">
      <div class="selection-content">
        <!-- Professional Selection Info -->
        <div class="selection-info">
          <div class="selection-badge">
            <KTIcon icon-name="check-square" icon-class="fs-5 me-2" />
            <span class="selection-count">{{ selectedIds.length }}</span>
            <span class="selection-label">selezionati</span>
          </div>
        </div>

        <!-- Professional Action Buttons -->
        <div class="selection-actions">
          <button
            type="button"
            class="btn btn-light-danger professional-btn me-2"
            @click="deleteFewItems()"
          >
            <KTIcon icon-name="trash" icon-class="fs-4 me-2" />
            <span class="btn-text">Elimina</span>
          </button>

          <button
            type="button"
            class="btn btn-light-secondary professional-btn"
            @click="clearSelection()"
          >
            <KTIcon icon-name="cross" icon-class="fs-4 me-2" />
            <span class="btn-text">Annulla</span>
          </button>
        </div>
      </div>
    </div>
    <!--end::Professional Selection Toolbar-->
    <div class="card-body pt-0">
      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="true"
        checkbox-label="Id"
      >
      <template v-slot:UserName="{ row: agent }">
          {{ agent.UserName }}
        </template>
        <template v-slot:Name="{ row: agent }">
          {{ agent.Name }}
        </template>
        <template v-slot:LastName="{ row: agent }">
          {{ agent.LastName }}
        </template>
        <template v-slot:Email="{ row: agent }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ agent.Email }}
          </a>
        </template>
        <template v-slot:PhoneNumber="{ row: agent }">
          {{ agent.PhoneNumber }}
        </template>
        
          <template v-slot:actions="{ row: agent }">
            <div class="table-action-group">
              <button
                type="button"
                class="btn btn-icon-table btn-outline-info"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_update_agency"
                @click="selectId(agent.Id)"
                title="Visualizza dettagli agenzia"
              >
                <KTIcon icon-name="eye" icon-class="fs-3" />
              </button>
              <button
                type="button"
                class="btn btn-icon-table btn-outline-danger"
                @click="deleteItem(agent.Id)"
                title="Elimina agenzia"
              >
                <KTIcon icon-name="trash" icon-class="fs-3" />
              </button>
            </div>
          </template>
          <!--begin::Menu-->
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            <!--end::Menu item-->
          </div>
      </Datatable>
    </div>
  </div>

  <ExportCustomerModal></ExportCustomerModal>
  <AddAgencyModal @formAddSubmitted="getItems('')"></AddAgencyModal>
  <UpdateAgencyModal :Id="selectedId" @formUpdateSubmitted="getItems('')"></UpdateAgencyModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getAgencies, deleteAgency, Agency } from "@/core/data/agencies";
import AddAgencyModal from "@/components/modals/forms/agencies/AddAgencyModal.vue";
import UpdateAgencyModal from "@/components/modals/forms/agencies/UpdateAgencyModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "agencies",
  components: {
    Datatable,
    ExportCustomerModal,
    AddAgencyModal,
    UpdateAgencyModal,
  },
  setup() {
    const tableHeader = ref([
    {
        columnName: "UserName",
        columnLabel: "UserName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Cognome",
        columnLabel: "LastName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Email",
        columnLabel: "Email",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Telefono",
        columnLabel: "PhoneNumber",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const selectedIds = ref<Array<String>>([]);
    let selectedId = ref<string>();
    const tableData = ref([]);
    const initAgents = ref([]);
    
    async function getItems(filterRequest: string) {
      try {
        const result = await getAgencies(filterRequest);
        tableData.value = result || [];
      } catch (error) {
        console.error('Error fetching agencies:', error);
        tableData.value = [];
      }
    };

    onMounted(async () => {
      await getItems("");
      initAgents.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteAgency(item)
      });
      selectedIds.value.length = 0;
      await getItems("");
    };

    const deleteAgent = (id: number) => {
      for (let i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].Id === id) {
          tableData.value.splice(i, 1);
        }
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initAgents.value);
      if (search.value !== "") {
        let results: Array<Agency> = [];
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
            (typeof obj[key] === "string" || Array.isArray(obj[key])) // Verifica stringhe o array
        ) {
            if (obj[key].indexOf(value) !== -1) {
                return true;
            }
        }
      }
      return false;
    };

    async function deleteItem(id: String){
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
        await deleteAgency(id)
        await getItems("");
        MenuComponent.reinitialization(); 
      });
      
    }
    
    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };

    const selectId = (id: string) => {
      selectedId.value = id;
    };

    const onItemSelect = (selectedItems: Array<String>) => {
      selectedIds.value = selectedItems;
    };

    const clearSelection = () => {
      selectedIds.value = [];
    };

    const clearAllFilters = () => {
      search.value = "";
      searchItems();
    };

    return {
      tableData,
      tableHeader,
      deleteAgent,
      search,
      searchItems,
      selectedId,
      selectedIds,
      deleteFewItems,
      sort,
      onItemSelect,
      clearSelection,
      getAssetPath,
      deleteItem,
      selectId,
      getItems,
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

/* Professional Results Counter */
.results-counter {
  .results-badge {
    display: inline-flex;
    align-items: center;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    color: #495057;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      background: #e9ecef;
      border-color: #dee2e6;
    }

    .results-number {
      font-weight: 600;
      color: var(--bs-primary);
      margin-right: 0.25rem;
    }

    .results-label {
      font-size: 0.875rem;
      color: #6c757d;
    }
  }
}

/* Professional Button Styling */
.professional-btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  .btn-text {
    font-size: 0.875rem;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &.btn-primary {
    background: linear-gradient(135deg, var(--bs-primary) 0%, #3b82f6 100%);
    border-color: var(--bs-primary);

    &:hover {
      background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
      box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);
    }
  }

  &.btn-light-danger {
    background: var(--bs-gray-50);
    border-color: #fecaca;
    color: #dc2626;

    &:hover {
      background: #fef2f2;
      border-color: #f87171;
      color: #dc2626;
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
    }
  }

  &.btn-light-secondary {
    background: #f8f9fa;
    border-color: #e9ecef;
    color: #495057;

    &:hover {
      background: #e9ecef;
      border-color: #dee2e6;
      color: #343a40;
    }
  }
}

/* Professional Selection Toolbar */
.selection-toolbar {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin: 1rem 0;
  padding: 1rem;

  .selection-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .selection-info {
    .selection-badge {
      display: inline-flex;
      align-items: center;
      background: var(--bs-primary);
      color: white;
      border-radius: 6px;
      padding: 0.5rem 1rem;
      font-weight: 500;

      .selection-count {
        font-weight: 600;
        margin-right: 0.25rem;
      }

      .selection-label {
        font-size: 0.875rem;
        opacity: 0.9;
      }
    }
  }

  .selection-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
}

/* Enhanced Search Toolbar */
.search-toolbar-professional {
  background: var(--bs-gray-25);
  border: 1px solid var(--bs-border-color);
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;

  .search-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .search-filters {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .search-results {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

/* Responsive Design for Toolbars */
@media (max-width: 768px) {
  .results-counter {
    .results-badge {
      padding: 0.4rem 0.8rem;

      .results-number {
        font-size: 0.9rem;
      }

      .results-label {
        font-size: 0.8rem;
      }
    }
  }

  .professional-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;

    .btn-text {
      font-size: 0.8rem;
    }

    .fs-3 {
      font-size: 0.9rem !important;
    }
  }

  .selection-toolbar {
    padding: 0.75rem;

    .selection-content {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
    }

    .selection-actions {
      flex-direction: column;
      width: 100%;

      .professional-btn {
        width: 100%;
        justify-content: center;
      }
    }
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .results-counter .results-badge {
    background: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;

    .results-number {
      color: var(--bs-primary);
    }
  }

  .professional-btn {
    &.btn-light-danger {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.2);
      color: #fca5a5;

      &:hover {
        background: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.3);
      }
    }

    &.btn-light-secondary {
      background: #2d3748;
      border-color: #4a5568;
      color: #e2e8f0;

      &:hover {
        background: #1a202c;
        border-color: #2d3748;
      }
    }
  }

  .selection-toolbar {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    border-color: #4a5568;

    .selection-badge {
      background: var(--bs-primary);
    }
  }
}

/* Professional Table Buttons */
.table-action-group {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon-table {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background: #f8f9fa;
  color: #495057;

  .fs-3 {
    font-size: 1rem !important;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  }
}

.btn-outline-info {
  border-color: #b6effb;
  color: #0aa2c0;

  &:hover {
    background: #0dcaf0;
    border-color: #0aa2c0;
    color: white;
  }
}

.btn-outline-danger {
  border-color: #f5c2c7;
  color: #b02a37;

  &:hover {
    background: #dc3545;
    border-color: #b02a37;
    color: white;
  }
}

/* Dark mode for table icon buttons */
@media (prefers-color-scheme: dark) {
  .btn-icon-table {
    background: #2d3748;
    color: #e2e8f0;
    border-color: #4a5568;

    &:hover {
      background: #1a202c;
      border-color: #3182ce;
    }
  }

  .btn-outline-info {
    border-color: #63b3ed;
    color: #90cdf4;

    &:hover {
      background: #0ea5e9;
      border-color: #63b3ed;
      color: white;
    }
  }

  .btn-outline-danger {
    border-color: #feb2b2;
    color: #feb2b2;

    &:hover {
      background: #f56565;
      border-color: #f56565;
      color: white;
    }
  }
}

/* Responsive adjustments for icon buttons */
@media (max-width: 768px) {
  .btn-icon-table {
    width: 32px;
    height: 32px;

    .fs-3 {
      font-size: 0.9rem !important;
    }
  }
}
</style>
