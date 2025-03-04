import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Documentation{
  Id?: number;
  FileName: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  label?: string;
}

export class DocumentationTabelData {
  Id?: number;
  FileName: string;
  CreationDate: Date;
  UpdateDate: Date;
}

export class Notes {
  Id?: number;
  ApplicationUserId: string;
  Text: string;
}

const getDocumentations = (filterRequest: string) : Promise<Array<Documentation>> => {
   return ApiService.get(
    `Documentations/Get?currentPage=0&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Documentation>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

// const getDocumentation = (id: number) : Promise<Documentation> => {
//   return ApiService.get(`Documentations/GetById?id=${id}`, "")
//     .then(({ data }) => {
//       const result = data as Partial<Documentation>;
//       result.DocumentationNotes = data.DocumentationNotes;
//       return result;
//     })
//     .catch(({ response }) => {
//       store.setError(response.data.Message, response.status);
//       return undefined;
//     });
// };

const createDocumentation = async (formData:Documentation) => {
  return ApiService.post("Documentations/Create", formData)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const updateDocumentation = async (formData:Documentation) => {
  return ApiService.post("Customers/Update", formData)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteDocumentation = async (id: number) => {
  return await ApiService.delete(`Documentations/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

export { getDocumentations, createDocumentation, updateDocumentation, deleteDocumentation }
