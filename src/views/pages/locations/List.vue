<template>
  <div class="card">
    <div class="row m-2">
      <div class="col-md-3 col-lg-3 mb-2">
        <input type="text" v-model="search" class="form-control form-control-solid" placeholder="Cerca località..." />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 d-flex gap-2">
        <select class="form-control selectpicker" v-model="selectedCity">
          <option value="">Tutte le città</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="col-md-3 d-flex justify-content-end align-items-start mb-2">
        <button type="button" @click="searchItems" class="btn btn-light-primary me-3">
          <KTIcon icon-name="search" icon-class="fs-2" /> Cerca
        </button>
        <button
          v-if="canManageLocations"
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_location"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Aggiungi Località
        </button>
      </div>
    </div>
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
        <template v-slot:Name="{ row: location }">
          {{ location.Name }}
        </template>
        <template v-slot:City="{ row: location }">
          {{ location.City }}
        </template>
        <template v-slot:IsActive="{ row: location }">
          <div class="badge badge-light-success" v-if="location.IsActive">Attiva</div>
          <div class="badge badge-light-danger" v-else>Inattiva</div>
        </template>
        <template v-slot:OrderIndex="{ row: location }">
          {{ location.OrderIndex }}
        </template>
        <template v-slot:CreationDate="{ row: location }">
          {{ formatDate(location.CreationDate) }}
        </template>
        <template v-slot:Actions="{ row: location }">
          <div class="d-flex gap-2">
            <button
              v-if="canManageLocations"
              @click="editLocation(location)"
              class="btn btn-light-info btn-sm"
            >
              Modifica
            </button>
            <button
              v-if="canManageLocations"
              @click="toggleLocationStatus(location)"
              class="btn btn-light-warning btn-sm"
            >
              {{ location.IsActive ? 'Disattiva' : 'Attiva' }}
            </button>
            <button
              v-if="canManageLocations"
              @click="handleDeleteLocation(location)"
              class="btn btn-light-danger btn-sm"
            >
              Elimina
            </button>
          </div>
        </template>
      </Datatable>
    </div>
  </div>

  <!--begin::Add Location Modal-->
  <AddLocationModal @location-added="onLocationAdded" />
  <!--end::Add Location Modal-->

  <!--begin::Edit Location Modal-->
  <EditLocationModal 
    v-if="editingLocation" 
    :location="editingLocation" 
    @location-updated="onLocationUpdated"
    @modal-closed="editingLocation = null"
  />
  <!--end::Edit Location Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { useAuthStore } from "@/stores/auth";
import { getLocations, getAllLocations, deleteLocation, toggleLocationActive, type Location } from "@/core/data/locations";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AddLocationModal from "@/components/modals/forms/AddLocationModal.vue";
import EditLocationModal from "@/components/modals/forms/EditLocationModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";

export default defineComponent({
  name: "locations",
  components: {
    Datatable,
    AddLocationModal,
    EditLocationModal,
  },
  setup() {
    const authStore = useAuthStore();
    const search = ref<string>("");
    const selectedCity = ref<string>("");
    const tableData = ref<Location[]>([]);
    const cities = ref<string[]>([]);
    const editingLocation = ref<Location | null>(null);
    const loading = ref<boolean>(false);
    const selectedIds = ref<Array<number>>([]);

    const tableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Città",
        columnLabel: "City",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Stato",
        columnLabel: "IsActive",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Ordine",
        columnLabel: "OrderIndex",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Data Creazione",
        columnLabel: "CreationDate",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 200,
      },
    ]);

    const canManageLocations = computed(() => {
      return authStore.user.Role === "Admin" || authStore.user.Role === "Agenzia";
    });

    // Methods
    const loadLocations = async () => {
      try {
        loading.value = true;
        const result = await getAllLocations();
        
        // Assicuriamoci che result sia sempre un array
        if (Array.isArray(result)) {
          tableData.value = result;
          
          // Extract unique cities for filter
          const uniqueCities = [...new Set(result.map(loc => loc.City))];
          cities.value = uniqueCities.sort();
        } else {
          console.warn('getAllLocations ha restituito un valore non valido:', result);
          tableData.value = [];
          cities.value = [];
        }
      } catch (error) {
        console.error("Errore nel caricamento delle località:", error);
        tableData.value = [];
        cities.value = [];
      } finally {
        loading.value = false;
      }
    };

    const searchItems = async () => {
      await loadLocations();

      if (selectedCity.value) {
        tableData.value = tableData.value.filter(x => x.City === selectedCity.value);
      }

      if (search.value !== "") {
        let results: Array<Location> = [];
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

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('it-IT');
    };

    const editLocation = (location: Location) => {
      editingLocation.value = { ...location };
    };

    const handleDeleteLocation = async (location: Location) => {
      if (!canManageLocations.value) {
        Swal.fire({
          text: "Non hai i permessi per eliminare le località",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      const result = await Swal.fire({
        text: `Sei sicuro di voler eliminare la località "${location.Name}"?`,
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Sì, elimina!",
        cancelButtonText: "Annulla",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
      });

      if (result.isConfirmed) {
        try {
          await deleteLocation(location.Id);
          await loadLocations();
          Swal.fire({
            text: "Località eliminata con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } catch (error) {
          console.error("Errore nell'eliminazione:", error);
        }
      }
    };

    const toggleLocationStatus = async (location: Location) => {
      if (!canManageLocations.value) {
        Swal.fire({
          text: "Non hai i permessi per modificare le località",
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
        await toggleLocationActive(location.Id);
        await loadLocations();
        Swal.fire({
          text: `Località ${location.IsActive ? 'disattivata' : 'attivata'} con successo!`,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } catch (error) {
        console.error("Errore nel cambio di stato:", error);
      }
    };

    const onLocationAdded = () => {
      loadLocations();
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

    const onLocationUpdated = () => {
      loadLocations();
      editingLocation.value = null;
    };

    // Lifecycle
    onMounted(() => {
      loadLocations();
    });

    return {
      search,
      selectedCity,
      tableData,
      tableHeader,
      cities,
      editingLocation,
      loading,
      selectedIds,
      canManageLocations,
      searchItems,
      formatDate,
      editLocation,
      handleDeleteLocation,
      toggleLocationStatus,
      sort,
      onItemSelect,
      onLocationAdded,
      onLocationUpdated,
    };
  },
});
</script> 