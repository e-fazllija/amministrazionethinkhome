import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agent {
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
  Role? = "Agent";
  Password?: string;
}

const getAgents = (filterRequest: string) : Promise<Array<Agent>> => {
   return ApiService.get(
    `https://localhost:7267/api/Agents/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data.$values as Partial<Array<Agent>>
      return result;
    })
    .catch(({ response }) => {
      console.error(response);
      return [];
    });
};

const getAgent = (id: String) : Promise<Agent> => {
  return ApiService.get(`https://localhost:7267/api/Agents/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const createAgent = async (formData: any) => {
  const values = formData as User;
  values.Password = "ThinkHome!24";
  return await store.register(values);
};

const updateAgent = async (formData: any) => {
  const values = formData as User;
  return await ApiService.post("https://localhost:7267/api/Agents/Update", values)
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const deleteAgent = async (id: String) => {
  console.log(id)
  return await ApiService.delete(`https://localhost:7267/api/Agents/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

export { getAgents, getAgent, createAgent, updateAgent, deleteAgent }