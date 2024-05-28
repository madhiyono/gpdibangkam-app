<template>
  <section
    class="bg-fixed bg-center bg-cover"
    v-bind:style="{ 'background-image': 'url(' + eventbg + ')' }"
  >
    <div
      class="flex flex-col items-center justify-center pt-28 pb-20 bg-black bg-opacity-50"
    >
      <div class="container md:px-32">
        <h3
          class="text-white italic mx-4 text-sm md:mx-0 md:text-xl text-center"
        >
          Maka Allah menciptakan manusia itu menurut gambar-Nya, menurut gambar
          Allah diciptakan-Nya dia; laki-laki dan perempuan diciptakan-Nya
          mereka. <br />
          Kejadian 1:27
        </h3>
      </div>
      <h1
        v-if="!authStore.isLoggedIn"
        class="md:text-5xl text-3xl md:py-8 pb-4 text-center text-white font-bold"
      >
        Jadi Bagian dari Kami
      </h1>
      <router-link
        v-if="!authStore.isLoggedIn"
        class="bg-green-600 mt-6 text-white hover:bg-green-800 active:bg-green-800 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
        :to="{ name: 'AuthRegister' }"
      >
        Daftar Sekarang
      </router-link>
    </div>
  </section>

  <section
    class="grid md:grid-cols-3 grid-cols-1 pt-14 pb-20 items-center bg-blue-700"
  >
    <h2
      class="text-white font-bold text-3xl uppercase md:text-right text-center md:mr-12"
    >
      Acara<br />Berikutnya
    </h2>
    <div
      class="flex flex-col items-center justify-center text-white mt-8 md:mt-0"
    >
      <span class="italic md:pb-4 font-semibold">{{ currentEvent.nama }}</span>
      <div class="grid grid-cols-4 gap-x-6 text-center">
        <h5 class="font-bold text-3xl">{{ countdown.days }}</h5>
        <h5 class="font-bold text-3xl">{{ countdown.hours }}</h5>
        <h5 class="font-bold text-3xl">{{ countdown.minutes }}</h5>
        <h5 class="font-bold text-3xl">{{ countdown.seconds }}</h5>
        <span class="italic">Hari</span>
        <span class="italic">Jam</span>
        <span class="italic">Menit</span>
        <span class="italic">Detik</span>
      </div>
    </div>
    <div class="md:ml-12 mt-8 md:mt-0 flex justify-center md:block">
      <button
        v-if="!currentEvent.id"
        class="border-2 w-40 h-11 border-white rounded md:ml-3 animate-pulse"
      ></button>
      <router-link
        v-else
        class="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-4 py-2 rounded md:ml-3 ease-linear transition-all duration-150"
        :to="{ name: 'DetailAcara', params: { id: currentEvent.id } }"
      >
        Lihat Lebih Detail
      </router-link>
    </div>
  </section>

  <section class="relative pt-12 pb-28">
    <div
      id="acara"
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
          class="text-white fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>

    <div class="container mx-auto px-4">
      <div class="flex justify-center items-center flex-wrap">
        <div class="relative text-center pb-12">
          <span class="italic text-sm text-orange-400"
            >Bersatu dalam Roh Kudus</span
          >
          <h6 class="text-3xl font-bold text-blue-700">Acara Berikutnya</h6>
        </div>
        <div v-if="isAcaraLoading" class="w-full">
          <landscape-card-skeleton v-for="index in 3" :key="index" />
        </div>
        <div v-else-if="upcomingEvents.length > 0" class="w-full">
          <landscape-card
            v-for="acara in upcomingEvents"
            :key="acara.id"
            :idAcara="acara.id"
            :hariAcara="acara.tanggal_mulai_day"
            :tanggalAcara="acara.tanggal_mulai_date"
            :bulanAcara="acara.tanggal_mulai_month"
            :namaAcara="acara.nama"
            :tanggalMulai="acara.stanggal_mulai"
            :tanggalSelesai="acara.tanggal_selesai"
            :lokasiAcara="acara.lokasi"
          />
        </div>
        <h2
          v-else
          class="w-full text-center bg-blue-100 py-7 text-blue-700 font-bold text-xl rounded"
        >
          Belum Ada Acara Berikutnya
        </h2>
      </div>
    </div>

    <div id="renungan" class="container mx-auto px-4 mt-12">
      <div class="flex flex-wrap">
        <div class="relative w-full text-center lg:mb-5">
          <span class="text-sm text-orange-400 italic"
            >Mewartakan Injil Ke Seluruh Dunia</span
          >
          <h6 class="text-3xl font-bold text-blue-700">
            Renungan Terbaru Gereja
          </h6>
        </div>

        <div
          v-if="isRenunganLoading"
          class="grid md:grid-cols-3 grid-cols-1 gap-3 mt-8"
        >
          <potrait-card-skeleton v-for="index in 3" :key="index" />
        </div>
        <div
          v-else-if="dataRenungan.length > 0"
          class="grid md:grid-cols-3 grid-cols-1 gap-8 mt-8"
        >
          <router-link
            v-for="renungan in dataRenungan"
            :key="renungan.id"
            :to="{ name: 'DetailRenungan', params: { id: renungan.id } }"
          >
            <potrait-card
              class="hover:shadow-lg hover:scale-105 ease-linear duration-150"
              :gambarPost="renungan.gambar"
              :judulPost="renungan.judul"
              :tanggalPost="renungan.tanggal"
              :authorPost="renungan.author"
              :isiPost="renungan.isi"
            />
          </router-link>
        </div>
        <h2
          v-else
          class="w-full mt-8 text-center bg-blue-100 py-7 text-blue-700 font-bold text-xl rounded"
        >
          Tidak Ada Data Renungan
        </h2>
        <div
          v-if="!isRenunganLoading && dataRenungan.length > 0"
          class="w-full flex justify-center mt-8"
        >
          <router-link
            class="bg-blue-600 text-white hover:bg-blue-800 active:bg-blue-800 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
            :to="{ name: 'RenunganPage' }"
          >
            Lihat Selengkapnya
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { env } from "@/env";
import { useAuthStore } from "@/stores/AuthStore";
import axios from "axios";

