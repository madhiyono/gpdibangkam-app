<template>
  <div>
    <a
      class="text-gray-500 block py-1 px-3"
      ref="btnDropdownRef"
      @click="toggleDropdown($event)"
    >
      <i class="fas fa-bell"></i>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-[48px]"
      :class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
      >
        Action
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
      >
        Another action
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
      >
        Something else here
      </a>
      <div class="h-0 my-2 border border-solid border-gray-100" />
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
      >
        Seprated link
      </a>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { createPopper } from "@popperjs/core";

const dropdownPopoverShow = ref(false);
const btnDropdownRef = ref(null);
const popoverDropdownRef = ref(null);

function toggleDropdown(event) {
  event.preventDefault();
  if (dropdownPopoverShow.value) {
    dropdownPopoverShow.value = false;
  } else {
    dropdownPopoverShow.value = true;
    createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
      placement: "bottom-start",
    });
  }
}
</script>
