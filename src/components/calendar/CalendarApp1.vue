<template>
  <Loading v-if="loading" />
  <!--begin::Card-->
  <div v-else class="card">
    <!--begin::Card header-->
    <div class="card-header">
      <!-- Title Section -->
      <div class="card-title">
        <h2 class="fw-bold mb-0">
          <KTIcon icon-name="calendar" icon-class="fs-2 me-2" />
          Calendario Eventi
        </h2>
      </div>
      
      <!-- Filters Section -->
      <div class="card-toolbar d-flex flex-wrap gap-3">
        <!-- Agency Filter (Admin only) -->
        <div v-if="user.Role == 'Admin'" class="d-flex flex-column">
          <label class="form-label fs-7 fw-semibold text-gray-600 mb-1">
            <KTIcon icon-name="office-bag" icon-class="fs-7 me-1" />
            Agenzia
          </label>
          <select class="form-select form-select-sm min-w-150px" v-model="agencyId">
            <option v-for="(item, index) in searchItems.Agencies" :key="index" :value="item.Id">
              {{ item.Name }} {{ item.LastName }}
            </option>
          </select>
        </div>

        <!-- Agent Filter -->
        <div v-if="user.Role == 'Admin' || user.Role == 'Agenzia'" class="d-flex flex-column">
          <label class="form-label fs-7 fw-semibold text-gray-600 mb-1">
            <KTIcon icon-name="profile-user" icon-class="fs-7 me-1" />
            Agente
          </label>
          <select class="form-select form-select-sm min-w-150px" v-model="agentId">
            <option value="">Tutti gli agenti</option>
            <option v-for="(item, index) in searchItems.Agents" :key="index" :value="item.Id">
              {{ item.Name }} {{ item.LastName }}
            </option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="d-flex flex-column">
          <label class="form-label fs-7 fw-semibold text-gray-600 mb-1">
            <KTIcon icon-name="check-circle" icon-class="fs-7 me-1" />
            Stato
          </label>
          <select class="form-select form-select-sm min-w-150px" v-model="statusFilter">
            <option value="">Tutti gli stati</option>
            <option value="confirmed">✓ Confermati</option>
            <option value="cancelled">✗ Disdetti</option>
            <option value="postponed">⏸ Rimandati</option>
            <option value="pending">⏳ In attesa</option>
          </select>
        </div>

        <!-- Search -->
        <div class="d-flex flex-column">
          <label class="form-label fs-7 fw-semibold text-gray-600 mb-1">
            <KTIcon icon-name="magnifier" icon-class="fs-7 me-1" />
            Cerca
          </label>
          <div class="position-relative">
            <KTIcon icon-name="magnifier" icon-class="fs-6 position-absolute ms-3 top-50 translate-middle-y text-gray-500" />
            <input type="text" class="form-control form-control-sm ps-10 min-w-200px" v-model="search" 
                   @input="searchItemsFunc()" placeholder="Cerca evento, descrizione..." />
          </div>
        </div>

        <!-- Add Event Button -->
        <div class="d-flex flex-column justify-content-end">
          <button class="btn btn-primary btn-sm" @click="newEvent(null, null)">
            <KTIcon icon-name="plus" icon-class="fs-6 me-1" />
            Nuovo Evento
          </button>
        </div>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Calendar-->
      <FullCalendar class="demo-app-calendar" :options="calendarOptions"></FullCalendar>
      <!--end::Calendar-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <NewEventModal :UserId="userId" :Color="color" :SelectedDateStart="selectedDateStart"
    :SelectedDateEnd="selectedDateEnd" @formAddSubmitted="refreshEvents">
  </NewEventModal>
  <UpdateEventModal :Id="selectedId" @formUpdateSubmitted="refreshEvents">
  </UpdateEventModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, watch, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { TODAY, todayDate, getEvents, getSearchItems, SearchModel, Event } from "@/core/data/events";
import NewEventModal from "@/components/modals/forms/calendar/NewEventModal.vue";
import UpdateEventModal from "@/components/modals/forms/calendar/UpdateEventModal.vue";
import { Modal } from "bootstrap";
import { useAuthStore } from "@/stores/auth";
import type { EventInput } from "@fullcalendar/core";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";
import itLocale from '@fullcalendar/core/locales/it';
import Multiselect from '@vueform/multiselect';
import { MenuComponent } from "@/assets/ts/components";


