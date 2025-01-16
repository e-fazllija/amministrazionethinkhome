import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class DashboardDetails {
    RealEstatePropertyHomeDetails: RealEstatePropertyHomeDetails;
    RequestHomeDetails: RequestHomeDetails;
    TotalCustomers: number;
    TotalAgents: number;
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

const getDetails = (): Promise<DashboardDetails> => {
    return ApiService.get(`Generic/GetAdminHomeDetails`, "")
        .then(({ data }) => {
            const result = data as Partial<DashboardDetails>
            return result;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

export { getDetails }
