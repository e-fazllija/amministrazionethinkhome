<template>
  <Loading v-if="loading" />
  <!--begin::Card-->
  <div v-else class="card">
    <!--begin::Card header-->
    <div class="card-header">
      <h2 class="card-title fw-bold">Calendar</h2>
      <div v-if="user.Role == 'Admin'" class="card-toolbar col-lg-4 col-md-9 col-sm-12">
        <select class="form-control selectpicker" v-model="agencyId">
          <option v-for="(item, index) in searchItems.Agencies" :key="index" :value="item.Id">{{ item.Name }}</option>
        </select>
      </div>
      <div v-if="user.Role == 'Admin' || user.Role == 'Agency'" class="card-toolbar col-lg-4 col-md-9 col-sm-12">
        <select class="form-control selectpicker" v-model="agentId">
          <option value>Visualizza tutti gli agenti</option>
          <option v-for="(item, index) in searchItems.Agents" :key="index" :value="item.Id">{{ item.Name }} {{
            item.LastName }}</option>
        </select>
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

  <NewEventModal :SelectedDateStart="selectedDateStart" :SelectedDateEnd="selectedDateEnd" @formAddSubmitted="getItems('')"></NewEventModal>
  <UpdateEventModal :Id="selectedId" @formUpdateSubmitted="getItems('')"></UpdateEventModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import events, { TODAY, todayDate, getEvents, getSearchItems, Event, SearchModel } from "@/core/data/events";
import NewEventModal from "@/components/modals/forms/calendar/NewEventModal.vue";
import UpdateEventModal from "@/components/modals/forms/calendar/UpdateEventModal.vue";
import { Modal } from "bootstrap";
import { useAuthStore } from "@/stores/auth";
import type { EventInput } from "@fullcalendar/core";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";
import itLocale from '@fullcalendar/core/locales/it';

export default defineComponent({
  name: "calendar-app-1",
  components: {
    FullCalendar,
    NewEventModal,
    UpdateEventModal,
    Loading
  },
  setup() {
    const loading = ref<boolean>(true);
    let selectedId = ref(0);
    let selectedDateStart = ref<string>("");
    let selectedDateEnd = ref<string>("");
    let agentId = ref("");
    let agencyId = ref("");

    const store = useAuthStore();
    const user = store.user;
    
    const newEvent = (start: string, end: string) => {
      selectedDateStart.value = start || todayDate.format("YYYY-MM-DD");
      selectedDateEnd.value = end || todayDate.format("YYYY-MM-DD");
      const modal = new Modal(
        document.getElementById("kt_modal_add_event") as Element
      );
      modal.show();
    };

    const updateEvent = (id: number) => {
      selectedId.value = id;
      const modal = new Modal(
        document.getElementById("kt_modal_update_event") as Element
      );
      modal.show();
    };

    const tableData = ref<Array<EventInput>>([]);

    async function getItems(filterRequest: string) {
      loading.value = true;
      tableData.value.splice(0);
      const results = await getEvents(filterRequest);

      for (const key in results) {
        const item = {
          id: results[key].Id.toString(),
          title: results[key].NomeEvento,
          start: results[key].DataInizioEvento,
          end: results[key].DataFineEvento,
          description: results[key].DescrizioneEvento,
          className: "fc-event-success"
        } as EventInput;

        tableData.value.push(item)
      }

      if (store.user.Role == "Agency" || store.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(store.user.Id);
        searchItems.value.Agencies = defaultSearchItems.value.Agencies;
        if (store.user.Role == "Agency") {
          agencyId.value = store.user.Id;
          searchItems.value.Agents = defaultSearchItems.value.Agents.filter(x => x.AgencyId == agencyId.value);
        } else {
          agencyId.value = defaultSearchItems.value.Agencies[0].Id;
          searchItems.value.Agents = defaultSearchItems.value.Agents;
        }
      }

      loading.value = false;
    };

    const searchItems = ref<SearchModel>({
      Agencies: [],
      Agents: []
    })

    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: []
    })

    onMounted(async () => {
      await getItems("");

    });

    watch(() => agencyId.value, async (first, second) => {
      if (first) {
        searchItems.value.Agents = defaultSearchItems.value.Agents.filter(x => x.AgencyId == first);
      } else {
        searchItems.value.Agents = defaultSearchItems.value.Agents;
      }
    })

    watch(() => agentId.value, async (first, second) => {
      if (first) {
        await getItems(first);
      } else {
        await getItems("");
      }
    })

    const calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
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
        console.log(arg)
        newEvent(arg.dateStr, null);
      },
      eventClick: (arg) => {
        updateEvent(parseInt(arg.event.id));
      },
      select: (arg) => {
    // Passa le date di inizio e fine al metodo newEvent
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
      todayDate
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
