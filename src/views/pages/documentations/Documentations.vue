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
        <div class="d-flex align-items-center position-relative ms-3">
        <select class="form-control form-control-solid" v-model="contract">
                <option value="">Tipologia</option>
                <option value="Compratore">Compratore</option>
                <option value="Venditore">Venditore</option>
                <option value="Costruttore">Costruttore</option>
                <option value="Cliente gold">Cliente gold</option>
              </select>
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
          data-kt-customer-table-toolbar="base"
        >
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
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Aggiungi Documenti
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
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
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Seleziona
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
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
      >
        <template v-slot:Name="{ row: customer }">
          {{ customer.Name }}
        </template>
        <template v-slot:Type="{ row: customer }">
          {{ customer.Type }}
        </template>
        <template v-slot:Email="{ row: customer }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ customer.Email }}
          </a>
        </template>
        <template v-slot:Phone="{ row: customer }">
          {{ customer.Phone }}
        </template>
          <template v-slot:Actions="{ row: customer }">
            <router-link :to="{ name: 'client', params: { id: customer.Id } }" 
                    class="btn btn-light-info me-1"
                       >Dettagli</router-link>

                  <!-- <button @click="deleteItem(customer.Id)" class="btn btn-light-danger me-1">Elimina</button> -->
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
  <AddCustomerModal @formAddSubmitted="getItems('')"></AddCustomerModal>
  <UpdateCustomerModal :Id="selectedId" @formUpdateSubmitted="getItems('')"></UpdateCustomerModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddCustomerModal from "@/components/modals/forms/customer/AddCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getDocumentations, Documentation, deleteDocumentation, DocumentationTabelData } from "@/core/data/documentations";
import UpdateCustomerModal from "@/components/modals/forms/customer/UpdateCustomerModal.vue";
import Swal from "sweetalert2";

 

export default defineComponent({
  name: "documentations",
  components: {
    Datatable,
    ExportCustomerModal,
    AddCustomerModal,
    UpdateCustomerModal,
  },
  setup() {
    let loading = ref<boolean>(true);
    const tableHeader = ref([
      {
        columnName: "Cliente",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Tipologia",
        columnLabel: "Type",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Email",
        columnLabel: "Email",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Telefono",
        columnLabel: "Phone",
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
    const tableData = ref<Array<CustomerTabelData>>([]);
    const initCustomers = ref([]);
    async function getItems(filterRequest: string) {
      loading.value = true;
        const results = await getCustomers(filterRequest);
        for (const key in results) {
          const item = {
            Id: results[key].Id,
            Name: results[key].Name + " " + results[key].LastName,
            Type: results[key].Buyer ? "Compratore" : results[key].Seller ? "Venditore" : results[key].Builder ? "Costruttore" : results[key].GoldCustomer ? "Cliente gold" : "",
            Email: results[key].Email,
            Phone: results[key].Phone.toString()
          } as CustomerTabelData;

          tableData.value.push(item)
        }
        initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
        loading.value = false;
    };

    onMounted(async () => {
      await getItems("");
      
    });

    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteCustomer(item)
      });
      selectedIds.value.length = 0;
      await getItems("");
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results: Array<CustomerTabelData> = [];
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

    const contract = ref<string>("");
    watch(
      () => contract.value,
      (newValue) => {
        tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
        if (newValue) {
          let results: Array<CustomerTabelData> = [];
          for (let j = 0; j < tableData.value.length; j++) {
            if (searchingFunc(tableData.value[j], newValue.toLowerCase())) {
              results.push(tableData.value[j]);
            }
          }
          tableData.value.splice(0, tableData.value.length, ...results);
        }
      }
    );

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
        await deleteCustomer(id)
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
      deleteCustomer,
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
      contract
    };
  },
});
</script>
