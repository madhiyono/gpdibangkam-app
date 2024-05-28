<template>
  <main>
    <section class="relative w-full h-full pt-24 pb-40 min-h-screen">
      <div
        class="absolute top-0 w-full h-full bg-gray-800 bg-no-repeat bg-full"
        v-bind:style="{ 'background-image': 'url(' + authbg + ')' }"
      ></div>
      <router-view />
      <footer class="absolute w-full md:bottom-0 bg-gray-800 pb-6">
        <div class="container mx-auto px-4">
          <hr class="mb-6 border-b-[1px] border-gray-600" />
          <div
            class="flex flex-wrap items-center md:justify-between justify-center"
          >
            <div class="w-full md:w-4/12 px-4">
              <div
                class="text-sm text-gray-500 font-semibold py-1 text-center md:text-left"
              >
                Copyright © {{ date }} GPdI El-Shaddai Bangkam
              </div>
            </div>
            <div class="w-full md:w-8/12 px-4">
              <div
                class="flex flex-wrap md:justify-end justify-center mt-8 md:mt-0"
              >
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
        </div>
      </footer>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";

// images
import authbg from "@/assets/img/AuthBg.png";

const date = ref(new Date().getFullYear());
</script>
