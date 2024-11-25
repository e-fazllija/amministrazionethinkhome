import ApiService from "@/core/services/ApiService";
import { createMapper, createMap } from '@automapper/core';
import { AutoMap, classes } from '@automapper/classes';
import JwtService from "@/core/services/JwtService";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

export class Customer{
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
  @AutoMap() Token?: string;
  constructor(Id:number,Code:string,Name:string,LastName:string,Email:string,Phone: number,
    Description: string,AdressLine: string,Town: string,State: string,CreationDate: Date,UpdateDate: Date, Token: string){
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
    this.Token = Token;
  }
}


createMap(mapper, Object, Customer);

const getCustomers = (filterRequest: string) : Promise<Array<Customer>> => {
   return ApiService.get(
    `https://localhost:7267/api/Customers/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Customer>>
      return result;
    })
    .catch(({ response }) => {
      console.error(response);
      return [];
    });
};

const getCustomer = (id: number) : Promise<Customer> => {
  return ApiService.get(`https://localhost:7267/api/Customers/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const createCustomer = async (formData:Customer) => {
  formData.Token = JwtService.getToken()
  return ApiService.post("https://localhost:7267/api/Customers/Create", formData)
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};

const deleteCustomer = (id) => {
  return ApiService.get(`https://localhost:7267/api/Customers/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      console.log(response);
      return undefined;
    });
};



export { getCustomers, getCustomer, createCustomer, deleteCustomer }
 

// export default customers;
