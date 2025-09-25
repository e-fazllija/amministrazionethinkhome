<template>
  <div class="dataTables_wrapper dt-bootstrap4 no-footer">
    <TableContent
      @on-items-select="onItemSelect"
      @on-sort="onSort"
      :header="header"
      :data="dataToDisplay"
      :checkboxEnabled="checkboxEnabled"
      :checkboxLabel="checkboxLabel"
      :empty-table-text="emptyTableText"
      :sort-label="sortLabel"
      :sort-order="sortOrder"
      :loading="loading"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
        <slot :name="name" :row="item" />
      </template>
    </TableContent>
    <TableFooter
      @page-change="pageChange"
      :current-page="currentPage"
      v-model:itemsPerPage="itemsInTable"
      :count="totalItems"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import TableContent from "@/components/kt-datatable/table-partials/table-content/TableContent.vue";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "kt-datatable",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    itemsPerPage: { type: Number, default: 10 },
    itemsPerPageDropdownEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    total: { type: Number, required: false },
    loading: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    emptyTableText: { type: String, required: false, default: "No data found" },
    currentPage: { type: Number, required: false, default: 1 },
  },
  emits: [
    "page-change",
    "on-sort",
    "on-items-select",
    "on-items-per-page-change",
  ],
  components: {
    TableContent,
    TableFooter,
  },
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage);
    const itemsInTable = ref<number>(props.itemsPerPage);

    watch(
      () => itemsInTable.value,
      (val) => {
        currentPage.value = 1;
        emit("on-items-per-page-change", val);
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const dataToDisplay = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          return props.data;
        } else {
          let sliceFrom = (currentPage.value - 1) * itemsInTable.value;
          return props.data.slice(sliceFrom, sliceFrom + itemsInTable.value);
        }
      }
      return [];
    });

    const totalItems = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          return props.total;
        } else {
          return props.data.length;
        }
      }
      return 0;
    });

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    //eslint-disable-next-line
    const onItemSelect = (selectedItems: any) => {
      emit("on-items-select", selectedItems);
    };

    return {
      pageChange,
      dataToDisplay,
      onSort,
      onItemSelect,
      itemsInTable,
      totalItems,
    };
  },
});
</script>

<style lang="scss" scoped>
// Professional table styling that matches the sidebar design
.dataTables_wrapper {
  .table {
    // Clean, professional table styling
    border-collapse: separate;
    border-spacing: 0;
    margin: 0;

    // Professional header styling
    thead {
      th {
        background: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
        padding: 0.875rem 1rem;
        font-weight: 600;
        font-size: 0.8rem;
        color: #495057;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        position: relative;

        // Subtle hover effect
        &:hover {
          background: #e9ecef;
        }

        // Professional sort indicators
        .table-sort,
        .table-sort-asc,
        .table-sort-desc {
          &:after {
            margin-left: 0.5rem;
            font-size: 0.75rem;
          }
        }

        .table-sort-asc:after {
          content: "↑";
          color: var(--bs-primary);
        }

        .table-sort-desc:after {
          content: "↓";
          color: var(--bs-primary);
        }
      }
    }

    // Professional row styling
    tbody {
      tr {
        transition: background-color 0.2s ease;
        border-bottom: 1px solid var(--bs-border-color);

        &:hover {
          background: #f8f9fa;
        }

        td {
          padding: 0.75rem 1rem;
          vertical-align: middle;
          border: none;
          font-size: 0.875rem;
          color: #495057;

          &:first-child {
            font-weight: 600;
            color: #343a40;
          }

          // Ensure checkbox column has consistent width
          &:first-child {
            width: 30px;
            min-width: 30px;
            max-width: 30px;
            text-align: center;
          }
        }
      }
    }

    // Professional checkbox styling (general - not for header/body specific)
    .form-check-input:not(.checkbox-input):not(.header-checkbox-input) {
      border-radius: 4px;
      border: 1px solid var(--bs-gray-300);
      width: 16px;
      height: 16px;

      &:checked {
        background-color: var(--bs-primary);
        border-color: var(--bs-primary);
      }

      &:focus {
        box-shadow: 0 0 0 2px rgba(54, 153, 255, 0.1);
      }
    }
  }

  // Professional empty state
  .dataTables_empty {
    text-align: center;
    padding: 2rem !important;
    color: var(--bs-gray-500);
    font-size: 0.875rem;
    background: var(--bs-gray-25);
  }
}

// Professional pagination matching sidebar style
.pagination {
  margin: 0;
  gap: 0.125rem;

  .page-item {
    .page-link {
      border: 1px solid var(--bs-border-color);
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      color: var(--bs-gray-600);
      font-weight: 500;
      transition: all 0.2s ease;
      min-width: 36px;
      text-align: center;
      background: var(--bs-body-bg);
      font-size: 0.875rem;

      &:hover {
        background: var(--bs-gray-100);
        color: var(--bs-gray-800);
        border-color: var(--bs-gray-300);
      }

      &:focus {
        box-shadow: 0 0 0 2px rgba(54, 153, 255, 0.1);
      }
    }

    &.active .page-link {
      background: var(--bs-primary);
      color: white;
      border-color: var(--bs-primary);
    }

    &.disabled .page-link {
      color: var(--bs-gray-400);
      background: var(--bs-gray-50);
      border-color: var(--bs-gray-200);
    }
  }
}

// Professional form select styling
.form-select {
  border: 1px solid var(--bs-border-color);
  border-radius: 6px;
  padding: 0.5rem 2rem 0.5rem 1rem;
  font-size: 0.875rem;
  background-position: right 0.75rem center;
  background-color: var(--bs-body-bg);
  color: var(--bs-gray-700);

  &:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 2px rgba(54, 153, 255, 0.1);
  }
}

// Subtle professional enhancements for real estate
.kt-professional-table {
  .table {
    thead {
      th {
        background: linear-gradient(135deg, var(--bs-gray-50) 0%, var(--bs-gray-100) 100%);
        border-bottom: 2px solid var(--bs-border-color);
      }
    }

    tbody {
      tr {
        &:hover {
          background: linear-gradient(135deg, var(--bs-gray-25) 0%, rgba(54, 153, 255, 0.02) 100%);
        }
      }
    }
  }
}

// Mobile responsive adjustments
@media (max-width: 768px) {
  .dataTables_wrapper {
    .table {
      th, td {
        padding: 0.5rem;
        font-size: 0.8rem;
      }
    }

    .dataTables_empty {
      padding: 1rem !important;
    }
  }

  .pagination {
    .page-item .page-link {
      padding: 0.4rem 0.6rem;
      min-width: 32px;
      font-size: 0.8rem;
    }
  }

  .form-select {
    font-size: 0.8rem;
    padding: 0.4rem 1.5rem 0.4rem 0.75rem;
  }
}
</style>