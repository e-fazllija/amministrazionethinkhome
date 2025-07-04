<template>
  <div class="card">
    <!--begin::Search-->
    <div class="row m-2">
      <div class="col-md-3 col-lg-3 mb-2">
        <input type="text" v-model="search" class="form-control form-control-solid" placeholder="Cerca Richiesta" />
      </div>
      <div class="col-md-3 col-lg-3 mb-2">
        <select class="form-control form-control-solid" v-model="contract">
          <option value="">Contratto</option>
          <option value="Vendita">Vendita</option>
          <option value="Affitto">Affitto</option>
          <!-- <option value="Aste">Aste</option> -->
        </select>
      </div>
      <div class="col-md-3 col-lg-3 mb-2">
        <Multiselect v-model="propertyType" :options="optionsPropertyType" mode="multiple" placeholder="Seleziona tipologia"
          class="cform-control form-control-solid" :searchable="true" />
        <div v-if="propertyType.length" class="selected-box">
          <strong></strong>
          <span v-for="(propertyTypes, index) in propertyType" :key="index" class="selected-location">
            {{ propertyTypes }}
            <span @click="removePropertyType(index)" class="remove-btn">×</span>
            {{ index < propertyType.length - 1 ? ', ' : '' }} </span>
        </div>
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
        <Multiselect v-model="locations" :options="options" mode="multiple" placeholder="Seleziona località"
          class="cform-control form-control-solid" :searchable="true" />
        <div v-if="locations.length" class="selected-box">
          <strong></strong>
          <span v-for="(location, index) in locations" :key="index" class="selected-location">
            {{ location }}
            <span @click="removeLocation(index)" class="remove-btn">×</span>
            {{ index < locations.length - 1 ? ', ' : '' }} </span>
        </div>
      </div>
      <div v-if="user.Role == 'Admin'" class="col-lg-3 col-md-3 col-sm-12">
        <select class="form-control selectpicker" v-model="agencyId">
          <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">{{ item.Name }} {{
            item.LastName }}</option>
        </select>
      </div>
      <div class="col d-flex justify-content-end align-items-start mb-2">
        <button type="button" @click="searchItems" class="btn btn-light-primary me-3">
          <KTIcon icon-name="search" icon-class="fs-2" /> Cerca
        </button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_request">
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Aggiungi Richiesta
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
        <template v-slot:CustomerName="{ row: request }">
          {{ request.CustomerName }}
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
import { defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddRequestModal from "@/components/modals/forms/requests/AddRequestModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getRequests, Request, deleteRequest, RequestTabelData } from "@/core/data/requests";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import Multiselect from '@vueform/multiselect'
import { getSearchItems, SearchModel } from "@/core/data/events";

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

    async function getItems(agencyId, filterRequest: string) {
      loading.value = true;
      tableData.value = [];
      const results = await getRequests(agencyId, filterRequest);

      for (const key in results) {
        const item = {
          Id: results[key].Id,
          CustomerName: results[key].Customer.Name + " " + results[key].Customer.LastName,
          CustomerLastName: results[key].Customer.LastName,
          CustomerEmail: results[key].Customer.Email,
          CustomerPhone: results[key].Customer.Phone,
          Contract: results[key].Contract,
          CreationDate: results[key].CreationDate,
          StringDate: results[key].CreationDate.toString().substring(0, 10).split('-').reverse().join('-'),
          Locations: results[key].Location,
          Town: results[key].Town,
          PriceTo: results[key].PriceTo,
          PriceFrom: results[key].PriceFrom,
          PropertyType: results[key].PropertyType,
          Status: results[key].Archived == true ? "Archviviata" : results[key].Closed == true ? "Chiusa" : "Aperta"
        } as RequestTabelData;

        tableData.value.push(item)
      }
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
      loading.value = false;
    };

    onMounted(async () => {
      if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      }
      agencyId.value = authStore.user.AgencyId;

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
    const locations = ref<Array<string>>([]);
    const propertyType = ref<Array<string>>([]);


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
        tableData.value = tableData.value.filter(item => item.CustomerName.toLowerCase().includes(search.value.toLowerCase()));
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
      // Filtraggio per località
      if (locations.value.length > 0) {
        tableData.value = tableData.value.filter(item => {
          // Verifica che l'elemento corrisponda a una delle località selezionate
          return locations.value.some(location => searchingFunc(item, location.toLowerCase()));
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
      defaultSearchItems
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
    { value: "COLLE PALME", label: "LAZIO \\ ROMA (RM) \\ CAVE \\ COLLE PALME" },
    { value: "SAN BARTOLOMEO", label: "LAZIO \\ ROMA (RM) \\ CAVE \\ SAN BARTOLOMEO" },
    { value: "CASTEL MADAMA", label: "LAZIO \\ ROMA (RM) \\ CASTEL MADAMA" },
    { value: "COLLEFERRO", label: "LAZIO \\ ROMA (RM) \\ COLLEFERRO" },
    { value: "COLONNA", label: "LAZIO \\ ROMA (RM) \\ COLONNA" },
    { value: "FIANO ROMANO", label: "LAZIO \\ ROMA (RM) \\ FIANO ROMANO" },
    { value: "FRASCATI", label: "LAZIO \\ ROMA (RM) \\ FRASCATI" },
    { value: "GALLICANO NEL LAZIO", label: "LAZIO \\ ROMA (RM) \\ GALLICANO NEL LAZIO" },
    { value: "GAVIGNANO", label: "LAZIO \\ ROMA (RM) \\ GAVIGNANO" },
    { value: "GENAZZANO", label: "LAZIO \\ ROMA (RM) \\ GENAZZANO" },
    { value: "GROTTAFERRATA", label: "LAZIO \\ ROMA (RM) \\ GROTTAFERRATA" },
    { value: "GUIDONIA MONTECELIO", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO" },
    { value: "ALBUCCIONE", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ ALBUCCIONE" },
    { value: "CASACALDA", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ CASACALDA" },
    { value: "CASTEL ARCIONE", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ CASTEL ARCIONE" },
    { value: "COLLE VERDE", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ COLLE VERDE" },
    { value: "LA BOTTE", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ LA BOTTE" },
    { value: "MARCO SIMONE", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ MARCO SIMONE" },
    { value: "MONTECELIO", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ MONTECELIO" },
    { value: "SETTEVILLE", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ SETTEVILLE" },
    { value: "VILLA NOVA", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ VILLA NOVA" },
    { value: "VILLALBA", label: "LAZIO \\ ROMA (RM) \\ GUIDONIA MONTECELIO \\ VILLALBA" },
    { value: "LABICO", label: "LAZIO \\ ROMA (RM) \\ LABICO" },
    { value: "COLLE SPINA", label: "LAZIO \\ ROMA (RM) \\ LABICO \\ COLLE SPINA" },
    { value: "LANUVIO", label: "LAZIO \\ ROMA (RM) \\ LANUVIO" },
    { value: "LARIANO", label: "LAZIO \\ ROMA (RM) \\ LARIANO" },
    { value: "MARINO", label: "LAZIO \\ ROMA (RM) \\ MARINO" },
    { value: "MONTE PORZIO CATONE", label: "LAZIO \\ ROMA (RM) \\ MONTE PORZIO CATONE" },
    { value: "MONTECOMPATRI", label: "LAZIO \\ ROMA (RM) \\ MONTECOMPATRI" },
    { value: "COLLE MATTIA", label: "LAZIO \\ ROMA (RM) \\ MONTECOMPATRI \\ COLLE MATTIA" },
    { value: "LAGHETTO", label: "LAZIO \\ ROMA (RM) \\ MONTECOMPATRI \\ LAGHETTO" },
    { value: "MONTELANICO", label: "LAZIO \\ ROMA (RM) \\ MONTELANICO" },
    { value: "NETTUNO", label: "LAZIO \\ ROMA (RM) \\ NETTUNO" },
    { value: "OLEVANO ROMANO", label: "LAZIO \\ ROMA (RM) \\ OLEVANO ROMANO" },
    { value: "PALESTRINA", label: "LAZIO \\ ROMA (RM) \\ PALESTRINA" },
    { value: "CARCHITTI", label: "LAZIO \\ ROMA (RM) \\ PALESTRINA \\ CARCHITTI" },
    { value: "VALVARINO", label: "LAZIO \\ ROMA (RM) \\ PALESTRINA \\ VALVARINO" },
    { value: "PALOMBARA SABINA", label: "LAZIO \\ ROMA (RM) \\ PALOMBARA SABINA" },
    { value: "POLI", label: "LAZIO \\ ROMA (RM) \\ POLI" },
    { value: "POMEZIA", label: "LAZIO \\ ROMA (RM) \\ POMEZIA" },
    { value: "PORTUENSE", label: "LAZIO \\ ROMA (RM) \\ PORTUENSE" },
    { value: "ROCCA DI CAVE", label: "LAZIO \\ ROMA (RM) \\ ROCCA DI CAVE" },
    { value: "ROCCA PRIORA", label: "LAZIO \\ ROMA (RM) \\ ROCCA PRIORA" },
    { value: "COLLE DI FUORI", label: "LAZIO \\ ROMA (RM) \\ ROCCA PRIORA \\ COLLE DI FUORI" },
    { value: "ROMA", label: "LAZIO \\ ROMA (RM) \\ ROMA" },
    { value: "ACILIA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ ACILIA" },
    { value: "ALESSANDRINO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ ALESSANDRINO" },
    { value: "BOCCEA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ BOCCEA" },
    { value: "BORGHESIANA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ BORGHESIANA" },
    { value: "CASAL PALOCCO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ CASAL PALOCCO" },
    { value: "CASALOTTI", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ CASALOTTI" },
    { value: "CASTEL FUSANO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ CASTEL FUSANO" },
    { value: "CASTELVERDE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ CASTELVERDE" },
    { value: "CENTOCELLE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ CENTOCELLE" },
    { value: "CINECITTÀ", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ CINECITTÀ" },
    { value: "COLLE MONFORTANI", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ COLLE MONFORTANI" },
    { value: "COLLE PRENESTINO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ COLLE PRENESTINO" },
    { value: "COLLE DEL SOLE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ COLLE DEL SOLE" },
    { value: "CORCOLLE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ CORCOLLE" },
    { value: "CORCOLLE ALTO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ CORCOLLE ALTO" },
    { value: "DON BOSCO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ DON BOSCO" },
    { value: "EUR", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ EUR" },
    { value: "FINOCCHIO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ FINOCCHIO" },
    { value: "FONTE LAURENTINA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ FONTE LAURENTINA" },
    { value: "FOSSO SAN GIULIANO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ FOSSO SAN GIULIANO" },
    { value: "GIARDINETTI", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ GIARDINETTI" },
    { value: "GIARDINI DI CORCOLLE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ GIARDINI DI CORCOLLE" },
    { value: "INFERNETTO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ INFERNETTO" },
    { value: "LA PISANA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ LA PISANA" },
    { value: "LA STORTA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ LA STORTA" },
    { value: "MONTE SACRO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ MONTE SACRO" },
    { value: "LUNGHEZZA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ LUNGHEZZA" },
    { value: "OSTERIA DEL CURATO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ OSTERIA DEL CURATO" },
    { value: "OSTIA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ OSTIA" },
    { value: "OSTIA ANTICA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ OSTIA ANTICA" },
    { value: "OSTIA LEVANTE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ OSTIA LEVANTE" },
    { value: "OSTIA PONENTE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ OSTIA PONENTE" },
    { value: "PANTANO BORGHESE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ PANTANO BORGHESE" },
    { value: "PIGNETO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ PIGNETO" },
    { value: "PONTE GALERIA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ PONTE GALERIA" },
    { value: "PONTE DI NONA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ PONTE DI NONA" },
    { value: "PORTUENSE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ PORTUENSE" },
    { value: "PRATO FIORITO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ PRATO FIORITO" },
    { value: "PRIMA PORTA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ PRIMA PORTA" },
    { value: "ROCCA CENCIA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ ROCCA CENCIA" },
    { value: "ROMANINA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ ROMANINA" },
    { value: "ROMA EST", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ ROMA EST" },
    { value: "SAN VITTORINO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ SAN VITTORINO" },
    { value: "SAXA RUBRA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ SAXA RUBRA" },
    { value: "SETTECAMINI", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ SETTECAMINI" },
    { value: "TOR BELLA MONACA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TOR BELLA MONACA" },
    { value: "TOR TRE TESTE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TOR TRE TESTE" },
    { value: "TOR VERGATA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TOR VERGATA" },
    { value: "TOR DE CENCI", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TOR DE CENCI" },
    { value: "TORRE ANGELA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TORRE ANGELA" },
    { value: "TORRE GAIA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TORRE GAIA" },
    { value: "TORRE MAURA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TORRE MAURA" },
    { value: "TORRE SPACCATA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TORRE SPACCATA" },
    { value: "TUSCOLANA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ TUSCOLANA" },
    { value: "VALLERANO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ VALLERANO" },
    { value: "VERMICINO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ VERMICINO" },
    { value: "VILLA VERDE", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ VILLA VERDE" },
    { value: "VILLAGGIO BREDA", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ VILLAGGIO BREDA" },
    { value: "VILLAGGIO PRENESTINO", label: "LAZIO \\ ROMA (RM) \\ ROMA \\ VILLAGGIO PRENESTINO" },
    { value: "SAN CESAREO", label: "LAZIO \\ ROMA (RM) \\ SAN CESAREO" },
    { value: "SAN GREGORIO DA SASSOLA", label: "LAZIO \\ ROMA (RM) \\ SAN GREGORIO DA SASSOLA" },
    { value: "SAN VITO ROMANO", label: "LAZIO \\ ROMA (RM) \\ SAN VITO ROMANO" },
    { value: "SEGNI", label: "LAZIO \\ ROMA (RM) \\ SEGNI" },
    { value: "SUBIACO", label: "LAZIO \\ ROMA (RM) \\ SUBIACO" },
    { value: "TIVOLI", label: "LAZIO \\ ROMA (RM) \\ TIVOLI" },
    { value: "VALMONTONE", label: "LAZIO \\ ROMA (RM) \\ VALMONTONE" },
    { value: "VELLETRI", label: "LAZIO \\ ROMA (RM) \\ VELLETRI" },
    { value: "ZAGAROLO", label: "LAZIO \\ ROMA (RM) \\ ZAGAROLO" },
    { value: "CENTRO PAESE", label: "LAZIO \\ ROMA (RM) \\ ZAGAROLO \\ CENTRO PAESE" },
    { value: "VALLE MARTELLA", label: "LAZIO \\ ROMA (RM) \\ ZAGAROLO \\ VALLE MARTELLA" },
    { value: "VIA PRENESTINA", label: "LAZIO \\ ROMA (RM) \\ ZAGAROLO \\ VIA PRENESTINA" },
    { value: "VITERBO", label: "LAZIO \\ VITERBO (VT) \\ VITERBO" }
],
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
  methods: {
    removeLocation(index) {
      this.locations.splice(index, 1);  // Rimuove l'elemento selezionato
    },
    removePropertyType(index) {
      this.propertyType.splice(index, 1);  // Rimuove l'elemento selezionato
    }
  }
});
</script>
<style>
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
