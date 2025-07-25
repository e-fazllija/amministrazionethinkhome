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
        <div class="col-md-3 col-lg-3">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="user" icon-class="fs-6 me-1" />
            Cerca Cliente
          </label>
          <div class="position-relative">
            <input 
              type="text" 
              v-model="search" 
              class="form-control form-control-solid ps-12" 
              placeholder="Nome cliente, email, telefono..." 
            />
            <KTIcon 
              icon-name="search" 
              icon-class="fs-4 position-absolute top-50 start-0 translate-middle-y ms-4 text-gray-500" 
            />
          </div>
        </div>
        
        <div class="col-md-3 col-lg-3">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="briefcase" icon-class="fs-6 me-1" />
            Tipo Contratto
          </label>
          <select class="form-select form-select-solid" v-model="contract">
            <option value="">Tutti i contratti</option>
            <option value="Vendita">Vendita</option>
            <option value="Affitto">Affitto</option>
          </select>
        </div>
        
        <div class="col-md-6 col-lg-6">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="category" icon-class="fs-6 me-1" />
            Tipologia Immobile
          </label>
          <Multiselect 
            v-model="propertyType" 
            :options="optionsPropertyType" 
            mode="multiple" 
            placeholder="Seleziona tipologie..."
            class="form-select-solid"
            :searchable="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            trackBy="value"
            label="label"
          />
          <div v-if="propertyType.length" class="selected-tags mt-2">
            <span 
              v-for="(type, index) in propertyType" 
              :key="index" 
              class="badge badge-light-primary me-2 mb-1"
            >
              {{ type }}
              <i @click="removePropertyType(index)" class="fas fa-times ms-1 cursor-pointer"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Filtri di prezzo e località -->
      <div class="row g-4 mb-6">
        <div class="col-md-2 col-lg-2">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="dollar" icon-class="fs-6 me-1" />
            Prezzo da
          </label>
          <div class="position-relative">
            <input 
              type="number" 
              v-model="fromPrice" 
              class="form-control form-control-solid ps-12" 
              placeholder="€ 0" 
              min="0"
            />
            <span class="position-absolute top-50 start-0 translate-middle-y ms-3 text-gray-500">€</span>
          </div>
        </div>
        
        <div class="col-md-2 col-lg-2">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="dollar" icon-class="fs-6 me-1" />
            Prezzo a
          </label>
          <div class="position-relative">
            <input 
              type="number" 
              v-model="toPrice" 
              class="form-control form-control-solid ps-12" 
              placeholder="€ 0" 
              min="0"
            />
            <span class="position-absolute top-50 start-0 translate-middle-y ms-3 text-gray-500">€</span>
          </div>
        </div>

        <!-- Filtri località a cascata -->
        <div class="col-md-2 col-lg-2">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="map" icon-class="fs-6 me-1" />
            Provincia
          </label>
          <select 
            class="form-select form-select-solid" 
            v-model="selectedProvince" 
            @change="onProvinceChange"
          >
            <option value="">Seleziona provincia</option>
            <option v-for="province in structuredLocationData.provinces" :key="province.value" :value="province.value">
              {{ province.label }}
            </option>
          </select>
        </div>
        
        <div class="col-md-2 col-lg-2">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="building" icon-class="fs-6 me-1" />
            Città
          </label>
          <select 
            class="form-select form-select-solid" 
            v-model="selectedCity" 
            @change="onCityChange" 
            :disabled="!selectedProvince"
            :class="{ 'opacity-50': !selectedProvince }"
          >
            <option value="">Seleziona città</option>
            <option v-for="city in filteredCities" :key="city.value" :value="city.value">
              {{ city.label }}
            </option>
          </select>
        </div>
        
        <div class="col-md-2 col-lg-2">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="location" icon-class="fs-6 me-1" />
            Località
          </label>
          <select 
            class="form-select form-select-solid" 
            v-model="selectedLocation" 
            :disabled="!selectedCity"
            :class="{ 'opacity-50': !selectedCity }"
          >
            <option value="">Seleziona località</option>
            <option v-for="location in filteredLocations" :key="location.value" :value="location.value">
              {{ location.label }}
            </option>
          </select>
        </div>

        <div v-if="user.Role == 'Admin'" class="col-md-2 col-lg-2">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="office-bag" icon-class="fs-6 me-1" />
            Agenzia
          </label>
          <select class="form-select form-select-solid" v-model="agencyId">
            <option value="">Tutte le agenzie</option>
            <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">
              {{ item.Name }} {{ item.LastName }}
            </option>
          </select>
        </div>
      </div>

      <!-- Pulsanti azione -->
      <div class="row g-4 mb-6">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <button 
              type="button" 
              @click="searchItems" 
              class="btn btn-primary me-3"
              :disabled="loading"
            >
              <KTIcon icon-name="search" icon-class="fs-2 me-2" />
              {{ loading ? 'Ricerca...' : 'Cerca' }}
            </button>
            
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
            
            <button 
              type="button" 
              class="btn btn-success" 
              data-bs-toggle="modal" 
              data-bs-target="#kt_modal_add_request"
            >
              <KTIcon icon-name="plus" icon-class="fs-2 me-2" />
              Aggiungi Richiesta
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end::Search-->
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="Id" :loading="loading">
        <template v-slot:CustomerName="{ row: request }">
          {{ request.CustomerName }} {{ request.CustomerLastName }}
        </template>
        <template v-slot:Contract="{ row: request }">
          {{ request.Contract }}
        </template>
        <template v-slot:StringDate="{ row: request }">
          {{ request.StringDate }}
        </template>
        <template v-slot:CustomerEmail="{ row: request }">
          {{ request.CustomerEmail }}
        </template>
        <template v-slot:CustomerPhone="{ row: request }">
          {{ request.CustomerPhone }}
        </template>
        <template v-slot:PriceFrom="{ row: request }">
          {{ request.PriceFrom }}
        </template>
        <template v-slot:PriceTo="{ row: request }">
          {{ request.PriceTo }}
        </template>
        <template v-slot:Status="{ row: request }">
          {{ request.Status }}
        </template>
        <template v-slot:Actions="{ row: request }">
          <router-link :to="{ name: 'request', params: { id: request.Id } }" class="btn btn-light-info me-1"
            target="_blank" rel="noopener noreferrer">Dettagli</router-link>
          <!-- <button @click="deleteItem(request.Id)" class="btn btn-light-danger me-1">Elimina</button> -->
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

  <ExportCustomerModal></ExportCustomerModal>
  <AddRequestModal @formAddSubmitted="getItems(agencyId, '')"></AddRequestModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddRequestModal from "@/components/modals/forms/requests/AddRequestModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getRequestsList, Request, deleteRequest, RequestTabelData } from "@/core/data/requests";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { getSearchItems, SearchModel } from "@/core/data/events";
