<template>
  <div class="lg:pt-6 pt-3 w-full px-4 text-center">
    <div
      class="relative p-10 grid lg:grid-cols-[20%_60%_20%] grid-cols-1 min-w-0 bg-blue-100 w-full mb-8 rounded"
    >
      <div
        class="flex items-center justify-center lg:justify-start mb-4 lg:mb-0"
      >
        <h1 class="text-6xl font-bold text-blue-400">
          {{ props.tanggalAcara }}
        </h1>
        <div class="text-center ml-3">
          <h6 class="font-bold text-xl">{{ props.bulanAcara }}</h6>
          <p class="-m-1 text-blue-400">{{ props.hariAcara }}</p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <h1 class="font-bold text-2xl text-blue-700">{{ props.namaAcara }}</h1>
        <span class="mt-2 italic text-blue-400 font-semibold"
          >{{ props.tanggalMulai }} - {{ props.tanggalSelesai }}<br />{{
            props.lokasiAcara
          }}</span
        >
      </div>
      <div class="flex items-center lg:justify-end justify-center mt-4 lg:mt-0">
        <router-link
          class="border-2 border-blue-700 text-blue-700 hover:bg-white hover:text-black font-bold px-4 py-2 rounded md:ml-3 ease-linear transition-all duration-150"
          :to="{ name: 'DetailAcara', params: { id: props.idAcara } }"
        >
          Lihat Lebih Detail
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  idAcara: {
    type: String,
    required: true,
  },
  namaAcara: {
    type: String,
    required: true,
  },
  tanggalAcara: {
    type: String,
    required: true,
  },
  bulanAcara: {
    type: String,
    required: true,
  },
  hariAcara: {
    type: String,
    required: true,
  },
  tanggalMulai: {
    type: String,
    required: true,
  },
  tanggalSelesai: {
    type: String,
    required: true,
  },
  lokasiAcara: {
    type: String,
    required: true,
  },
});
</script>
