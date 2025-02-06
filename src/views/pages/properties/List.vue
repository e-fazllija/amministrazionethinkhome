<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <div>
          <!--begin::Search-->

          <div class="row">
            <div class="col-md-3 col-lg-3">
              <input type="text" v-model="search" @input="searchItems()" class="form-control form-control-solid"
                placeholder="Cerca Immobile" />
            </div>
            <div class="col-md-3 col-lg-3">
              <select class="form-control form-control-solid" v-model="contract">
                <option value="">Contratto</option>
                <option value="Vendita">Vendita</option>
                <option value="Affitto">Affitto</option>
              </select>
            </div>
            <div class="col-md-3 col-lg-3">
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
            <div class="col-md-3 col-lg-3">
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
          <div class="row mt-3">
            <div class="col-md-3 col-lg-3">
              <input type="text" v-model="fromPrice" @input="searchPrice()" class="form-control form-control-solid"
                placeholder="Prezzo da " />
            </div>
            <div class="col-md-3 col-lg-3">
              <input type="text" v-model="toPrice" @input="searchPrice()" class="form-control form-control-solid"
                placeholder="Prezzo a " />
            </div>
            <div class="col-md-6 col-lg-6">
              <select class="form-control form-control-solid custom-multiple-select" v-model="locations" multiple>
                <option value="">Qualsiasi</option>
                <option value="FROSINONE">LAZIO \ FROSINONE (FR)</option>
                <option value="LATINA">LAZIO \ LATINA (LT)</option>
                <option value="ROMA">LAZIO \ ROMA (RM)</option>
                <option value="VITERBO">LAZIO \ VITERBO (VT)</option>
                <option value="TAGLIACOZZO">ABRUZZO \ L'AQUILA (AQ) \ TAGLIACOZZO</option>
                <option value="ANAGNI">LAZIO \ FROSINONE (FR) \ ANAGNI</option>
                <option value="FIUGGI">LAZIO \ FROSINONE (FR) \ FIUGGI</option>
                <option value="FROSINONE">LAZIO \ FROSINONE (FR) \ FROSINONE</option>
                <option value="PALIANO">LAZIO \ FROSINONE (FR) \ PALIANO</option>
                <option value="SERRONE">LAZIO \ FROSINONE (FR) \ SERRONE</option>
                <option value="APRILIA">LAZIO \ LATINA (LT) \ APRILIA</option>
                <option value="ROCCA MASSIMA">LAZIO \ LATINA (LT) \ ROCCA MASSIMA</option>
                <option value="SABAUDIA">LAZIO \ LATINA (LT) \ SABAUDIA</option>
                <option value="ALBANO LAZIALE">LAZIO \ ROMA (RM) \ ALBANO LAZIALE</option>
                <option value="ANZIO">LAZIO \ ROMA (RM) \ ANZIO</option>
                <option value="ARDEA">LAZIO \ ROMA (RM) \ ARDEA</option>
                <option value="ARTENA">LAZIO \ ROMA (RM) \ ARTENA</option>
                <option value="BELLEGRA">LAZIO \ ROMA (RM) \ BELLEGRA</option>
                <option value="CAMPAGNANO DI ROMA">LAZIO \ ROMA (RM) \ CAMPAGNANO DI ROMA</option>
                <option value="CASAPE">LAZIO \ ROMA (RM) \ CASAPE</option>
                <option value="CASTEL SAN PIETRO ROMANO">LAZIO \ ROMA (RM) \ CASTEL SAN PIETRO ROMANO</option>
                <option value="CAVE">LAZIO \ ROMA (RM) \ CAVE</option>
                <option value="COLLEFERRO">LAZIO \ ROMA (RM) \ COLLEFERRO</option>
                <option value="COLONNA">LAZIO \ ROMA (RM) \ COLONNA</option>
                <option value="FIANO ROMANO">LAZIO \ ROMA (RM) \ FIANO ROMANO</option>
                <option value="FRASCATI">LAZIO \ ROMA (RM) \ FRASCATI</option>
                <option value="GALLICANO NEL LAZIO">LAZIO \ ROMA (RM) \ GALLICANO NEL LAZIO</option>
                <option value="GAVIGNANO">LAZIO \ ROMA (RM) \ GAVIGNANO</option>
                <option value="GENAZZANO">LAZIO \ ROMA (RM) \ GENAZZANO</option>
                <option value="GROTTAFERRATA">LAZIO \ ROMA (RM) \ GROTTAFERRATA</option>
                <option value="GUIDONIA MONTECELIO">LAZIO \ ROMA (RM) \ GUIDONIA MONTECELIO</option>
                <option value="LABICO">LAZIO \ ROMA (RM) \ LABICO</option>
                <option value="LANUVIO">LAZIO \ ROMA (RM) \ LANUVIO</option>
                <option value="LARIANO">LAZIO \ ROMA (RM) \ LARIANO</option>
                <option value="MARINO">LAZIO \ ROMA (RM) \ MARINO</option>
                <option value="MONTE PORZIO CATONE">LAZIO \ ROMA (RM) \ MONTE PORZIO CATONE</option>
                <option value="MONTECOMPATRI">LAZIO \ ROMA (RM) \ MONTECOMPATRI</option>
                <option value="MONTELANICO">LAZIO \ ROMA (RM) \ MONTELANICO</option>
                <option value="NETTUNO">LAZIO \ ROMA (RM) \ NETTUNO</option>
                <option value="OLEVANO ROMANO">LAZIO \ ROMA (RM) \ OLEVANO ROMANO</option>
                <option value="PALESTRINA">LAZIO \ ROMA (RM) \ PALESTRINA</option>
                <option value="PALOMBARA SABINA">LAZIO \ ROMA (RM) \ PALOMBARA SABINA</option>
                <option value="POLI">LAZIO \ ROMA (RM) \ POLI</option>
                <option value="POMEZIA">LAZIO \ ROMA (RM) \ POMEZIA</option>
                <option value="ROCCA DI CAVE">LAZIO \ ROMA (RM) \ ROCCA DI CAVE</option>
                <option value="ROCCA PRIORA">LAZIO \ ROMA (RM) \ ROCCA PRIORA</option>
                <option value="ROMA">LAZIO \ ROMA (RM) \ ROMA</option>
                <option value="SAN CESAREO">LAZIO \ ROMA (RM) \ SAN CESAREO</option>
                <option value="SAN VITO ROMANO">LAZIO \ ROMA (RM) \ SAN VITO ROMANO</option>
                <option value="SEGNI">LAZIO \ ROMA (RM) \ SEGNI</option>
                <option value="SUBIACO">LAZIO \ ROMA (RM) \ SUBIACO</option>
                <option value="TIVOLI">LAZIO \ ROMA (RM) \ TIVOLI</option>
                <option value="VALMONTONE">LAZIO \ ROMA (RM) \ VALMONTONE</option>
                <option value="VELLETRI">LAZIO \ ROMA (RM) \ VELLETRI</option>
                <option value="ZAGAROLO">LAZIO \ ROMA (RM) \ ZAGAROLO</option>
                <option value="VITERBO">LAZIO \ VITERBO (VT) \ VITERBO</option>
              </select>
            </div>
          </div>
          <!--end::Search-->
        </div>
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div v-if="selectedIds.length === 0" class="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
          <!--begin::Export-->
          <!-- <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-2" />
            Export
          </button> -->
          <!--end::Export-->
          <!--begin::Add customer-->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_property">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Aggiungi Immobile
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div v-else class="d-flex justify-content-end align-items-center" data-kt-customer-table-toolbar="selected">
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span>Seleziona
          </div>
          <!-- <button v-if="user.Role === 'Admin' || user.Role == 'Agency'" type="button" class="btn btn-danger" @click="deleteFewItems()">
            Cancella
          </button> -->
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center d-none" data-kt-customer-table-toolbar="selected">
          <div class="fw-bold me-5">
            <span class="me-2" data-kt-customer-table-select="selected_count"></span>Seleziona
          </div>
          <button v-if="user.Role === 'Admin' || user.Role == 'Agency'" type="button" class="btn btn-danger" data-kt-customer-table-select="delete_selected">
            Cancella Selezionate
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
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
          <router-link :to="{ name: 'property', params: { id: item.Id } }"
            class="btn btn-light-info me-1">Dettagli</router-link>
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
          Photos: results[key].Photos?.length > 0 ? results[key].Photos[0].Url : null, // Passa l'URL della prima foto
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

    const category = ref<string>("");
    watch(
      () => category.value,
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
        tableData.value.splice(0, tableData.value.length, ...initItems.value);
        if (newValue) {
          let results: Array<RequestTabelData> = [];
          for (let item in newValue) {
            for (let j = 0; j < tableData.value.length; j++) {
              if (searchingFunc(tableData.value[j], newValue[item].toLocaleLowerCase())) {
                results.push(tableData.value[j]);
              }
            }
          }

          // Rimuovi i duplicati da results
          const uniqueResults = Array.from(
            new Set(results.map(item => JSON.stringify(item)))
          ).map(item => JSON.parse(item));

          tableData.value.splice(0, tableData.value.length, ...uniqueResults);
        }
      }
    );

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
      category,
      fromPrice,
      toPrice,
      searchPrice,
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
});
</script>

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
</style>