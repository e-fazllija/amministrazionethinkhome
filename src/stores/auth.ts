import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  Id: string,
  Username: string;
  Code?: string;
  Name: string;
  LastName: string;
  Email: string;
  Role: string;
  Password: string;
  Token: string;
  PhoneNumber: number;
  MobilePhoneNumber?: number;
  Referent?: string;
  Address: string;
  Town: string;
  Region?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  AgencyId?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref("");
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = "";
    JwtService.saveToken(user.value.Token);
  }

  function setError(error: any, status?: number) {
    if(status == 400){
      errors.value = error;
    } else if (status == 500) {
      errors.value = error.Message;
    } else {
      errors.value = "Si è verificato un errore";
    }
    
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = "";
    JwtService.destroyToken();
  }

  async function login(credentials: User) {
    return await ApiService.post("auth/Login", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.Message);
      });
  }

  function logout() {
    purgeAuth();
  }

  async function register(credentials: User) {
    credentials.Username = credentials.LastName + credentials.Name;
    return await ApiService.post("auth/register", credentials)
      .then(({ data }) => {
        // setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.Message);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.Message);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("auth/VerifyToken", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.Message);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  async function verifyCredentials(email: string, token: string) {
      await ApiService.post("auth/ConfirmCredentials", { Email: email, Token: token })
      .then((data) => {
        console.log(data)
      })
      .catch(({ response }) => {
        setError(response.data.Message);
      });
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
    verifyCredentials,
    setError
  };
});
