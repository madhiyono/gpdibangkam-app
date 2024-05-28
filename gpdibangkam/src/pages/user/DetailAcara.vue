<template>
  <section class="relative py-16 bg-gray-200">
    <div class="container mx-auto px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full -mb-16 shadow-xl rounded-lg -mt-44"
      >
        <div
          class="lg:p-12 p-4 flex lg:flex-row flex-col lg:justify-between items-center lg:gap-8 gap-4 lg:mb-0 mb-4"
        >
          <router-link
            class="bg-blue-500 lg:text-base text-xs active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            :to="{ name: 'HomePage', hash: '#acara' }"
          >
            Ke Halaman Utama
          </router-link>
          <span class="text-gray-400 text-sm">{{ dataAcara.created_at }}</span>
        </div>
        <div
          class="lg:px-32 md:px-10 px-6 flex flex-col items-center lg:mt-0 mt-8 lg:pb-24 pb-24"
        >
          <div class="relative w-full text-center lg:mb-4">
            <span class="text-sm text-orange-400 italic"
              >Kepada Saudara-saudari Kami Terkasih</span
            >
            <h6 class="text-3xl font-bold text-blue-700">
              Kami Mengundang Anda Beserta Keluarga
            </h6>
          </div>
          <h3 class="text-2xl font-bold mt-8 text-gray-600 italic">
            Menghadiri
          </h3>
          <h1 class="text-5xl font-bold text-center text-blue-700">
            Acara {{ dataAcara.nama }}
          </h1>
          <div class="flex flex-col lg:flex-row items-center mt-10 gap-4">
            <h6
              class="font-bold text-xl lg:text-2xl text-center bg-blue-700 text-white px-8 py-2 rounded-lg"
            >
              {{ dataAcara.tanggal_mulai }}
            </h6>
            <div class="w-4 h-2 rounded-full bg-blue-700"></div>
            <h6
              class="font-bold text-xl lg:text-2xl text-center bg-blue-700 text-white px-8 py-2 rounded-lg"
            >
              {{ dataAcara.tanggal_selesai }}
            </h6>
          </div>
          <span class="mt-8 text-center text-gray-400">Lokasi:</span>
          <h6 class="font-bold text-xl text-gray-600">
            {{ dataAcara.lokasi }}
          </h6>
          <span class="mt-8 text-gray-400">Keterangan:</span>
          <p class="text-xl text-center text-gray-600">
            {{ dataAcara.keterangan }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive, ref, onBeforeMount } from "vue";
import { env } from "@/env";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const idAcara = ref(router.currentRoute.value.params.id);
const dataAcara = reactive({
  nama: "",
  tanggal_mulai: "",
  tanggal_selesai: "",
  lokasi: "",
  keterangan: "",
  created_at: "",
});

onBeforeMount(() => {
  getAcara(idAcara.value).then((response) => {
    dataAcara.nama = response.nama;
    dataAcara.lokasi = response.lokasi;
    dataAcara.keterangan = response.keterangan;

    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hourCycle: "h24",
      hour: "2-digit",
      minute: "2-digit",
    };
    let tanggalMulai = new Date(response.tanggal_mulai);
    let tanggalSelesai = new Date(response.tanggal_selesai);
    let createdAt = new Date(response.created_at);
    dataAcara.tanggal_mulai = tanggalMulai.toLocaleDateString("id-ID", options);
    dataAcara.tanggal_selesai = tanggalSelesai.toLocaleDateString(
      "id-ID",
      options
    );
    dataAcara.created_at = createdAt.toLocaleDateString("id-ID", options);
  });
});

async function getAcara(id) {
  try {
    const response = await axios.get(`${env.API_URL}/acara/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
</script>
