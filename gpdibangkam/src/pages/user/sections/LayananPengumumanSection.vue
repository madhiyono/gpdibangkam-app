<template>
  <section class="pb-20 bg-gray-200 lg:-mt-24 -mt-36">
    <div class="container mx-auto px-4">
      <div class="grid md:gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
        <div class="relative text-white bg-blue-500 text-center py-5">
          <i class="fas mb-2 fa-3x fa-praying-hands"></i>
          <h3 class="text-xl font-bold">Ibadah Raya</h3>
        </div>
        <div class="relative text-white bg-blue-700 text-center py-5">
          <i class="fas mb-2 fa-3x fa-dove"></i>
          <h3 class="text-xl font-bold">Ibadah Mukjizat</h3>
        </div>
        <div class="relative text-white bg-blue-500 text-center py-5">
          <i class="fas mb-2 fa-3x fa-cross"></i>
          <h3 class="text-xl font-bold">Kegiatan Pemuda</h3>
        </div>
        <div class="relative text-white bg-blue-700 text-center py-5">
          <i class="fas mb-2 fa-3x fa-music"></i>
          <h3 class="text-xl font-bold">Latihan Musik</h3>
        </div>
      </div>
    </div>

    <div id="layanan" class="container mx-auto px-4 pt-16">
      <div class="flex flex-wrap">
        <div class="relative w-full text-center lg:mb-5 md:mb-5">
          <span class="text-sm text-orange-400 italic"
            >Dapatkan Layanan Kami Secara Online</span
          >
          <h6 class="text-3xl font-bold text-blue-700">Layanan Kami</h6>
        </div>

        <router-link
          class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
          to="/layanan/pernikahan"
        >
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-lg hover:scale-105 ease-linear duration-150"
          >
            <div class="px-4 py-5 flex-auto">
              <div
                class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400"
              >
                <i class="fas fa-church"></i>
              </div>
              <h6 class="text-xl font-semibold">Pernikahan</h6>
              <p class="mt-2 mb-4 text-gray-500">
                Janganlah kamu berhutang apa-apa kepada siapa pun juga, tetapi
                hendaklah kamu saling mengasihi. Sebab barangsiapa mengasihi
                sesamanya manusia, ia sudah memenuhi hukum Taurat.
                <br /><b>Roma 13:8</b>
              </p>
            </div>
          </div>
        </router-link>

        <router-link
          class="w-full md:w-4/12 px-4 text-center"
          to="/layanan/anak"
        >
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-lg hover:scale-105 ease-linear duration-150"
          >
            <div class="px-4 py-5 flex-auto">
              <div
                class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400"
              >
                <i class="fas fa-praying-hands"></i>
              </div>
              <h6 class="text-xl font-semibold">Penyerahan Anak</h6>
              <p class="mt-2 mb-4 text-gray-500">
                Ketika Yesus melihat hal itu, Ia marah dan berkata kepada
                mereka: "Biarkan anak-anak itu datang kepada-Ku, jangan
                menghalang-halangi mereka, sebab orang-orang yang seperti itulah
                yang empunya Kerajaan Allah.
                <br /><b>Markus 10:14</b>
              </p>
            </div>
          </div>
        </router-link>

        <router-link
          class="lg:pt-6 w-full md:w-4/12 px-4 text-center"
          to="/layanan/baptis"
        >
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-lg hover:scale-105 ease-linear duration-150"
          >
            <div class="px-4 py-5 flex-auto">
              <div
                class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-yellow-400"
              >
                <i class="fas fa-bible"></i>
              </div>
              <h6 class="text-xl font-semibold">Pembaptisan Air</h6>
              <p class="mt-2 mb-4 text-gray-500">
                Pada waktu itu Dia telah menyelamatkan kita, bukan karena
                perbuatan baik yang telah kita lakukan, tetapi karena rahmat-Nya
                oleh permandian kelahiran kembali dan oleh pembaharuan yang
                dikerjakan oleh Roh Kudus,
                <br /><b>Titus 3:5</b>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div id="pengumuman" class="container mx-auto px-4 mt-12">
      <div class="flex flex-wrap">
        <div class="relative w-full text-center lg:mb-5">
          <span class="text-sm text-orange-400 italic"
            >Memberitakan Kerajaan Allah Sudah Tiba</span
          >
          <h6 class="text-3xl font-bold text-blue-700">
            Pengumuman Terbaru Gereja
          </h6>
        </div>

        <div
          v-if="isPengumumanLoading"
          class="grid md:grid-cols-3 grid-cols-1 gap-3 mt-8"
        >
          <potrait-card-skeleton v-for="index in 3" :key="index" />
        </div>
        <div
          v-else-if="dataPengumuman.length > 0"
          class="grid md:grid-cols-3 grid-cols-1 gap-8 mt-8"
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
        <div
          v-if="!isPengumumanLoading && dataPengumuman.length > 0"
          class="w-full flex justify-center mt-8"
        >
          <router-link
            class="bg-blue-600 text-white hover:bg-blue-800 active:bg-blue-800 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
            :to="{ name: 'PengumumanPage' }"
          >
            Lihat Selengkapnya
          </router-link>
        </div>
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
      if (responseData.length > 3) {
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
          })
          .slice(0, 3);
      } else {
        dataPengumuman.value = responseData.map((pengumuman) => {
          const date = new Date(pengumuman.tanggal);
          const options = { day: "2-digit", month: "long", year: "numeric" };

          return {
            ...pengumuman,
            tanggal: date.toLocaleDateString("id-ID", options),
          };
        });
      }
      isPengumumanLoading.value = false;
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
