<template>
  <LayananPengumumanSection />
  <AcaraRenunganSection />
  <section class="relative py-20 bg-gray-200">
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
          class="text-gray-200 fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>

    <div class="container mx-auto px-4">
      <div class="items-center flex flex-wrap">
        <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
          <img
            class="object-cover aspect-[2/3] max-w-full rounded-lg shadow-lg"
            :src="donasibg"
            alt="BgDonasi"
          />
        </div>
        <div class="w-full mt-12 md:mt-0 md:w-5/12 ml-auto mr-auto px-4">
          <div class="md:pr-12">
            <div
              class="text-blue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blue-300"
            >
              <i class="fa-solid fa-hand-holding-dollar text-xl"></i>
            </div>
            <div class="block">
              <span class="text-sm text-orange-400 italic">Perpuluhan</span>
              <h3 class="text-3xl font-bold text-blue-700">Donasi Sekarang</h3>
            </div>
            <p class="mt-4 text-lg leading-relaxed text-gray-500">
              Bawalah seluruh persembahan persepuluhan itu ke dalam rumah
              perbendaharaan, supaya ada persediaan makanan di rumah-Ku dan
              ujilah Aku, firman TUHAN semesta alam, apakah Aku tidak membukakan
              bagimu tingkap-tingkap langit dan mencurahkan berkat kepadamu
              sampai berkelimpahan.
              <br /><b>Maleakhi 3:10</b>
            </p>
            <ul class="list-none mt-6">
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span
                      class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3"
                    >
                      <i class="fa-solid fa-building-columns"></i>
                    </span>
                  </div>
                  <div>
                    <h4 class="text-gray-500">
                      <b>Bank Kalbar:</b> 5225020444 (GEREJA PANTEKOSTA EL
                      SHADAY)
                    </h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container ml-auto mr-auto my-28">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div
          class="order-2 md:order-1 flex flex-col p-12 justify-center items-end"
        >
          <span class="text-sm text-orange-400 italic"
            >Dimana Menemukan Kami</span
          >
          <h3 class="text-3xl font-bold text-blue-700">Gembala Kami</h3>
          <p class="mt-4 text-lg leading-relaxed text-gray-500 text-end">
            Selamat Datang dan Selamat Beribadah, Kasih Tuhan Menyertai Kita
            Semua.
          </p>
          <h3 class="text-2xl font-bold mt-4">Pdt. Nurdin M.</h3>
          <span class="text-sm text-gray-400 italic">Gembala</span>
        </div>
        <div
          class="order-1 md:order-2 min-h-[20rem] bg-cover"
          v-bind:style="{ 'background-image': 'url(' + pendeta + ')' }"
        ></div>
      </div>
    </div>

    <div class="container ml-auto mr-auto mt-30">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div
          class="min-h-[20rem] bg-cover"
          v-bind:style="{ 'background-image': 'url(' + gedung + ')' }"
        ></div>
        <div class="flex flex-col p-12 justify-center">
          <span class="text-sm text-orange-400 italic"
            >Dimana Menemukan Kami</span
          >
          <h3 class="text-3xl font-bold text-blue-700">Temui Kami</h3>
          <h3 class="text-2xl font-bold mt-4">GPdI El-Shaddai Bangkam</h3>
          <ul class="list-none mt-4">
            <li class="py-2">
              <div class="flex items-center">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3"
                  >
                    <i class="fa-solid fa-phone"></i>
                  </span>
                </div>
                <div>
                  <h4 class="text-gray-500">+628 1257 16234</h4>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="flex items-center">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3"
                  >
                    <i class="fa-solid fa-map-location-dot"></i>
                  </span>
                </div>
                <div>
                  <h4 class="text-gray-500">
                    Jl. Sungai Kunyit Dalam, Sungai Kunyit Hulu, Sungai Kunyit,
                    Kab. Mempawah, Kalimantan Barat 78371
                  </h4>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="flex items-center">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3"
                  >
                    <i class="fa-solid fa-envelope"></i>
                  </span>
                </div>
                <div>
                  <h4 class="text-gray-500">gpdibangkam@gmail.com</h4>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
// Images
import donasibg from "@/assets/img/DonasiBg.jpg";
import pendeta from "@/assets/img/Pendeta.jpg";
import gedung from "@/assets/img/Gedung.jpg";

// Sections
import LayananPengumumanSection from "@/pages/user/sections/LayananPengumumanSection.vue";
import AcaraRenunganSection from "@/pages/user/sections/AcaraRenunganSection.vue";
</script>
