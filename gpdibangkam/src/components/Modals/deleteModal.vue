<template>
  <div
    v-if="isModalOpen"
    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
  >
    <div class="relative my-6 mx-auto max-w-3xl w-auto lg:w-[55rem]">
      <!--content-->
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
      >
        <!--header-->
        <div
          class="flex items-center justify-between py-3 px-5 bg-blue-700 rounded-t"
        >
          <h3 class="text-xl font-semibold text-white">{{ title }}</h3>
          <button
            class="p-1 ml-auto border-0 text-white float-right text-xl leading-none font-semibold outline-none focus:outline-none"
            v-on:click="toggleModal()"
          >
            <span class="h-6 w-6 block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <!--body-->
        <div class="relative px-6 flex-auto overflow-y-auto max-h-[26rem] my-6">
          Apa Anda Yakin Ingin Hapus?
        </div>
        <!--footer-->
        <div
          class="flex items-center justify-end p-4 border-t border-solid border-gray-200 rounded-b"
        >
          <button
            class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            v-on:click="toggleModal()"
          >
            Batal
          </button>
          <button
            :class="[
              isLoading
                ? 'bg-emerald-300 text-gray-400'
                : 'bg-emerald-500 text-white',
            ]"
            class="active:bg-emerald-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            @click="submitForm"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Sedang Loading</span>
            <span v-else>Hapus Data</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isModalOpen" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { env } from "@/env";
import axios from "axios";
import { useAuthStore } from "@/stores/AuthStore";
import { verifyToken, doRefreshToken } from "@/helpers";
import { encryptKey } from "@/secured";

const instance = getCurrentInstance();
const authStore = useAuthStore();
defineEmits(["modal-toggle", "action-after-submit", "alert-toggle"]);
let props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  urlEndpoint: {
    type: String,
    required: true,
  },
  urlId: {
    type: String,
  },
});

const isLoading = ref(false);

function toggleModal() {
  instance.emit("modal-toggle");
}

function afterSubmit() {
  instance.emit("action-after-submit");
}

function toggleAlert(responseText) {
  instance.emit("alert-toggle", responseText);
}

function submitForm() {
  isLoading.value = true;
  if (verifyToken(authStore.accessToken)) {
    axios
      .delete(`${env.API_URL}/${props.urlEndpoint}/${props.urlId}`, {
        headers: {
          authorization: authStore.accessToken,
        },
      })
      .then(() => {
        isLoading.value = false;

        toggleModal();
        afterSubmit();
        toggleAlert("Data Berhasil Dihapus");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    doRefreshToken(authStore.refreshToken)
      .then((response) => {
        authStore.saveTokens(response, authStore.refreshToken);
        localStorage.setItem("_SSIDGSB1", encryptKey(response, env.APP_KEY));

        axios
          .delete(`${env.API_URL}/${props.urlEndpoint}/${props.urlId}`, {
            headers: {
              authorization: response,
            },
          })
          .then(() => {
            isLoading.value = false;

            toggleModal();
            afterSubmit();
            toggleAlert("Data Berhasil Dihapus");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>
