import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class AgentSelfDetails {
    PropertiesTotal: number;
    PropertiesActive: number;
    PropertiesArchivedOrSold: number;
    RequestsTotal: number;
    RequestsActive: number;
}

export class AgencySummary {
    TotalCustomers: number;
    TotalAgents: number;
}

export class UpcomingAppointment {
    Id: number;
    NomeEvento: string;
    Type: string;
    LuogoEvento?: string;
    DataInizioEvento: string;
    DataFineEvento: string;
    Confirmed: boolean;
    Cancelled: boolean;
    Postponed: boolean;
    AgentName: string;
    PropertyTitle?: string;
}

export class CalendarDetails {
    Total: number;
    Today: number;
    ThisWeek: number;
    ThisMonth: number;
    Confirmed: number;
    Cancelled: number;
    Postponed: number;
    Upcoming: number;
    LinkedToProperties: number;
    LinkedToRequests: number;
    ByType: Object;
    ByLocation: Object;
    ByAgent: Object;
    ByDayOfWeek: Object;
    CreatedPerMonth: Object;
    UpcomingAppointments: UpcomingAppointment[];
}

export class SalesDetails {
    TotalSold: number;
    SoldThisMonth: number;
    SoldLastMonth: number;
    TotalSalesValue: number;
    TotalSalesValueThisMonth: number;
    TotalCommissions: number;
    TotalCommissionsThisMonth: number;
    SoldPerMonth: Object;
    SalesValuePerMonth: Object;
}

export class DashboardDataResponse {
    Role: string;
    ScopeAgencyId?: string;
    ScopeUserId?: string;
    RealEstatePropertyHomeDetails: RealEstatePropertyHomeDetails;
    RequestHomeDetails: RequestHomeDetails;
    SalesDetails: SalesDetails;
    TotalCustomers: number;
    TotalAgents: number;
    AgencySummary?: AgencySummary;
    AgentSelf?: AgentSelfDetails;
}

export class DashboardDetails {
    Role: string;
    ScopeAgencyId?: string;
    ScopeUserId?: string;
    RealEstatePropertyHomeDetails: RealEstatePropertyHomeDetails;
    RequestHomeDetails: RequestHomeDetails;
    CalendarDetails: CalendarDetails;
    SalesDetails: SalesDetails;
    TotalCustomers: number;
    TotalAgents: number;
    AgencySummary?: AgencySummary;
    AgentSelf?: AgentSelfDetails;
}

export class RealEstatePropertyHomeDetails {
    Total: number;
    TotalSale: number;
    TotalRent: number;
    TotalLastMonth: number;
    TotalCreatedPerMonth: Object;
    DistinctByTownSale: Object;
    DistinctByTownRent: Object;
    DistinctByTypeSale: Object;
    DistinctByTypeRent: Object;
    MaxAnnual: number;
    MinAnnual: number;
}

export class RequestHomeDetails {
    Total: number;
    TotalArchived: number;
    TotalClosed: number;
    TotalActive: number;
    TotalLastMonth: number;
    TotalSale: number;
    TotalRent: number;
    TotalCreatedPerMonth: Object;
    DistinctByTownSale: Object;
    DistinctByTownRent: Object;
    DistinctByTypeSale: Object;
    DistinctByTypeRent: Object;
    MaxAnnual: number;
    MinAnnual: number;
}

const getDetails = (agencyId?: string): Promise<DashboardDetails> => {
    const url = agencyId ? `Generic/GetDashboard?agencyId=${agencyId}` : `Generic/GetDashboard`;
    return ApiService.get(url, "")
        .then(({ data }) => {
            const result = data as Partial<DashboardDetails>
            return result;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

const getDashboardData = (agencyId?: string): Promise<DashboardDataResponse> => {
    const url = agencyId ? `Generic/GetDashboardData?agencyId=${agencyId}` : `Generic/GetDashboardData`;
    return ApiService.get(url, "")
        .then(({ data }) => {
            const result = data as Partial<DashboardDataResponse>
            return result;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

const getDashboardAppointments = (agencyId?: string): Promise<CalendarDetails> => {
    const url = agencyId ? `Generic/GetDashboardAppointments?agencyId=${agencyId}` : `Generic/GetDashboardAppointments`;
    return ApiService.get(url, "")
        .then(({ data }) => {
            const result = data as Partial<CalendarDetails>
            return result;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

export { getDetails, getDashboardData, getDashboardAppointments }
