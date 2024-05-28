<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-28 shadow-lg rounded-lg bg-white"
      >
        <div class="rounded-lg mb-0 px-4 py-3 border-0 bg-blue-700">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 py-8 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-3xl text-white">Yesaya 41:10</h3>
              <p class="text-white">
                Janganlah takut, sebab Aku menyertai dia, janganlah bimbang,
                sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong
                sekalipun; Aku akan memegang tangan kanan Ku yang membawa
                kemenangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, getCurrentInstance } from "vue";

const instance = getCurrentInstance();
defineEmits(["route-changed"]);

onMounted(() => {
  instance.emit("route-changed", "Dashboard");
});
</script>
