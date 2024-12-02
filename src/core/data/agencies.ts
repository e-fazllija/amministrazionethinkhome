import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agency {
  Id?: number;
  Name: string;
  LastName: string;
  Email: string;
  PhoneNumber: number;
  MobilePhoneNumber?: number;
  Referent?: string;
  Address: string;
  Town: string;
  Region?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Token?: string;
  Role? = "Agency";
  Password?: string;
}

const getAgencies = (filterRequest: string) : Promise<Array<Agency>> => {
   return ApiService.get(
    `Agencies/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data.$values as Partial<Array<Agency>>
      return result;
    })
    .catch(({ response }) => {
      console.error(response);
      return [];
    });
};

const getAgency = (id: String) : Promise<Agency> => {
  return ApiService.get(`Agencies/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Agency>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const createAgency = async (formData: any) => {
  const values = formData as User;
  values.Password = "ThinkHome!24";
  return await store.register(values);
};

const updateAgency = async (formData: any) => {
  const values = formData as User;
  return await ApiService.post("Agencies/Update", values)
    .then(({ data }) => {
      const result = data as Partial<Agency>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const deleteAgency = async (id: String) => {
  return await ApiService.delete(`Agencies/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Agency>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

export { getAgencies, getAgency, createAgency, updateAgency, deleteAgency }