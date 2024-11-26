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
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Export-->
          <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-2" />
            Export
          </button>
          <!--end::Export-->
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Aggiungi Cliente
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
            @click="deleteFewCustomers()"
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
        <template v-slot:LastName="{ row: customer }">
          {{ customer.LastName }}
        </template>
        <template v-slot:Email="{ row: customer }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ customer.Email }}
          </a>
        </template>
        <template v-slot:Phone="{ row: customer }">
          {{ customer.Phone }}
        </template>
        <template v-slot:Date="{ row: customer }">
          {{ customer.Date }}
        </template>
          <template v-slot:Actions="{ row: customer }">
                   <button class="btn btn-light-info me-1" data-bs-toggle="modal"
                        data-bs-target="#kt_modal_update_customer"
                        @click="selectId(customer.Id)">Dettagli</button>

                        <!-- <button class="btn btn-light-info me-1" 
                        @click="toggleUpdateModal(true, customer.id)">Dettagli</button> -->

                  <button @click="confirmDeleteCustomer(customer.Id)" class="btn btn-light-danger me-1">Elimina</button>
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
  <AddCustomerModal></AddCustomerModal>
  <UpdateCustomerModal :Id="selectedId"></UpdateCustomerModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddCustomerModal from "@/components/modals/forms/customer/AddCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getCustomers, Customer, deleteCustomer } from "@/core/data/customers";
import UpdateCustomerModal from "@/components/modals/forms/customer/UpdateCustomerModal.vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";

 

export default defineComponent({
  name: "clients",
  components: {
    Datatable,
    ExportCustomerModal,
    AddCustomerModal,
    UpdateCustomerModal,
  },
  setup() {
    let updateCustomerModal = ref (null);
    const tableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Cognome",
        columnLabel: "LastName",
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
      // {
      //   columnName: "Payment Method",
      //   columnLabel: "paymentMethod",
      //   sortEnabled: true,
      //   columnWidth: 175,
      // },
      {
        columnName: "Data Creazione",
        columnLabel: "Date",
        sortEnabled: true,
        columnWidth: 225,
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
    const tableData = ref<Array<Customer>>();
    const initCustomers = ref([]);
      async function getItems(filterRequest: string) {
          tableData.value = await getCustomers(filterRequest);
        
      };

    onMounted(() => {
      // initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
      getItems("");
    });

    const deleteFewCustomers = () => {
      selectedIds.value.forEach((item) => {
        deleteCustomer(item);
      });
      selectedIds.value.length = 0;
    };

    const confirmDeleteCustomer = (Id) => {
           if (!Id) {console.error("ID non valido per l'eliminazione.");
           return;
           }
         Swal.fire({
          text: "Sei sicuro di voler eliminare questo cliente?",
          icon: "warning",
          showCancelButton: true,
          buttonsStyling: false,
          confirmButtonText: "Sì, elimina!",
          cancelButtonText: "Annulla",
          customClass: {
          confirmButton: "btn btn-danger", 
          cancelButton: "btn btn-secondary", 
          },
          heightAuto: false,
          }).then((result) => {
          if (result.isConfirmed) {deleteCustomer(Id);
          } else {
          console.log("Eliminazione annullata dall'utente.");
          }
       });
     };

    const deleteCustomer = async (Id) => {
    try {
      const response = await  ApiService.delete(`https://localhost:7267/api/Customers/Delete?id=${Id}`);
      if (response.status === 200 || response.status === 204) {
        getItems("");
      } else {
        console.error('Errore durante l\'eliminazione del cliente:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Errore nella risposta dell\'API:', error.response.data);
      } else {
        console.error('Errore generico:', error.message);
      }
     }
     return undefined;
    };


    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results: Array<Customer> = [];
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
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };

    const deleteItem = (id: number) => {
      for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].Id === id) {
      tableData.value.splice(i, 1);}
      }
      MenuComponent.reinitialization(); 
};
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

    function toggleUpdateModal(value, id){
      console.log(id)
      selectedId.value = id;
      updateCustomerModal.value.show = value
    };

    return {
      updateCustomerModal,
      toggleUpdateModal,
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      selectedId,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
      getAssetPath,
      deleteItem,
      selectId,
      confirmDeleteCustomer,
      getItems,
      
    };
  },
});
</script>