export default defineComponent({
  name: "calendar-app-1",
  components: {
    FullCalendar,
    NewEventModal,
    UpdateEventModal,
    Loading,
    Multiselect
  },
  setup() {
    const loading = ref<boolean>(true);
    let selectedId = ref(0);
    let selectedDateStart = ref<string>("");
    let selectedDateEnd = ref<string>("");
    let agentId = ref("");
    let agencyId = ref("");
    let statusFilter = ref("");
    const initItems = ref([]);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const user = store.user;
    const searchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })

    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })

    const userId = computed(() => {
      if (user.Role == "Admin" || user.Role == "Agenzia") {
        return agentId.value != null && agentId.value != "" ? agentId.value : user.Id
      }
      else {
        return user.Id
      }
    })

    const color = computed(() => {
      if (agentId.value != null && agentId.value != "") {
        if (user.Role == "Admin" || user.Role == "Agenzia") {
          const userSelected = searchItems.value.Agents.filter(x => x.Id == agentId.value)[0];
          return userSelected.Color;
        }
        else {
          return user.Color;
        }
      }
    })

    // Funzione per determinare i parametri corretti per getItems in base al ruolo
    const getItemsParams = () => {
      if (user.Role == "Admin" || user.Role == "Agenzia") {
        // Admin e Agenzia possono filtrare per agente
        return { agencyId: agencyId.value, agentId: agentId.value };
      } else {
        // Agente: mostra sempre solo i propri eventi
        return { agencyId: user.AgencyId, agentId: user.Id };
      }
    }

    // Funzione per aggiornare gli eventi dopo aggiunta/modifica
    const refreshEvents = () => {
      const params = getItemsParams();
      getItems(params.agencyId, params.agentId);
    }

    const newEvent = async (start: string, end: string) => {
      if (!start || !end) {

        const today = todayDate.format("YYYY-MM-DD"); // Data di oggi
        selectedDateStart.value = `${today}T07:00:00`; // Imposta l'orario di inizio alle 7:00
        selectedDateEnd.value = `${today}T08:00:00`; // Imposta l'orario di fine alle 8:00
      } else {
        selectedDateStart.value = start.toString();
        selectedDateEnd.value = end.toString();
      }

      const modal = new Modal(
        document.getElementById("kt_modal_add_event") as Element
      );
      modal.show();

      const modalElement = document.getElementById("kt_modal_add_event");
      if (modalElement) {
        modalElement.addEventListener("hidden.bs.modal", () => {
          // Rimuove il backdrop
          document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

          // Rimuove forzatamente la classe modal-open dal body
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
        });
      }
    };


    const updateEvent = (id: number) => {
      selectedId.value = id;
      const modal = new Modal(
        document.getElementById("kt_modal_update_event") as Element
      );
      modal.show();
    };

    const tableData = ref<Array<EventInput>>([]);

    async function getItems(_agencyId: string, _agentId: string) {
      tableData.value.splice(0);
      initItems.value.splice(0);
      const results = await getEvents(_agencyId, _agentId);
      const addName = store.user.Role != "Agente" && agentId.value == "" ? true : false;
      
      for (const key in results) {
        // Apply status filter
        if (statusFilter.value && !matchesStatusFilter(results[key], statusFilter.value)) {
          continue;
        }

        // Add status indicator to title
        let statusIndicator = "";
        if (results[key].Confirmed) {
          statusIndicator = " ✓";
        } else if (results[key].Cancelled) {
          statusIndicator = " ✗";
        } else if (results[key].Postponed) {
          statusIndicator = " ⏸";
        } else {
          statusIndicator = " ⏳";
        }

        const baseTitle = addName ? `${results[key].ApplicationUser.Name} ${results[key].ApplicationUser.LastName}: ${results[key].DescrizioneEvento} - ${results[key].NomeEvento} ` : results[key].NomeEvento;
        
        const item = {
          id: results[key].Id.toString(),
          title: baseTitle + statusIndicator,
          start: results[key].DataInizioEvento,
          end: results[key].DataFineEvento,
          description: results[key].DescrizioneEvento,
          className: "fc-event-meeting",
          color: results[key].Color != null && results[key].Color != "" ? results[key].Color : results[key].ApplicationUser.Color
        } as EventInput;

        tableData.value.push(item)
      }
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
    };

    

    // Flag per evitare che i watch si attivino durante l'inizializzazione
    const isInitializing = ref(true);

    onMounted(async () => {
      loading.value = true;
      agencyId.value = store.user.AgencyId; // Imposta prima per evitare chiamate duplicate
      
      // Carica i dati in parallelo
      const loadPromises: Promise<any>[] = [];
      
      if (store.user.Role == "Agenzia" || store.user.Role == "Admin") {
        loadPromises.push(
          getItems(store.user.AgencyId, ""),
          getSearchItems(store.user.Id, store.user.AgencyId).then(result => {
            searchItems.value = result;
          })
        );
      } else {
        loadPromises.push(getItems(store.user.AgencyId, store.user.Id));
      }
      
      await Promise.all(loadPromises);
      isInitializing.value = false;
      loading.value = false;
    });

    watch(() => agencyId.value, async (newVal, oldVal) => {
      // Evita chiamate durante l'inizializzazione
      if (isInitializing.value || !newVal || newVal === oldVal) return;
      
      await Promise.all([
        getItems(newVal, ""),
        getSearchItems(store.user.Id, newVal).then(result => {
          searchItems.value = result;
        })
      ]);
    })

    watch(() => agentId.value, async (newVal, oldVal) => {
      // Evita chiamate durante l'inizializzazione
      if (isInitializing.value || newVal === oldVal) return;
      
      await getItems(agencyId.value, newVal);
    })

    watch(() => statusFilter.value, async (newVal, oldVal) => {
      // Evita chiamate durante l'inizializzazione
      if (isInitializing.value || newVal === oldVal) return;
      
      await getItems(agencyId.value, agentId.value);
    })


    const search = ref<string>("");
    const searchItemsFunc = () => {
      tableData.value.splice(0, tableData.value.length, ...initItems.value);
      if (search.value !== "") {
        let results: Array<EventInput> = [];
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

    const matchesStatusFilter = (event: Event, filter: string): boolean => {
      switch (filter) {
        case "confirmed":
          return event.Confirmed === true && event.Cancelled === false && event.Postponed === false;
        case "cancelled":
          return event.Cancelled === true;
        case "postponed":
          return event.Postponed === true;
        case "pending":
          return event.Confirmed === false && event.Cancelled === false && event.Postponed === false;
        default:
          return true;
      }
    };

    const calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: "timeGridDay",
      slotMinTime: "07:00:00",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      initialDate: TODAY,
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,

      views: {
        dayGridMonth: { buttonText: "mese" },
        timeGridWeek: { buttonText: "settimana" },
        timeGridDay: { buttonText: "giorno" },
      },

      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: tableData.value,
      dateClick: (arg) => {
        if (arg.allDay) {
          const start = new Date(arg.dateStr + "T07:00:00"); // Ora di inizio: 7:00
          const end = new Date(arg.dateStr + "T08:00:00"); // Ora di fine: 8:00
          newEvent(start.toISOString(), end.toISOString()); // Passa le date formattate
        } else {
          const start = new Date(arg.dateStr);
          const end = new Date(start.getTime());
          end.setMinutes(start.getMinutes() + 30); // Aggiungi 30 minuti per la fine

          newEvent(start.toISOString(), end.toISOString()); // Passa i nuovi orari all'evento
        }
      },
      eventClick: (arg) => {
        updateEvent(parseInt(arg.event.id));
      },
      select: (arg) => {
        newEvent(arg.start, arg.end);
      },
      locale: 'it', // Imposta la lingua su italiano
      locales: [itLocale], // Aggiungi la localizzazione italiana
      buttonText: {
        today: 'Oggi',
        month: 'Mese',
        week: 'Settimana',
        day: 'Giorno',
      },
    };

    return {
      calendarOptions,
      newEvent,
      updateEvent,
      getAssetPath,
      loading,
      getItems,
      selectedId,
      agentId,
      agencyId,
      statusFilter,
      user,
      searchItems,
      selectedDateStart,
      selectedDateEnd,
      todayDate,
      newTargetModalRef,
      userId,
      color,
      search,
      searchItemsFunc,
      refreshEvents
    };
  },
});
</script>

<style lang="scss">
.fc .fc-button {
  padding: 0.75rem 1.25rem;
  box-shadow: none !important;
  border: 0 !important;
  border-radius: 0.475rem;
  vertical-align: middle;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
