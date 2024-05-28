<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link
          class="text-white text-sm font-bold leading-relaxed flex items-center mr-4 py-2 uppercase"
          :to="{ name: 'HomePage' }"
        >
          <img :src="gpdibangkamlogo" class="h-12 mr-2" alt="GPdIBangkamLogo" />
          Gereja Pantekosta di Indonesia - Bangkam
        </router-link>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="setNavbarOpen"
        >
          <i
            class="text-white transition-all duration-150"
            :class="[navbarOpen ? 'fas fa-xmark' : 'fas fa-bars']"
          ></i>
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none"
        :class="[navbarOpen ? 'block rounded shadow-lg' : 'hidden']"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-200 text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://www.facebook.com/gpdielshaddai.bangkam"
              target="_blank"
            >
              <i
                class="lg:text-gray-200 text-gray-400 fab fa-facebook text-lg leading-relaxed"
              />
              <span class="lg:hidden inline-block ml-2 hover:underline"
                >Share</span
              >
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-200 text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://www.instagram.com/gpdi_elshaddai.bkm/?hl=id"
              target="_blank"
            >
              <i
                class="lg:text-gray-200 text-gray-400 fa-brands fa-instagram text-lg leading-relaxed"
              />
              <span class="lg:hidden inline-block ml-2 hover:underline"
                >Post</span
              >
            </a>
          </li>

          <li v-if="authStore.isLoggedIn" class="flex items-center">
            <UserHomeDropdown />
          </li>
          <li v-else class="flex items-center">
            <router-link
              class="bg-green-600 text-white hover:bg-green-800 active:bg-green-800 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              :to="{ name: 'AuthLogin' }"
            >
              <i class="fa-solid fa-right-to-bracket"></i> Masuk
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import UserHomeDropdown from "@/components/Dropdowns/UserHomeDropdown.vue";

// images
import gpdibangkamlogo from "@/assets/img/GPdIBangkamLogo.png";

const authStore = useAuthStore();
const navbarOpen = ref(false);

function setNavbarOpen() {
  navbarOpen.value = !navbarOpen.value;
}
</script>
