<template>
    <div class="card">
      <div class="card-header border-0 pt-6">
        <!--begin::Card title-->
        <div class="card-title">
          <!--begin::Search-->
          <div class="d-flex align-items-center position-relative my-1">
            <KTIcon
              icon-name="magnifier"
              icon-class="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              v-model="search"
              @input="searchItems()"
              class="form-control form-control-solid w-250px ps-15"
              placeholder="Ricerca Clienti"
            />
          </div>
          <!--end::Search-->
        </div>
        <!--begin::Card title-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Toolbar-->
          <div
            v-if="selectedIds.length === 0"
            class="d-flex justify-content-end"
            data-kt-request-table-toolbar="base"
          >
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
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_add_request"
            >
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Aggiungi Richiesta
            </button>
            <!--end::Add request-->
          </div>
          <!--end::Toolbar-->
          <!--begin::Group actions-->
          <div
            v-else
            class="d-flex justify-content-end align-items-center"
            data-kt-request-table-toolbar="selected"
          >
            <div class="fw-bold me-5">
              <span class="me-2">{{ selectedIds.length }}</span
              >Seleziona
            </div>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteFewItems()"
            >
              Cancella Selezionati
            </button>
          </div>
          <!--end::Group actions-->
          <!--begin::Group actions-->
          <div
            class="d-flex justify-content-end align-items-center d-none"
            data-kt-request-table-toolbar="selected"
          >
            <div class="fw-bold me-5">
              <span
                class="me-2"
                data-kt-request-table-select="selected_count"
              ></span
              >Seleziona
            </div>
            <button
              type="button"
              class="btn btn-danger"
              data-kt-request-table-select="delete_selected"
            >
              Cancella Selezionati
            </button>
          </div>
          <!--end::Group actions-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <div class="card-body pt-0">
        <Datatable
          @on-sort="sort"
          @on-items-select="onItemSelect"
          :data="tableData"
          :header="tableHeader"
          :enable-items-per-page-dropdown="true"
          :checkbox-enabled="true"
          checkbox-label="Id"
          :loading="loading"
        >
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
              data-kt-menu="true"
            >
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
  import { defineComponent, onMounted, ref } from "vue";
  import Datatable from "@/components/kt-datatable/KTDataTable.vue";
  import type { Sort } from "@/components/kt-datatable//table-partials/models";
  import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
  import AddRequestModal from "@/components/modals/forms/requests/AddRequestModal.vue";
  import arraySort from "array-sort";
  import { MenuComponent } from "@/assets/ts/components";
  import { getRequests, Request, deleteRequest, RequestTabelData } from "@/core/data/requests";
  import Swal from "sweetalert2";
  
  export default defineComponent({
    name: "requests",
    components: {
      Datatable,
      ExportCustomerModal,
      AddRequestModal
    },
    setup() {
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

      const selectedIds = ref<Array<number>>([]);
      let selectedId = ref(0);
      let loading = ref<boolean>(true);
      const tableData = ref<Array<RequestTabelData>>([]);
      const initCustomers = ref([]);
      async function getItems(filterRequest: string) {
        loading.value = true;
          const results = await getRequests(filterRequest);
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

            tableData.value.push(item)
          }
          loading.value = false;
      };
  
      onMounted(async () => {
        await getItems("");
        initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
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
        tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
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
              (typeof obj[key] === "string" || Array.isArray(obj[key]))
          ) {
              if (obj[key].indexOf(value) !== -1) {
                  return true;
              }
          }
        }
        return false;
      };
  
      async function deleteItem(id: number){
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
  
      const selectId = (id: number) => {
        selectedId.value = id;
      };
  
      const onItemSelect = (selectedItems: Array<number>) => {
        selectedIds.value = selectedItems;
      };
  
      return {
        tableData,
        tableHeader,
        search,
        searchItems,
        selectedId,
        selectedIds,
        deleteFewItems,
        sort,
        onItemSelect,
        getAssetPath,
        deleteItem,
        selectId,
        getItems,
        loading
      };
    },
  });
  </script>
  