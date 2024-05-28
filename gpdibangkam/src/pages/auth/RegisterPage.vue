<template>
  <div class="container mx-auto px-4 h-full">
    <ErrorAlert
      v-if="showErrorAlert"
      class="sticky top-4 z-40"
      :toggleFunction="toggleAlert"
      judulAlert="Gagal Register"
      :isiAlert="errorResponseMessage"
    />
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full md:w-8/12 px-4">
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
              <b>Filipi 4:6-7</b><br /><br />
              Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi
              nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa
              dan permohonan dengan ucapan syukur. Damai sejahtera Allah, yang
              melampaui segala akal, akan memelihara hati dan pikiranmu dalam
              Kristus Yesus.
            </p>
            <hr class="mt-6 border-b-[1pt] border-gray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 pb-10">
            <div class="text-gray-400 text-center mb-3 font-bold">
              <small>Registrasi Akun</small>
            </div>
            <form @submit.prevent="registerHandle">
              <div class="w-full grid grid-cols-2 gap-4">
                <div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="nama"
                      >Nama Lengkap</label
                    >
                    <input
                      type="text"
                      id="nama"
                      v-model="nama"
                      @input="validateNama"
                      :class="{ 'focus:ring-red-500': namaError.isError }"
                      class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nama Lengkap"
                    />
                    <span
                      v-if="namaError.isError"
                      class="text-red-700 text-xs font-semibold"
                      >{{ namaError.errorMessage }}</span
                    >
                  </div>
                </div>
                <div>
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
                </div>
              </div>

              <div>
                <label
                  htmlFor="syaratKetentuan"
                  class="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="syaratKetentuan"
                    v-model="syaratKetentuan"
                    class="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-gray-600"
                    >Saya Setuju dengan Syarat dan Ketentuan</span
                  >
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  :class="[
                    isValidate || loadingRegister
                      ? 'bg-gray-400'
                      : 'bg-gray-800',
                  ]"
                  class="text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                  :disabled="isValidate || loadingRegister"
                >
                  <span v-if="loadingRegister">Sedang Proses</span>
                  <span v-else>Daftar</span>
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
            <router-link to="/auth/login" class="text-gray-200 hover:underline">
              <small>Sudah Punya Akun</small>
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

const nama = ref("");
const email = ref("");
const namaError = ref({
  isError: true,
  errorMessage: "",
});
const emailError = ref({
  isError: true,
  errorMessage: "",
});
const syaratKetentuan = ref(false);
const loadingRegister = ref(false);
const showErrorAlert = ref(false);
const errorResponseMessage = ref("");
const isValidate = computed(() => {
  return (
    namaError.value.isError ||
    emailError.value.isError ||
    !syaratKetentuan.value
  );
});

function toggleAlert() {
  showErrorAlert.value = !showErrorAlert.value;
}

function validateNama() {
  if (!nama.value) {
    namaError.value.isError = true;
    namaError.value.errorMessage = "Nama Wajib Diisi!";
  } else {
    namaError.value.isError = false;
    namaError.value.errorMessage = "";
  }
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
  router.go(-1);
}

async function registerHandle() {
  loadingRegister.value = true;

  try {
    const response = await axios.post(
      `${env.API_URL}/auth/register-otp`,
      {
        email: email.value,
        nama: nama.value,
      },
      {
        withCredentials: true,
      }
    );

    authStore.saveSessions({
      name: "RegisterSession",
      email: email.value,
      session: response.data.data,
    });

    router.push({ name: "AuthOtp", params: { type: "register" } });
  } catch (error) {
    errorResponseMessage.value = error.response.data.messages;
    toggleAlert();
  } finally {
    loadingRegister.value = false;
  }
}
</script>
