import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import type { Customer } from "./customers";
const store = useAuthStore();

export class RealEstateProperty {
  Id?: number;
  Title: string;
  ShortTitle: string;
  Category: string;
  Typology: string;
  InHome: boolean;
  Highlighted: boolean;
  Auction: boolean;
  Sold: boolean;
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
  ShortDescription?: string;
  AssignmentEnd?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Photos?: Array<RealEstatePropertyPhotos>; 
  CustomerId: number | 0;
  AgentId: string;
  Agent?: User;
  Files?: FileList;
  RealEstatePropertyNotes?: Notes[];
  VideoUrl?: string;
}

export class RequestTabelData {
  Id: number;
  CreationDate: Date;
  CommercialSurfaceate: number;
  AddressLine: string;
  Price: number;
  Category: string;
  Typology: string;
  StateOfTheProperty?: string;
  AssignmentEnd?: string;
  Status: string;
  Town: string;
  Auction:Boolean;
}

export class InsertModel {
  Customers: Customer[];
  Users: User[];
}

export class RealEstatePropertyPhotos {
  Id: number;
  Url: string;
  FileName: string;
  Highlighted: boolean;
  CreationDate?: Date;
  UpdateDate?: Date;
}

export class Notes {
  Id?: number;
  ApplicationUserId: string;
  Text: string;
}

const getRealEstateProperties = (filterRequest: string) : Promise<Array<RealEstateProperty>> => {
   return ApiService.get(
    `RealEstateProperty/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<RealEstateProperty>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getRealEstateProperty = (id: number) => {
  return ApiService.get(`RealEstateProperty/GetById?id=${id}`, "")
    .then(({ data }) => {
      const photos = data.Photos as Array<RealEstatePropertyPhotos>;
      const result = data as Partial<RealEstateProperty>;
      result.Photos = photos;
      result.RealEstatePropertyNotes = data.RealEstatePropertyNotes;
      return result;
    })
    .catch(({ response }) => {
      console.log(response)
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getToInsert = () : Promise<InsertModel> => {
  return ApiService.get(`RealEstateProperty/GetToInsert`, "")
    .then(({ data }) => {
      const agents = data.Agents as Array<User>;
      const customers = data.Customers as Array<Customer>;
      const result = <InsertModel>({
        Users: agents,
        Customers: customers
      })
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const setRealEstatePropertyPhotoHighlighted = (id : number) => {
  const formData = new FormData();
  formData.append("realEstatePropertyPhotoId", id.toString())
  return ApiService.post(`RealEstateProperty/SetRealEstatePropertyPhotoHighlighted`, 
    formData)
  .then(({ data }) => {
    return data;
  })
  .catch(({ response }) => {
    store.setError(response.data.Message, response.status);
    return undefined;
  });
}

const uploadFiles = async (files: FileList, id: number) => {
  const formData = new FormData();
  formData.append("PropertyId", id.toString())
  Array.from(files).forEach((file) => {
    formData.append("Files", file);
  });
  return await ApiService.post("RealEstateProperty/UploadFiles", formData)
  .then(({ data }) => {
    return data;
  })
  .catch(({ response }) => {
    store.setError(response.data.Message, response.status);
    return undefined;
  });
}

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
      const result = data as Partial<RealEstateProperty>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
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
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const updatePhotosOrder = async (formData: any) => {
  const values = formData as Array<RealEstatePropertyPhotos>;
  return await ApiService.post("RealEstateProperty/UpdatePhotosOrder", values)
    .then(({ data }) => {
      const result = data;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
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
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deletePhoto = async (id: number) => {
  return await ApiService.delete(`RealEstateProperty/DeletePhoto?id=${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
}

export { 
  getRealEstateProperties, 
  getRealEstateProperty, 
  createRealEstateProperty, 
  updateRealEstateProperty, 
  deleteRealEstateProperty, 
  getToInsert, 
  setRealEstatePropertyPhotoHighlighted, 
  deletePhoto,
  uploadFiles,
  updatePhotosOrder }