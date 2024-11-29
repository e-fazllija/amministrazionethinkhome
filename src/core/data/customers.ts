import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Customer{
  Id?: number;
  Code: string;
  Name: string;
  LastName: string;
  Email: string;
  Phone: number;
  Description: string;
  AdressLine: string;
  Town: string;
  State: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Token?: string;
  }

const getCustomers = (filterRequest: string) : Promise<Array<Customer>> => {
   return ApiService.get(
    `https://localhost:7267/api/Customers/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data.$values as Partial<Array<Customer>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getCustomer = (id: number) : Promise<Customer> => {
  return ApiService.get(`https://localhost:7267/api/Customers/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const createCustomer = async (formData:Customer) => {
  return ApiService.post("https://localhost:7267/api/Customers/Create", formData)
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const updateCustomer = async (formData:Customer) => {
  return ApiService.post("https://localhost:7267/api/Customers/Update", formData)
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteCustomer = async (id: number) => {
  return await ApiService.delete(`https://localhost:7267/api/Customers/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

export { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer }
