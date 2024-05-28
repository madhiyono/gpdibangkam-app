<template>
  <div class="container mx-auto px-4 h-full">
    <ErrorAlert
      v-if="showErrorAlert"
      class="sticky top-4 z-40"
      :toggleFunction="toggleAlert"
      judulAlert="Gagal Login"
      :isiAlert="errorResponseMessage"
    />
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full md:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <img
                :src="gpdibangkamlogo"
                class="h-16 mr-auto ml-auto"
                alt="GPdIBangkamLogo"
              />
              <h6 class="text-gray-500 text-lg font-bold">
                GPdI El-Shaddai Bangkam
              </h6>
            </div>
            <!-- <p class="text-gray-400 text-sm text-center">
              <b>1 Timotius 1:12</b><br /><br />
              Aku bersyukur kepada Dia, yang menguatkan aku, yaitu Kristus
              Yesus, Tuhan kita, karena Ia menganggap aku setia dan
              mempercayakan pelayanan ini kepadaku
            </p> -->
            <hr class="mt-6 border-b-[1pt] border-gray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 pb-10">
            <div class="text-gray-400 text-center mb-3 font-bold">
              <small>Verifikasi Kode OTP</small>
              <h6 v-if="typeHandle === 'login'" class="mt-6">
                Masukkan Kode OTP yang Telah Dikirim Ke {{ loginSession.email }}
              </h6>
              <h6 v-else-if="typeHandle === 'register'" class="mt-6">
                Masukkan Kode OTP yang Telah Dikirim Ke
                {{ registerSession.email }}
              </h6>
              <h6 v-else-if="typeHandle === 'aktivasi'" class="mt-6">
                Masukkan Kode OTP yang Telah Dikirim Ke
                {{ aktivasiSession.email }}
              </h6>
              <h6 v-else class="mt-6">
                Masukkan Kode OTP yang Telah Dikirim Ke email@email.com
              </h6>
            </div>
            <form action="">
              <div class="flex flex-col space-y-16">
                <OtpForm
                  :digit-count="6"
                  @update:otp="onOtpCompleted"
                ></OtpForm>
              </div>
            </form>
            <div v-if="loadingOtp" class="mt-8 flex justify-center">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          v-if="!loadingOtp"
          class="flex flex-wrap mb-36 md:mt-6 md:mb-0 relative"
        >
          <div class="w-1/2"></div>
          <div class="w-1/2 text-right">
            <button
              @click="resendOtpHandle"
              :disabled="countdownResend"
              :class="[
                countdownResend
                  ? 'text-gray-600'
                  : 'text-gray-200 hover:underline',
              ]"
            >
              <small>{{ resendText }}</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeUnmount, ref, reactive, onMounted } from "vue";
import { env } from "@/env";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { encryptKey } from "@/secured";
import axios from "axios";
import ErrorAlert from "@/components/Alerts/ErrorAlert.vue";
import OtpForm from "@/components/Forms/OtpForm.vue";

// Realtime Socket.io
import { socket } from "@/socket";

// images
import gpdibangkamlogo from "@/assets/img/GPdIBangkamLogo.png";

window.onbeforeunload = () => {
  return "Apakah Anda Yakin Ingin Meninggalkan Halaman Ini?";
};

onBeforeUnmount(() => {
  window.onbeforeunload = null;
});

onMounted(() => {
  countdownResend.value = true;
  resendText.value = `Kirim Ulang Dalam ${state.countdown} detik`;

  state.timer = setInterval(() => {
    state.countdown--;

    if (state.countdown === 0) {
      state.countdown = 60;
      clearInterval(state.timer);
      state.timer = null;

      resendText.value = "Kirim Ulang Kode OTP";
      countdownResend.value = false;
    } else {
      resendText.value = `Kirim Ulang Dalam ${state.countdown} detik`;
    }
  }, 1000);
});

const authStore = useAuthStore();
const router = useRouter();

