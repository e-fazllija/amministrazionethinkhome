<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <div>
          <!--begin::Search-->
          <div class="row">
            <div class="col-md-4 col-lg-4">
              <input type="text" v-model="search" @input="searchItems()" class="form-control form-control-solid"
                placeholder="Cerca Richiesta" />
            </div>
          <div class="ccol-md-4 col-lg-4">
            <select class="form-control form-control-solid" v-model="contract">
              <option value="">Contratto</option>
              <option value="Vendita">Vendita</option>
              <option value="Affitto">Affitto</option>
            </select>
          </div>
          <div class="col-md-4 col-lg-4">
            <select class="form-control form-control-solid" v-model="typologie">
              <option value="">Tipologia</option>
              <option value="Appartamenti">Appartamenti</option>
              <option value="AttivitaCommerciale">Attività Commerciale</option>
              <option value="Box">Box</option>
              <option value="CapannoniLocArtigianali">Capannoni, Loc. Artigianali</option>
              <option value="CasaliRuderi">Casali e Ruderi</option>
              <option value="CaseSemindipendenti">Case Semindipendenti</option>
              <option value="LocaliCommerciali">Locali Commerciali</option>
              <option value="NuoveCostruzioni">Nuove Costruzioni</option>
              <option value="Terreni">Terreni</option>
              <option value="VilleCaseIndipendenti">Ville e Case Indipendenti</option>
            </select>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-3 col-3">
            <input type="text" v-model="fromPrice" @input="searchPrice()"
            class="form-control form-control-solid" placeholder="Prezzo da " />
          </div>
          <div class="col-3 col-3">
            <input type="text" v-model="toPrice" @input="searchPrice()"
            class="form-control form-control-solid" placeholder="Prezzo a " />
          </div>
          <div class="col-6 col-6">
            <Multiselect
              v-model="locations"
              :options="options"
               mode="multiple"
              :multiple="true"
               placeholder="Seleziona località"
               class="cform-control form-control-solid"
             />
          </div>
        </div>        
        <!--end::Search-->
        </div>
        
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div v-if="selectedIds.length === 0" class="d-flex justify-content-end" data-kt-request-table-toolbar="base">
          <!--begin::Export-->
          <!-- <button
              type="button"
              class="btn btn-light-primary me-3"
              data-bs-toggle="modal"
              data-bs-target="#kt_requests_export_modal"
            >
              <KTIcon icon-name="exit-up" icon-class="fs-2" />
              Export
            </button> -->
          <!--end::Export-->
          <!--begin::Add request-->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_request">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Aggiungi Richiesta
          </button>
          <!--end::Add request-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div v-else class="d-flex justify-content-end align-items-center" data-kt-request-table-toolbar="selected">
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span>Seleziona
          </div>
          <button v-if="user.Role === 'Admin' || user.Role == 'Agency'" type="button" class="btn btn-danger" @click="deleteFewItems()">
            Cancella Selezionati
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center d-none" data-kt-request-table-toolbar="selected">
          <div class="fw-bold me-5">
            <span class="me-2" data-kt-request-table-select="selected_count"></span>Seleziona
          </div>
          <button v-if="user.Role === 'Admin' || user.Role == 'Agency'" type="button" class="btn btn-danger" data-kt-request-table-select="delete_selected">
            Cancella Selezionati
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
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
        <template v-slot:Actions="{ row: request }">
          <router-link :to="{ name: 'request', params: { id: request.Id } }"
            class="btn btn-light-info me-1">Dettagli</router-link>

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
  <AddRequestModal @formAddSubmitted="getItems('')"></AddRequestModal>
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
        columnWidth: 175,
      },
      {
        columnName: "Contratto",
        columnLabel: "Contract",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Data Richiesta",
        columnLabel: "StringDate",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Email",
        columnLabel: "CustomerEmail",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Telefono",
        columnLabel: "CustomerPhone",
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

    const selectedIds = ref<Array<number>>([]);
    let loading = ref<boolean>(true);
      const user = authStore.user;
    const tableData = ref<Array<RequestTabelData>>([]);
    const initItems = ref([]);
    async function getItems(filterRequest: string) {
      loading.value = true;
      const results = await getRequests(filterRequest);
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
          Price: results[key].Price,
          PropertyType: results[key].PropertyType
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
      selectedIds.value.forEach(async (item) => {
        await deleteRequest(item)
      });
      selectedIds.value.length = 0;
      await getItems("");
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initItems.value);
      if (search.value !== "") {
        let results: Array<RequestTabelData> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
      MenuComponent.reinitialization();
    };

    const fromPrice = ref<number>();
    const toPrice = ref<number>();
    const searchPrice = () => {
      tableData.value.splice(0, tableData.value.length, ...initItems.value);
      let results: Array<RequestTabelData> = [];
      if (fromPrice.value > 0) {
        for (let j = 0; j < tableData.value.length; j++) {
          if (tableData.value[j].Price >= fromPrice.value) {
            results.push(tableData.value[j]);
          }
        }

         // Rimuovi i duplicati da results
      const uniqueResults = Array.from(
              new Set(results.map(item => JSON.stringify(item)))
            ).map(item => JSON.parse(item));
      tableData.value.splice(0, tableData.value.length, ...uniqueResults);
      }
      if (toPrice.value > 0) {
        for (let j = 0; j < tableData.value.length; j++) {
          if (tableData.value[j].Price <= toPrice.value) {
            results.push(tableData.value[j]);
          }
        }

         // Rimuovi i duplicati da results
      const uniqueResults = Array.from(
              new Set(results.map(item => JSON.stringify(item)))
            ).map(item => JSON.parse(item));
      tableData.value.splice(0, tableData.value.length, ...uniqueResults);
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

    const contract = ref<string>("");
    watch(
      () => contract.value,
      (newValue) => {
        tableData.value.splice(0, tableData.value.length, ...initItems.value);
        if (newValue) {
          let results: Array<RequestTabelData> = [];
          for (let j = 0; j < tableData.value.length; j++) {
            if (searchingFunc(tableData.value[j], newValue.toLowerCase())) {
              results.push(tableData.value[j]);
            }
          }
          tableData.value.splice(0, tableData.value.length, ...results);
        }
      }
    );

    const typologie = ref<string>("");
    watch(
      () => typologie.value,
      (newValue) => {
        tableData.value.splice(0, tableData.value.length, ...initItems.value);
        if (newValue) {
          let results: Array<RequestTabelData> = [];
          for (let j = 0; j < tableData.value.length; j++) {
            if (searchingFunc(tableData.value[j], newValue.toLowerCase())) {
              results.push(tableData.value[j]);
            }
          }
          tableData.value.splice(0, tableData.value.length, ...results);
        }
      }
    );

    const locations = ref<Array<string>>([]);
      watch(
      () => locations.value,
      (newValue) => {
      if (!newValue || newValue.length === 0) {
      // Se locations è vuoto, ripristina tutte le voci
      tableData.value = [...initItems.value];
      return;
      }
    let results = [];
      for (let item of newValue) {
      for (let j = 0; j < initItems.value.length; j++) {
        if (searchingFunc(initItems.value[j], item.toLocaleLowerCase())) {
          results.push(initItems.value[j]);
        }
      }
    }
    // Rimuovi duplicati
    const uniqueResults = Array.from(new Set(results.map(item => JSON.stringify(item))))
      .map(item => JSON.parse(item));

    tableData.value = uniqueResults;
    },
    { deep: true }
  );

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
      typologie,
      fromPrice,
      toPrice,
      searchPrice,
      selectedIds,
      deleteFewItems,
      sort,
      onItemSelect,
      getAssetPath,
      deleteItem,
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
  }
});
</script>

