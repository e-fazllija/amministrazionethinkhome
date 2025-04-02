<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Aggiorna Cliente</h3>
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
  <div v-else class="collapse show">
    <!--begin::Form-->
    <form @submit.prevent="submit()">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6 required">Nome</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Name" type="text" required />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6 required">Cognome</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.LastName" type="text" required />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Email</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Email" type="text" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6 required">Telefono</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Phone" type="text" required />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Aquirente</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Buyer" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Venditore</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Seller" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Costruttore</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Builder" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Altro</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Other" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Cliente gold</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.GoldCustomer" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Acquisizione svolta</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.AcquisitionDone" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->
        
        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Incarico in corso</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.OngoingAssignment" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Indirizzo</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.AdressLine" type="text" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Comune</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.Town" type="text" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Provincia</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg fw-semobold" v-model="formData.State" type="text" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Note</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <textarea class="form-control form-control-lg fw-semobold" v-model="formData.Description"></textarea>
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
          <div v-for="(note, index) in formData.CustomerNotes" :key="index" class="col-lg-8 fv-row">
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
              class="form-control form-control-solid w-250px ps-15" placeholder="Cerca Richiesta" />
          </div>
          <!--end::Search-->
        </div>
        <!--begin::Card title-->
        <div class="card-body pt-0">
          <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="requests"
            :header="tableHeader" :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
            <template v-slot:CustomerName="{ row: request }">
            {{ request.CustomerName }} {{ request.CustomerLastName }}
          </template>
          <template v-slot:Contract="{ row: request }">
            {{ request.Contract }}
          </template>
          <template v-slot:CreationDate="{ row: request }">
            {{ request.CreationDate.substring(0, 10).split('-').reverse().join('-') }}
          </template>
          <template v-slot:CustomerEmail="{ row: request }">
              {{ request.CustomerEmail }}
          </template>
          <template v-slot:CustomerPhone="{ row: request }">
            {{ request.CustomerPhone }}
          </template>
            <template v-slot:Actions="{ row: request }">
              <router-link :to="{ name: 'request', params: { id: request.Id } }" 
                    class="btn btn-light-info me-1"
                       >Dettagli</router-link>
  
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
    </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { updateCustomer, Customer, getCustomer, deleteCustomer } from "@/core/data/customers";
import { Request, getCustomerRequests, RequestTabelData } from "@/core/data/requests";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import arraySort from "array-sort";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { MenuComponent } from "@/assets/ts/components";

export default defineComponent({
  name: "update-customer",
  components: {Datatable},
  setup() {
    const store = useAuthStore();
    const user = store.user;
    const route = useRoute();
    const router = useRouter();
    const id = parseInt(route.params.id.toString());
    const loading = ref<boolean>(true);
    const selectedIds = ref<Array<Number>>([]);
    const initItems = ref([]);
    const formData = ref<Customer>({
      Id: 0,
      Buyer: false,
      Seller: false,
      Builder: false,
      Other: false,
      GoldCustomer: false,
      Name: "",
      LastName: "",
      Email: "",
      Phone: null,
      Description: "",
      AdressLine: "",
      Town: "",
      State: "",
      Code: "0",
      AcquisitionDone: false,
      OngoingAssignment: false
    });
    const requests = ref<Array<RequestTabelData>>([]);

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
          columnLabel: "CreationDate",
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

    onMounted(async () => {
      loading.value = true;
      formData.value = await getCustomer(id)
      const results = await getCustomerRequests(id);
          for(const key in results){
            const item = {
              Id: results[key].Id,
              CustomerName: results[key].Customer.Name,
              CustomerLastName: results[key].Customer.LastName,
              CustomerEmail: results[key].Customer.Email,
              CustomerPhone: results[key].Customer.Phone,
              Contract: results[key].Contract,
              CreationDate: results[key].CreationDate
            } as RequestTabelData;

            requests.value.push(item)
          }

      loading.value = false;
    })

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
        await deleteCustomer(id)
        router.push({ name: "clients" })
      });

    }

    const submit = async () => {
      loading.value = true;
      await updateCustomer(formData.value)
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
            // router.push({ name: 'clients' })
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
      requests.value.splice(0, requests.value.length, ...initItems.value);
      if (search.value !== "") {
        let results: Array<RequestTabelData> = [];
        for (let j = 0; j < requests.value.length; j++) {
          if (searchingFunc(requests.value[j], search.value)) {
            results.push(requests.value[j]);
          }
        }
        requests.value.splice(0, requests.value.length, ...results);
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
        arraySort(requests.value, sort.label, { reverse });
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
      sort,
      tableHeader,
      onItemSelect,
      searchItems,
      search,
      requests
    };
  },
});
</script>