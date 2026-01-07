import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

const sendSegnalazione = async (message: string) => {
  ApiService.setHeader();
  return ApiService.post("Generic/SendComplaint", { Message: message })
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      throw response;
    });
};

export { sendSegnalazione };

