<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="text-gray-400 uppercase font-bold text-xs">
            {{ statSubtitle }}
          </h5>
          <span
            class="font-semibold text-sm text-gray-700 break-all line-clamp-1"
          >
            {{ statTitle }}
          </span>
        </div>
        <div class="relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
            :class="[statIconColor]"
          >
            <i :class="[statIconName]"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  statSubtitle: {
    type: String,
    default: "Traffic",
  },
  statTitle: {
    type: String,
    default: "350,897",
  },
  statIconName: {
    type: String,
    default: "far fa-chart-bar",
  },
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: {
    type: String,
    default: "bg-red-500",
  },
});
</script>
