<template>
  <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-pink-500">
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-exclamation-circle"></i>
    </span>
    <span class="inline-block align-middle mr-8">
      <b class="capitalize">{{ judulAlert }}</b> | {{ isiAlert }}
    </span>
    <button
      class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
      @click="invokeToggleAlert"
    >
      <span>×</span>
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  toggleFunction: {
    type: Function,
    required: true,
  },
  judulAlert: {
    type: String,
    required: true,
  },
  isiAlert: {
    type: String,
    required: true,
  },
});

function invokeToggleAlert() {
  props.toggleFunction();
}
</script>
