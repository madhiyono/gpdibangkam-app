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
      <div class="w-full md:w-4/12 px-4">
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
            <p class="text-gray-400 text-sm text-center">
              <b>1 Timotius 1:12</b><br /><br />
              Aku bersyukur kepada Dia, yang menguatkan aku, yaitu Kristus
              Yesus, Tuhan kita, karena Ia menganggap aku setia dan
              mempercayakan pelayanan ini kepadaku
            </p>
            <hr class="mt-6 border-b-[1pt] border-gray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 pb-10">
            <div class="text-gray-400 text-center mb-3 font-bold">
              <small>Selamat Datang</small>
            </div>
            <form @submit.prevent="loginHandle">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="email"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  @input="validateEmail"
                  :class="{ 'focus:ring-red-500': emailError.isError }"
                  class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
                <span
                  v-if="emailError.isError"
                  class="text-red-700 text-xs font-semibold"
                  >{{ emailError.errorMessage }}</span
                >
              </div>
              <div>
                <label
                  htmlFor="rememberme"
                  class="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="rememberme"
                    v-model="rememberMe"
                    class="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-gray-600"
                    >Ingat Saya</span
                  >
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  :class="[
                    isValidate || loadingLogin ? 'bg-gray-400' : 'bg-gray-800',
                  ]"
                  class="text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                  :disabled="isValidate || loadingLogin"
                >
                  <span v-if="loadingLogin">Sedang Proses</span>
                  <span v-else>Masuk</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mb-6 md:mt-6 md:mb-0 relative">
          <div class="w-1/2">
            <div
              @click="redirectPreviousPage"
              class="text-gray-200 hover:underline cursor-pointer"
            >
              <small>Kembali</small>
            </div>
          </div>
          <div class="w-1/2 text-right">
            <router-link
              to="/auth/register"
              class="text-gray-200 hover:underline"
            >
              <small>Buat Akun Baru</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { env } from "@/env";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import axios from "axios";
import ErrorAlert from "@/components/Alerts/ErrorAlert.vue";

// images
import gpdibangkamlogo from "@/assets/img/GPdIBangkamLogo.png";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const emailError = ref({
  isError: true,
  errorMessage: "",
});
const rememberMe = ref(false);
const loadingLogin = ref(false);
const showErrorAlert = ref(false);
const errorResponseMessage = ref("");
const isValidate = computed(() => {
  return emailError.value.isError;
});

function toggleAlert() {
  showErrorAlert.value = !showErrorAlert.value;
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    emailError.value.isError = true;
    emailError.value.errorMessage = "Email Wajib Diisi!";
  } else if (!emailRegex.test(email.value)) {
    emailError.value.isError = true;
    emailError.value.errorMessage = "Format Email Tidak Valid!";
  } else {
    emailError.value.isError = false;
    emailError.value.errorMessage = "";
  }
}

function redirectPreviousPage() {
  router.push({ name: "HomePage" });
}

async function loginHandle() {
  loadingLogin.value = true;

  try {
    const response = await axios.post(
      `${env.API_URL}/auth/login-otp`,
      {
        email: email.value,
      },
      {
        withCredentials: true,
      }
    );

    authStore.saveSessions({
      name: "LoginSession",
      email: email.value,
      session: response.data.data,
    });

    if (rememberMe.value) {
      authStore.setRememberMe(true);
    }

    router.push({ name: "AuthOtp", params: { type: "login" } });
  } catch (error) {
    loadingLogin.value = false;
    errorResponseMessage.value = error.response.data.messages;
    toggleAlert();

    if (error.response.data.messages === "Status User Belum Aktif") {
      loadingLogin.value = true;
      aktivasiHandle(
        error.response.data.data.uuid,
        error.response.data.data.email
      );
    }
  }
}

async function aktivasiHandle(uuid, email) {
  loadingLogin.value = true;

  try {
    const response = await axios.post(
      `${env.API_URL}/auth/aktivasi-otp`,
      {
        uuid,
        email,
      },
      {
        withCredentials: true,
      }
    );

    authStore.saveSessions({
      name: "AktivasiSession",
      email,
      session: response.data.data,
    });

    if (rememberMe.value) {
      authStore.setRememberMe(true);
    }

    router.push({ name: "AuthOtp", params: { type: "aktivasi" } });
  } catch (error) {
    errorResponseMessage.value = error.response.data.messages;
    toggleAlert();
  } finally {
    loadingLogin.value = false;
  }
}
</script>
