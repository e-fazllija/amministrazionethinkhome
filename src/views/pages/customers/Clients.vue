<template>
  <div class="card">
    <div class="row m-2">
      <div class="col-md-3 col-lg-3 mb-2">
        <input type="text" v-model="search" class="form-control form-control-solid" placeholder="Cerca" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 d-flex gap-2">
        <select class="form-control selectpicker" v-model="contract">
          <option value="">Tipologia</option>
          <option value="Compratore">Compratore</option>
          <option value="Venditore">Venditore</option>
          <option value="Costruttore">Costruttore</option>
          <option value="Cliente gold">Cliente gold</option>
        </select>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 d-flex gap-2">
        <select v-if="user.Role == 'Admin'" class="form-control selectpicker" v-model="agencyId">
          <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">
            {{ item.Name }} {{ item.LastName }}
          </option>
        </select>
      </div>
      <div class="col-md-3 d-flex justify-content-end align-items-start mb-2">
        <button type="button" @click="searchItems" class="btn btn-light-primary me-3">
          <KTIcon icon-name="search" icon-class="fs-2" /> Cerca
        </button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_customer">
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Aggiungi Cliente
        </button>
      </div>
    </div>
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
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
          <router-link :to="{ name: 'client', params: { id: customer.Id } }" target="_blank"
            class="btn btn-light-info me-1">Dettagli</router-link>

          <!-- <button @click="deleteItem(customer.Id)" class="btn btn-light-danger me-1">Elimina</button> -->
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
  <AddCustomerModal @formAddSubmitted="getItems(agencyId, '')"></AddCustomerModal> 
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
import { getCustomers, Customer, deleteCustomer, CustomerTabelData } from "@/core/data/customers";
import Swal from "sweetalert2";
import { getSearchItems, SearchModel } from "@/core/data/events";
import { useAuthStore, type User } from "@/stores/auth";


export default defineComponent({
  name: "clients",
  components: {
    Datatable,
    ExportCustomerModal,
    AddCustomerModal
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
    const initItems = ref([]);
    const store = useAuthStore();
    const user = store.user;
    let agencyId = ref("");
    const contract = ref<string>("");
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })

    async function getItems(agencyId: string, filterRequest: string) {
      loading.value = true;
      tableData.value = [];
      const results = await getCustomers(agencyId, filterRequest);
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
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
      loading.value = false;
    };

    onMounted(async () => {
      if (store.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(store.user.Id);
      }
      agencyId.value = store.user.AgencyId;

      await getItems(agencyId.value, "");
    });

    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteCustomer(item)
      });
      selectedIds.value.length = 0;
      await getItems(agencyId.value, "");
    };

    const search = ref<string>("");

    const searchItems = async () => {
      await getItems(agencyId.value, "");

      if(contract.value)
        tableData.value = tableData.value.filter(x => x.Type == contract.value)

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
        await deleteCustomer(id)
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
      contract,
      user,
      agencyId,
      defaultSearchItems
    };
  },
});
</script>
