<template>
  <div>
    <button
      class="hover:underline text-gray-700 lg:text-white lg:hover:underline px-3 py-2 flex items-center text-xs uppercase font-bold gap-x-2"
      type="button"
      ref="btnDropdownRef"
      @click="toggleDropdown($event)"
    >
      <img
        :src="userData.ProfilePhoto"
        class="w-[30px] h-[30px] object-cover object-top rounded-full align-middle border-none shadow-lg"
        alt="ProfilePhoto"
      />
      {{ userData.nama_lengkap }}
    </button>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-[48px]"
      :class="{ hidden: !dropdownPopoverShow, block: dropdownPopoverShow }"
    >
      <router-link
        :to="{ name: 'HomePage' }"
        class="text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 flex items-center gap-x-2"
      >
        <i
          class="lg:text-gray-700 text-gray-400 fas fa-home text-lg leading-relaxed"
        />
        <span class="hover:underline">Landing</span>
      </router-link>
      <router-link
        :to="{ name: 'ProfilePage' }"
        class="text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 flex items-center gap-x-2"
      >
        <i
          class="lg:text-gray-700 text-gray-400 fas fa-user text-lg leading-relaxed"
        />
        <span class="hover:underline">Profile</span>
      </router-link>

      <button
        @click="logoutHandle"
        class="text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 flex items-center gap-x-2"
      >
        <i
          class="lg:text-gray-700 text-gray-400 fas fa-sign-out text-lg leading-relaxed"
        />
        <span class="hover:underline">Keluar</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { createPopper } from "@popperjs/core";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { env } from "@/env";
import axios from "axios";

// Realtime Socket.io
import { socket } from "@/socket";

// Image
import profilePhoto from "@/assets/img/profile.jpg";

const authStore = useAuthStore();
const router = useRouter();

const dropdownPopoverShow = ref(false);
const btnDropdownRef = ref(null);
const popoverDropdownRef = ref(null);
const userData = reactive({
  nama_lengkap: "",
  ProfilePhoto: "",
});

onBeforeMount(() => {
  if (authStore.isLoggedIn) {
    if (!authStore.userData) {
      getUserData(authStore.idUser, authStore.accessToken).then((response) => {
        userData.nama_lengkap = response.nama_lengkap;
        if (response.foto_profile) {
          userData.ProfilePhoto = response.foto_profile;
        } else {
          userData.ProfilePhoto = profilePhoto;
        }
      });
    } else {
      userData.nama_lengkap = authStore.userData.nama_lengkap;
      if (authStore.userData.foto_profile) {
        userData.ProfilePhoto = authStore.userData.foto_profile;
      } else {
        userData.ProfilePhoto = profilePhoto;
      }
    }
  }
});

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

async function getUserData(id, token) {
  try {
    const response = await axios.get(`${env.API_URL}/users/${id}`, {
      headers: {
        authorization: token,
      },
    });

    authStore.saveUserData(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

function logoutHandle() {
  localStorage.removeItem("_SSIDGSB0");
  localStorage.removeItem("_SSIDGSB1");
  localStorage.removeItem("_SSIDGSB2");
  localStorage.removeItem("_SSIDGSB3");
  localStorage.removeItem("_SSIDGSB4");

  authStore.resetAuthStore();
  socket.disconnect();
  router.push({ name: "AuthLogin" });
}
</script>
