<template>
  <div class="card">
    <!--begin::Search-->
    <div class="row m-2">
      <div class="col-md-3 col-lg-3 mb-2">
        <input type="text" v-model="search" class="form-control form-control-solid" placeholder="Cerca per Indirizzo"
        @keyup.enter="searchItems" />
      </div>
      <div class="col-md-3 col-lg-3 mb-2">
        <select class="form-control form-control-solid" v-model="contract">
          <option value="">Contratto</option>
          <option value="Vendita">Vendita</option>
          <option value="Affitto">Affitto</option>
          <option value="Aste">Aste</option>
        </select>
      </div>
      <div class="col-md-3 col-lg-3 mb-2">
        <select class="form-control form-control-solid" v-model="typology">
          <option value="">Tipologia</option>
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
    <div class="row m-2">
      <div class="col-md-1 col-lg-1 mb-2">
        <input type="text" v-model="fromPrice" class="form-control form-control-solid" placeholder="Prezzo da " />
      </div>
      <div class="col-md-1 col-lg-1 mb-2">
        <input type="text" v-model="toPrice" class="form-control form-control-solid" placeholder="Prezzo a " />
      </div>
      <div class="col-md-4 col-lg-4 mb-2">
       <Multiselect 
         v-model="locations" 
         :options="options" 
         mode="multiple" 
         placeholder="Seleziona località" 
         class="cform-control form-control-solid" 
        :searchable="true"
        />
      <div v-if="locations.length" class="selected-box">
          <strong></strong> 
            <span v-for="(location, index) in locations" :key="index" class="selected-location">
             {{ location }}
            <span @click="removeLocation(index)" class="remove-btn">×</span>
             {{ index < locations.length - 1 ? ', ' : '' }}
           </span>
      </div>
     </div>
     <div class="col-lg-3 col-md-3 col-sm-12"><!-- v-if="user.Role == 'Admin'" -->
        <select class="form-control selectpicker" v-model="agencyId">
          <option value="">Tutte le agenzie</option>
          <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">{{ item.Name }} {{
            item.LastName }}</option>
        </select>
      </div>
            <div class="col-md-3 col-lg-3 mb-2 d-flex justify-content-end">
        <button type="button" @click="searchItems" class="btn btn-light-primary me-3">
          <KTIcon icon-name="search" icon-class="fs-2" /> Cerca
        </button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_property">
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Aggiungi Immobile
        </button>
      </div>
      <div class="d-flex align-items-center mb-3">
         <div class="bg-light-primary rounded p-2 me-3">
              <span class="text-primary fw-semibold">Risultati: {{ tableData.length }}</span>
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
          {{ item.Price }}
        </template>
        <template v-slot:Photos="{ row: item }">
          <img v-if="item.Photos" :src="item.Photos" style="height: 100px; width: 200px; object-fit: cover;" />
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
import { defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddPropertyModal from "@/components/modals/forms/AddPropertyModal.vue";
import { getRealEstateProperties, deleteRealEstateProperty, RequestTabelData, getSearchItems, SearchModel } from "@/core/data/properties";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
import Multiselect from '@vueform/multiselect'
import { getGroupedLocations } from "@/core/data/locations";

export default defineComponent({
  name: "properties",
  components: {
    Datatable,
    ExportCustomerModal,
    AddPropertyModal,
    Multiselect,
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
    const groupedLocations = ref([]);

    const search = ref<string>("");
    const fromPrice = ref<number>(0);
    const toPrice = ref<number>(0);
    const contract = ref<string>("");
    const typology = ref<string>("");
    const category = ref<string>("");
    const locations = ref<Array<string>>([]);

    async function getItems(agencyId: string, filterRequest: string, contract?: string, priceFrom?: number, priceTo?: number, category?: string, typology?: string, town?: string[]) {
      loading.value = true;
      tableData.value = [];

      const results = await getRealEstateProperties(agencyId, filterRequest, contract, priceFrom, priceTo, category, typology, town);
      for (const key in results) {

        const item = {
          Id: results[key].Id,
          CreationDate: results[key].CreationDate,
          CommercialSurfaceate: results[key].CommercialSurfaceate,
          AddressLine: results[key].AddressLine,
          Price: results[key].Price,
          Category: results[key].Category,
          Typology: results[key].Typology,
          StateOfTheProperty: results[key].StateOfTheProperty,
          AssignmentEnd: results[key].AssignmentEnd,
          Status: results[key].Status,
          Town: results[key].Town,
          Photos: results[key].Photos?.length > 0 ? results[key].Photos[0].Url : null,
          Auction: results[key].Auction,
        } as RequestTabelData;


        tableData.value.push(item)
      }
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
        console.log("Località caricate (properties):", groupedLocations.value);
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
      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, locations.value);

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
      groupedLocations
    };
  },
  data() {
    return {
    };
  },
  computed: {
    options() {
      const options = [{ value: "", label: "Qualsiasi" }];
      
      console.log("groupedLocations in computed (properties):", this.groupedLocations);
      
      // Se abbiamo i dati dal database, li utilizziamo
      if (this.groupedLocations && Array.isArray(this.groupedLocations)) {
        this.groupedLocations.forEach((cityGroup) => {
          console.log("Processing cityGroup (properties):", cityGroup);
          
          // Add the city itself
          options.push({ 
            value: cityGroup.city.toUpperCase(), 
            label: `LAZIO \\ ROMA (RM) \\ ${cityGroup.city.toUpperCase()}` 
          });
          
          // Add all zones for this city
          cityGroup.locations.forEach(location => {
            console.log("Processing location (properties):", location);
            options.push({ 
              value: location.id.toUpperCase(), 
              label: `LAZIO \\ ROMA (RM) \\ ${cityGroup.city.toUpperCase()} \\ ${location.name.toUpperCase()}` 
            });
          });
        });
      }
      
      console.log("Final options (properties):", options);
      return options;
    }
  },
  methods: {
    removeLocation(index) {
      this.locations.splice(index, 1);  // Rimuove l'elemento selezionato
    }
  }
});
</script>
<style src="@vueform/multiselect/themes/default.css"></style>


<style scoped>
.custom-multiple-select {
  height: 3.5rem;
  /* Altezza fissa */
  padding: 0.25rem;
  /* Riduci il padding interno */
  line-height: 1.2;
  /* Altezza delle righe */
  overflow-y: auto;
  /* Scroll verticale se necessario */
  resize: none;
  /* Evita il ridimensionamento manuale */
}
.selected-box {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #f9f9f9;
}

.selected-location {
  display: inline-block;
  margin-right: 10px;
}

.remove-btn {
  color: red;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5px;
}

.remove-btn:hover {
  color: darkred;
}
</style>