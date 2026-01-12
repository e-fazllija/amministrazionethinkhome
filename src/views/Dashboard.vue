<template>
  <div v-if="initialLoading" class="d-flex justify-content-center py-10">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div v-else-if="data" class="dashboard-wrapper">
    <!-- Dashboard -->
    <div>
      <!-- Filtri -->
      <div class="card theme-dark-bg-body mb-5">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title">
            <span class="card-label fw-bold fs-3">Filtri Dashboard</span>
          </h3>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Agenzia</label>
              <select v-model="selectedAgencyId" class="form-select form-select-solid">
                <option value="">Tutte le agenzie</option>
                <option v-for="agency in agencies" :key="agency.Id" :value="agency.Id">
                  {{ agency.Name }} {{ agency.LastName }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label fw-semibold">Periodo</label>
              <select v-model="selectedPeriod" class="form-select form-select-solid">
                <option value="all">Tutti i periodi</option>
                <option value="month">Questo mese</option>
                <option value="week">Questa settimana</option>
                <option value="today">Oggi</option>
              </select>
            </div>
            <div class="col-md-4 d-flex align-items-end">
              <button @click="refreshData" :disabled="loadingData" class="btn btn-primary w-100 position-relative">
                <span v-if="loadingData" class="spinner-border spinner-border-sm me-2" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
                <i v-else class="ki-duotone ki-arrows-circle fs-2 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Aggiorna Dati
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-md-6 col-lg-3">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <p class="dashboard-card-title mb-1">Immobili Totali</p>
                  <p class="dashboard-card-value mb-0">{{ data.RealEstatePropertyHomeDetails.Total }}</p>
                  <p class="dashboard-card-sub text-muted mb-0">
                    Vendita: {{ data.RealEstatePropertyHomeDetails.TotalSale }} | 
                    Affitto: {{ data.RealEstatePropertyHomeDetails.TotalRent }}
                  </p>
                </div>
                <div class="symbol symbol-50px">
                  <i class="ki-duotone ki-home-2 fs-2x text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <p class="dashboard-card-title mb-1">Immobili Venduti</p>
                  <p class="dashboard-card-value mb-0">{{ data.SalesDetails.TotalSold }}</p>
                  <p class="dashboard-card-sub text-muted mb-0">
                    Questo mese: {{ data.SalesDetails.SoldThisMonth }}
                  </p>
                </div>
                <div class="symbol symbol-50px">
                  <i class="ki-duotone ki-check-circle fs-2x text-success">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <p class="dashboard-card-title mb-1">Richieste Totali</p>
                  <p class="dashboard-card-value mb-0">{{ data.RequestHomeDetails.Total }}</p>
                  <p class="dashboard-card-sub text-muted mb-0">
                    Attive: {{ data.RequestHomeDetails.TotalActive }}
                  </p>
                </div>
                <div class="symbol symbol-50px">
                  <i class="ki-duotone ki-document fs-2x text-info">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <p class="dashboard-card-title mb-1">Valore Vendite</p>
                  <p class="dashboard-card-value mb-0">{{ formatCurrency(data.SalesDetails.TotalSalesValue) }}</p>
                  <p class="dashboard-card-sub text-muted mb-0">
                    Commissioni: {{ formatCurrency(data.SalesDetails.TotalCommissions) }}
                  </p>
                </div>
                <div class="symbol symbol-50px">
                  <i class="ki-duotone ki-dollar fs-2x text-warning">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grafici -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-xl-6">
          <Chart3 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" title="Immobili Inseriti"
            subTitle="Andamento mensile" :datas="propertiesTrend" />
        </div>
        <div class="col-xl-6">
          <Chart3 widget-classes="card-xl-stretch mb-xl-10" chart-height="100" title="Richieste Inserite"
            subTitle="Andamento mensile" :datas="requestsTrend" />
        </div>
      </div>

      <!-- Tabelle Dettagli -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-xl-6">
          <div class="card theme-dark-bg-body">
            <div class="card-header border-0 pt-5">
              <h3 class="card-title">
                <span class="card-label fw-bold fs-3">Immobili per Città (Vendita)</span>
              </h3>
            </div>
            <div class="card-body">
              <Chart4 widget-classes="" chart-height="100" :datas="topTownSale" title="" />
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card theme-dark-bg-body">
            <div class="card-header border-0 pt-5">
              <h3 class="card-title">
                <span class="card-label fw-bold fs-3">Richieste per Città (Vendita)</span>
              </h3>
            </div>
            <div class="card-body">
              <Chart4 widget-classes="" chart-height="100" :datas="topReqTownSale" title="" />
            </div>
    </div>
    </div>
    </div>

      <!-- Sezione Appuntamenti -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-xl-12">
          <h2 class="dashboard-section-title mb-4">Appuntamenti</h2>
    </div>
  </div>

      <!-- KPI Appuntamenti -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-md-6 col-lg-3">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <p class="dashboard-card-title mb-1">Appuntamenti Oggi</p>
              <p class="dashboard-card-value mb-0">{{ calendarDetails?.Today || 0 }}</p>
              <p class="dashboard-card-sub text-muted mb-0">
                Questa settimana: {{ calendarDetails?.ThisWeek || 0 }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <p class="dashboard-card-title mb-1">Questo Mese</p>
              <p class="dashboard-card-value mb-0">{{ calendarDetails?.ThisMonth || 0 }}</p>
              <p class="dashboard-card-sub text-muted mb-0">
                In arrivo: {{ calendarDetails?.Upcoming || 0 }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <p class="dashboard-card-title mb-1">Confermati</p>
              <p class="dashboard-card-value mb-0">{{ calendarDetails?.Confirmed || 0 }}</p>
              <p class="dashboard-card-sub text-muted mb-0">
                Cancellati: {{ calendarDetails?.Cancelled || 0 }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <p class="dashboard-card-title mb-1">Collegati</p>
              <p class="dashboard-card-value mb-0">{{ (calendarDetails?.LinkedToProperties || 0) + (calendarDetails?.LinkedToRequests || 0) }}</p>
              <p class="dashboard-card-sub text-muted mb-0">
                Immobili: {{ calendarDetails?.LinkedToProperties || 0 }} | Richieste: {{ calendarDetails?.LinkedToRequests || 0 }}
              </p>
    </div>
    </div>
    </div>
  </div>

      <!-- Filtri Appuntamenti Admin -->
      <div class="card theme-dark-bg-body mb-5">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title">
            <span class="card-label fw-bold fs-3">Filtri Appuntamenti</span>
          </h3>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label fw-semibold">Periodo</label>
              <select v-model="adminAppointmentFilter" @change="filterAdminAppointments" class="form-select form-select-solid">
                <option value="upcoming">Prossimi</option>
                <option value="today">Oggi</option>
                <option value="week">Questa settimana</option>
                <option value="month">Questo mese</option>
                <option value="past">Passati</option>
                <option value="all">Tutti</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label fw-semibold">Stato</label>
              <select v-model="adminAppointmentStatusFilter" @change="filterAdminAppointments" class="form-select form-select-solid">
                <option value="all">Tutti</option>
                <option value="confirmed">Confermati</option>
                <option value="pending">Da confermare</option>
                <option value="cancelled">Cancellati</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label fw-semibold">Tipo</label>
              <select v-model="adminAppointmentTypeFilter" @change="filterAdminAppointments" class="form-select form-select-solid">
                <option value="all">Tutti i tipi</option>
                <option v-for="(count, type) in calendarByType" :key="type" :value="type">
                  {{ type }} ({{ count }})
                </option>
              </select>
            </div>
            <div class="col-md-3 d-flex align-items-end">
              <button @click="refreshAppointments" :disabled="loadingAppointments" class="btn btn-primary w-100 position-relative">
                <span v-if="loadingAppointments" class="spinner-border spinner-border-sm me-2" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
                <i v-else class="ki-duotone ki-arrows-circle fs-2 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Aggiorna Appuntamenti
              </button>
            </div>
    </div>
    </div>
  </div>

      <!-- Tabelle Appuntamenti -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-xl-12">
          <div class="card theme-dark-bg-body">
            <div class="card-header border-0 pt-5">
              <div class="card-title d-flex justify-content-between align-items-center w-100">
                <span class="card-label fw-bold fs-3">Appuntamenti per Tipo</span>
                <div class="d-flex align-items-center">
                  <input 
                    v-model="searchType" 
                    type="text" 
                    class="form-control form-control-solid w-200px" 
                    placeholder="Cerca tipo..."
                  />
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  <thead class="sticky-top bg-light">
                    <tr class="fw-bold text-muted">
                      <th class="min-w-150px ps-5">Tipo</th>
                      <th class="min-w-100px text-end pe-5">Quantità</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(count, type) in filteredCalendarByTypeTable" :key="type">
                      <td class="ps-5">
                        <span class="text-dark fw-semibold d-block fs-7">{{ type }}</span>
                      </td>
                      <td class="text-end pe-5">
                        <span class="badge badge-light-primary">{{ count }}</span>
                      </td>
                    </tr>
                    <tr v-if="!filteredCalendarByTypeTable || Object.keys(filteredCalendarByTypeTable).length === 0">
                      <td colspan="2" class="text-center text-muted py-5">Nessun dato disponibile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-12">
          <div class="card theme-dark-bg-body">
            <div class="card-header border-0 pt-5">
              <div class="card-title d-flex justify-content-between align-items-center w-100">
                <span class="card-label fw-bold fs-3">Appuntamenti per Agente</span>
                <div class="d-flex align-items-center">
                  <input 
                    v-model="searchAgent" 
                    type="text" 
                    class="form-control form-control-solid w-200px" 
                    placeholder="Cerca agente..."
                  />
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  <thead class="sticky-top bg-light">
                    <tr class="fw-bold text-muted">
                      <th class="min-w-150px ps-5">Agente</th>
                      <th class="min-w-100px text-end pe-5">Quantità</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(count, agent) in filteredCalendarByAgentTable" :key="agent">
                      <td class="ps-5">
                        <span class="text-dark fw-semibold d-block fs-7">{{ agent }}</span>
                      </td>
                      <td class="text-end pe-5">
                        <span class="badge badge-light-info">{{ count }}</span>
                      </td>
                    </tr>
                    <tr v-if="!filteredCalendarByAgentTable || Object.keys(filteredCalendarByAgentTable).length === 0">
                      <td colspan="2" class="text-center text-muted py-5">Nessun dato disponibile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-12">
          <div class="card theme-dark-bg-body">
            <div class="card-header border-0 pt-5">
              <div class="card-title d-flex justify-content-between align-items-center w-100">
                <span class="card-label fw-bold fs-3">Appuntamenti per Città</span>
                <div class="d-flex align-items-center">
                  <input 
                    v-model="searchLocation" 
                    type="text" 
                    class="form-control form-control-solid w-200px" 
                    placeholder="Cerca città..."
                  />
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  <thead class="sticky-top bg-light">
                    <tr class="fw-bold text-muted">
                      <th class="min-w-150px ps-5">Città</th>
                      <th class="min-w-100px text-end pe-5">Quantità</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(count, location) in filteredCalendarByLocationTable" :key="location">
                      <td class="ps-5">
                        <span class="text-dark fw-semibold d-block fs-7">{{ location }}</span>
                      </td>
                      <td class="text-end pe-5">
                        <span class="badge badge-light-success">{{ count }}</span>
                      </td>
                    </tr>
                    <tr v-if="!filteredCalendarByLocationTable || Object.keys(filteredCalendarByLocationTable).length === 0">
                      <td colspan="2" class="text-center text-muted py-5">Nessun dato disponibile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
</div>

      <!-- Tabella Appuntamenti Admin -->
      <div class="card theme-dark-bg-body">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title">
            <span class="card-label fw-bold fs-3">Lista Appuntamenti</span>
          </h3>
        </div>
        <div class="card-body p-0">
          <div v-if="filteredAdminAppointments.length === 0" class="text-center py-10">
            <p class="text-muted">Nessun appuntamento trovato con i filtri selezionati.</p>
          </div>
          <div v-else class="table-responsive" style="max-height: 400px; overflow-y: auto;">
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead class="sticky-top bg-light">
                <tr class="fw-bold text-muted">
                  <th class="min-w-150px ps-5">Evento</th>
                  <th class="min-w-120px">Tipo</th>
                  <th class="min-w-150px">Data/Ora</th>
                  <th class="min-w-120px">Agente</th>
                  <th class="min-w-100px">Immobile</th>
                  <th class="min-w-80px text-end pe-5">Stato</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="appt in filteredAdminAppointments" :key="appt.Id">
                  <td class="ps-5"> 
                    <span class="text-dark fw-bold d-block fs-6">{{ appt.NomeEvento }}</span>
                  </td>
                  <td>
                    <span class="badge badge-light-primary">{{ appt.Type }}</span>
                  </td>
                  <td>
                    <span class="text-dark fw-semibold d-block fs-7">{{ formatDateTime(appt.DataInizioEvento) }}</span>
                    <span class="text-muted fw-semibold d-block fs-8">{{ formatTime(appt.DataInizioEvento) }} - {{ formatTime(appt.DataFineEvento) }}</span>
                  </td>
                  <td>
                    <span class="text-dark fw-semibold d-block fs-7">{{ appt.AgentName }}</span>
                  </td>
                  <td>
                    <span v-if="appt.PropertyTitle" class="text-dark fw-semibold d-block fs-7">{{ appt.PropertyTitle }}</span>
                    <span v-else class="text-muted fs-7">-</span>
                  </td>
                  <td class="text-end pe-5">
                    <span v-if="appt.Confirmed" class="badge badge-success">Confermato</span>
                    <span v-else-if="appt.Cancelled" class="badge badge-danger">Disdetto</span>
                    <span v-else-if="appt.Postponed" class="badge badge-info">Rimandato</span>
                    <span v-else class="badge badge-warning">Da confermare</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
    </div>
  </div>

  <div v-else class="text-center py-10">
    <p>Impossibile recuperare i dati al momento.</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Chart3 from "@/components/widgets/charts/Widget3.vue";
import Chart4 from "@/components/widgets/charts/Widget4.vue";
import { getDetails, getDashboardData, getDashboardAppointments, DashboardDetails, DashboardDataResponse, type UpcomingAppointment, type CalendarDetails } from "@/core/data/dashboard";
import { useAuthStore } from "@/stores/auth";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Chart3,
    Chart4
  },
  setup() {
    const initialLoading = ref<boolean>(true);
    const loadingData = ref<boolean>(false);
    const loadingAppointments = ref<boolean>(false);
    const data = ref<DashboardDetails>();
    const calendarData = ref<CalendarDetails>();
    const authStore = useAuthStore();
    const selectedAgencyId = ref<string>("");
    const selectedPeriod = ref<string>("all");
    const appointmentFilter = ref<string>("upcoming");
    const appointmentStatusFilter = ref<string>("all");
    const adminAppointmentFilter = ref<string>("upcoming");
    const adminAppointmentStatusFilter = ref<string>("all");
    const adminAppointmentTypeFilter = ref<string>("all");
    const searchType = ref<string>("");
    const searchAgent = ref<string>("");
    const searchLocation = ref<string>("");
    const agencies = ref<Array<{ Id: string; Name: string; LastName: string }>>([]);

    const role = computed(() => authStore.user?.Role || "");
    const isAdmin = computed(() => role.value === "Admin");
    const isAgency = computed(() => role.value === "Agenzia");
    const isAgent = computed(() => role.value === "Agente");
    const agentSelf = computed(() => data.value?.AgentSelf);

    const calendarDetails = computed(() => calendarData.value || data.value?.CalendarDetails);

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value || 0);
    };

    const formatDateTime = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    };

    const formatTime = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('it-IT', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    };

    const sortMonthly = (source?: Record<string, number>) => {
      if (!source) return {};
      const entries = Object.entries(source).map(([key, value]) => {
        const [m, y] = key.split("/").map((v) => parseInt(v));
        return { key, value, year: y, month: m };
      });
      const sorted = entries
        .filter((e) => !isNaN(e.year) && !isNaN(e.month))
        .sort((a, b) => (a.year === b.year ? a.month - b.month : a.year - b.year))
        .slice(-12);
      return sorted.reduce((acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
      }, {} as Record<string, number>);
    };

    const topEntries = (source?: Record<string, number>, limit = 6) => {
      if (!source) return {};
      return Object.entries(source)
        .map(([k, v]) => ({ k, v }))
        .filter((e) => typeof e.v === "number" && e.v > 0)
        .sort((a, b) => b.v - a.v)
        .slice(0, limit)
        .reduce((acc, cur) => {
          acc[cur.k] = cur.v;
          return acc;
        }, {} as Record<string, number>);
    };

    const propertiesTrend = computed(() =>
      sortMonthly(data.value?.RealEstatePropertyHomeDetails?.TotalCreatedPerMonth as Record<string, number> | undefined)
    );
    const requestsTrend = computed(() =>
      sortMonthly(data.value?.RequestHomeDetails?.TotalCreatedPerMonth as Record<string, number> | undefined)
    );
    const topTownSale = computed(() =>
      topEntries(data.value?.RealEstatePropertyHomeDetails?.DistinctByTownSale as Record<string, number> | undefined)
    );
    const topReqTownSale = computed(() =>
      topEntries(data.value?.RequestHomeDetails?.DistinctByTownSale as Record<string, number> | undefined)
    );

    const calendarByType = computed(() => {
      const source = (calendarData.value?.ByType || data.value?.CalendarDetails?.ByType) as Record<string, number> | undefined;
      if (!source) return {};
      return Object.entries(source)
        .map(([k, v]) => ({ k, v }))
        .filter((e) => typeof e.v === "number" && e.v > 0)
        .sort((a, b) => b.v - a.v)
        .slice(0, 6)
        .reduce((acc, cur) => {
          acc[cur.k] = cur.v;
          return acc;
        }, {} as Record<string, number>);
    });
    const calendarByLocation = computed(() =>
      topEntries((calendarData.value?.ByLocation || data.value?.CalendarDetails?.ByLocation) as Record<string, number> | undefined)
    );
    const calendarByAgent = computed(() =>
      topEntries((calendarData.value?.ByAgent || data.value?.CalendarDetails?.ByAgent) as Record<string, number> | undefined)
    );

    // Tabelle ordinate per quantità (decrescente)
    const calendarByTypeTable = computed(() => {
      const source = (calendarData.value?.ByType || data.value?.CalendarDetails?.ByType) as Record<string, number> | undefined;
      if (!source) return {};
      return Object.entries(source)
        .map(([k, v]) => ({ k, v: Number(v) }))
        .filter((e) => !isNaN(e.v) && e.v > 0)
        .sort((a, b) => b.v - a.v)
        .reduce((acc, cur) => {
          acc[cur.k] = cur.v;
          return acc;
        }, {} as Record<string, number>);
    });

    const calendarByAgentTable = computed(() => {
      const source = (calendarData.value?.ByAgent || data.value?.CalendarDetails?.ByAgent) as Record<string, number> | undefined;
      if (!source) return {};
      return Object.entries(source)
        .map(([k, v]) => ({ k, v: Number(v) }))
        .filter((e) => !isNaN(e.v) && e.v > 0)
        .sort((a, b) => b.v - a.v)
        .reduce((acc, cur) => {
          acc[cur.k] = cur.v;
          return acc;
        }, {} as Record<string, number>);
    });

    const calendarByLocationTable = computed(() => {
      const source = (calendarData.value?.ByLocation || data.value?.CalendarDetails?.ByLocation) as Record<string, number> | undefined;
      if (!source) return {};
      return Object.entries(source)
        .map(([k, v]) => ({ k, v: Number(v) }))
        .filter((e) => !isNaN(e.v) && e.v > 0)
        .sort((a, b) => b.v - a.v)
        .reduce((acc, cur) => {
          acc[cur.k] = cur.v;
          return acc;
        }, {} as Record<string, number>);
    });

    // Tabelle filtrate per ricerca
    const filteredCalendarByTypeTable = computed(() => {
      if (!searchType.value.trim()) return calendarByTypeTable.value;
      const search = searchType.value.toLowerCase().trim();
      const filtered: Record<string, number> = {};
      Object.entries(calendarByTypeTable.value).forEach(([key, value]) => {
        if (key.toLowerCase().includes(search)) {
          filtered[key] = value;
        }
      });
      return filtered;
    });

    const filteredCalendarByAgentTable = computed(() => {
      if (!searchAgent.value.trim()) return calendarByAgentTable.value;
      const search = searchAgent.value.toLowerCase().trim();
      const filtered: Record<string, number> = {};
      Object.entries(calendarByAgentTable.value).forEach(([key, value]) => {
        if (key.toLowerCase().includes(search)) {
          filtered[key] = value;
        }
      });
      return filtered;
    });

    const filteredCalendarByLocationTable = computed(() => {
      if (!searchLocation.value.trim()) return calendarByLocationTable.value;
      const search = searchLocation.value.toLowerCase().trim();
      const filtered: Record<string, number> = {};
      Object.entries(calendarByLocationTable.value).forEach(([key, value]) => {
        if (key.toLowerCase().includes(search)) {
          filtered[key] = value;
        }
      });
      return filtered;
    });

    const filteredAppointments = computed(() => {
      const appointmentsList = calendarData.value?.UpcomingAppointments || data.value?.CalendarDetails?.UpcomingAppointments;
      if (!appointmentsList) return [];
      let appointments = [...appointmentsList];
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      // Filtro per periodo
      if (appointmentFilter.value === "today") {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        appointments = appointments.filter(a => {
          const apptDate = new Date(a.DataInizioEvento);
          apptDate.setHours(0, 0, 0, 0);
          return apptDate >= today && apptDate < tomorrow;
        });
      } else if (appointmentFilter.value === "week") {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        appointments = appointments.filter(a => {
          const apptDate = new Date(a.DataInizioEvento);
          return apptDate >= weekStart && apptDate < weekEnd;
        });
      } else if (appointmentFilter.value === "month") {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        appointments = appointments.filter(a => {
          const apptDate = new Date(a.DataInizioEvento);
          return apptDate >= monthStart && apptDate < monthEnd;
        });
      } else if (appointmentFilter.value === "past") {
        appointments = appointments.filter(a => {
          const apptDate = new Date(a.DataInizioEvento);
          return apptDate < now;
        });
      }
      // "upcoming" mostra tutti (già filtrati dal backend)

      // Filtro per stato
      if (appointmentStatusFilter.value === "confirmed") {
        appointments = appointments.filter(a => a.Confirmed && !a.Cancelled);
      } else if (appointmentStatusFilter.value === "pending") {
        appointments = appointments.filter(a => !a.Confirmed && !a.Cancelled);
      } else if (appointmentStatusFilter.value === "cancelled") {
        appointments = appointments.filter(a => a.Cancelled);
      }

      // Ordina: futuri prima (crescente), poi passati (decrescente)
      return appointments.sort((a, b) => {
        const dateA = new Date(a.DataInizioEvento);
        const dateB = new Date(b.DataInizioEvento);
        const isFutureA = dateA >= now;
        const isFutureB = dateB >= now;
        
        if (isFutureA && !isFutureB) return -1;
        if (!isFutureA && isFutureB) return 1;
        if (isFutureA && isFutureB) return dateA.getTime() - dateB.getTime();
        return dateB.getTime() - dateA.getTime();
      });
    });

    const filteredAdminAppointments = computed(() => {
      const appointmentsList = calendarData.value?.UpcomingAppointments || data.value?.CalendarDetails?.UpcomingAppointments;
      if (!appointmentsList) return [];
      let appointments = [...appointmentsList];
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      // Filtro per periodo
      if (adminAppointmentFilter.value === "today") {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        appointments = appointments.filter(a => {
          const apptDate = new Date(a.DataInizioEvento);
          apptDate.setHours(0, 0, 0, 0);
          return apptDate >= today && apptDate < tomorrow;
        });
      } else if (adminAppointmentFilter.value === "week") {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        appointments = appointments.filter(a => {
          const apptDate = new Date(a.DataInizioEvento);
          return apptDate >= weekStart && apptDate < weekEnd;
        });
      } else if (adminAppointmentFilter.value === "month") {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        appointments = appointments.filter(a => {
          const apptDate = new Date(a.DataInizioEvento);
          return apptDate >= monthStart && apptDate < monthEnd;
        });
      } else if (adminAppointmentFilter.value === "past") {
        appointments = appointments.filter(a => {
          const apptDate = new Date(a.DataInizioEvento);
          return apptDate < now;
        });
      }
      // "upcoming" e "all" mostrano tutti (già filtrati dal backend)

      // Filtro per stato
      if (adminAppointmentStatusFilter.value === "confirmed") {
        appointments = appointments.filter(a => a.Confirmed && !a.Cancelled);
      } else if (adminAppointmentStatusFilter.value === "pending") {
        appointments = appointments.filter(a => !a.Confirmed && !a.Cancelled);
      } else if (adminAppointmentStatusFilter.value === "cancelled") {
        appointments = appointments.filter(a => a.Cancelled);
      }

      // Filtro per tipo
      if (adminAppointmentTypeFilter.value !== "all") {
        appointments = appointments.filter(a => a.Type === adminAppointmentTypeFilter.value);
      }

      // Ordina: futuri prima (crescente), poi passati (decrescente)
      return appointments.sort((a, b) => {
        const dateA = new Date(a.DataInizioEvento);
        const dateB = new Date(b.DataInizioEvento);
        const isFutureA = dateA >= now;
        const isFutureB = dateB >= now;
        
        if (isFutureA && !isFutureB) return -1;
        if (!isFutureA && isFutureB) return 1;
        if (isFutureA && isFutureB) return dateA.getTime() - dateB.getTime();
        return dateB.getTime() - dateA.getTime();
      });
    });

    async function loadAgencies() {
      if (!isAdmin.value) return;
      try {
        const response = await ApiService.get("Agencies/Get", "");
        if (response.data?.Data) {
          agencies.value = response.data.Data;
        }
      } catch (error) {
        console.error("Errore nel caricamento agenzie:", error);
      }
    }

    async function getItems() {
      initialLoading.value = true;
      const agencyId = selectedAgencyId.value ? selectedAgencyId.value : undefined;
      
      // Carica dati principali e appuntamenti in parallelo al primo caricamento
      const [dashboardData, appointments] = await Promise.all([
        getDashboardData(agencyId),
        getDashboardAppointments(agencyId)
      ]);
      
      if (dashboardData) {
        data.value = {
          ...dashboardData,
          CalendarDetails: appointments || {} as CalendarDetails
        } as DashboardDetails;
      }
      
      if (appointments) {
        calendarData.value = appointments;
        if (data.value) {
          data.value.CalendarDetails = appointments;
        }
      }
      
      initialLoading.value = false;
    }

    async function refreshData() {
      loadingData.value = true;
      const agencyId = selectedAgencyId.value ? selectedAgencyId.value : undefined;
      const dashboardData = await getDashboardData(agencyId);
      
      if (dashboardData && data.value) {
        data.value = {
          ...dashboardData,
          CalendarDetails: data.value.CalendarDetails
        } as DashboardDetails;
      }
      
      loadingData.value = false;
    }

    async function refreshAppointments() {
      loadingAppointments.value = true;
      const agencyId = selectedAgencyId.value ? selectedAgencyId.value : undefined;
      const appointments = await getDashboardAppointments(agencyId);
      
      if (appointments) {
        calendarData.value = appointments;
        if (data.value) {
          data.value.CalendarDetails = appointments;
        }
      }
      
      loadingAppointments.value = false;
    }

    function onAgencyChange() {
      // Non fa nulla, l'aggiornamento avviene solo tramite il pulsante
    }

    function filterAppointments() {
      // Il computed filteredAppointments si aggiorna automaticamente
    }

    function filterAdminAppointments() {
      // Il computed filteredAdminAppointments si aggiorna automaticamente
    }

    onMounted(async () => {
      await loadAgencies();
      await getItems();
    });

    return {
      initialLoading,
      loadingData,
      loadingAppointments,
      data,
      isAdmin,
      isAgency,
      isAgent,
      agentSelf,
      selectedAgencyId,
      selectedPeriod,
      appointmentFilter,
      appointmentStatusFilter,
      agencies,
      formatCurrency,
      formatDateTime,
      formatTime,
      propertiesTrend,
      requestsTrend,
      topTownSale,
      topReqTownSale,
      calendarDetails,
      calendarByType,
      calendarByLocation,
      calendarByAgent,
      calendarByTypeTable,
      calendarByAgentTable,
      calendarByLocationTable,
      filteredCalendarByTypeTable,
      filteredCalendarByAgentTable,
      filteredCalendarByLocationTable,
      searchType,
      searchAgent,
      searchLocation,
      filteredAppointments,
      filteredAdminAppointments,
      adminAppointmentFilter,
      adminAppointmentStatusFilter,
      adminAppointmentTypeFilter,
      onAgencyChange,
      filterAppointments,
      filterAdminAppointments,
      refreshData,
      refreshAppointments
    };
  },
});
</script>
