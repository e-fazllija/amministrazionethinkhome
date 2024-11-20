import ApiService from "@/core/services/ApiService";
import { createMapper, createMap } from '@automapper/core';
import { AutoMap, classes } from '@automapper/classes';

export const mapper = createMapper({
  strategyInitializer: classes(),
});

export class Agent{
  @AutoMap() Id?: number;
  @AutoMap() Code: string;
  @AutoMap() Name: string;
  @AutoMap() LastName: string;
  @AutoMap() Email: string;
  @AutoMap() Phone: number;
  @AutoMap() Description: string;
  @AutoMap() AdressLine: string;
  @AutoMap() Town: string;
  @AutoMap() State: string;
  @AutoMap() CreationDate?: Date;
  @AutoMap() UpdateDate?: Date;
  constructor(Id:number,Code:string,Name:string,LastName:string,Email:string,Phone: number,
    Description: string,AdressLine: string,Town: string,State: string,CreationDate: Date,UpdateDate: Date){
    this.Id=Id;
    this.Code=Code;
    this.Name=Name;
    this.LastName=LastName;
    this.Email=Email;
    this.Phone=Phone;
    this.Description=Description;
    this.AdressLine=AdressLine;
    this.Town=Town;
    this.State=State;
    this.CreationDate=CreationDate;
    this.UpdateDate=UpdateDate;

  }
}


createMap(mapper, Object, Agent);

const getAgents = (filterRequest: string): Promise<Array<Agent>> => {
   return ApiService.get(
    `https://localhost:7267/api/Agents/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Agent>>
      return result;
    })
    .catch(({ response }) => {
      console.error(response);
      return [];
    });
};

const getAgent = (id: number) : Promise<Agent> => {
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

const createAgent = async (formData:Agent) => {
  return ApiService.post("https://localhost:7267/api/Agents/Create", formData)
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const deleteAgent = (id) => {
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



export { getAgents, getAgent, createAgent, deleteAgent }
 

// export default agents;
