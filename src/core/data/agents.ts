import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agent {
  Id?: string; // Cambiato da number a string per compatibilità con UserListModel
  UserName?: string; // Aggiunto per compatibilità con UserListModel
  Name: string;
  LastName: string;
  Email: string;
  PhoneNumber: string; // Cambiato da number a string per compatibilità con UserListModel
  MobilePhone?: number;
  Referent?: string;
  Address?: string;
  Town?: string;
  Region?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Token?: string;
  Role? = "Agent";
  Password?: string;
  AgencyId?: string;
  Color?: string;
}

export class InsertModel {
  Users: User[];
}

const getAgents = (agencyId: string, filterRequest: string) : Promise<Array<Agent>> => {
   return ApiService.get(
    `Agents/GetList?currentPage=0&agencyId=${agencyId}&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Agent>>;
      // I dati da GetList sono già compatibili con Agent (solo campi essenziali)
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getAgent = (id: String) : Promise<Agent> => {
  return ApiService.get(`Agents/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
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
  return await ApiService.post("Agents/Update", values)
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteAgent = async (id: String) => {
  console.log(id)
  return await ApiService.delete(`Agents/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

export { getAgents, getAgent, createAgent, updateAgent, deleteAgent }