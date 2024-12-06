import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import { Customer } from "@/core/data/customers";
const store = useAuthStore();

export class Request{
  Id?: number;
  CustomerId: number;
  Contract: string;
  PropertyType: string;
  Province: string;
  City: string;
  Price: number;
  Archived: boolean;
  Closed: boolean;
  RoomsNumber?: string;
  MQFrom?: number;
  MQTo?: number;
  PropertyState?: string;
  Heating?: string;
  ParkingSpaces?: number;
  Notes?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Customer?: Customer
  Town?: string;
}

export class InsertModel {
    Customers: Customer[];
    Users: User[];
}

const getRequests = (filterRequest: string) : Promise<Array<Request>> => {
   return ApiService.get(
    `Requests/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data.$values as Partial<Array<Request>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getRequest = (id: number) : Promise<Request> => {
  return ApiService.get(`Requests/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Request>;
      result.City = data.Town;
      result.Customer = data.Customer as Customer;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const createRequest = async (formData:Request) => {
  return ApiService.post("Requests/Create", formData)
    .then(({ data }) => {
      const result = data as Partial<Request>;
      return result;
    })
    .catch(async ({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const updateRequest = async (formData:Request) => {
  return ApiService.post("Requests/Update", formData)
    .then(({ data }) => {
      const result = data as Partial<Request>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteRequest = async (id: number) => {
  return await ApiService.delete(`Requests/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Request>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getToInsert = () : Promise<InsertModel> => {
return ApiService.get(`RealEstateProperty/GetToInsert`, "")
    .then(({ data }) => {
    const agents = data.Agents.$values as Array<User>;
    const customers = data.Customers.$values as Array<Customer>;
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

export { getRequests, getRequest, createRequest, updateRequest, deleteRequest, getToInsert }