import PotraitCard from "@/components/Cards/PotraitCard.vue";
import LandscapeCard from "@/components/Cards/LandscapeCard.vue";

// Skeleton Loading
import PotraitCardSkeleton from "@/components/SkeletonLoadings/PotraitCardSkeleton.vue";
import LandscapeCardSkeleton from "@/components/SkeletonLoadings/LandscapeCardSkeleton.vue";

// Image
import eventbg from "@/assets/img/EventBg.jpg";

const authStore = useAuthStore();

onMounted(async () => {
  await fetchRenungan();
  await fetchAcara();

  setCurrentEvent();
  startCountDown();
});

const dataRenungan = ref([]);
const isRenunganLoading = ref(true);
const dataAcara = ref([]);
const isAcaraLoading = ref(true);

const filteredData = computed(() => {
  let filtered = dataAcara.value;
  let today = new Date();
  filtered.filter(({ tanggal_mulai }) => new Date(tanggal_mulai) > today);

  return filtered;
});
const currentEvent = ref({});
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let timer = null;

async function fetchRenungan() {
  await axios
    .get(`${env.API_URL}/renungan`)
    .then((response) => {
      const responseData = response.data.data;
      if (responseData.length > 3) {
        dataRenungan.value = responseData
          .sort((a, b) => {
            return new Date(b.tanggal) - new Date(a.tanggal);
          })
          .map((renungan) => {
            const date = new Date(renungan.tanggal);
            const options = { day: "2-digit", month: "long", year: "numeric" };

            return {
              ...renungan,
              tanggal: date.toLocaleDateString("id-ID", options),
            };
          })
          .slice(0, 3);
      } else {
        dataRenungan.value = responseData.map((renungan) => {
          const date = new Date(renungan.tanggal);
          const options = { day: "2-digit", month: "long", year: "numeric" };

          return {
            ...renungan,
            tanggal: date.toLocaleDateString("id-ID", options),
          };
        });
      }
      isRenunganLoading.value = false;
    })
    .catch((error) => {
      console.error(error);
    });
}

async function fetchAcara() {
  await axios
    .get(`${env.API_URL}/acara`)
    .then((response) => {
      const responseData = response.data.data;
      if (responseData.length > 1) {
        dataAcara.value = responseData
          .sort((a, b) => {
            return new Date(a.tanggal_mulai) - new Date(b.tanggal_mulai);
          })
          .map((acara) => {
            const tanggalMulaiString = new Date(acara.tanggal_mulai);
            const tanggalSelesaiString = new Date(acara.tanggal_selesai);
            const options = {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hourCycle: "h24",
              hour: "2-digit",
              minute: "2-digit",
            };

            return {
              ...acara,
              stanggal_mulai: tanggalMulaiString.toLocaleDateString(
                "id-ID",
                options
              ),
              tanggal_mulai_day: tanggalMulaiString.toLocaleDateString(
                "id-ID",
                {
                  weekday: "long",
                }
              ),
              tanggal_mulai_date: tanggalMulaiString.toLocaleDateString(
                "id-ID",
                {
                  day: "2-digit",
                }
              ),
              tanggal_mulai_month: tanggalMulaiString.toLocaleDateString(
                "id-ID",
                {
                  month: "long",
                }
              ),
              tanggal_selesai: tanggalSelesaiString.toLocaleDateString(
                "id-ID",
                options
              ),
            };
          })
          .slice(0, 5);
      } else {
        dataAcara.value = responseData.map((acara) => {
          const tanggalMulaiString = new Date(acara.tanggal_mulai);
          const tanggalSelesaiString = new Date(acara.tanggal_selesai);
          const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hourCycle: "h24",
            hour: "2-digit",
            minute: "2-digit",
          };

          return {
            ...acara,
            stanggal_mulai: tanggalMulaiString.toLocaleDateString(
              "id-ID",
              options
            ),
            tanggal_mulai_day: tanggalMulaiString.toLocaleDateString("id-ID", {
              weekday: "long",
            }),
            tanggal_mulai_date: tanggalMulaiString.toLocaleDateString("id-ID", {
              day: "2-digit",
            }),
            tanggal_mulai_month: tanggalMulaiString.toLocaleDateString(
              "id-ID",
              {
                month: "long",
              }
            ),
            tanggal_selesai: tanggalSelesaiString.toLocaleDateString(
              "id-ID",
              options
            ),
          };
        });
      }
      isAcaraLoading.value = false;
    })
    .catch((error) => {
      console.error(error);
    });
}

function setCurrentEvent() {
  if (filteredData.value.length > 0) {
    currentEvent.value = filteredData.value[0];
  }
}

function startCountDown() {
  if (currentEvent.value) {
    const eventDate = new Date(currentEvent.value.tanggal_mulai);
    timer = setInterval(() => {
      const now = new Date();
      const distance = eventDate - now;

      if (distance > 0) {
        countdown.value = {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
      } else {
        changeEvent();
      }
    }, 1000);
  }
}

function changeEvent() {
  clearInterval(timer);
  filteredData.value.shift();
  setCurrentEvent();
  startCountDown();
}

const upcomingEvents = ref([]);

watch(currentEvent, () => {
  upcomingEvents.value = filteredData.value.slice(1);
});
</script>
