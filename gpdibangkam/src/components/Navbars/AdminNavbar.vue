<template>
  <nav
    class="absolute top-0 left-0 w-full z-10 bg-transparent lg:flex-row lg:flex-nowrap lg:justify-start flex items-center p-4"
  >
    <div
      class="w-full mx-auto items-center flex justify-between lg:flex-nowrap flex-wrap lg:px-10 px-4"
    >
      <span
        class="text-white text-base uppercase hidden lg:inline-block font-semibold"
      >
        {{ namaHalaman }}
      </span>
      <ul class="flex-col lg:flex-row list-none items-center hidden lg:flex">
        <AdminProfileDropdown />
      </ul>
    </div>
  </nav>
</template>
<script setup>
import AdminProfileDropdown from "@/components/Dropdowns/AdminProfileDropdown.vue";

defineProps({
  namaHalaman: {
    type: String,
  },
});
</script>
