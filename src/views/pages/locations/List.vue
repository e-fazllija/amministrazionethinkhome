<template>
  <div class="card shadow-sm">
    <!-- Header con titolo e descrizione -->
    <div class="card-header border-0 pt-7">
      <div class="card-title">
        <h2 class="fw-bold text-dark mb-1">
          <KTIcon icon-name="location" icon-class="fs-2 text-primary me-2" />
          Gestione Località
        </h2>
        <div class="fs-6 text-muted">Gestisci province, città e località del sistema</div>
      </div>
    </div>

    <!-- Tab Navigation - Spostato in alto per migliore UX -->
    <div class="card-header border-0 pt-0">
      <ul class="nav nav-tabs nav-line-tabs nav-stretch border-transparent fs-5 fw-bold" role="tablist">
        <li class="nav-item" role="presentation">
          <button 
            type="button"
            class="nav-link border-0 bg-transparent" 
            :class="{ active: activeTab === 'provinces' }"
            @click="switchTab('provinces')"
          >
            <KTIcon icon-name="map" icon-class="fs-2 me-2" />
            Province
            <span class="badge badge-light-primary ms-2">{{ provinces.length }}</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            type="button"
            class="nav-link border-0 bg-transparent" 
            :class="{ active: activeTab === 'cities' }"
            @click="switchTab('cities')"
          >
            <KTIcon icon-name="building" icon-class="fs-2 me-2" />
            Città
            <span class="badge badge-light-success ms-2">{{ cities.length }}</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            type="button"
            class="nav-link border-0 bg-transparent" 
            :class="{ active: activeTab === 'locations' }"
            @click="switchTab('locations')"
          >
            <KTIcon icon-name="location" icon-class="fs-2 me-2" />
            Località
            <span class="badge badge-light-info ms-2">{{ locations.length }}</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Filtri migliorati -->
    <div class="card-header border-0 pt-5">
      <div class="card-title">
        <h3 class="fw-bold text-dark mb-0">Filtri di Ricerca</h3>
      </div>
      <div class="card-toolbar">
        <button 
          type="button" 
          @click="clearFilters" 
          class="btn btn-light-secondary me-2"
          :disabled="!hasActiveFilters"
        >
          <KTIcon icon-name="cross" icon-class="fs-2" />
          Pulisci Filtri
        </button>
        <button type="button" @click="searchItems" class="btn btn-primary">
          <KTIcon icon-name="search" icon-class="fs-2" />
          Cerca
        </button>
      </div>
    </div>

    <div class="card-body pt-0">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <label class="form-label fw-bold text-dark">Ricerca Testuale</label>
          <div class="position-relative">
            <KTIcon icon-name="search" icon-class="fs-2 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input 
              type="text" 
              v-model="search" 
              class="form-control form-control-solid ps-10" 
              placeholder="Cerca per nome..." 
            />
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <label class="form-label fw-bold text-dark">Provincia</label>
          <select class="form-select form-select-solid" v-model="selectedProvince">
            <option value="">Tutte le province</option>
            <option v-for="province in provinces" :key="province.Id" :value="province.Id">
              {{ province.Name }}
            </option>
          </select>
        </div>
        <div class="col-lg-4 col-md-6">
          <label class="form-label fw-bold text-dark">Città</label>
          <select class="form-select form-select-solid" v-model="selectedCity" :disabled="!selectedProvince">
            <option value="">Tutte le città</option>
            <option v-for="city in filteredCities" :key="city.Id" :value="city.Id">
              {{ city.Name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Pulsanti di aggiunta con design migliorato -->
    <div class="card-header border-0 pt-5" v-if="canManageLocations">
      <div class="card-title">
        <h3 class="fw-bold text-dark mb-0">Azioni Rapide</h3>
      </div>
      <div class="card-toolbar">
        <div class="d-flex gap-2">
          <button
            type="button"
            class="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_province"
          >
            <KTIcon icon-name="plus" icon-class="fs-2 me-2" />
            Aggiungi Provincia
          </button>
          <button
            type="button"
            class="btn btn-success d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_city"
          >
            <KTIcon icon-name="plus" icon-class="fs-2 me-2" />
            Aggiungi Città
          </button>
          <button
            type="button"
            class="btn btn-info d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_location"
          >
            <KTIcon icon-name="plus" icon-class="fs-2 me-2" />
            Aggiungi Località
          </button>
        </div>
      </div>
    </div>

    <!-- Contenuto delle tabelle con design migliorato -->
    <div class="card-body pt-0">
      <!-- Loading state -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center py-10">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Caricamento...</span>
        </div>
        <span class="ms-3 text-muted">Caricamento dati...</span>
      </div>

      <!-- Tabella Province -->
      <div v-else-if="activeTab === 'provinces'" class="table-responsive">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold text-dark mb-0">
            <KTIcon icon-name="map" icon-class="fs-2 text-primary me-2" />
            Elenco Province
          </h4>
          <span class="badge badge-light-primary fs-6">{{ provincesTableData.length }} province trovate</span>
        </div>
        <Datatable 
          @on-sort="sort" 
          @on-items-select="onItemSelect" 
          :data="provincesTableData" 
          :header="provincesTableHeader"
          :enable-items-per-page-dropdown="true" 
          :checkbox-enabled="false" 
          checkbox-label="Id"
          class="table-hover"
        >
          <template v-slot:Name="{ row: province }">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <div class="symbol-label bg-light-primary">
                  <KTIcon icon-name="map" icon-class="fs-2 text-primary" />
                </div>
              </div>
              <div>
                <span class="fw-bold text-dark">{{ province.Name }}</span>
              </div>
            </div>
          </template>
          <template v-slot:Actions="{ row: province }">
            <div class="d-flex gap-2">
              <button
                v-if="canManageLocations"
                @click="editProvince(province)"
                class="btn btn-light-info btn-sm d-flex align-items-center"
                title="Modifica provincia"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
                <span class="ms-1">Modifica</span>
              </button>
              <button
                v-if="canManageLocations"
                @click="handleDeleteProvince(province)"
                class="btn btn-light-danger btn-sm d-flex align-items-center"
                title="Elimina provincia"
              >
                <KTIcon icon-name="trash" icon-class="fs-2" />
                <span class="ms-1">Elimina</span>
              </button>
            </div>
          </template>
        </Datatable>
      </div>

      <!-- Tabella Città -->
      <div v-else-if="activeTab === 'cities'" class="table-responsive">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold text-dark mb-0">
            <KTIcon icon-name="building" icon-class="fs-2 text-success me-2" />
            Elenco Città
          </h4>
          <span class="badge badge-light-success fs-6">{{ citiesTableData.length }} città trovate</span>
        </div>
        <Datatable 
          @on-sort="sort" 
          @on-items-select="onItemSelect" 
          :data="citiesTableData" 
          :header="citiesTableHeader"
          :enable-items-per-page-dropdown="true" 
          :checkbox-enabled="false" 
          checkbox-label="Id"
          class="table-hover"
        >
          <template v-slot:Name="{ row: city }">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <div class="symbol-label bg-light-success">
                  <KTIcon icon-name="building" icon-class="fs-2 text-success" />
                </div>
              </div>
              <div>
                <span class="fw-bold text-dark">{{ city.Name }}</span>
              </div>
            </div>
          </template>
          <template v-slot:ProvinceName="{ row: city }">
            <span class="badge badge-light-primary">{{ city.ProvinceName }}</span>
          </template>
          <template v-slot:Actions="{ row: city }">
            <div class="d-flex gap-2">
              <button
                v-if="canManageLocations"
                @click="editCity(city)"
                class="btn btn-light-info btn-sm d-flex align-items-center"
                title="Modifica città"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
                <span class="ms-1">Modifica</span>
              </button>
              <button
                v-if="canManageLocations"
                @click="handleDeleteCity(city)"
                class="btn btn-light-danger btn-sm d-flex align-items-center"
                title="Elimina città"
              >
                <KTIcon icon-name="trash" icon-class="fs-2" />
                <span class="ms-1">Elimina</span>
              </button>
            </div>
          </template>
        </Datatable>
      </div>

      <!-- Tabella Località -->
      <div v-else-if="activeTab === 'locations'" class="table-responsive">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold text-dark mb-0">
            <KTIcon icon-name="location" icon-class="fs-2 text-info me-2" />
            Elenco Località
          </h4>
          <span class="badge badge-light-info fs-6">{{ locationsTableData.length }} località trovate</span>
        </div>
        <Datatable 
          @on-sort="sort" 
          @on-items-select="onItemSelect" 
          :data="locationsTableData" 
          :header="locationsTableHeader"
          :enable-items-per-page-dropdown="true" 
          :checkbox-enabled="false" 
          checkbox-label="Id"
          class="table-hover"
        >
          <template v-slot:Name="{ row: location }">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <div class="symbol-label bg-light-info">
                  <KTIcon icon-name="location" icon-class="fs-2 text-info" />
                </div>
              </div>
              <div>
                <span class="fw-bold text-dark">{{ location.Name }}</span>
              </div>
            </div>
          </template>
          <template v-slot:CityName="{ row: location }">
            <span class="badge badge-light-success">{{ location.CityName }}</span>
          </template>
          <template v-slot:ProvinceName="{ row: location }">
            <span class="badge badge-light-primary">{{ location.ProvinceName }}</span>
          </template>
          <template v-slot:CreationDate="{ row: location }">
            <span class="text-muted">{{ formatDate(location.CreationDate) }}</span>
          </template>
          <template v-slot:Actions="{ row: location }">
            <div class="d-flex gap-2">
              <button
                v-if="canManageLocations"
                @click="editLocation(location)"
                class="btn btn-light-info btn-sm d-flex align-items-center"
                title="Modifica località"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
                <span class="ms-1">Modifica</span>
              </button>
              <button
                v-if="canManageLocations"
                @click="handleDeleteLocation(location)"
                class="btn btn-light-danger btn-sm d-flex align-items-center"
                title="Elimina località"
              >
                <KTIcon icon-name="trash" icon-class="fs-2" />
                <span class="ms-1">Elimina</span>
              </button>
            </div>
          </template>
        </Datatable>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && getCurrentTableData.length === 0" class="text-center py-10">
        <div class="symbol symbol-100px mb-5">
          <div class="symbol-label bg-light">
            <KTIcon icon-name="search" icon-class="fs-2 text-muted" />
          </div>
        </div>
        <h4 class="fw-bold text-dark mb-2">Nessun risultato trovato</h4>
        <p class="text-muted">Prova a modificare i filtri di ricerca o aggiungi nuovi elementi.</p>
      </div>
    </div>
  </div>

  <!--begin::Add Province Modal-->
  <AddProvinceModal @province-added="onProvinceAdded" />
  <!--end::Add Province Modal-->

  <!--begin::Add City Modal-->
  <AddCityModal @city-added="onCityAdded" />
  <!--end::Add City Modal-->

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

  <!--begin::Edit Province Modal-->
  <EditProvinceModal 
    v-if="editingProvince" 
    :province="editingProvince" 
    @province-updated="onProvinceUpdated"
    @modal-closed="editingProvince = null"
  />
  <!--end::Edit Province Modal-->

  <!--begin::Edit City Modal-->
  <EditCityModal 
    v-if="editingCity" 
    :city="editingCity" 
    @city-updated="onCityUpdated"
    @modal-closed="editingCity = null"
  />
  <!--end::Edit City Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { useAuthStore } from "@/stores/auth";
import { 
  getAllProvinces, 
  getAllCities, 
  getAllLocations, 
  deleteProvince, 
  deleteCity, 
  deleteLocation,
  type Province,
  type City,
  type Location
} from "@/core/data/locations";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AddProvinceModal from "@/components/modals/forms/AddProvinceModal.vue";
import AddCityModal from "@/components/modals/forms/AddCityModal.vue";
import AddLocationModal from "@/components/modals/forms/AddLocationModal.vue";
import EditLocationModal from "@/components/modals/forms/EditLocationModal.vue";
import EditProvinceModal from "@/components/modals/forms/EditProvinceModal.vue";
import EditCityModal from "@/components/modals/forms/EditCityModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";

export default defineComponent({
  name: "locations",
  components: {
    Datatable,
    AddProvinceModal,
    AddCityModal,
    AddLocationModal,
    EditLocationModal,
    EditProvinceModal,
    EditCityModal,
  },
  setup() {
    const authStore = useAuthStore();
    const search = ref<string>("");
    const selectedProvince = ref<number>(0);
    const selectedCity = ref<number>(0);
    const activeTab = ref<string>("provinces");
    
    // Data
    const provinces = ref<Province[]>([]);
    const cities = ref<City[]>([]);
    const locations = ref<Location[]>([]);
    const editingLocation = ref<Location | null>(null);
    const editingProvince = ref<Province | null>(null);
    const editingCity = ref<City | null>(null);
    const loading = ref<boolean>(false);
    const selectedIds = ref<Array<number>>([]);

    // Table headers
    const provincesTableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 200,
      },
    ]);

    const citiesTableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Provincia",
        columnLabel: "ProvinceName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 200,
      },
    ]);

    const locationsTableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Città",
        columnLabel: "CityName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Provincia",
        columnLabel: "ProvinceName",
        sortEnabled: true,
        columnWidth: 175,
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

    // Computed properties for filtered data
    const filteredCities = computed(() => {
      if (selectedProvince.value) {
        return cities.value.filter(city => city.ProvinceId === selectedProvince.value);
      }
      return cities.value;
    });

    const provincesTableData = computed(() => {
      let data = provinces.value;
      if (search.value) {
        data = data.filter(province => 
          province.Name.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      return data;
    });

    const citiesTableData = computed(() => {
      let data = cities.value;
      if (selectedProvince.value) {
        data = data.filter(city => city.ProvinceId === selectedProvince.value);
      }
      if (search.value) {
        data = data.filter(city => 
          city.Name.toLowerCase().includes(search.value.toLowerCase()) ||
          city.ProvinceName.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      return data;
    });

    const locationsTableData = computed(() => {
      let data = locations.value;
      if (selectedProvince.value) {
        data = data.filter(location => location.ProvinceId === selectedProvince.value);
      }
      if (selectedCity.value) {
        data = data.filter(location => location.CityId === selectedCity.value);
      }
      if (search.value) {
        data = data.filter(location => 
          location.Name.toLowerCase().includes(search.value.toLowerCase()) ||
          location.CityName.toLowerCase().includes(search.value.toLowerCase()) ||
          location.ProvinceName.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      return data;
    });

    // Computed per verificare se ci sono filtri attivi
    const hasActiveFilters = computed(() => {
      return search.value || selectedProvince.value || selectedCity.value;
    });

    // Computed per ottenere i dati della tabella corrente
    const getCurrentTableData = computed(() => {
      switch (activeTab.value) {
        case 'provinces':
          return provincesTableData.value;
        case 'cities':
          return citiesTableData.value;
        case 'locations':
          return locationsTableData.value;
        default:
          return [];
      }
    });

    // Methods
    const loadData = async () => {
      try {
        loading.value = true;
        const [provincesData, citiesData, locationsData] = await Promise.all([
          getAllProvinces(),
          getAllCities(),
          getAllLocations()
        ]);
        
        provinces.value = provincesData;
        cities.value = citiesData;
        locations.value = locationsData;
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
        Swal.fire({
          text: "Errore nel caricamento dei dati",
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

    const searchItems = async () => {
      await loadData();
      MenuComponent.reinitialization();
    };

    const clearFilters = () => {
      search.value = "";
      selectedProvince.value = 0;
      selectedCity.value = 0;
    };

    const switchTab = (tab: string) => {
      activeTab.value = tab;
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('it-IT');
    };

    // Province methods
    const editProvince = (province: Province) => {
      editingProvince.value = { ...province };
    };

    const handleDeleteProvince = async (province: Province) => {
      if (!canManageLocations.value) {
        Swal.fire({
          text: "Non hai i permessi per eliminare le province",
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
        text: `Sei sicuro di voler eliminare la provincia "${province.Name}"?`,
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
          await deleteProvince(province.Id);
          await loadData();
          Swal.fire({
            text: "Provincia eliminata con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } catch (error) {
          console.error("Errore nell'eliminazione:", error);
          Swal.fire({
            text: "Errore nell'eliminazione della provincia",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      }
    };

    // City methods
    const editCity = (city: City) => {
      editingCity.value = { ...city };
    };

    const handleDeleteCity = async (city: City) => {
      if (!canManageLocations.value) {
        Swal.fire({
          text: "Non hai i permessi per eliminare le città",
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
        text: `Sei sicuro di voler eliminare la città "${city.Name}"?`,
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
          await deleteCity(city.Id);
          await loadData();
          Swal.fire({
            text: "Città eliminata con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } catch (error) {
          console.error("Errore nell'eliminazione:", error);
          Swal.fire({
            text: "Errore nell'eliminazione della città",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      }
    };

    // Location methods
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
          await loadData();
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
          Swal.fire({
            text: "Errore nell'eliminazione della località",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      }
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        switch (activeTab.value) {
          case 'provinces':
            arraySort(provinces.value, sort.label, { reverse });
            break;
          case 'cities':
            arraySort(cities.value, sort.label, { reverse });
            break;
          case 'locations':
            arraySort(locations.value, sort.label, { reverse });
            break;
        }
      }
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    // Event handlers
    const onProvinceAdded = () => {
      loadData();
    };

    const onCityAdded = () => {
      loadData();
    };

    const onLocationAdded = () => {
      loadData();
    };

    const onLocationUpdated = () => {
      loadData();
      editingLocation.value = null;
    };

    const onProvinceUpdated = () => {
      loadData();
      editingProvince.value = null;
    };

    const onCityUpdated = () => {
      loadData();
      editingCity.value = null;
    };

    // Lifecycle
    onMounted(() => {
      loadData();
    });

    return {
      search,
      selectedProvince,
      selectedCity,
      activeTab,
      provinces,
      cities,
      locations,
      editingLocation,
      editingProvince,
      editingCity,
      loading,
      selectedIds,
      canManageLocations,
      provincesTableHeader,
      citiesTableHeader,
      locationsTableHeader,
      provincesTableData,
      citiesTableData,
      locationsTableData,
      filteredCities,
      hasActiveFilters,
      getCurrentTableData,
      searchItems,
      clearFilters,
      switchTab,
      formatDate,
      editProvince,
      handleDeleteProvince,
      editCity,
      handleDeleteCity,
      editLocation,
      handleDeleteLocation,
      sort,
      onItemSelect,
      onProvinceAdded,
      onCityAdded,
      onLocationAdded,
      onLocationUpdated,
      onProvinceUpdated,
      onCityUpdated,
    };
  },
  });
</script>

<style scoped>
.nav-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
  color: #6c757d;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.75rem 1rem;
  font-weight: 600;
}

.nav-tabs .nav-link:hover {
  border-bottom-color: #e9ecef;
  color: #495057;
  background: none;
}

.nav-tabs .nav-link.active {
  border-bottom-color: #009ef7;
  color: #009ef7;
  background: none;
}

.nav-tabs .nav-link:focus {
  outline: none;
  box-shadow: none;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

.symbol {
  border-radius: 0.475rem;
}

.symbol-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.form-control-solid {
  background-color: #f5f8fa;
  border-color: #f5f8fa;
}

.form-control-solid:focus {
  background-color: #ffffff;
  border-color: #009ef7;
}

.form-select-solid {
  background-color: #f5f8fa;
  border-color: #f5f8fa;
}

.form-select-solid:focus {
  background-color: #ffffff;
  border-color: #009ef7;
}

.btn-light-info {
  background-color: #e1f0ff;
  border-color: #e1f0ff;
  color: #009ef7;
}

.btn-light-info:hover {
  background-color: #009ef7;
  border-color: #009ef7;
  color: #ffffff;
}

.btn-light-danger {
  background-color: #ffe1e1;
  border-color: #ffe1e1;
  color: #f1416c;
}

.btn-light-danger:hover {
  background-color: #f1416c;
  border-color: #f1416c;
  color: #ffffff;
}

.badge-light-primary {
  background-color: #e1f0ff;
  color: #009ef7;
}

.badge-light-success {
  background-color: #e8fff3;
  color: #50cd89;
}

.badge-light-info {
  background-color: #e1f0ff;
  color: #009ef7;
}
</style> 