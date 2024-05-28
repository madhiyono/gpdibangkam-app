<template>
  <section class="relative py-16 bg-gray-200">
    <div class="container mx-auto px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full -mb-16 shadow-xl rounded-lg -mt-44"
      >
        <div class="lg:p-12 p-4 flex lg:gap-8 gap-4 lg:mb-0 mb-4">
          <router-link
            class="bg-blue-500 lg:text-base text-xs active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            :to="{ name: 'HomePage', hash: '#renungan' }"
          >
            Ke Halaman Utama
          </router-link>
          <router-link
            class="bg-blue-500 lg:text-base text-xs active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            :to="{ name: 'RenunganPage' }"
          >
            Daftar Renungan
          </router-link>
        </div>
        <div
          class="lg:px-32 md:px-10 px-6 flex flex-col items-center lg:mt-0 mt-8 lg:pb-24 pb-24"
        >
          <h1 class="text-3xl font-bold pb-6 text-center">
            {{ dataRenungan.judul }}
          </h1>
          <div
            class="flex flex-col items-center pb-12 text-gray-400 font-semibold text-sm"
          >
            <span>{{ dataRenungan.tanggal }}</span>
            <span>{{ dataRenungan.author }}</span>
          </div>
          <img
            class="lg:w-[36rem] w-full aspect-video object-cover object-center rounded-lg border-4 border-blue-500"
            :src="dataRenungan.gambar"
          />
          <div
            class="mt-8 pt-4 text-lg text-justify border-t-2"
            v-html="dataRenungan.isi"
          ></div>
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
const idRenungan = ref(router.currentRoute.value.params.id);
const dataRenungan = reactive({
  gambar: "",
  judul: "",
  tanggal: "",
  author: "",
  isi: "",
});

onBeforeMount(() => {
  getRenungan(idRenungan.value).then((response) => {
    dataRenungan.gambar = response.gambar;
    dataRenungan.judul = response.judul;
    dataRenungan.author = response.author;
    dataRenungan.isi = response.isi;

    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hourCycle: "h24",
      hour: "2-digit",
      minute: "2-digit",
    };
    let tanggal = new Date(response.tanggal);
    dataRenungan.tanggal = tanggal.toLocaleDateString("id-ID", options);
  });
});

async function getRenungan(id) {
  try {
    const response = await axios.get(`${env.API_URL}/renungan/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
</script>
