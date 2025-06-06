<template>
  <Loading v-if="loading" />
  <!--begin::Card-->
  <div v-else class="card">
    <!--begin::Card header-->
    <div class="card-header">
      <h2 class="card-title fw-bold">Calendar</h2>
      <div v-if="user.Role == 'Admin'" class="card-toolbar col-lg-3 col-md-9 col-sm-12">
        <select class="form-control selectpicker" v-model="agencyId">
          <option v-for="(item, index) in searchItems.Agencies" :key="index" :value="item.Id">{{ item.Name }} {{ item.LastName }}</option>
        </select>
      </div>
      <div v-if="user.Role == 'Admin' || user.Role == 'Agenzia'" class="card-toolbar col-lg-3 col-md-9 col-sm-12">
        <select class="form-control selectpicker" v-model="agentId">
          <option value>Visualizza tutti gli agenti</option>
          <option v-for="(item, index) in searchItems.Agents" :key="index" :value="item.Id">{{ item.Name }} {{
            item.LastName }}</option>
        </select>
      </div>
      <div class="card-toolbar col-lg-3 col-md-9 col-sm-12">
        <input type="text" class="form-control" v-model="search" @input="searchItemsFunc()"
          placeholder="Cerca evento, descrizione..." />
      </div>
      <div class="card-toolbar">
        <button class="btn btn-flex btn-primary" @click="newEvent(null, null)">
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Aggiungi Evento
        </button>
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
    :SelectedDateEnd="selectedDateEnd" @formAddSubmitted="getItems(agencyId, agentId)">
  </NewEventModal>
  <UpdateEventModal :Id="selectedId" @formUpdateSubmitted="getItems(agencyId, agentId)">
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
import { TODAY, todayDate, getEvents, getSearchItems, SearchModel } from "@/core/data/events";
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

        const item = {
          id: results[key].Id.toString(),
          title: addName ? `${results[key].ApplicationUser.Name} ${results[key].ApplicationUser.LastName}: ${results[key].NomeEvento}` : results[key].NomeEvento,
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

    

    onMounted(async () => {
      loading.value = true;
      if (store.user.Role == "Agenzia" || store.user.Role == "Admin") {
        await getItems(store.user.AgencyId, "");
        searchItems.value = await getSearchItems(store.user.Id, agencyId.value);
        agencyId.value = store.user.AgencyId;
      } else {
        await getItems(store.user.AgencyId, store.user.Id);
      }
      
      loading.value = false;
    });

    watch(() => agencyId.value, async (first, second) => {
      await getItems(agencyId.value, "");
      searchItems.value = await getSearchItems(store.user.Id, agencyId.value);
    })

    watch(() => agentId.value, async (first, second) => {
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
      user,
      searchItems,
      selectedDateStart,
      selectedDateEnd,
      todayDate,
      newTargetModalRef,
      userId,
      color,
      search,
      searchItemsFunc
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
