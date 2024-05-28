<template>
  <div>
    <user-navbar />
    <main>
      <div
        class="relative pt-20 pb-32 flex content-center items-center justify-center min-h-[75vh]"
      >
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          :style="{ 'background-image': 'url(' + herobg + ')' }"
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-75 bg-black"
          >
          </span>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <h1 class="text-white font-semibold text-5xl">
                Tuhan adalah cinta
              </h1>
              <p class="mt-4 text-lg text-gray-200">
                Tuhan, aku cinta pada rumah kediaman-Mu dan pada tempat
                kemuliaan-Mu bersemayam.
                <br /><b>Mazmur 19:8</b>
              </p>
            </div>
          </div>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
          style="transform: translateZ(0)"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <router-view />
    </main>
    <footer class="relative bg-blue-700 pt-8 pb-6">
      <div
        class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
        style="transform: translateZ(0)"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-blue-700 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap text-center md:text-left text-white">
          <div class="w-full lg:w-6/12 px-4">
            <h4 class="text-3xl font-semibold">GPdI El-Shaddai Bangkam</h4>
            <h5 class="text-lg mt-0 mb-2 text-blue-300">
              Mari datang beribadah, memuliakan nama Tuhan bersama-sama di GPdI
              El-Shaddai Bangkam. Kami menanti kehadiran Anda dan keluarga
              disini. <br /><br />
              Salam Kami,<br />Pengurus GPdI El-Shaddai Bangkam
            </h5>
            <div class="mt-6 lg:mb-0 mb-6">
              <button
                class="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-middle rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i class="fab fa-facebook-square"></i>
              </button>
              <button
                class="bg-white text-pink-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-middle rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i class="fa-brands fa-square-instagram"></i>
              </button>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="flex justify-end mb-6">
              <button
                class="bg-green-600 text-white hover:bg-green-800 active:bg-green-800 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                <div class="flex items-center">
                  <i class="fa-solid fa-mobile-screen text-3xl"></i>
                  <div class="ml-4 text-start">
                    <h2 class="font-bold">Download Aplikasi Mobile</h2>
                    <p>Dapatkan Fitur Penuh Hanya Pada Aplikasi Mobile</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <hr class="my-6 border-blue-300" />
        <div
          class="flex flex-wrap items-center md:justify-between justify-center"
        >
          <div class="w-full md:w-4/12 px-4 mx-auto text-center">
            <div class="text-sm text-blue-300 font-semibold py-1">
              Copyright © {{ date }} GPdI El-Shaddai Bangkam
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { ref } from "vue";
import UserNavbar from "@/components/Navbars/UserNavbar.vue";

// Images
import herobg from "@/assets/img/HeroBg.jpg";

const date = ref(new Date().getFullYear());
</script>
