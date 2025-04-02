<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Aggiorna Richiesta</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
  </div>
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <!--begin::Content-->
  <div v-else>
    <!--begin::Form-->
    <form @submit.prevent="submit()">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Cliente</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <!--begin::Input-->
            <Multiselect
                v-model="formData.CustomerId"
                :options="inserModel.Customers"
                label="label"
                valueProp="Id"
                :searchable="true"
                :close-on-select="true"
                :clear-on-select="false"
                placeholder="Seleziona il cliente"
              />
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Contratto</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select class="form-control" v-model="formData.Contract" required>
              <option value="Vendita">Vendita</option>
              <option value="Affitto">Affitto</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6 required">Tipologia Immobiliare:</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select class="form-control" v-model="formData.PropertyType" required>
              <option value="Qualsiasi">Qualsiasi</option>
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
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Provincia</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select class="form-control" v-model="formData.Province" required>
              <option value="Arezzo">Arezzo</option>
              <option value="Caserta">Caserta</option>
              <option value="Chieti">Chieti</option>
              <option value="Firenze">Firenze</option>
              <option value="Frosinone">Frosinone</option>
              <option value="LAquila">L'Aquila</option>
              <option value="Latina">Latina</option>
              <option value="Napoli">Napoli</option>
              <option value="Perugia">Perugia</option>
              <option value="Rieti">Rieti</option>
              <option value="Roma">Roma</option>
              <option value="Sassari">Sassari</option>
              <option value="Terni">Terni</option>
              <option value="Trento">Trento</option>
              <option value="Viterbo">Viterbo</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6 required">Comune</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <select class="form-select" multiple v-model="selectedCities" required>
                <option v-for="(city, index) in cities" :key="index" :value="city.Id">{{ city.Name }} </option>
              </select>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

         <!--begin::Input group-->
         <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6 required">Località</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <select class="form-control" v-model="selectedLocations" multiple>
                <option v-for="(location, index) in locations" :key="index" :value="location.Id">{{ location.Name }} </option>
              </select>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6"> Canone Mensile €
            Prezzo - Massimo:</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Price" type="number" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Archiviata</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Archived" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Evasa</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Closed" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Consulenza mutuo richiesta</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.MortgageAdviceRequired" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Numero Locali</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.RoomsNumber" type="number" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

         <!--begin::Input group-->
         <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Giardino Da</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.GardenFrom" type="number" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Giardino A</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.GardenTo" type="number" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">MQ Da</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.MQFrom" type="number" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">MQ A</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.MQTo" type="number" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Stato dell'immobile</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <select class="form-control" v-model="formData.PropertyState">
              <option value="">Seleziona Stato Immobile</option>
              <option value="0">Affittato</option>
              <option value="1">In corso di costruzione</option>
              <option value="2">Libero</option>
              <option value="3">Libero al Rogito</option>
              <option value="4">Nuda Proprietà</option>
              <option value="5">Occupato</option>
            </select>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Riscaldamento</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <select class="form-control" v-model="formData.Heating">
              <option value="">Seleziona Il Tipo Di Riscaldamento</option>
              <option value="Autonomo">Autonomo</option>
              <option value="Centralizzato">Centralizzato</option>
              <option value="Inesistente">Inesistente</option>
            </select>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Posto Auto</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <select class="form-control" v-model="formData.ParkingSpaces">
              <option value="">Seleziona Posto Auto</option>
              <option value="Assegnato">Assegnato</option>
              <option value="Box Auto">Box Auto</option>
              <option value="Condominiale">Condominiale</option>
              <option value="Posto auto coperto">Posto auto coperto</option>
              <option value="Posto auto scoperto">Posto auto scoperto</option>
            </select>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Nota principale</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <textarea class="form-control form-control-lg fw-semobold" v-model="formData.Notes"></textarea>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Riepilogo Note</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div v-for="(note, index) in formData.RequestNotes" :key="index" class="col-lg-8 fv-row">
            <div class="border border-secondary" v-html="note.Text"></div>
            <hr>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

      </div>
      <!--begin::Actions-->
      <div class="card-footer d-flex justify-content-end py-6 px-9">
        <button type="button" @click="deleteItem()" class="btn btn-danger btn-active-light-primary me-2">
          Elimina
        </button>
        <!--begin::Button-->
        <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
          <span v-if="!loading" class="indicator-label">
            Salva modifiche
          </span>
          <span v-if="loading" class="indicator-progress">
            Attendere...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
        <!--end::Button-->
      </div>
      <!--end::Actions-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Content-->
  <div v-if="!loading" class="card mb-5 mb-xl-10">
      <div class="card-header border-0 pt-6" style="display: unset;">
        <!--begin::Card title-->
        <div class="card-title">
          <!--begin::Search-->
          <div class="d-flex align-items-center position-relative my-1">
            <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
            <input type="text" v-model="search" @input="searchItems()"
              class="form-control form-control-solid w-250px ps-15" placeholder="Cerca Immobile" />
          </div>
          <!--end::Search-->
        </div>
        <!--begin::Card title-->
        <div class="card-body pt-0">
          <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="formData.RealEstateProperties"
            :header="tableHeader" :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
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
            <template v-slot:actions="{ row: item }">
              <router-link :to="{ name: 'property', params: { id: item.Id } }"
                class="btn btn-light-info me-1">Dettagli</router-link>
              <!-- <button v-if="user.Id === item.AgentId || user.Role === 'Admin' || item.Agent.AgencyId === user.Id" @click="deleteItem(item.Id)" class="btn btn-light-danger me-1">Elimina</button> -->
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
    </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Request, InsertModel, getToInsert, getRequest, updateRequest, deleteRequest } from "@/core/data/requests";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { provinceCities } from "@/core/data/provinces";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import arraySort from "array-sort";
