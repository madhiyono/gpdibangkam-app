<template>
  <div class="w-full">
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-500"
    >
      <img
        :src="gambarPost"
        alt="Warta Gereja"
        class="w-full align-middle rounded-t-lg max-h-64 object-cover object-center"
      />
      <blockquote class="relative p-8 mb-4">
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 583 95"
          class="absolute left-0 w-full block h-[95px] -top-[94px]"
        >
          <polygon
            points="-30,95 583,95 583,65"
            class="text-blue-500 fill-current"
          ></polygon>
        </svg>
        <h4 class="text-xl font-bold text-white line-clamp-2 h-14">
          {{ judulPost }}
        </h4>
        <span class="italic text-blue-200 font-extralight text-sm"
          >{{ authorPost }} - {{ tanggalPost }}</span
        >
        <p
          class="text-md mt-2 text-white line-clamp-3 h-[76px]"
          v-html="isiPost"
        ></p>
      </blockquote>
    </div>
  </div>
</template>
<script setup>
defineProps({
  gambarPost: {
    type: String,
    required: true,
  },
  judulPost: {
    type: String,
    required: true,
  },
  tanggalPost: {
    type: String,
    required: true,
  },
  authorPost: {
    type: String,
    required: true,
  },
  isiPost: {
    type: String,
    required: true,
  },
});
</script>
