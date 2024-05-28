<template>
  <section class="relative py-16 bg-gray-200">
    <div class="container mx-auto px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full -mb-16 pb-16 shadow-xl rounded-lg -mt-44"
      >
        <div class="lg:p-12 p-4 flex lg:gap-8 gap-4 lg:mb-0 mb-4">
          <router-link
            class="bg-blue-500 lg:text-base text-xs active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            :to="{ name: 'HomePage', hash: '#pengumuman' }"
          >
            Ke Halaman Utama
          </router-link>
        </div>
        <div class="relative w-full text-center lg:mb-5">
          <span class="text-sm text-orange-400 italic"
            >Memberitakan Kerajaan Allah Sudah Tiba</span
          >
          <h6 class="text-3xl font-bold text-blue-700">
            Daftar Pengumuman Gereja
          </h6>
        </div>

        <div
          v-if="isPengumumanLoading"
          class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-8"
        >
          <potrait-card-skeleton v-for="index in 3" :key="index" />
        </div>
        <div
          v-else-if="dataPengumuman.length > 0"
          class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8 px-12"
        >
          <router-link
            v-for="pengumuman in dataPengumuman"
            :key="pengumuman.id"
            :to="{ name: 'DetailPengumuman', params: { id: pengumuman.id } }"
          >
            <potrait-card
              class="hover:shadow-lg hover:scale-105 ease-linear duration-150"
              :gambarPost="pengumuman.gambar"
              :judulPost="pengumuman.judul"
              :tanggalPost="pengumuman.tanggal"
              :authorPost="pengumuman.author"
              :isiPost="pengumuman.isi"
            />
          </router-link>
        </div>
        <h2
          v-else
          class="w-full mt-8 text-center bg-blue-100 py-7 text-blue-700 font-bold text-xl rounded"
        >
          Tidak Ada Data Pengumuman
        </h2>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { env } from "@/env";
import axios from "axios";

import PotraitCard from "@/components/Cards/PotraitCard.vue";

// Skeleton Loading
import PotraitCardSkeleton from "@/components/SkeletonLoadings/PotraitCardSkeleton.vue";

onMounted(() => {
  fetchPengumuman();
});

const dataPengumuman = ref([]);
const isPengumumanLoading = ref(true);

async function fetchPengumuman() {
  await axios
    .get(`${env.API_URL}/pengumuman`)
    .then((response) => {
      const responseData = response.data.data;
      dataPengumuman.value = responseData
        .sort((a, b) => {
          return new Date(b.tanggal) - new Date(a.tanggal);
        })
        .map((pengumuman) => {
          const date = new Date(pengumuman.tanggal);
          const options = { day: "2-digit", month: "long", year: "numeric" };

          return {
            ...pengumuman,
            tanggal: date.toLocaleDateString("id-ID", options),
          };
        });
      isPengumumanLoading.value = false;
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
