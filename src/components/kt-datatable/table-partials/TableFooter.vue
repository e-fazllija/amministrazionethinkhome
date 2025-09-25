<template>
  <div class="kt-table-footer">
    <div class="kt-footer-content">
      <!-- Items per page selector -->
      <div class="kt-items-per-page" v-if="itemsPerPageDropdownEnabled">
        <label class="kt-items-label">Show:</label>
        <TableItemsPerPageSelect
          v-model:itemsPerPage="itemsCountInTable"
          :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
        />
        <span class="kt-items-text">entries</span>
      </div>

      <!-- Pagination info -->
      <div class="kt-pagination-info">
        <span class="kt-info-text">
          Showing {{ getShowingRange() }} of {{ count }} entries
        </span>
      </div>

      <!-- Enhanced Pagination -->
      <div class="kt-pagination-wrapper" v-if="pageCount > 1">
        <TablePagination
          :total-pages="pageCount"
          :total="count"
          :per-page="itemsPerPage"
          :current-page="page"
          @page-change="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TableItemsPerPageSelect from "@/components/kt-datatable/table-partials/table-content/table-footer/TableItemsPerPageSelect.vue";
import TablePagination from "./table-content/table-footer/TablePagination.vue";
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  type WritableComputedRef,
} from "vue";

export default defineComponent({
  name: "table-footer",
  components: {
    TableItemsPerPageSelect,
    TablePagination,
  },
  props: {
    count: { type: Number, required: false, default: 5 },
    itemsPerPage: { type: Number, default: 5 },
    itemsPerPageDropdownEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    currentPage: { type: Number, required: false, default: 1 },
  },
  emits: ["update:itemsPerPage", "page-change"],
  setup(props, { emit }) {
    const page = ref(props.currentPage);
    const inputItemsPerPage = ref(props.itemsPerPage);

    watch(
      () => props.count,
      () => {
        page.value = 1;
      }
    );

    watch(
      () => inputItemsPerPage.value,
      () => {
        page.value = 1;
      }
    );

    onMounted(() => {
      inputItemsPerPage.value = props.itemsPerPage;
    });

    const pageChange = (newPage: number) => {
      page.value = newPage;
      emit("page-change", page.value);
    };

    const itemsCountInTable: WritableComputedRef<number> = computed({
      get(): number {
        return props.itemsPerPage;
      },
      set(value: number): void {
        inputItemsPerPage.value = value;
        emit("update:itemsPerPage", value);
      },
    });

    const pageCount = computed(() => {
      return Math.ceil(props.count / itemsCountInTable.value);
    });

    const getShowingRange = () => {
      const start = (page.value - 1) * itemsCountInTable.value + 1;
      const end = Math.min(page.value * itemsCountInTable.value, props.count);
      return `${start}-${end}`;
    };

    return {
      pageChange,
      pageCount,
      page,
      itemsCountInTable,
      inputItemsPerPage,
      getShowingRange,
    };
  },
});
</script>

<style lang="scss" scoped>
.kt-table-footer {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-top: 1px solid var(--bs-border-color);
  padding: 1rem 2rem;
  border-radius: 0 0 12px 12px;

  .kt-footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    .kt-items-per-page {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .kt-items-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--bs-gray-600);
        margin: 0;
      }

      .kt-items-text {
        font-size: 0.875rem;
        color: var(--bs-gray-500);
        margin-left: 0.5rem;
      }
    }

    .kt-pagination-info {
      .kt-info-text {
        font-size: 0.875rem;
        color: var(--bs-gray-600);
        font-weight: 500;
        background: var(--bs-body-bg);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: 1px solid var(--bs-border-color);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    }

    .kt-pagination-wrapper {
      display: flex;
      align-items: center;
    }
  }
}

// Enhanced pagination styling
:deep(.pagination) {
  margin: 0;
  gap: 0.25rem;

  .page-item {
    .page-link {
      border: none;
      border-radius: 8px;
      padding: 0.5rem 0.75rem;
      color: var(--bs-gray-600);
      font-weight: 500;
      transition: all 0.2s ease;
      min-width: 40px;
      text-align: center;
      background: var(--bs-body-bg);
      border: 1px solid var(--bs-border-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      &:hover {
        background: #e9ecef;
        color: var(--bs-primary);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(54, 153, 255, 0.12);
        border-color: #dee2e6;
      }

      &:focus {
        box-shadow: 0 0 0 3px rgba(54, 153, 255, 0.1);
      }

      i {
        font-size: 0.75rem;
      }
    }

    &.active .page-link {
      background: var(--bs-primary);
      color: white;
      box-shadow: 0 2px 8px rgba(54, 153, 255, 0.3);
      border-color: var(--bs-primary);
    }

    &.disabled .page-link {
      color: #6c757d;
      background: #f8f9fa;
      border-color: #e9ecef;
    }

    // Navigation arrows
    &.page-nav {
      .page-link {
        padding: 0.5rem;
        min-width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
}

// Items per page selector styling
:deep(.form-select) {
  border: 1px solid var(--bs-border-color);
  border-radius: 6px;
  padding: 0.5rem 2rem 0.5rem 1rem;
  font-size: 0.875rem;
  background-position: right 0.75rem center;
  transition: all 0.2s ease;
  background-color: #f8f9fa;
  color: #495057;

  &:hover {
    border-color: #dadce0;
    box-shadow: 0 0 0 2px rgba(54, 153, 255, 0.1);
  }

  &:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 3px rgba(54, 153, 255, 0.1);
  }

  option {
    padding: 0.25rem 0.5rem;
  }
}

// Professional styling for real estate
.kt-real-estate-footer {
  .kt-footer-content {
    .kt-pagination-info .kt-info-text {
      border: 1px solid var(--bs-border-color);
    }
  }
}

// Mobile responsive design
@media (max-width: 768px) {
  .kt-table-footer {
    padding: 1rem;
    text-align: center;

    .kt-footer-content {
      flex-direction: column;
      gap: 1rem;

      .kt-items-per-page {
        order: 2;
      }

      .kt-pagination-info {
        order: 1;
      }

      .kt-pagination-wrapper {
        order: 3;
        width: 100%;
        justify-content: center;
      }
    }
  }

  :deep(.pagination) {
    flex-wrap: wrap;
    justify-content: center;

    .page-item {
      margin: 0.125rem;
    }
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .kt-table-footer {
    background: linear-gradient(135deg, var(--bs-gray-800) 0%, var(--bs-gray-700) 100%);
    border-color: var(--bs-gray-600);

    .kt-footer-content {
      .kt-pagination-info .kt-info-text {
        background: var(--bs-gray-800);
        border-color: var(--bs-gray-600);
        color: var(--bs-gray-300);
      }
    }
  }

  :deep(.pagination) {
    .page-item {
      .page-link {
        background: #2d3748;
        border-color: #4a5568;
        color: #e2e8f0;

        &:hover {
          background: var(--bs-primary);
          border-color: var(--bs-primary);
          color: white;
        }
      }

      &.active .page-link {
        background: var(--bs-primary);
        border-color: var(--bs-primary);
      }

      &.disabled .page-link {
        background: #1a202c;
        border-color: #2d3748;
        color: #4a5568;
      }
    }
  }

  :deep(.form-select) {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;

    &:hover {
      border-color: var(--bs-primary);
    }

    &:focus {
      border-color: var(--bs-primary);
    }
  }
}
</style>
