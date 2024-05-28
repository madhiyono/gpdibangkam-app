import jwtDecode from "jwt-decode";
import axios from "axios";
import { env } from "@/env";
import { encryptKey } from "@/secured";
import { useAuthStore } from "@/stores/AuthStore";

export function verifyToken(accessToken) {
  const decodedToken = jwtDecode(accessToken);
  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedToken.exp < currentTime) {
    return false;
  } else {
    return true;
  }
}

export async function doRefreshToken(refreshToken) {
  try {
    const response = await axios.post(`${env.API_URL}/auth/refresh-token`, {
      refreshToken,
    });
    return response.data.data.token;
  } catch (error) {
    throw new Error(error);
  }
}

export async function useFetch(method, url, data, authorization) {
  const authStore = useAuthStore();
  try {
    if (verifyToken(authorization)) {
      const response = await axios({
        method,
        url: `${env.API_URL}/${url}`,
        data,
        headers: {
          authorization,
        },
      });

      return response.data;
    } else {
      const refreshToken = await doRefreshToken(authStore.refreshToken);

      authStore.saveTokens(refreshToken, authStore.refreshToken);
      localStorage.setItem("_SSIDGSB1", encryptKey(refreshToken, env.APP_KEY));

      const response = await axios({
        method,
        url: `${env.API_URL}/${url}`,
        data,
        headers: {
          authorization: refreshToken,
        },
      });

      return response.data;
    }
  } catch (err) {
    throw new Error(err);
  }
}
