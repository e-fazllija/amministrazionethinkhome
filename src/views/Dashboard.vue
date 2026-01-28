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
            <div v-if="isAdmin" class="col-md-4">
              <label class="form-label fw-semibold">Agenzia</label>
              <select v-model="selectedAgencyId" class="form-select form-select-solid">
                <option value="">Tutte le agenzie</option>
                <option v-for="agency in agencies" :key="agency.Id" :value="agency.Id">
                  {{ agency.Name }} {{ agency.LastName }}
                </option>
              </select>
            </div>
            <div :class="{'col-md-4': !isAgent || !isAgency, 'col-md-8': isAgent || isAgency}">
              <label class="form-label fw-semibold">Periodo</label>
              <select v-model="selectedPeriod" class="form-select form-select-solid">
                <option value="all">Tutti i periodi</option>
                <option value="today">Oggi</option>
                <option value="yesterday">Ieri</option>
                <option value="lastWeek">Settimana precedente</option>
                <option value="week">Questa settimana</option>
                <option value="month">Questo mese</option>
                <option value="lastMonth">Mese precedente</option>
                <option value="last3Months">Ultimi 3 mesi</option>
                <option value="last6Months">Ultimi 6 mesi</option>
                <option value="lastYear">Ultimo anno</option>
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
        <div class="col-md-6 col-lg-6">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <p class="dashboard-card-title mb-1">Immobili Totali Inseriti</p>
                  <p class="dashboard-card-value mb-0">{{ data.RealEstatePropertyHomeDetails.Total }}</p>
                  <p class="dashboard-card-sub text-muted mb-0">
                    Vendita: {{ data.RealEstatePropertyHomeDetails.TotalSale }} | 
                    Affitto: {{ data.RealEstatePropertyHomeDetails.TotalRent }} |
                    Attivi: {{ agentStats?.ActivePropertiesManaged || 0 }}
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
        <div class="col-md-6 col-lg-6">
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

      <!-- Sezione Agenti -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-xl-12">
          <h2 class="dashboard-section-title mb-4">Agenti</h2>
        </div>
      </div>

      <!-- KPI Agenti -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-md-6 col-lg-6">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <p class="dashboard-card-title mb-1">Acquisizioni</p>
                  <p class="dashboard-card-value mb-0">{{ agentStats?.TotalAcquisitions || 0 }}</p>
                  <p class="dashboard-card-sub text-muted mb-0">
                    Questo mese: {{ agentStats?.AcquisitionsThisMonth || 0 }}
                  </p>
                </div>
                <div class="symbol symbol-50px">
                  <i class="ki-duotone ki-chart-simple fs-2x text-success">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-6">
          <div class="card dashboard-card theme-dark-bg-body">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <p class="dashboard-card-title mb-1">Appuntamenti</p>
                  <p class="dashboard-card-value mb-0">{{ agentStats?.TotalAppointments || 0 }}</p>
                  <p class="dashboard-card-sub text-muted mb-0">
                    Disdetti: {{ agentStats?.AppointmentsDisdetti || 0 }} | Confermati: {{ agentStats?.AppointmentsConfermati || 0 }}
                  </p>
                </div>
                <div class="symbol symbol-50px">
                  <i class="ki-duotone ki-calendar fs-2x text-info">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabella Dettagli Agenti -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-xl-12">
          <div class="card theme-dark-bg-body">
            <div class="card-header border-0 pt-5">
              <div class="card-title d-flex justify-content-between align-items-center w-100">
                <span class="card-label fw-bold fs-3">Dettagli per Agente</span>
                <div class="d-flex align-items-center gap-3">
                  <select 
                    v-model="selectedEventType" 
                    class="form-select form-select-solid w-200px"
                  >
                    <option value="">Tutte le tipologie</option>
                    <option v-for="tipologia in tipologieEvento" :key="tipologia" :value="tipologia">
                      {{ tipologia }}
                    </option>
                  </select>
                  <input 
                    v-model="searchAgentDetails" 
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
                      <th class="min-w-120px text-end">Immobili Gestiti</th>
                      <th class="min-w-120px text-end">Acquisizioni</th>
                      <th class="min-w-140px text-end">Appuntamenti Disdetti</th>
                      <th class="min-w-140px text-end">Appuntamenti Confermati</th>
                      <th class="min-w-140px text-end pe-5">Appuntamenti Effettuati</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="agent in filteredAgentDetails" :key="agent.name">
                      <td class="ps-5">
                        <span class="text-dark fw-semibold d-block fs-7">{{ agent.name }}</span>
                      </td>
                      <td class="text-end">
                        <span class="badge badge-light-primary">{{ agent.propertiesManaged }}</span>
                      </td>
                      <td class="text-end">
                        <span class="badge badge-light-success">{{ agent.acquisitions }}</span>
                      </td>
                      <td class="text-end">
                        <span class="badge badge-light-danger">{{ agent.appointmentsDisdetti }}</span>
                      </td>
                      <td class="text-end">
                        <span class="badge badge-light-success">{{ agent.appointmentsConfermati }}</span>
                      </td>
                      <td class="text-end pe-5">
                        <span class="badge badge-light-primary">{{ agent.appointmentsEffettuati }}</span>
                      </td>
                    </tr>
                    <tr v-if="!filteredAgentDetails || filteredAgentDetails.length === 0">
                      <td colspan="6" class="text-center text-muted py-5">Nessun dato disponibile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sezione Immobili -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-xl-12">
          <h2 class="dashboard-section-title mb-4">Immobili</h2>
        </div>
      </div>

      <!-- Immobili con più appuntamenti -->
      <div class="row gy-5 g-xl-10 mb-5">
        <div class="col-xl-6">
          <div class="card theme-dark-bg-body">
            <div class="card-header border-0 pt-5">
              <div class="card-title d-flex justify-content-between align-items-center w-100">
                <span class="card-label fw-bold fs-3">Immobili con più Appuntamenti</span>
                <div class="d-flex align-items-center">
                  <input 
                    v-model="searchPropertyAppointments" 
                    type="text" 
                    class="form-control form-control-solid w-200px" 
                    placeholder="Cerca immobile..."
                  />
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  <thead class="sticky-top bg-light">
                    <tr class="fw-bold text-muted">
                      <th class="min-w-200px ps-5">Immobile</th>
                      <th class="min-w-100px text-end pe-5">Appuntamenti</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="property in filteredPropertiesWithAppointments" :key="property.id">
                      <td class="ps-5">
                        <span class="text-dark fw-semibold d-block fs-7">{{ property.title }}</span>
                      </td>
                      <td class="text-end pe-5">
                        <span class="badge badge-light-primary">{{ property.count }}</span>
                      </td>
                    </tr>
                    <tr v-if="!filteredPropertiesWithAppointments || filteredPropertiesWithAppointments.length === 0">
                      <td colspan="2" class="text-center text-muted py-5">Nessun dato disponibile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card theme-dark-bg-body">
            <div class="card-header border-0 pt-5">
              <div class="card-title d-flex justify-content-between align-items-center w-100">
                <span class="card-label fw-bold fs-3">Immobili Caricati</span>
                <div class="d-flex align-items-center">
                  <input 
                    v-model="searchLoadedProperties" 
                    type="text" 
                    class="form-control form-control-solid w-200px" 
                    placeholder="Cerca immobile..."
                  />
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  <thead class="sticky-top bg-light">
                    <tr class="fw-bold text-muted">
                      <th class="min-w-200px ps-5">Immobile</th>
                      <th class="min-w-150px">Data Caricamento</th>
                      <th class="min-w-100px text-end pe-5">Stato</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="property in filteredLoadedProperties" :key="property.id">
                      <td class="ps-5">
                        <span class="text-dark fw-semibold d-block fs-7">{{ property.title }}</span>
                      </td>
                      <td>
                        <span class="text-dark fw-semibold d-block fs-7">{{ formatDateTime(property.createdDate) }}</span>
                      </td>
                      <td class="text-end pe-5">
                        <span v-if="property.active" class="badge badge-success">Attivo</span>
                        <span v-else class="badge badge-secondary">Archiviato</span>
                      </td>
                    </tr>
                    <tr v-if="!filteredLoadedProperties || filteredLoadedProperties.length === 0">
                      <td colspan="3" class="text-center text-muted py-5">Nessun dato disponibile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
    const data = ref<DashboardDetails>();
    const calendarData = ref<CalendarDetails>();
    const authStore = useAuthStore();
    const role = computed(() => authStore.user?.Role || "");
    const isAdmin = computed(() => role.value === "Admin");
    const isAgency = computed(() => role.value === "Agenzia");
    const isAgent = computed(() => role.value === "Agente");
    
    // Filtri di default:
    // - Admin: periodo = "month", agenzia = "" (tutte)
    // - Agenzia: periodo = "month", agenzia = ID utente corrente
    // - Agente: periodo = "month", agenzia = non visibile (solo suoi dati)
    const selectedAgencyId = ref<string>("");
    const selectedPeriod = ref<string>("today");
    const searchAgentDetails = ref<string>("");
    const searchPropertyAppointments = ref<string>("");
    const searchLoadedProperties = ref<string>("");
    const selectedEventType = ref<string>("");
    const agencies = ref<Array<{ Id: string; Name: string; LastName: string }>>([]);

    // Tipologie evento
    const tipologieEvento = [
      "Appuntamento interno",
      "Consulenza di mutuo",
      "Consulenza generica",
      "Acquisizione",
      "Proposta di acquisto",
      "Proposta di locazione",
      "Ribasso immobile",
      "Aggiornamento mandato di vendita",
      "Appuntamento MLS di vendita",
      "Appuntamento MLS di locazione",
      "Altro"
    ];

    const agentSelf = computed(() => data.value?.AgentSelf);

    const calendarDetails = computed(() => calendarData.value || data.value?.CalendarDetails);

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

    // Statistiche aggregate agenti - ora vengono dal backend
    const agentStats = computed(() => {
      return data.value?.AgentStats || {
        TotalPropertiesManaged: 0,
        ActivePropertiesManaged: 0,
        TotalAcquisitions: 0,
        AcquisitionsThisMonth: 0,
        TotalAppointments: 0,
        AppointmentsDisdetti: 0,
        AppointmentsConfermati: 0
      };
    });

    // Appuntamenti filtrati per tipologia evento
    const filteredAppointments = computed(() => {
      const appointments = calendarData.value?.UpcomingAppointments || data.value?.CalendarDetails?.UpcomingAppointments || [];
      if (!selectedEventType.value) return appointments;
      return appointments.filter(appt => appt.Type === selectedEventType.value);
    });

    // Funzione helper per verificare se un evento è un'acquisizione valida
    const isValidAcquisition = (appt: any): boolean => {
      const now = new Date();
      const eventDate = new Date(appt.DataInizioEvento);
      return appt.Type === "Acquisizione" 
        && eventDate < now 
        && !appt.Cancelled 
        && !appt.Postponed;
    };

    // Dettagli per agente - ora vengono dal backend, con filtro per tipologia evento
    const agentDetails = computed(() => {
      const backendDetails = data.value?.AgentDetails || [];
      const appointments = filteredAppointments.value;
      
      // Se non c'è filtro per tipologia evento, usa i dati del backend
      if (!selectedEventType.value) {
        return backendDetails.map(agent => ({
          name: agent.Name,
          propertiesManaged: agent.PropertiesManaged,
          acquisitions: agent.Acquisitions,
          appointmentsDisdetti: agent.AppointmentsDisdetti,
          appointmentsConfermati: agent.AppointmentsConfermati,
          appointmentsEffettuati: agent.AppointmentsEffettuati,
          totalAppointments: agent.TotalAppointments
        }));
      }
      
      // Se c'è filtro per tipologia evento, ricalcola le statistiche dagli appuntamenti filtrati
      const agentStatsMap: Record<string, {
        name: string;
        propertiesManaged: number;
        acquisitions: number;
        appointmentsDisdetti: number;
        appointmentsConfermati: number;
        appointmentsEffettuati: number;
        totalAppointments: number;
      }> = {};
      
      // Inizializza con i dati base del backend
      backendDetails.forEach(agent => {
        agentStatsMap[agent.Name] = {
          name: agent.Name,
          propertiesManaged: agent.PropertiesManaged,
          acquisitions: 0, // Verrà ricalcolato dagli appuntamenti filtrati
          appointmentsDisdetti: 0,
          appointmentsConfermati: 0,
          appointmentsEffettuati: 0,
          totalAppointments: 0
        };
      });
      
      // Ricalcola le statistiche dagli appuntamenti filtrati
      appointments.forEach(appt => {
        if (appt.AgentName && agentStatsMap[appt.AgentName]) {
          agentStatsMap[appt.AgentName].totalAppointments++;
          
          if (appt.Cancelled) {
            agentStatsMap[appt.AgentName].appointmentsDisdetti++;
          } else {
            // Appuntamento non cancellato
            if (appt.Confirmed && !appt.Postponed) {
              agentStatsMap[appt.AgentName].appointmentsConfermati++;
            }
            
            // Appuntamento effettuato: confermato e non posticipato (considerato come effettuato)
            if (appt.Confirmed && !appt.Postponed) {
              agentStatsMap[appt.AgentName].appointmentsEffettuati++;
            }
          }
          
          // Calcola acquisizioni: solo eventi passati con tipo "Acquisizione" che NON sono disdetti o rimandati
          if (isValidAcquisition(appt)) {
            agentStatsMap[appt.AgentName].acquisitions++;
          }
        }
      });
      
      return Object.values(agentStatsMap);
    });

    const filteredAgentDetails = computed(() => {
      let filtered = agentDetails.value;
      
      // Filtro per nome agente
      if (searchAgentDetails.value.trim()) {
        const search = searchAgentDetails.value.toLowerCase().trim();
        filtered = filtered.filter(agent => 
          agent.name.toLowerCase().includes(search)
        );
      }
      
      return filtered;
    });

    // Immobili con più appuntamenti
    const propertiesWithAppointments = computed(() => {
      const appointments = calendarData.value?.UpcomingAppointments || data.value?.CalendarDetails?.UpcomingAppointments || [];
      const propertyCounts: Record<string, { id: string; title: string; count: number }> = {};
      
      appointments.forEach(appt => {
        if (appt.PropertyTitle) {
          if (!propertyCounts[appt.PropertyTitle]) {
            propertyCounts[appt.PropertyTitle] = {
              id: appt.PropertyTitle,
              title: appt.PropertyTitle,
              count: 0
            };
          }
          propertyCounts[appt.PropertyTitle].count++;
        }
      });
      
      return Object.values(propertyCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 20); // Top 20
    });

    const filteredPropertiesWithAppointments = computed(() => {
      if (!searchPropertyAppointments.value.trim()) return propertiesWithAppointments.value;
      const search = searchPropertyAppointments.value.toLowerCase().trim();
      return propertiesWithAppointments.value.filter(property => 
        property.title.toLowerCase().includes(search)
      );
    });

    // Immobili caricati - ora vengono dal backend
    const loadedProperties = computed(() => {
      const backendProperties = data.value?.LoadedProperties || [];
      return backendProperties.map(property => ({
        id: property.Id,
        title: property.Title,
        createdDate: property.CreationDate,
        active: property.Active
      }));
    });

    const filteredLoadedProperties = computed(() => {
      if (!searchLoadedProperties.value.trim()) return loadedProperties.value;
      const search = searchLoadedProperties.value.toLowerCase().trim();
      return loadedProperties.value.filter((property: any) => 
        property.title.toLowerCase().includes(search)
      );
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
      // Se è un agente, non passare agencyId (il backend filtra automaticamente)
      // Se è un'agenzia, usa l'ID dell'utente corrente se non è selezionata un'agenzia
      let agencyId: string | undefined = undefined;
      if (isAdmin.value && selectedAgencyId.value) {
        agencyId = selectedAgencyId.value;
      } else if (isAgency.value) {
        agencyId = selectedAgencyId.value || authStore.user?.Id;
      }
      // Per gli agenti, agencyId rimane undefined così il backend usa automaticamente currentUser.AgencyId
      
      const period = selectedPeriod.value;
      
      // Carica dati principali e appuntamenti in parallelo al primo caricamento
      const [dashboardData, appointments] = await Promise.all([
        getDashboardData(agencyId, period),
        getDashboardAppointments(agencyId, period)
      ]);
      
      if (dashboardData) {
        data.value = {
          ...dashboardData,
          CalendarDetails: appointments || {} as CalendarDetails,
          SalesDetails: undefined
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
      // Se è un agente, non passare agencyId (il backend filtra automaticamente)
      // Se è un'agenzia, usa l'ID dell'utente corrente se non è selezionata un'agenzia
      let agencyId: string | undefined = undefined;
      if (isAdmin.value && selectedAgencyId.value) {
        agencyId = selectedAgencyId.value;
      } else if (isAgency.value) {
        agencyId = selectedAgencyId.value || authStore.user?.Id;
      }
      // Per gli agenti, agencyId rimane undefined così il backend usa automaticamente currentUser.AgencyId
      
      const period = selectedPeriod.value;
      
      // Carica dati principali e appuntamenti in parallelo quando si aggiornano i filtri principali
      const [dashboardData, appointments] = await Promise.all([
        getDashboardData(agencyId, period),
        getDashboardAppointments(agencyId, period)
      ]);
      
      if (dashboardData && data.value) {
        data.value = {
          ...dashboardData,
          CalendarDetails: appointments || data.value.CalendarDetails,
          SalesDetails: undefined
        } as DashboardDetails;
      }
      
      if (appointments) {
        calendarData.value = appointments;
        if (data.value) {
          data.value.CalendarDetails = appointments;
        }
      }
      
      loadingData.value = false;
    }



    onMounted(async () => {
      await loadAgencies();
      
      // Imposta filtri di default in base al ruolo
      if (isAdmin.value) {
        // Admin: periodo = questo mese, agenzia = tutte
        selectedPeriod.value = "today";
        selectedAgencyId.value = "";
      } else if (isAgency.value) {
        // Agenzia: periodo = questo mese, agenzia = ID utente corrente
        selectedPeriod.value = "today";
        selectedAgencyId.value = authStore.user?.Id || "";
      } else if (isAgent.value) {
        // Agente: periodo = questo mese, agenzia non visibile (backend filtra automaticamente)
        selectedPeriod.value = "today";
        selectedAgencyId.value = ""; // Non viene usato per gli agenti
      }
      
      await getItems();
    });

    return {
      initialLoading,
      loadingData,
      data,
      isAdmin,
      isAgency,
      isAgent,
      agentSelf,
      selectedAgencyId,
      selectedPeriod,
      agencies,
      formatDateTime,
      formatTime,
      propertiesTrend,
      requestsTrend,
      topTownSale,
      topReqTownSale,
      calendarDetails,
      searchAgentDetails,
      searchPropertyAppointments,
      searchLoadedProperties,
      selectedEventType,
      tipologieEvento,
      agentStats,
      agentDetails,
      filteredAgentDetails,
      propertiesWithAppointments,
      filteredPropertiesWithAppointments,
      loadedProperties,
      filteredLoadedProperties,
      refreshData
    };
  },
});
</script>
