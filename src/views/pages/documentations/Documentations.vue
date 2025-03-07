<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" v-model="search" @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15" placeholder="Ricerca" />
        </div>
        <!--end::Search-->
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
          <input class="form-control" type="file" multiple @change="handleFileUpload">
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div v-else class="d-flex justify-content-end align-items-center" data-kt-customer-table-toolbar="selected">
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span>Seleziona
          </div>
          <button type="button" class="btn btn-danger" @click="deleteFewItems()">
            Cancella Selezionati
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center d-none" data-kt-customer-table-toolbar="selected">
          <div class="fw-bold me-5">
            <span class="me-2" data-kt-customer-table-select="selected_count"></span>Seleziona
          </div>
          <button type="button" class="btn btn-danger" data-kt-customer-table-select="delete_selected">
            Cancella Selezionati
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :loading="loading" :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="Id">
        <template v-slot:FileName="{ row: documentations }">
          {{ documentations.FileName.split("/")[1] }}
        </template>
        <template v-slot:Actions="{ row: documentations }">
          <a class="btn btn-light-info me-1" download :href="documentations.FileUrl">Scarica</a>
          <button @click="deleteItem(documentations.Id)" class="btn btn-light-danger me-1">Elimina</button>
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
</template>

<script lang="ts">
import { Documentation, getDocumentations, uploadFile, deleteDocumentation } from "@/core/data/documentations";
import Swal from "sweetalert2";
import { defineComponent, ref, onMounted } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import arraySort from "array-sort";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "DocumentTable",
  components: { Datatable },

  setup() {
    const store = useAuthStore();
    const selectedIds = ref<Array<number>>([]);
    const fileInput = ref<HTMLInputElement | null>(null);
    let loading = ref<boolean>(true);
    const tableData = ref<Array<Documentation>>([]);
    const initItems = ref([]);

    const formData = ref<Documentation>({
      File: null,
      FileName: "",
      FolderName: "Moduli",
    });

    const tableHeader = ref([
      {
        columnName: "File",
        columnLabel: "FileName",
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

    const handleFileUpload = async (event: Event) => {
      loading.value = true;
      const input = event.target as HTMLInputElement;
      if (input?.files) {
        formData.value.File = input.files[0];
        event = null;
        await addFile();
        loading.value = false;
      }
    };

    const getItems = async () => {
      tableData.value = await getDocumentations();
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
    };

    onMounted(async () => {
      loading.value = true;
      await getItems();
      loading.value = false;

    });

    const addFile = async () => {
      await uploadFile(formData.value);
      Swal.fire({
        text: "File caricati con successo!",
        icon: "success",
        confirmButtonText: "Continua!",
      });
      const error = store.errors;

      if (!error) {
        Swal.fire({
          text: "Il modulo è stato inviato con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Continua!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(async function () {
          await getItems();
          loading.value = false;
        });
      } else {
        loading.value = false;
        Swal.fire({
          text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    const deleteFewItems = async () => {
      loading.value = true;
      selectedIds.value.forEach(async (item) => {
        await deleteDocumentation(item)
      });
      selectedIds.value.length = 0;
      await getItems();
      loading.value = false;
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initItems.value);
      if (search.value !== "") {
        let results: Array<Documentation> = [];
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
    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };
    async function deleteItem(id: number) {
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
        await deleteDocumentation(id)
        await getItems();
        loading.value = false;
        MenuComponent.reinitialization();
      });
    }


    return {
      handleFileUpload,
      fileInput,
      addFile,
      loading,
      tableData,
      search,
      searchItems,
      selectedIds,
      deleteFewItems,
      sort,
      onItemSelect,
      tableHeader,
      deleteItem
    };
  },
});
</script>
