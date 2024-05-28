<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script setup>
import { onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { env } from "@/env";
import { encryptKey, decryptKey } from "@/secured";
import { verifyToken, doRefreshToken } from "@/helpers";

// Realtime Socket.io
import { socket } from "@/socket";

const authStore = useAuthStore();

socket.on("connect_error", (err) => {
  console.error(err.message);
});

onMounted(() => {
  if (
    !localStorage.getItem("_SSIDGSB0") ||
    !localStorage.getItem("_SSIDGSB1") ||
    !localStorage.getItem("_SSIDGSB2") ||
    !localStorage.getItem("_SSIDGSB3") ||
    !localStorage.getItem("_SSIDGSB4")
  ) {
    console.log("Local Storage Kosong");
  } else {
    const secureData = [
      localStorage.getItem("_SSIDGSB0"),
      localStorage.getItem("_SSIDGSB1"),
      localStorage.getItem("_SSIDGSB2"),
      localStorage.getItem("_SSIDGSB3"),
      localStorage.getItem("_SSIDGSB4"),
    ];
    authStore.setIsLoggedIn(decryptKey(secureData[0], env.APP_KEY));
    authStore.saveTokens(
      decryptKey(secureData[1], env.APP_KEY),
      decryptKey(secureData[2], env.APP_KEY)
    );
    const idUser = decryptKey(secureData[3], env.APP_KEY);
    const userLevel = decryptKey(secureData[4], env.APP_KEY);
    authStore.setIdUser(idUser);
    authStore.setLevelUser(userLevel);

    if (!socket.connected) {
      socket.auth = { idUser, userLevel };
      socket.connect();
    }

    if (!verifyToken(authStore.accessToken)) {
      doRefreshToken(authStore.refreshToken)
        .then((response) => {
          authStore.saveTokens(response, authStore.refreshToken);
          localStorage.setItem("_SSIDGSB1", encryptKey(response, env.APP_KEY));
        })
        .catch(() => {
          console.log("Terjadi kesalahan saat melakukan refresh token");
        });
    }
  }
});

onUnmounted(() => {
  socket.off("connect_error");
  socket.disconnect();
});
</script>
