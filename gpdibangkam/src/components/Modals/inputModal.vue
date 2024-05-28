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
        <form @submit.prevent="submitForm">
          <div
            class="relative px-6 flex-auto overflow-y-auto max-h-[26rem] my-6"
          >
            <div class="mb-6 text-red-500 text-sm font-semibold">
              {{ props.pesan }}
            </div>
            <div class="grid gap-6 lg:grid-cols-2">
              <div
                :class="[
                  field.type === 'textarea' || field.type === 'longtext'
                    ? 'col-span-2'
                    : '',
                ]"
                v-for="(field, index) in props.inputFields"
                :key="index"
              >
                <label
                  v-if="field.type === 'file'"
                  :for="
                    field.label
                      .toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/[^\w-]+/g, '')
                  "
                  class="block mb-2 text-sm font-medium text-gray-900 break-all"
                  >{{ field.label + ": " + field.defaultValue }}</label
                >
                <label
                  v-else
                  :for="
                    field.label
                      .toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/[^\w-]+/g, '')
                  "
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >{{ field.label }}</label
                >
                <QuillEditor
                  v-if="field.type === 'textarea'"
                  theme="snow"
                  toolbar="essential"
                  :placeholder="field.placeholder"
                  :readOnly="field.isDisable"
                  :content="field.defaultValue"
                  contentType="html"
                  v-model:content="field.value"
                />
                <textarea
                  v-else-if="field.type === 'longtext'"
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="field.placeholder"
                  :readOnly="field.isDisable"
                  :required="field.isRequire"
                  v-model="field.value"
                ></textarea>
                <input
                  v-else-if="field.type === 'file'"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                  :id="
                    field.label
                      .toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/[^\w-]+/g, '')
                  "
                  type="file"
                  @change="handleFileUpload($event, field.name)"
                  :required="field.isRequire"
                />
                <select
                  v-else-if="field.type === 'select'"
                  :id="
                    field.label
                      .toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/[^\w-]+/g, '')
                  "
                  v-model="field.value"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :disabled="field.isDisable"
                  :required="field.isRequire"
                >
                  <option
                    v-for="(list, index) in field.list"
                    :value="list.value"
                    :key="index"
                  >
                    {{ list.label }}
                  </option>
                </select>
                <input
                  v-else
                  :type="field.type"
                  :id="
                    field.label
                      .toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/[^\w-]+/g, '')
                  "
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :placeholder="field.placeholder"
                  :disabled="field.isDisable"
                  v-model="field.value"
                  :value="field.defaultValue"
                  :required="field.isRequire"
                />
              </div>
            </div>
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
              type="submit"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Sedang Loading</span>
              <span v-else>{{ btnTitle }}</span>
            </button>
          </div>
        </form>
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
import { QuillEditor } from "@vueup/vue-quill";
import { verifyToken, doRefreshToken } from "@/helpers";
import { encryptKey } from "@/secured";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const instance = getCurrentInstance();
const authStore = useAuthStore();
defineEmits(["modal-toggle", "action-after-submit", "alert-toggle"]);
let props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  pesan: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  btnTitle: {
    type: String,
    required: true,
  },
  inputFields: {
    type: Array,
    required: true,
  },
  urlEndpoint: {
    type: String,
    required: true,
  },
  urlMethod: {
    type: String,
    required: true,
  },
  urlId: {
    type: String,
  },
});

const isLoading = ref(false);
const isUploadFile = ref(false);
const fileUpload = ref({});

function toggleModal() {
  fileUpload.value = {};
  isUploadFile.value = false;
  instance.emit("modal-toggle");
}

function afterSubmit() {
  instance.emit("action-after-submit");
}

function toggleAlert(responseText) {
  instance.emit("alert-toggle", responseText);
}

function handleFileUpload(event, index) {
  isUploadFile.value = true;
  fileUpload.value[index] = event.target.files[0];
}

function submitForm() {
  isLoading.value = true;
  let formData = "";
  if (isUploadFile.value) {
    formData = new FormData();
    props.inputFields.forEach((input) => {
      if (input.type === "file") {
        formData.append(input.name, fileUpload.value[input.name]);
      } else {
        formData.append(input.name, input.value);
      }
    });
  } else {
    formData = {};
    props.inputFields.forEach((input) => {
      formData[input.name] = input.value;
    });
  }

  if (props.urlMethod === "PUT") {
    if (verifyToken(authStore.accessToken)) {
      axios
        .put(`${env.API_URL}/${props.urlEndpoint}/${props.urlId}`, formData, {
          headers: {
            authorization: authStore.accessToken,
          },
        })
        .then(() => {
          isLoading.value = false;
          fileUpload.value = {};
          isUploadFile.value = false;

          toggleModal();
          afterSubmit();
          toggleAlert("Data Berhasil Diubah");
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
            .put(
              `${env.API_URL}/${props.urlEndpoint}/${props.urlId}`,
              formData,
              {
                headers: {
                  authorization: response,
                },
              }
            )
            .then(() => {
              isLoading.value = false;
              fileUpload.value = {};
              isUploadFile.value = false;

              toggleModal();
              afterSubmit();
              toggleAlert("Data Berhasil Diubah");
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } else {
    if (verifyToken(authStore.accessToken)) {
      axios
        .post(`${env.API_URL}/${props.urlEndpoint}`, formData, {
          headers: {
            authorization: authStore.accessToken,
          },
        })
        .then(() => {
          isLoading.value = false;
          fileUpload.value = {};
          isUploadFile.value = false;

          toggleModal();
          afterSubmit();
          toggleAlert("Data Berhasil Ditambah");
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
            .post(`${env.API_URL}/${props.urlEndpoint}`, formData, {
              headers: {
                authorization: response,
              },
            })
            .then(() => {
              isLoading.value = false;
              fileUpload.value = {};
              isUploadFile.value = false;

              toggleModal();
              afterSubmit();
              toggleAlert("Data Berhasil Ditambah");
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
}
</script>
