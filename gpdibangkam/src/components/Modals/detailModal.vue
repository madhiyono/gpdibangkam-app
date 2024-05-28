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
          <div class="grid gap-6">
            <div v-for="(field, index) in inputFields" :key="index">
              <label
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
                :options="editorOptions"
                :content="field.value"
                content-type="html"
              />
              <textarea
                v-else-if="field.type === 'longtext'"
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                readonly
                v-model="field.value"
              ></textarea>
              <div
                v-else-if="field.type === 'image'"
                class="w-full flex justify-center"
              >
                <img :src="field.value" alt="" class="max-w-xl" />
              </div>
              <div
                v-else-if="field.type === 'downloadfile'"
                class="w-full flex justify-center"
              >
                <a
                  class="bg-blue-700 hover:bg-blue-500 text-white w-full text-center rounded-lg py-2 font-semibold"
                  :href="field.value"
                  >Download</a
                >
              </div>
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
                :value="field.value"
                readonly
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
        </div>
      </div>
    </div>
  </div>
  <div v-if="isModalOpen" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const instance = getCurrentInstance();
defineEmits(["modal-toggle"]);
defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  inputFields: {
    type: Array,
    required: true,
  },
});

const editorOptions = {
  readOnly: true,
};

function toggleModal() {
  instance.emit("modal-toggle");
}
</script>
