import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import { Customer } from "./customers";
const store = useAuthStore();

export class RealEstateProperty {
  Id?: number;
  Category: string;
  Typology: string;
  InHome: boolean;
  Highlighted: boolean;
  Status: string;
  AddressLine: string;
  Town: string;
  State: string;
  PostCode: string;
  CommercialSurfaceate: number | 0;
  Floor?: string;
  TotalBuildingfloors: number | 0;
  Elevators: number | 0; 
  MoreDetails?: string;
  Bedrooms: number | 0;
  WarehouseRooms: number | 0;
  Kitchens: number | 0;
  Bathrooms: number | 0;
  Furniture?: string;
  OtherFeatures?: string;
  ParkingSpaces: number | 0;
  Heating?: string;
  Exposure?: string;
  EnergyClass?: string;
  TypeOfProperty?: string;
  StateOfTheProperty?: string;
  YearOfConstruction: number | 0;
  Price: number | 0;
  CondominiumExpenses: number | 0;
  Availability?: string;
  Description?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Photos?: Array<string>; 
  CustomerId: number | 0;
  AgentId: string;
  Files?: FileList;
}

export class InsertModel {
  Customers: Customer[];
  Users: User[];
}

const getRealEstateProperties = (filterRequest: string) : Promise<Array<RealEstateProperty>> => {
   return ApiService.get(
    `RealEstateProperty/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data.$values as Partial<Array<RealEstateProperty>>
      return result;
    })
    .catch(({ response }) => {
      console.error(response);
      return [];
    });
};

const getRealEstateProperty = (id: number) : Promise<RealEstateProperty> => {
  return ApiService.get(`RealEstateProperty/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<RealEstateProperty>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const getToInsert = () : Promise<InsertModel> => {
  return ApiService.get(`RealEstateProperty/GetToInsert`, "")
    .then(({ data }) => {
      const result = data as Partial<InsertModel>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const createRealEstateProperty = async (form: any) => {
  const values = form as RealEstateProperty;
  values.AgentId = store.user.Id;
  const formData = new FormData();
  // Itera su tutte le proprietà dell'oggetto values
  for (const key in values) {
    if (key === "Files" && values.Files) {
      // Se la proprietà è Files, aggiungi i file uno per uno
      Array.from(values.Files).forEach((file) => {
        formData.append("Files", file); // Nome del campo nel backend è "Photos"
      });
    } else if (values[key as keyof RealEstateProperty] !== undefined) {
      // Per tutti gli altri campi, aggiungi il valore come stringa
      formData.append(key, values[key as keyof RealEstateProperty]?.toString() || "");
    }
  }
  return await ApiService.post("RealEstateProperty/Create", formData)
    .then(({ data }) => {
      console.log(data)
      const result = data as Partial<RealEstateProperty>;
      return result;
    })
    .catch(({ response }) => {
      
      if(response.data.status == 400){
        store.setError(response.data.errors);
        console.log(response.data.errors);
      } else {
        store.setError(response.data.errors);
      }
      return undefined;
    });
};

const updateRealEstateProperty = async (formData: any) => {
  const values = formData as RealEstateProperty;
  return await ApiService.post("RealEstateProperty/Update", values)
    .then(({ data }) => {
      const result = data as Partial<RealEstateProperty>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const deleteRealEstateProperty = async (id: Number) => {
  return await ApiService.delete(`RealEstateProperty/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<RealEstateProperty>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

export { getRealEstateProperties, getRealEstateProperty, createRealEstateProperty, updateRealEstateProperty, deleteRealEstateProperty, getToInsert }