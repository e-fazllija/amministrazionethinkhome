import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Documentation{
  Id?: number;

  File?: File;
  FileName: string;
  FolderName?: string;
}

const getDocumentations = (filterRequest: string) : Promise<Array<Documentation>> => {
  return ApiService.get(
    `BlobStorage/GetDocuments`, ""
  )
    .then(({ data }) => {
      const result = data as Partial<Array<Documentation>>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const createDocumentation = async (formData: Documentation) => {
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

const updateDocumentation = async (formData: Documentation) => {
  return ApiService.post("Documentations/Update", formData)
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
  return await ApiService.delete(`Documentations/DeleteModule?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

// Aggiunta la funzione per caricare i file
const uploadFiles = async (file: Documentation) => {
  // Se l'ID non è fornito, lo creiamo dinamicamente

  const formData = new FormData();
  formData.append("File", file.File);
  formData.append("FileName", ".");
  formData.append("FolderName", "Moduli");

    try {
    const response = await ApiService.post("BlobStorage/InsertDocument", formData);
    console.log("File caricati con successo", response);
    return response;
  } catch (error) {
    if (error.response) {
      // Log della risposta di errore con il messaggio e i dettagli
      console.error("Errore durante il caricamento:", error.response.data);
      console.error("Codice di stato:", error.response.status);
    } else {
      // Log degli errori generali
      console.error("Errore sconosciuto durante il caricamento:", error);
    }
    return undefined;
  }
};


// Funzione per generare un ID dinamico se non è passato
const generateId = () => {
  // Puoi usare altre logiche per generare un ID, qui usiamo un numero casuale
  return Math.floor(Math.random() * 10000);
};


export { getDocumentations, createDocumentation, updateDocumentation, deleteDocumentation, uploadFiles };
