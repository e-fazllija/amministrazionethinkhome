<template>
  <div class="card">
    <!--begin::Search-->
    <div class="row m-2">
      <div class="col-md-2 col-lg-2 mb-2">
        <input type="text" v-model="search" class="form-control form-control-solid" placeholder="Cerca Immobile" />
      </div>
      <div class="col-md-2 col-lg-2 mb-2">
        <select class="form-control form-control-solid" v-model="contract">
          <option value="">Contratto</option>
          <option value="Vendita">Vendita</option>
          <option value="Affitto">Affitto</option>
          <option value="Aste">Aste</option>
        </select>
      </div>
      <div class="col-md-2 col-lg-2 mb-2">
        <select class="form-control form-control-solid" v-model="category">
          <option value="">Categoria</option>
          <option value="Residenziale">Residenziale</option>
          <option value="Capannone">Capannone</option>
          <option value="Negozi-Locale Commerciale">Negozi/Locale Commerciale</option>
          <option value="Magazzino">Magazzino</option>
          <option value="Garage">Garage</option>
          <option value="Ufficio">Ufficio</option>
          <option value="Terreno">Terreno</option>
          <option value="Rustico / Casale">Rustico / Casale</option>
        </select>
      </div>
      <div class="col-md-3 col-lg-3 mb-2">
        <select class="form-control form-control-solid" v-model="typologie">
          <option value="">Tipologia</option>
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
          <option value="Box singolo">Box singolo</option>
          <option value="Box doppio">Box doppio</option>
          <option value="Posto auto">Posto auto</option>
          <option value="Edificabile">Edificabile</option>
          <option value="Agricolo">Agricolo</option>
          <option value="Non Edificabile">Non Edificabile</option>
        </select>
      </div>
    </div>
    <div class="row m-2">

      
      <div class="col-md-3 col-lg-3 mb-2">
        <input type="text" v-model="fromPrice" class="form-control form-control-solid" placeholder="Prezzo da " />
      </div>
      <div class="col-md-3 col-lg-3 mb-2">
        <input type="text" v-model="toPrice" class="form-control form-control-solid" placeholder="Prezzo a " />
      </div>
      <div class="col-md-3 col-lg-3 mb-2">
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
          <!-- <button v-if="user.Id === item.AgentId || user.Role === 'Admin' || user.Role == 'Agency'"
            @click="deleteItem(item.Id)" class="btn btn-light-danger me-1">Elimina</button> -->
        </template>
      </Datatable>
    </div>
  </div>

  <ExportCustomerModal></ExportCustomerModal>
  <AddPropertyModal @formAddSubmitted="getItems('')"></AddPropertyModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddPropertyModal from "@/components/modals/forms/AddPropertyModal.vue";
