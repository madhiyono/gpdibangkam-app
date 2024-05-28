import { reactive } from "vue";
import { io } from "socket.io-client";
import { env } from "@/env";

export const state = reactive({
  connected: false,
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : env.API_URL;

export const socket = io(URL, { autoConnect: false });

socket.on("connect", () => {
  console.log("Server Connect");
  state.connected = true;
});

socket.on("disconnect", () => {
  console.log("Server Disconnect");
  state.connected = false;
});
