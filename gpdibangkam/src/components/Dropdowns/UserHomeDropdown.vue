<template>
  <div class="pb-4 pt-2 lg:py-2">
    <button
      class="hover:underline text-gray-700 lg:text-white lg:hover:underline px-3 py-2 flex items-center text-xs uppercase font-bold gap-x-2"
      type="button"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <img
        :src="dataBiodata.ProfilePhoto"
        class="w-[30px] h-[30px] object-cover object-top rounded-full align-middle border-none shadow-lg"
        alt="ProfilePhoto"
      />
      {{ dataBiodata.nama_lengkap }}
    </button>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-[48px]"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <router-link
        v-if="authStore.levelUser === 'Administrator'"
        :to="{ name: 'AdminDashboard' }"
        class="text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 flex items-center gap-x-2"
      >
        <i
          class="lg:text-gray-700 text-gray-400 fas fa-tv text-lg leading-relaxed"
        />
        <span class="hover:underline">Dashboard</span>
      </router-link>
      <router-link
        v-else
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
import { ref, onBeforeMount, reactive, watch } from "vue";
import { createPopper } from "@popperjs/core";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { env } from "@/env";
import axios from "axios";

// Realtime Socket.io
import { socket } from "@/socket";

// Image
import profilePhoto from "@/assets/img/profile.jpg";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const router = useRouter();
const dropdownPopoverShow = ref(false);
const btnDropdownRef = ref(null);
const popoverDropdownRef = ref(null);
const dataBiodata = reactive({
  nama_lengkap: "",
  ProfilePhoto: "",
});
const { userData } = storeToRefs(authStore);

onBeforeMount(() => {
  if (authStore.isLoggedIn) {
    if (!authStore.userData) {
      getUserData(authStore.idUser, authStore.accessToken).then((response) => {
        dataBiodata.nama_lengkap = response.nama_lengkap;
        if (response.foto_profile) {
          dataBiodata.ProfilePhoto = response.foto_profile;
        } else {
          dataBiodata.ProfilePhoto = profilePhoto;
        }
      });
    } else {
      dataBiodata.nama_lengkap = authStore.userData.nama_lengkap;
      if (authStore.userData.foto_profile) {
        dataBiodata.ProfilePhoto = authStore.userData.foto_profile;
      } else {
        dataBiodata.ProfilePhoto = profilePhoto;
      }
    }
  }
});

watch(userData, () => {
  if (userData.value.foto_profile) {
    dataBiodata.ProfilePhoto = userData.value.foto_profile;
  } else {
    dataBiodata.ProfilePhoto = profilePhoto;
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