import { getGroupedLocations, type LocationGroupedModel, getStructuredLocationData } from "@/core/data/locations";
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "requests",
  components: {
    Datatable,
    ExportCustomerModal,
    AddRequestModal,
    Multiselect
  },
  setup() {
    const authStore = useAuthStore();
    const tableHeader = ref([
      {
        columnName: "Cliente",
        columnLabel: "CustomerName",
        sortEnabled: true,
        columnWidth: 170,
      },
      {
        columnName: "Contratto",
        columnLabel: "Contract",
        sortEnabled: true,
        columnWidth: 110
      },
      {
        columnName: "Data Richiesta",
        columnLabel: "StringDate",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Email",
        columnLabel: "CustomerEmail",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Telefono",
        columnLabel: "CustomerPhone",
        sortEnabled: true,
        columnWidth: 160,
      },
      {
        columnName: "Prezzo Da",
        columnLabel: "PriceFrom",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Prezzo A",
        columnLabel: "PriceTo",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Stato",
        columnLabel: "Status",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    let loading = ref<boolean>(true);
    const user = authStore.user;
    const tableData = ref<Array<RequestTabelData>>([]);
    const initItems = ref([]);
    let agencyId = ref("");
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })
    const groupedLocations = ref<LocationGroupedModel[]>([]);

    // Nuovi dati strutturati per i filtri a tre livelli
    const structuredLocationData = ref<{
      provinces: Array<{value: string, label: string, id: number}>,
      cities: Array<{value: string, label: string, provinceId: number, provinceName: string}>,
      locations: Array<{value: string, label: string, cityId: number, provinceId: number, cityName: string, provinceName: string}>
    }>({
      provinces: [],
      cities: [],
      locations: []
    });

    // Opzioni filtrate per città e località
    const filteredCities = ref<Array<{value: string, label: string}>>([]);
    const filteredLocations = ref<Array<{value: string, label: string}>>([]);

    // Opzioni delle località
    const options = ref<Array<{value: string, label: string}>>([{value: "", label: "Qualsiasi"}]);

    // Watch per aggiornare le opzioni quando groupedLocations cambia
    watch(groupedLocations, (newValue) => {
      if (newValue && Array.isArray(newValue) && newValue.length > 0) {
        const optionsArray = [{value: "", label: "Qualsiasi"}];
        
        newValue.forEach((cityGroup) => {
          // Add the city itself
          optionsArray.push({
            value: cityGroup.City.toUpperCase(),
            label: `${cityGroup.City.toUpperCase()}`
          });
          
          // Add all zones for this city
          if (cityGroup.Locations && Array.isArray(cityGroup.Locations)) {
            cityGroup.Locations.forEach(location => {
              optionsArray.push({
                value: location.Id.toUpperCase(),
                label: `${cityGroup.City.toUpperCase()} \\ ${location.Name.toUpperCase()}`
              });
            });
          }
        });
        
        options.value = optionsArray;
      }
    }, { immediate: true });

    async function getItems(agencyId, filterRequest: string) {
      loading.value = true;
      tableData.value = [];
      const results = await getRequestsList(agencyId, filterRequest);
      tableData.value = results || [];
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
      loading.value = false;
    };

    onMounted(async () => {
      if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      }
      agencyId.value = authStore.user.AgencyId;

      // Carica le località dal database
      try {
        groupedLocations.value = await getGroupedLocations();
      } catch (error) {
        console.error("Errore nel caricamento delle località:", error);
        groupedLocations.value = [];
      }

      await getItems(agencyId.value, "");
    });



    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteRequest(item)
      });
      selectedIds.value.length = 0;
      await getItems(agencyId.value, "");
    };

    const search = ref<string>("");
    const fromPrice = ref<number | undefined>(undefined);
    const toPrice = ref<number | undefined>(undefined);
    const contract = ref<string>("");
    const typologie = ref<string>("");
    const selectedProvince = ref<string>("");
    const selectedCity = ref<string>("");
    const selectedLocation = ref<string>("");
    const propertyType = ref<Array<string>>([]);
    const locations = ref<Array<string>>([]);




    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        // Verifica se la proprietà è una stringa o un numero
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          (typeof obj[key] === "string" || typeof obj[key] === "number" || Array.isArray(obj[key]))
        ) {
          // Confronta la proprietà dell'oggetto con la stringa di ricerca
          if (obj[key].toString().toLowerCase().indexOf(value) !== -1) {
            return true;
          }
        }
      }
      return false;
    };

    const searchItems = async () => {
      await getItems(agencyId.value, "");

      // Filtraggio per testo (search)
      if (search.value !== "") {
        tableData.value = tableData.value.filter(item => 
          item.CustomerName.toLowerCase().includes(search.value.toLowerCase()) ||
          item.CustomerLastName.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      // Filtraggio per prezzo
      if (fromPrice.value > 0) {
        tableData.value = tableData.value.filter(item => item.PriceFrom >= fromPrice.value);
      }
      if (toPrice.value > 0) {
        tableData.value = tableData.value.filter(item => item.PriceTo <= toPrice.value);
      }
      // Filtraggio per contratto con criteri specifici
      if (contract.value) {
        tableData.value = tableData.value.filter(item => {
          switch (contract.value) {
            case 'Affitto':
              return item.Contract === 'Affitto';
            case 'Vendita':
              return item.Contract === 'Vendita';
            case 'Aste':
              return item.Contract === 'Aste';
            default:
              return true; // Se il filtro non è valido, mostra tutto
          }
        });
      }
      // Filtraggio per tipologia
      if (propertyType.value.length > 0) {
        tableData.value = tableData.value.filter(item => {
          // Verifica che l'elemento corrisponda a una delle località selezionate
          return propertyType.value.some(propertyTypes => searchingFunc(item, propertyTypes.toLowerCase()));
        });
      }
      // Filtraggio per località (nuovo sistema a tre livelli)
      if (selectedLocation.value) {
        tableData.value = tableData.value.filter(item => {
          return searchingFunc(item, selectedLocation.value.toLowerCase());
        });
      } else if (selectedCity.value) {
        tableData.value = tableData.value.filter(item => {
          return searchingFunc(item, selectedCity.value.toLowerCase());
        });
      } else if (selectedProvince.value) {
        tableData.value = tableData.value.filter(item => {
          return searchingFunc(item, selectedProvince.value.toLowerCase());
        });
      }
      MenuComponent.reinitialization();
    };

    async function deleteItem(id: number) {
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
        await deleteRequest(id)
        await getItems(agencyId.value, "");
        MenuComponent.reinitialization();
      });
    }

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const removeLocation = (index: number) => {
      locations.value.splice(index, 1);
    };

    const removePropertyType = (index: number) => {
      console.log("Removing propertyType at index:", index, "Current propertyType:", propertyType.value);
      propertyType.value.splice(index, 1);
      console.log("propertyType after removal:", propertyType.value);
    };

    // Funzioni per gestire i filtri a cascata
    const onProvinceChange = () => {
      selectedCity.value = "";
      selectedLocation.value = "";
      
      if (selectedProvince.value) {
        // Filtra le città per la provincia selezionata
        filteredCities.value = structuredLocationData.value.cities.filter(city => 
          city.provinceName === selectedProvince.value
        );
      } else {
        filteredCities.value = [];
        filteredLocations.value = [];
      }
    };

    const onCityChange = () => {
      selectedLocation.value = "";
      
      if (selectedCity.value) {
        // Filtra le località per la città selezionata
        filteredLocations.value = structuredLocationData.value.locations.filter(location => 
          location.cityName === selectedCity.value
        );
      } else {
        filteredLocations.value = [];
      }
    };

    // Carica i dati strutturati
    const loadStructuredData = async () => {
      try {
        structuredLocationData.value = await getStructuredLocationData();
      } catch (error) {
        console.error("Errore nel caricamento dei dati strutturati:", error);
      }
    };

    // Funzione per pulire tutti i filtri
    const clearAllFilters = () => {
      search.value = "";
      fromPrice.value = undefined;
      toPrice.value = undefined;
      contract.value = "";
      propertyType.value = [];
      selectedProvince.value = "";
      selectedCity.value = "";
      selectedLocation.value = "";
      filteredCities.value = [];
      filteredLocations.value = [];
    };

    onMounted(async () => {
      if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      }
      agencyId.value = authStore.user.AgencyId;

      // Carica i dati strutturati per i filtri
      await loadStructuredData();

      await getItems(agencyId.value, "");
    });

          return {
        tableData,
        tableHeader,
        search,
        searchItems,
        contract,
        locations,
        propertyType,
        typologie,
        fromPrice,
        toPrice,
        selectedIds,
        deleteFewItems,
        sort,
        onItemSelect,
        getAssetPath,
        deleteItem,
        getItems,
        loading,
        user,
        agencyId,
        defaultSearchItems,
        groupedLocations,
        options,
        removeLocation,
        removePropertyType,
        selectedProvince,
        selectedCity,
        selectedLocation,
        structuredLocationData,
        filteredCities,
        filteredLocations,
        onProvinceChange,
        onCityChange,
        clearAllFilters
      };
  },
    data() {
    return {
  optionsPropertyType: [
    { value: "Appartamenti", label: "Appartamenti" },
    { value: "AttivitaCommerciale", label: "Attività Commerciale" },
    { value: "Box", label: "Box" },
    { value: "CapannoniLocArtigianali", label: "Capannoni, Loc. Artigianali" },
    { value: "CasaliRuderi", label: "Casali e Ruderi" },
    { value: "CaseSemindipendenti", label: "Case Semindipendenti" },
    { value: "LocaliCommerciali", label: "Locali Commerciali" },
    { value: "NuoveCostruzioni", label: "Nuove Costruzioni" },
    { value: "Terreni", label: "Terreni" },
    { value: "VilleCaseIndipendenti", label: "Ville e Case Indipendenti" },
    { value: "VillaASchiera", label: "Villa a Schiera" }
  ]
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

/* Stili per i badge delle tipologie selezionate */
.selected-tags .badge {
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.selected-tags .badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.selected-tags .cursor-pointer {
  cursor: pointer;
  transition: color 0.2s ease;
}

.selected-tags .cursor-pointer:hover {
  color: #dc3545 !important;
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
