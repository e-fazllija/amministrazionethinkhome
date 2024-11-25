import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agency {
  Id?: number;
  Code: string;
  Name: string;
  Lastname: string;
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
    `https://localhost:7267/api/Agencies/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Agency>>
      return result;
    })
    .catch(({ response }) => {
      console.error(response);
      return [];
    });
};

const getAgency = (id: number) : Promise<Agency> => {
  return ApiService.get(`https://localhost:7267/api/Agencies/GetById?id=${id}`, "")
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
  await store.register(values);
  formData.Token = JwtService.getToken()
  return await ApiService.post("https://localhost:7267/api/Agencies/Create", formData)
    .then(({ data }) => {
      const result = data as Partial<Agency>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const updateAgency = async (formData: any) => {
  const values = formData as User;
  return await ApiService.post("https://localhost:7267/api/Agencies/Update", values)
    .then(({ data }) => {
      const result = data as Partial<Agency>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const deleteAgency = async (id) => {
  return await ApiService.get(`https://localhost:7267/api/Agencies/GetById?id=${id}`, "")
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