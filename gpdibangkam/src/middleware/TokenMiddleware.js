import { useAuthStore } from "@/stores/AuthStore";
import { env } from "@/env";
import { encryptKey, decryptKey } from "@/secured";
import { verifyToken, doRefreshToken } from "@/helpers";

export function tokenMiddleware(to, from, next) {
  const authStore = useAuthStore();
  if (
    !localStorage.getItem("_SSIDGSB0") ||
    !localStorage.getItem("_SSIDGSB1") ||
    !localStorage.getItem("_SSIDGSB2") ||
    !localStorage.getItem("_SSIDGSB3") ||
    !localStorage.getItem("_SSIDGSB4")
  ) {
    if (!authStore.accessToken) {
      next();
    } else {
      if (verifyToken(authStore.accessToken)) {
        next();
      } else {
        doRefreshToken(authStore.refreshToken)
          .then((response) => {
            console.log("Berhasil Refresh Token");
            authStore.saveTokens(response, authStore.refreshToken);
            localStorage.setItem(
              "_SSIDGSB1",
              encryptKey(response, env.APP_KEY)
            );
            next();
          })
          .catch(() => {
            console.log("Terjadi kesalahan saat melakukan refresh token");
          });
      }
    }
  } else {
    const accessToken = decryptKey(
      localStorage.getItem("_SSIDGSB1"),
      env.APP_KEY
    );
    const refreshToken = decryptKey(
      localStorage.getItem("_SSIDGSB2"),
      env.APP_KEY
    );

    if (verifyToken(accessToken)) {
      next();
    } else {
      doRefreshToken(refreshToken)
        .then((response) => {
          console.log("Berhasil Refresh Token");
          authStore.saveTokens(response, refreshToken);
          localStorage.setItem("_SSIDGSB1", encryptKey(response, env.APP_KEY));
          next();
        })
        .catch(() => {
          console.log("Terjadi kesalahan saat melakukan refresh token");
        });
    }
  }
}
