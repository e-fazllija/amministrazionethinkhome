<template>
  <div class="card">
    <div class="row m-2">
      <div class="col-md-3 col-lg-3 mb-2">
        <input type="text" v-model="search" class="form-control form-control-solid" placeholder="Cerca" />
      </div>
      <div v-if="user.Role == 'Admin'" class="col-lg-3 col-md-9 col-sm-12">
        <select class="form-control selectpicker" v-model="agencyId">
          <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">{{ item.Name }} {{
            item.LastName }}</option>
        </select>
      </div>
      <div class="col d-flex justify-content-end align-items-start mb-2">
        <button type="button" @click="searchItems" class="btn btn-light-primary me-3">
          <KTIcon icon-name="search" icon-class="fs-2" /> Cerca
        </button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_agent">
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Aggiungi Agente
        </button>
      </div>
    </div>

    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
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
          <button class="btn btn-light-info me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_update_agent"
            @click="selectId(agent.Id)">Dettagli</button>

          <!-- <button @click="deleteItem(agent.Id)" class="btn btn-light-danger me-1">Elimina</button> -->
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
  <AddAgentModal @formAddSubmitted="getItems(agencyId, '')"></AddAgentModal>
  <UpdateAgentModal :Id="selectedId" @formUpdateSubmitted="getItems(agencyId, '')"></UpdateAgentModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getAgents, deleteAgent, Agent } from "@/core/data/agents";
import AddAgentModal from "@/components/modals/forms/agents/AddAgentModal.vue";
import UpdateAgentModal from "@/components/modals/forms/agents/UpdateAgentModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getSearchItems, SearchModel } from "@/core/data/events";
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "agents",
  components: {
    Datatable,
    ExportCustomerModal,
    AddAgentModal,
    UpdateAgentModal,
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
    const initItems = ref([]);
    const store = useAuthStore();
    const user = store.user;
    let agencyId = ref("");
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })

    async function getItems(agencyId: string, filterRequest: string) {
      tableData.value = await getAgents(agencyId, filterRequest);
    };

    onMounted(async () => {
      if (store.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(store.user.Id, "");
      }
      agencyId.value = store.user.Id;
      await getItems(agencyId.value, "");
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteAgent(item)
      });
      selectedIds.value.length = 0;
      await getItems(agencyId.value, "");
    };

    const search = ref<string>("");

    const searchItems = async () => {
      await getItems(agencyId.value, "");

      if (search.value !== "") {
        let results: Array<Agent> = [];
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

    async function deleteItem(id: string) {
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
        await deleteAgent(id)
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
      getItems,
      user,
      agencyId,
      defaultSearchItems
    };
  },
});
</script>