const loginSession = ref(authStore.getSessionByName("LoginSession"));
const registerSession = ref(authStore.getSessionByName("RegisterSession"));
const aktivasiSession = ref(authStore.getSessionByName("AktivasiSession"));
const loadingOtp = ref(false);
const showErrorAlert = ref(false);
const errorResponseMessage = ref("");
const typeHandle = ref(router.currentRoute.value.params.type);

const state = reactive({
  countdown: 60,
  timer: null,
});
const resendText = ref("Kirim Ulang Kode OTP");
const countdownResend = ref(false);

function toggleAlert() {
  showErrorAlert.value = !showErrorAlert.value;
}

function resendOtpHandle() {
  countdownResend.value = true;
  resendText.value = `Kirim Ulang Dalam ${state.countdown} detik`;

  state.timer = setInterval(() => {
    state.countdown--;

    if (state.countdown === 0) {
      state.countdown = 60;
      clearInterval(state.timer);
      state.timer = null;

      resendText.value = "Kirim Ulang Kode OTP";
      countdownResend.value = false;
    } else {
      resendText.value = `Kirim Ulang Dalam ${state.countdown} detik`;
    }
  }, 1000);

  sendEmail();
}

async function sendEmail() {
  try {
    if (typeHandle.value === "login") {
      await axios.post(
        `${env.API_URL}/auth/kirim-otp`,
        {
          uuid: loginSession.value.session.loginId,
          type: "Login",
          email: loginSession.value.email,
        },
        {
          withCredentials: true,
        }
      );
    } else if (typeHandle.value === "register") {
      await axios.post(
        `${env.API_URL}/auth/kirim-otp`,
        {
          uuid: registerSession.value.session.registerId,
          type: "Register",
          email: registerSession.value.email,
        },
        {
          withCredentials: true,
        }
      );
    } else if (typeHandle.value === "aktivasi") {
      await axios.post(
        `${env.API_URL}/auth/kirim-otp`,
        {
          uuid: aktivasiSession.value.session.uuid,
          type: "Aktivasi",
          email: aktivasiSession.value.email,
        },
        {
          withCredentials: true,
        }
      );
    } else {
      console.error("Tidak Ada Parameter");
    }
  } catch (error) {
    console.log(error);
    errorResponseMessage.value = error.response.data.messages;
    toggleAlert();
  }
}

