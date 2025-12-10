<template>
  <div class="card">
    <!--begin::Search-->
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <h3 class="fw-bold m-0 text-gray-800">
          <KTIcon icon-name="search" icon-class="fs-2 text-primary me-2" />
          Filtri di Ricerca Immobili
        </h3>
      </div>
    </div>
    
    <div class="card-body pt-0">
      <!-- Filtri principali -->
      <div class="row g-4 mb-6">
        <div class="col-md-4 col-lg-4">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="location" icon-class="fs-6 me-1" />
            Cerca per Indirizzo
          </label>
          <div class="position-relative">
            <input 
              type="text" 
              v-model="search" 
              class="form-control form-control-solid ps-12" 
              placeholder="Via, città, provincia..." 
              @keyup.enter="searchItems"
            />
            <KTIcon 
              icon-name="search" 
              icon-class="fs-4 position-absolute top-50 start-0 translate-middle-y ms-4 text-gray-500" 
            />
          </div>
        </div>
        
        <div class="col-md-4 col-lg-4">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="briefcase" icon-class="fs-6 me-1" />
            Tipo Contratto
          </label>
          <select class="form-select form-select-solid" v-model="contract">
            <option value="">Tutti i contratti</option>
            <option value="Vendita">Vendita</option>
            <option value="Affitto">Affitto</option>
            <option value="Aste">Aste</option>
          </select>
        </div>
        
        <div class="col-md-4 col-lg-4">
          <label class="form-label fw-semibold text-gray-700">
            <KTIcon icon-name="category" icon-class="fs-6 me-1" />
            Tipologia
          </label>
          <select class="form-select form-select-solid" v-model="typology">
            <option value="">Tutte le tipologie</option>
            <!-- Residenziale -->
            <option value="Appartamento">Appartamento</option>
            <option value="Attico">Attico</option>
            <option value="Mansarda">Mansarda</option>
            <option value="Loft">Loft</option>
            <option value="Soffitta">Soffitta</option>
            <option value="Casale">Casale</option>
            <option value="Rustico">Rustico</option>
            <option value="Villa Unifamiliare">Villa Unifamiliare</option>
            <option value="Villa Bifamiliare">Villa Bifamiliare</option>
            <option value="Villa Plurifamiliare">Villa Plurifamiliare</option>
            <option value="Villa a Schiera">Villa a Schiera</option>
            <!-- Commerciale -->
            <option value="Locale commerciale">Locale commerciale</option>
            <option value="Negozio">Negozio</option>
            <!-- Capannone -->
            <option value="Capannone artigianale">Capannone artigianale</option>
            <option value="Capannone industriale">Capannone industriale</option>
            <!-- Garage -->
            <option value="Box singolo">Box singolo</option>
            <option value="Box doppio">Box doppio</option>
            <option value="Posto auto">Posto auto</option>
            <!-- Magazzino -->
            <option value="Magazzino">Magazzino</option>
            <!-- Rustico / Casale -->
            <option value="Rustico / Casale">Rustico / Casale</option>
            <!-- Terreno -->
            <option value="Edificabile">Edificabile</option>
            <option value="Agricolo">Agricolo</option>
            <option value="Non Edificabile">Non Edificabile</option>
            <!-- Ufficio -->
            <option value="Ufficio">Ufficio</option>
          </select>
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

        <div class="col-md-2 col-lg-2">
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
              data-bs-target="#kt_modal_add_property"
            >
              <KTIcon icon-name="plus" icon-class="fs-2 me-2" />
              Aggiungi Immobile
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end::Search-->
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="Id" :loading="loading">
        <template v-slot:Id="{ row: item }">
          {{ item.Id }}
        </template>
        <template v-slot:CreationDate="{ row: item }">
          {{ item.CreationDate.substring(0, 10).split('-').reverse().join('-') }}<br />
          {{ item.AssignmentEnd.substring(0, 10).split('-').reverse().join('-') }}
        </template>
        <template v-slot:CommercialSurfaceate="{ row: item }">
          {{ item.CommercialSurfaceate }}
        </template>
        <template v-slot:AddressLine="{ row: item }">
          {{ item.AddressLine }} <br />
          {{ item.Town }} <br />
          {{ item.Region }}
        </template>
        <template v-slot:Price="{ row: item }">
          <template v-if="item.Price === -1">
            <span>Trattativa riservata</span>
          </template>
          <template v-else>
            € {{ item.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
          </template>
        </template>
        <template v-slot:Status="{ row: item }">
          <span class="badge badge-light-primary">{{ item.Status || 'N/D' }}</span>
        </template>
        <template v-slot:Photos="{ row: item }">
          <img v-if="item.Photos && item.Photos !== 'null'" :src="item.Photos" style="height: 100px; width: 200px; object-fit: cover;" />
          <div v-else style="height: 100px; width: 200px; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center; color: #999;">
            Nessuna foto
          </div>
        </template>
        <template v-slot:actions="{ row: item }">
          <router-link :to="{ name: 'property', params: { id: item.Id } }" class="btn btn-light-info me-1"
            target="_blank" rel="noopener noreferrer">Dettagli</router-link>
          <!-- <button v-if="user.Id === item.AgentId || user.Role === 'Admin' || user.Role == 'Agenzia'"
            @click="deleteItem(item.Id)" class="btn btn-light-danger me-1">Elimina</button> -->
        </template>
      </Datatable>
    </div>
  </div>

  <ExportCustomerModal></ExportCustomerModal>
  <AddPropertyModal @formAddSubmitted="getItems(agencyId, '')"></AddPropertyModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddPropertyModal from "@/components/modals/forms/AddPropertyModal.vue";
import { getRealEstatePropertiesList, deleteRealEstateProperty, RequestTabelData, getSearchItems, SearchModel } from "@/core/data/properties";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
import { getGroupedLocations, type LocationGroupedModel, getStructuredLocationData } from "@/core/data/locations";

export default defineComponent({
  name: "properties",
  components: {
    Datatable,
    ExportCustomerModal,
    AddPropertyModal,
  },
  setup() {
    const authStore = useAuthStore();
    const tableHeader = ref([
      {
        columnName: "Codice",
        columnLabel: "Id",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Ins. / Inc.",
        columnLabel: "CreationDate",
        sortEnabled: true,
        columnWidth: 120,
      },
      {
        columnName: "Mq",
        columnLabel: "CommercialSurfaceate",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Indirizzo",
        columnLabel: "AddressLine",
        sortEnabled: true,
        columnWidth: 200,
      },
      {
        columnName: "Prezzo",
        columnLabel: "Price",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Stato",
        columnLabel: "Status",
        sortEnabled: true,
        columnWidth: 120,
      },
      {
        columnName: "Immagine",
        columnLabel: "Photos",
        sortEnabled: false,
        columnWidth: 150,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const selectedIds = ref<Array<Number>>([]);
    const loading = ref<boolean>(true);
    const tableData = ref<Array<RequestTabelData>>([]);
    const initItems = ref([]);
    const user = authStore.user;
    let agencyId = ref("");
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    });
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

    const search = ref<string>("");
    const fromPrice = ref<number>(0);
    const toPrice = ref<number>(0);
    const contract = ref<string>("");
    const typology = ref<string>("");
    const category = ref<string>("");
    const selectedProvince = ref<string>("");
    const selectedCity = ref<string>("");
    const selectedLocation = ref<string>("");
    const locations = ref<Array<string>>([]);



    async function getItems(agencyId: string, filterRequest: string, contract?: string, priceFrom?: number, priceTo?: number, category?: string, typology?: string, town?: string[]) {
      loading.value = true;
      tableData.value = [];

      const results = await getRealEstatePropertiesList(agencyId, filterRequest, contract, priceFrom, priceTo, category, typology, town);
      tableData.value = results || [];
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
      loading.value = false;
    };

    onMounted(async () => {
      // if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      // }
      agencyId.value = authStore.user.AgencyId;

      // Carica le località dal database
      try {
        groupedLocations.value = await getGroupedLocations();
      } catch (error) {
        console.error("Errore nel caricamento delle località:", error);
        groupedLocations.value = [];
      }

      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, locations.value);
    });



    const deleteFewItems = async () => {
      loading.value = true;
      selectedIds.value.forEach(async (item) => {
        await deleteRealEstateProperty(item)
      });
      selectedIds.value.length = 0;
      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, locations.value);
      loading.value = false;
    };

    

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
      // Prepara i parametri di località per il filtro
      let locationFilter: string[] = [];
      if (selectedLocation.value) {
        locationFilter = [selectedLocation.value];
      } else if (selectedCity.value) {
        locationFilter = [selectedCity.value];
      } else if (selectedProvince.value) {
        locationFilter = [selectedProvince.value];
      }

      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, locationFilter);

      MenuComponent.reinitialization();
    };


    async function deleteItem(id: Number) {
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
        await deleteRealEstateProperty(id)
        await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, locations.value);
        loading.value = false;
        MenuComponent.reinitialization();
      });
      loading.value = false;
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
      fromPrice.value = 0;
      toPrice.value = 0;
      contract.value = "";
      typology.value = "";
      selectedProvince.value = "";
      selectedCity.value = "";
      selectedLocation.value = "";
      filteredCities.value = [];
      filteredLocations.value = [];
    };

    onMounted(async () => {
      // if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      // }
      agencyId.value = authStore.user.AgencyId;

      // Carica i dati strutturati per i filtri
      await loadStructuredData();

      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, locations.value);
    });

          return {
        tableData,
        tableHeader,
        deleteItem,
        search,
        searchItems,
        contract,
        locations,
        fromPrice,
        category,
        toPrice,
        selectedIds,
        deleteFewItems,
        sort,
        onItemSelect,
        getAssetPath,
        getItems,
        loading,
        user,
        agencyId,
        defaultSearchItems,
        typology,
        groupedLocations,
        removeLocation,
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
    };
  },


});
</script>

<style scoped>
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