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
            placeholder="Ricerca"
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
          <!--begin::Add Agent-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_agency"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Aggiungi Agenzia
          </button>
          <!--end::Add Agent-->
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
      <template v-slot:UserName="{ row: agent }">
          {{ agent.UserName }}
        </template>
        <template v-slot:Name="{ row: agent }">
          {{ agent.Name }}
        </template>
        <template v-slot:LastName="{ row: agent }">
          {{ agent.LastName }}
        </template>
        <template v-slot:Email="{ row: agent }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ agent.Email }}
          </a>
        </template>
        <template v-slot:PhoneNumber="{ row: agent }">
          {{ agent.PhoneNumber }}
        </template>
        
          <template v-slot:actions="{ row: agent }">
                   <button class="btn btn-light-info me-1" data-bs-toggle="modal"
                        data-bs-target="#kt_modal_update_agency"
                        @click="selectId(agent.Id)">Dettagli</button>

                  <!-- <button @click="deleteItem(agent.Id)" class="btn btn-light-danger me-1">Elimina</button> -->
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
  <AddAgencyModal @formAddSubmitted="getItems('')"></AddAgencyModal>
  <UpdateAgencyModal :Id="selectedId" @formUpdateSubmitted="getItems('')"></UpdateAgencyModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getAgencies, deleteAgency, Agency } from "@/core/data/agencies";
import AddAgencyModal from "@/components/modals/forms/agencies/AddAgencyModal.vue";
import UpdateAgencyModal from "@/components/modals/forms/agencies/UpdateAgencyModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "agencies",
  components: {
    Datatable,
    ExportCustomerModal,
    AddAgencyModal,
    UpdateAgencyModal,
  },
  setup() {
    const tableHeader = ref([
    {
        columnName: "UserName",
        columnLabel: "UserName",
        sortEnabled: true,
        columnWidth: 175,
      },
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
        columnLabel: "PhoneNumber",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const selectedIds = ref<Array<String>>([]);
    let selectedId = ref<string>();
    const tableData = ref();
    const initAgents = ref([]);
    
    async function getItems(filterRequest: string) {
         tableData.value = await getAgencies(filterRequest);
    };

    onMounted(async () => {
      await getItems("");
      initAgents.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteAgency(item)
      });
      selectedIds.value.length = 0;
      await getItems("");
    };

    const deleteAgent = (id: number) => {
      for (let i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].Id === id) {
          tableData.value.splice(i, 1);
        }
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initAgents.value);
      if (search.value !== "") {
        let results: Array<Agency> = [];
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
            (typeof obj[key] === "string" || Array.isArray(obj[key])) // Verifica stringhe o array
        ) {
            if (obj[key].indexOf(value) !== -1) {
                return true;
            }
        }
      }
      return false;
    };

    async function deleteItem(id: String){
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
        await deleteAgency(id)
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

    const selectId = (id: string) => {
      selectedId.value = id;
    };

    const onItemSelect = (selectedItems: Array<String>) => {
      selectedIds.value = selectedItems;
    };

    return {
      tableData,
      tableHeader,
      deleteAgent,
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
      getItems
    };
  },
});
</script>