async function onOtpCompleted(otp) {
  loadingOtp.value = true;

  try {
    if (typeHandle.value === "login") {
      const response = await axios.post(
        `${env.API_URL}/auth/login`,
        {
          uuid: loginSession.value.session.loginId,
          email: loginSession.value.email,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      const accessToken = response.data.data.token;
      const refreshToken = response.data.data.refreshToken;
      const userData = response.data.data.userData;

      socket.auth = { idUser: userData.id, userLevel: userData.level };
      socket.connect();

      if (authStore.rememberMe) {
        // Simpan Token
        authStore.saveTokens(accessToken, refreshToken);

        // Simpan ID User
        authStore.setIdUser(userData.id);

        // Atur Bahwa User Telah Login
        authStore.setIsLoggedIn("Login");

        // Atur Level User
        authStore.setLevelUser(userData.level);

        // Simpan Informasi Yang Diencrypt Di localStorage
        localStorage.setItem(
          "_SSIDGSB0",
          encryptKey(authStore.isLoggedIn, env.APP_KEY)
        );
        localStorage.setItem("_SSIDGSB1", encryptKey(accessToken, env.APP_KEY));
        localStorage.setItem(
          "_SSIDGSB2",
          encryptKey(refreshToken, env.APP_KEY)
        );
        localStorage.setItem("_SSIDGSB3", encryptKey(userData.id, env.APP_KEY));
        localStorage.setItem(
          "_SSIDGSB4",
          encryptKey(userData.level, env.APP_KEY)
        );
      } else {
        // Simpan Token
        authStore.saveTokens(accessToken, refreshToken);

        // Simpan ID User
        authStore.setIdUser(userData.id);

        // Atur Bahwa User Telah Login
        authStore.setIsLoggedIn(true);

        // Atur Level User
        authStore.setLevelUser(userData.level);
      }

      // Hapus Session
      authStore.deleteSessions();

      // Push User Ke Halaman Sesuai Dengan Level User
      if (userData.level === "Administrator") {
        router.push({ name: "AdminDashboard" });
      } else {
        router.push({ name: "HomePage" });
      }
    } else if (typeHandle.value === "register") {
      const response = await axios.post(
        `${env.API_URL}/auth/register`,
        {
          uuid: registerSession.value.session.registerId,
          email: registerSession.value.email,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      const accessToken = response.data.data.token;
      const refreshToken = response.data.data.refreshToken;
      const userData = response.data.data.user;

      socket.auth = { idUser: userData.id, userLevel: userData.level };
      socket.connect();

      // Simpan Token
      authStore.saveTokens(accessToken, refreshToken);

      // Simpan ID User
      authStore.setIdUser(userData.id);

      // Atur Bahwa User Telah Login
      authStore.setIsLoggedIn(true);

      // Atur Level User
      authStore.setLevelUser(userData.level);

      // Hapus Session
      authStore.deleteSessions();

      // Push User Ke Halaman Sesuai Dengan Level User
      if (userData.level === "Administrator") {
        router.push({ name: "AdminDashboard" });
      } else {
        router.push({ name: "HomePage" });
      }
    } else if (typeHandle.value === "aktivasi") {
      const response = await axios.post(
        `${env.API_URL}/auth/aktivasi`,
        {
          uuid: aktivasiSession.value.session.uuid,
          email: aktivasiSession.value.email,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      const accessToken = response.data.data.token;
      const refreshToken = response.data.data.refreshToken;
      const userData = response.data.data.user;

      socket.auth = { idUser: userData.id, userLevel: userData.level };
      socket.connect();

      if (authStore.rememberMe) {
        // Simpan Token
        authStore.saveTokens(accessToken, refreshToken);

        // Simpan ID User
        authStore.setIdUser(userData.id);

        // Atur Bahwa User Telah Login
        authStore.setIsLoggedIn("Login");

        // Atur Level User
        authStore.setLevelUser(userData.level);

        // Simpan Informasi Yang Diencrypt Di localStorage
        localStorage.setItem(
          "_SSIDGSB0",
          encryptKey(authStore.isLoggedIn, env.APP_KEY)
        );
        localStorage.setItem("_SSIDGSB1", encryptKey(accessToken, env.APP_KEY));
        localStorage.setItem(
          "_SSIDGSB2",
          encryptKey(refreshToken, env.APP_KEY)
        );
        localStorage.setItem("_SSIDGSB3", encryptKey(userData.id, env.APP_KEY));
        localStorage.setItem(
          "_SSIDGSB4",
          encryptKey(userData.level, env.APP_KEY)
        );
      } else {
        // Simpan Token
        authStore.saveTokens(accessToken, refreshToken);

        // Simpan ID User
        authStore.setIdUser(userData.id);

        // Atur Bahwa User Telah Login
        authStore.setIsLoggedIn(true);

        // Atur Level User
        authStore.setLevelUser(userData.level);
      }

      // Hapus Session
      authStore.deleteSessions();

      // Push User Ke Halaman Sesuai Dengan Level User
      if (userData.level === "Administrator") {
        router.push({ name: "AdminDashboard" });
      } else {
        router.push({ name: "HomePage" });
      }
    } else {
      console.error("Tidak Ada Parameter");
    }
  } catch (error) {
    console.log(error);
    errorResponseMessage.value = error.response.data.messages;
    toggleAlert();
  } finally {
    loadingOtp.value = false;
  }
}
</script>