import { getRealEstateProperties, deleteRealEstateProperty, RealEstateProperty, RequestTabelData } from "@/core/data/properties";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
import Multiselect from '@vueform/multiselect'
import { options } from "@fullcalendar/core/preact";


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
    async function getItems(filterRequest: string) {
      loading.value = true;
      const results = await getRealEstateProperties(filterRequest);
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
      await getItems("");
    });

    const deleteFewItems = async () => {
      loading.value = true;
      selectedIds.value.forEach(async (item) => {
        await deleteRealEstateProperty(item)
      });
      selectedIds.value.length = 0;
      await getItems("");
      loading.value = false;
    };

    const search = ref<string>("");
    const fromPrice = ref<number | undefined>(undefined);
    const toPrice = ref<number | undefined>(undefined);
    const contract = ref<string>("");
    const typologie = ref<string>("");
    const category = ref<string>("");
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

    const searchItems = () => {
      // Resetta la tabella ai dati iniziali
      tableData.value.splice(0, tableData.value.length, ...initItems.value);

      let filteredResults = [...initItems.value];
      // Filtraggio per testo (search)
      if (search.value !== "") {
        filteredResults = filteredResults.filter(item => searchingFunc(item, search.value));
      }
      // Filtraggio per prezzo
      if (fromPrice.value > 0) {
        filteredResults = filteredResults.filter(item => item.Price >= fromPrice.value);
      }
      if (toPrice.value > 0) {
        filteredResults = filteredResults.filter(item => item.Price <= toPrice.value);
      }
      // Filtraggio per contratto con criteri specifici
      if (contract.value) {
       filteredResults = filteredResults.filter(item => {
        switch (contract.value) {
          case 'Affitto':
        return item.Status === 'Affitto' && item.Auction === false;
          case 'Vendita':
        return item.Status === 'Vendita' && item.Auction === false;
          case 'Aste':
        return item.Status === 'Vendita' && item.Auction === true;
          default:
        return true; // Se il filtro non è valido, mostra tutto
        }
       });
      }
      // Filtraggio per tipologia
      if (typologie.value) {
        filteredResults = filteredResults.filter(item => searchingFunc(item, typologie.value.toLowerCase()));
      }
      // Filtraggio per località
      if (locations.value.length > 0) {
        filteredResults = filteredResults.filter(item => {
          // Verifica che l'elemento corrisponda a una delle località selezionate
          return locations.value.some(location => searchingFunc(item, location.toLowerCase()));
        });
      }
      // Rimuove i duplicati se ce ne sono (ad esempio per la ricerca per località)
      const uniqueResults = Array.from(new Set(filteredResults.map(item => JSON.stringify(item))))
        .map(item => JSON.parse(item));
      // Assegna i risultati unici alla tabella
      tableData.value = uniqueResults;
      // Richiama la re-inizializzazione del menu
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
        await getItems("");
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
      typologie,
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
      user
    };
  },
  data() {
    return {
      options: [
        { value: "", label: "Qualsiasi" },
        { value: "FROSINONE", label: "LAZIO \\ FROSINONE (FR)" },
        { value: "LATINA", label: "LAZIO \\ LATINA (LT)" },
        { value: "ROMA", label: "LAZIO \\ ROMA (RM)" },
        { value: "VITERBO", label: "LAZIO \\ VITERBO (VT)" },
        { value: "TAGLIACOZZO", label: "ABRUZZO \\ L'AQUILA (AQ) \\ TAGLIACOZZO" },
        { value: "ANAGNI", label: "LAZIO \\ FROSINONE (FR) \\ ANAGNI" },
        { value: "FIUGGI", label: "LAZIO \\ FROSINONE (FR) \\ FIUGGI" },
        { value: "FROSINONE", label: "LAZIO \\ FROSINONE (FR) \\ FROSINONE" },
        { value: "PALIANO", label: "LAZIO \\ FROSINONE (FR) \\ PALIANO" },
        { value: "SERRONE", label: "LAZIO \\ FROSINONE (FR) \\ SERRONE" },
        { value: "APRILIA", label: "LAZIO \\ LATINA (LT) \\ APRILIA" },
        { value: "ROCCA MASSIMA", label: "LAZIO \\ LATINA (LT) \\ ROCCA MASSIMA" },
        { value: "SABAUDIA", label: "LAZIO \\ LATINA (LT) \\ SABAUDIA" },
        { value: "ALBANO LAZIALE", label: "LAZIO \\ ROMA (RM) \\ ALBANO LAZIALE" },
        { value: "ALESSANDRINO", label: "LAZIO \\ ROMA (RM) \\ ALESSANDRINO" },
        { value: "ANZIO", label: "LAZIO \\ ROMA (RM) \\ ANZIO" },
        { value: "ARDEA", label: "LAZIO \\ ROMA (RM) \\ ARDEA" },
        { value: "ARTENA", label: "LAZIO \\ ROMA (RM) \\ ARTENA" },
        { value: "BELLEGRA", label: "LAZIO \\ ROMA (RM) \\ BELLEGRA" },
        { value: "CAMPAGNANO DI ROMA", label: "LAZIO \\ ROMA (RM) \\ CAMPAGNANO DI ROMA" },
        { value: "CASAPE", label: "LAZIO \\ ROMA (RM) \\ CASAPE" },
        { value: "CASTEL SAN PIETRO ROMANO", label: "LAZIO \\ ROMA (RM) \\ CASTEL SAN PIETRO ROMANO" },
        { value: "CAVE", label: "LAZIO \\ ROMA (RM) \\ CAVE" },
        { value: "COLLEFERRO", label: "LAZIO \\ ROMA (RM) \\ COLLEFERRO" },
        { value: "COLONNA", label: "LAZIO \\ ROMA (RM) \\ COLONNA" },
        { value: "FIANO ROMANO", label: "LAZIO \\ ROMA (RM) \\ FIANO ROMANO" },
        { value: "FRASCATI", label: "LAZIO \\ ROMA (RM) \\ FRASCATI" },
        { value: "GALLICANO NEL LAZIO", label: "LAZIO \\ ROMA (RM) \\ GALLICANO NEL LAZIO" },
        { value: "GAVIGNANO", label: "LAZIO \\ ROMA (RM) \\ GAVIGNANO" },
        { value: "GENAZZANO", label: "LAZIO \\ ROMA (RM) \\ GENAZZANO" },
        { value: "GROTTAFERRATA", label: "LAZIO \\ ROMA (RM) \\ GROTTAFERRATA" },
        { value: "GUIDONIA MONTECELIO", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO" },
        { value: "LABICO", label: "LAZIO \\ ROMA (RM) \\ LABICO" },
        { value: "LANUVIO", label: "LAZIO \\ ROMA (RM) \\ LANUVIO" },
        { value: "LARIANO", label: "LAZIO \\ ROMA (RM) \\ LARIANO" },
        { value: "MARINO", label: "LAZIO \\ ROMA (RM) \\ MARINO" },
        { value: "MONTE PORZIO CATONE", label: "LAZIO \\ ROMA (RM) \\ MONTE PORZIO CATONE" },
        { value: "MONTECOMPATRI", label: "LAZIO \\ ROMA (RM) \\ MONTECOMPATRI" },
        { value: "MONTELANICO", label: "LAZIO \\ ROMA (RM) \\ MONTELANICO" },
        { value: "NETTUNO", label: "LAZIO \\ ROMA (RM) \\ NETTUNO" },
        { value: "OLEVANO ROMANO", label: "LAZIO \\ ROMA (RM) \\ OLEVANO ROMANO" },
        { value: "PALESTRINA", label: "LAZIO \\ ROMA (RM) \\ PALESTRINA" },
        { value: "PALOMBARA SABINA", label: "LAZIO \\ ROMA (RM) \\ PALOMBARA SABINA" },
        { value: "POLI", label: "LAZIO \\ ROMA (RM) \\ POLI" },
        { value: "POMEZIA", label: "LAZIO \\ ROMA (RM) \\ POMEZIA" },
        { value: "PORTUENSE", label: "LAZIO \\ ROMA (RM) \\ PORTUENSE" },
        { value: "ROCCA DI CAVE", label: "LAZIO \\ ROMA (RM) \\ ROCCA DI CAVE" },
        { value: "ROCCA PRIORA", label: "LAZIO \\ ROMA (RM) \\ ROCCA PRIORA" },
        { value: "ROMA", label: "LAZIO \\ ROMA (RM) \\ ROMA" },
        { value: "TOR TRE TESTE", label: "LAZIO \\ ROMA (RM) \\ TOR TRE TESTE" },
        { value: "TORRE MAURA", label: "LAZIO \\ ROMA (RM) \\ TORRE MAURA" },
        { value: "TORRE SPACCATA", label: "LAZIO \\ ROMA (RM) \\ TORRE SPACCATA" },
        { value: "INFERNETTO", label: "LAZIO \\ ROMA (RM) \\ INFERNETTO" },
        { value: "SAN CESAREO", label: "LAZIO \\ ROMA (RM) \\ SAN CESAREO" },
        { value: "SAN VITO ROMANO", label: "LAZIO \\ ROMA (RM) \\ SAN VITO ROMANO" },
        { value: "SEGNI", label: "LAZIO \\ ROMA (RM) \\ SEGNI" },
        { value: "SUBIACO", label: "LAZIO \\ ROMA (RM) \\ SUBIACO" },
        { value: "TIVOLI", label: "LAZIO \\ ROMA (RM) \\ TIVOLI" },
        { value: "VALMONTONE", label: "LAZIO \\ ROMA (RM) \\ VALMONTONE" },
        { value: "VELLETRI", label: "LAZIO \\ ROMA (RM) \\ VELLETRI" },
        { value: "ZAGAROLO", label: "LAZIO \\ ROMA (RM) \\ ZAGAROLO" },
        { value: "VITERBO", label: "LAZIO \\ VITERBO (VT) \\ VITERBO" }
      ]
    };
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