import type { RealEstateProperty } from "@/core/data/properties";
import { MenuComponent } from "@/assets/ts/components";
import { cityLocations } from "@/core/data/locations";
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "update-request",
  components: { Datatable, Multiselect },
  setup() {
    const store = useAuthStore();
    const user = store.user;
    const route = useRoute();
    const router = useRouter();
    const id = parseInt(route.params.id.toString());
    const loading = ref<boolean>(true);
    const firtLoad = ref(false);
    const cities = ref([]);
    const locations = ref([]);
    const selectedIds = ref<Array<Number>>([]);
    const initItems = ref([]);
    const formData = ref<Request>({
      CustomerId: null,
      Contract: "",
      PropertyType: "",
      Province: "",
      Town: "",
      Price: 0,
      PriceTo:0,
      PriceFrom:0,
      Archived: false,
      Closed: false,
      RoomsNumber: "",
      Garden: 0,
      GardenTo:0,
      GardenFrom:0,
      MQFrom: 0,
      MQTo: 0,
      PropertyState: "",
      Heating: "",
      ParkingSpaces: 0,
      Notes: "",
      Location:"",
      MortgageAdviceRequired: false
    });
    const inserModel = ref<InsertModel>({
      Customers: [],
      Users: []
    });

    const tableHeader = ref([
      {
        columnName: "Codice",
        columnLabel: "Id",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Ins. / Inc.",
        columnLabel: "CreationDate",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Mq",
        columnLabel: "CommercialSurfaceate",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Indirizzo",
        columnLabel: "AddressLine",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Prezzo",
        columnLabel: "Price",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);

    let selectedCities = ref<Array<string>>([]);
    let selectedLocations = ref<Array<string>>([]);


    onMounted(async () => {
      loading.value = true;
      firtLoad.value = true;
      formData.value = await getRequest(id);
      selectedCities.value = formData.value.Town.split(",")
      selectedLocations.value = formData.value.Location?.split(",")
      inserModel.value = await getToInsert();
      initItems.value.splice(0, formData.value.RealEstateProperties.length, ...formData.value.RealEstateProperties);
      // if (inserModel.value.Customers.length > 0) {
      //   formData.value.CustomerId = inserModel.value.Customers[0].Id;
      // }
      if (formData.value.Province && provinceCities[formData.value.Province]) {
        cities.value = provinceCities[formData.value.Province];
      } else {
        cities.value = [];
        formData.value.Town = null;
      }

      if (selectedCities.value.length > 0) {
        locations.value = selectedCities.value
                .filter(city => cityLocations[city]) 
                .flatMap(city => cityLocations[city]);
          }

      loading.value = false;
      setTimeout(() => firtLoad.value = false, 3000);
    })


    watch(
      () => formData.value.Province,
      (newProvince) => {
        if (!firtLoad.value) {
          if (newProvince && provinceCities[newProvince]) {
            cities.value = provinceCities[newProvince];
            formData.value.Town = cities.value[0].Id;
          } else {
            cities.value = [];
            formData.value.Town = null;
          }
        } else {
          firtLoad.value = false;
        }
      }
    );

    watch(
      () => selectedCities.value,
      (newTown) => {
        if (!firtLoad.value) {
          if (Array.isArray(newTown) && newTown.length > 0) {
            locations.value = newTown
              .filter(city => cityLocations[city])
              .flatMap(city => cityLocations[city]);
            formData.value.Location = null;
          } else {
            locations.value = [];
            formData.value.Location = null;
          }
        } else {
          firtLoad.value = false;
        }
      }
    );

    async function deleteItem() {
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
        loading.value = false;
        await deleteRequest(id)
        router.push({ name: "requests" })
      });

    }

    const submit = async () => {
      loading.value = true;
      formData.value.Town = selectedCities.value.toString()
      formData.value.Location = selectedLocations.value?.toString();

      await updateRequest(formData.value)
        .then(() => {
          loading.value = false;

          Swal.fire({
            text: "Il modulo è stato inviato con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Continua!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            // router.push({ name: 'requests' })
          });
        })
        .catch(({ response }) => {
          console.log(response);
          loading.value = false;
          Swal.fire({
            text: "Attenzione, si è verificato un errore.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Continua!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        });
    };

    const search = ref<string>("");
    const searchItems = () => {
      formData.value.RealEstateProperties.splice(0, formData.value.RealEstateProperties.length, ...initItems.value);
      if (search.value !== "") {
        let results: Array<RealEstateProperty> = [];
        for (let j = 0; j < formData.value.RealEstateProperties.length; j++) {
          if (searchingFunc(formData.value.RealEstateProperties[j], search.value)) {
            results.push(formData.value.RealEstateProperties[j]);
          }
        }
        formData.value.RealEstateProperties.splice(0, formData.value.RealEstateProperties.length, ...results);
      }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (
            !Number.isInteger(obj[key]) && 
            !(typeof obj[key] === "object") && 
            (typeof obj[key] === "string" || Array.isArray(obj[key]))
        ) {
            if (obj[key].indexOf(value) !== -1) {
                return true;
            }
        }
      }
      return false;
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(formData.value.RealEstateProperties, sort.label, { reverse });
      }
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    return {
      formData,
      submit,
      loading,
      getAssetPath,
      deleteItem,
      user,
      inserModel,
      cities,
      locations,
      sort,
      tableHeader,
      onItemSelect,
      searchItems,
      search,
      selectedCities,
      selectedLocations
    };
  },
});
</script>