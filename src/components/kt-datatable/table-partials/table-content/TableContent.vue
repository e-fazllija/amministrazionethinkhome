<template>
  <div class="kt-table-responsive">
    <div class="kt-table-container">
      <table
        :class="[
          loading && 'kt-table-loading',
          'kt-table-modern align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        ]"
      >
        <TableHeadRow
          @onSort="onSort"
          @onSelect="selectAll"
          :checkboxEnabledValue="check"
          :checkboxEnabled="checkboxEnabled"
          :sort-label="sortLabel"
          :sort-order="sortOrder"
          :header="header"
        />
        <TableBodyRow
          v-if="data.length !== 0"
          @onSelect="itemsSelect"
          :currentlySelectedItems="selectedItems"
          :data="data"
          :header="header"
          :checkbox-enabled="checkboxEnabled"
          :checkbox-label="checkboxLabel"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
            <slot :name="name" :row="item" />
          </template>
        </TableBodyRow>
        <template v-else>
          <tr class="kt-empty-state-row">
            <td colspan="7" class="kt-empty-state-cell">
              <div class="kt-empty-state-content">
                <div class="kt-empty-state-title">No Data Available</div>
                <div class="kt-empty-state-subtitle">{{ emptyTableText }}</div>
              </div>
            </td>
          </tr>
        </template>
        <Loading v-if="loading" />
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import TableHeadRow from "@/components/kt-datatable/table-partials/table-content/table-head/TableHeadRow.vue";
import TableBodyRow from "@/components/kt-datatable/table-partials/table-content/table-body/TableBodyRow.vue";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "table-body",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    emptyTableText: { type: String, default: "No data found" },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    loading: { type: Boolean, required: false, default: false },
  },
  emits: ["on-sort", "on-items-select"],
  components: {
    TableHeadRow,
    TableBodyRow,
    Loading,
  },
  setup(props, { emit }) {
    const selectedItems = ref<Array<unknown>>([]);
    const allSelectedItems = ref<Array<unknown>>([]);
    const check = ref<boolean>(false);

    watch(
      () => props.data,
      () => {
        selectedItems.value = [];
        allSelectedItems.value = [];
        check.value = false;
        // eslint-disable-next-line
        props.data.forEach((item: any) => {
          if (item[props.checkboxLabel]) {
            allSelectedItems.value.push(item[props.checkboxLabel]);
          }
        });
      }
    );

    // eslint-disable-next-line
    const selectAll = (checked: any) => {
      check.value = checked;
      if (checked) {
        selectedItems.value = [
          ...new Set([...selectedItems.value, ...allSelectedItems.value]),
        ];
      } else {
        selectedItems.value = [];
      }
    };

    //eslint-disable-next-line
    const itemsSelect = (value: any) => {
      selectedItems.value = [];
      //eslint-disable-next-line
      value.forEach((item:any) => {
        if (!selectedItems.value.includes(item)) selectedItems.value.push(item);
      });
    };

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    watch(
      () => [...selectedItems.value],
      (currentValue) => {
        if (currentValue) {
          emit("on-items-select", currentValue);
        }
      }
    );

    onMounted(() => {
      selectedItems.value = [];
      allSelectedItems.value = [];
      check.value = false;
      // eslint-disable-next-line
      props.data.forEach((item: any) => {
        if (item[props.checkboxLabel]) {
          allSelectedItems.value.push(item[props.checkboxLabel]);
        }
      });
    });

    return {
      onSort,
      selectedItems,
      selectAll,
      itemsSelect,
      check,
    };
  },
});
</script>

<style lang="scss" scoped>
.kt-table-responsive {
  position: relative;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bs-gray-100);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--bs-gray-300);
    border-radius: 4px;
    transition: background 0.3s ease;

    &:hover {
      background: var(--bs-gray-400);
    }
  }
}

.kt-table-container {
  min-height: 200px;
  background: var(--bs-body-bg);
  border-radius: 8px;
  overflow: hidden;
}

.kt-table-modern {
  margin: 0;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  transition: all 0.3s ease;

  // Enhanced header styling
  thead {
    th {
      position: sticky;
      top: 0;
      z-index: 10;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-1px);
      }
    }
  }

  // Enhanced row animations
  tbody {
        tr {
          position: relative;
          transition: background-color 0.15s ease;

          &:hover {
            background: var(--bs-gray-50);

            td {
              color: var(--bs-gray-800);
            }
          }

          // Selection state
          &.selected {
            background: var(--bs-gray-50);

            &:before {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              width: 3px;
              background: var(--bs-primary);
            }
          }

          td {
            transition: color 0.15s ease;

            // Enhanced checkbox styling
            .form-check-input {
              transition: all 0.15s ease;
            }

            &[data-type="price"] {
              font-weight: 600;
              color: var(--bs-gray-800);
              font-family: 'Monaco', 'Menlo', monospace;
            }
          }
        }
  }

  // Enhanced empty state
  .kt-empty-state-row {
    .kt-empty-state-cell {
      padding: 2rem !important;
      text-align: center;
      color: var(--bs-gray-500);

      .kt-empty-state-content {
        .kt-empty-state-title {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
          color: var(--bs-gray-600);
        }

        .kt-empty-state-subtitle {
          font-size: 0.875rem;
          opacity: 0.8;
        }
      }
    }
  }
}

// Loading state enhancement
.kt-table-loading {
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
    z-index: 100;
    animation: kt-fade-in 0.3s ease;
  }
}

// Animations
@keyframes kt-row-slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes kt-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes kt-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

// Professional real estate specific styling
.kt-real-estate-table {
  .kt-table-modern {
    // Professional styling for real estate data
  }
}

// Mobile responsive enhancements
@media (max-width: 768px) {
  .kt-table-responsive {
    .kt-table-modern {
      font-size: 0.8rem;

      th, td {
        padding: 0.5rem !important;
        min-width: 120px;
      }

      .kt-empty-state-cell {
        padding: 2rem 1rem !important;

        .kt-empty-state-icon {
          font-size: 2rem;
        }

        .kt-empty-state-title {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
