<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-blue-700">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Data Pengumuman</h3>
            </div>
          </div>
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 px-4 lg:px-10 py-5">
          <!-- #region Search Panes / Filter -->
          <div class="text-sm font-medium text-gray-900 bg-white">
            <div
              :class="[isAuthorCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Author Filter</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseAuthorHandle"
              >
                <i v-if="isAuthorCollapse" class="fas fa-angle-down text-lg" />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isAuthorCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.author"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('author', value)"
                  @change="toggleFilter('author', value)"
                  :value="value"
                />
                <label
                  :for="`option-${value}`"
                  class="flex items-center justify-between w-full p-3 text-gray-500 cursor-pointer peer-checked:bg-blue-600 hover:text-gray-600 peer-checked:text-white hover:bg-gray-50"
                >
                  <div class="flex justify-between items-center w-full">
                    <div class="w-full font-semibold">{{ value }}</div>
                    <span
                      class="bg-gray-300 px-4 rounded-full pb-0.5 text-gray-500"
                      >{{ count }}</span
                    >
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <!-- #endregion -->
        </div>
        <!-- Divider -->
        <hr />
        <!-- #region Table -->
        <div
          class="flex flex-col px-4 py-5 lg:px-10 gap-y-3 lg:flex-row justify-between"
        >
          <div class="flex items-center gap-x-3">
            <span class="text-gray-500 font-semibold">Tampilkan</span>
            <select
              v-model="itemsPerPage"
              @change="changeItemsPerPage"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span class="text-gray-500 font-semibold">Data</span>
          </div>
          <div class="flex items-center gap-x-3">
            <span class="text-gray-500 font-semibold">Cari:</span>
            <input
              type="search"
              v-model="searchQuery"
              class="w-full text-sm text-gray-900 focus:ring-0 focus:border-2 focus:border-gray-600"
            />
          </div>
        </div>
        <div class="flex flex-col px-4 lg:px-10 gap-3 pb-5 lg:flex-row">
          <button
            class="bg-gray-200 text-gray-600 border border-gray-400 px-4 py-2 rounded hover:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:border"
            @click="toggleTambahModal"
          >
            Tambah
          </button>
          <button
            class="bg-gray-200 text-gray-600 border border-gray-400 px-4 py-2 rounded hover:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:border"
            :disabled="selectedRows.length === 0"
            @click="toggleUbahModal"
          >
            Ubah
          </button>
          <button
            class="bg-gray-200 text-gray-600 border border-gray-400 px-4 py-2 rounded hover:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:border"
            @click="toggleHapusModal"
            :disabled="selectedRows.length === 0"
          >
            Hapus
          </button>
          <button
            class="bg-gray-200 text-gray-600 border border-gray-400 px-4 py-2 rounded hover:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:border"
            @click="toggleDetailModal"
            :disabled="selectedRows.length === 0"
          >
            Detail
          </button>
        </div>
        <SuccessAlert
          v-if="showSuccessAlert"
          class="mx-4 lg:mx-10"
          judulAlert="Pengumuman"
          :toggleFunction="closeAlert"
          :isiAlert="successResponseMessage"
        />
        <div class="relative overflow-x-auto lg:px-10">
          <table class="table-fixed w-full text-sm text-left text-white">
            <thead class="text-xs uppercase bg-blue-700 text-center">
              <th class="w-16">No.</th>
              <th class="px-6 py-3">Gambar</th>
              <th class="px-6 py-3">Judul</th>
              <th class="px-6 py-3">Tanggal</th>
              <th class="px-6 py-3">Author</th>
              <th class="px-6 py-3">Isi</th>
            </thead>
            <tbody v-if="paginatedData.length > 0" class="text-gray-600">
              <tr
                v-for="(pengumuman, index) in paginatedData"
                :key="pengumuman.id"
                :class="[
                  isSelected(pengumuman)
                    ? 'bg-blue-500 text-white hover:bg-blue-500'
                    : 'bg-white hover:bg-blue-200',
                ]"
                class="border-b select-none"
                @click="selectRow(pengumuman)"
              >
                <td class="text-center">
                  {{ startIndex + index }}
                </td>
                <td class="p-2">
                  <img
                    :src="pengumuman.gambar"
                    class="mx-auto max-h-16"
                    :alt="`gambar-${index}`"
                  />
                </td>
                <td class="text-center px-2">
                  {{ pengumuman.judul }}
                </td>
                <td class="text-center px-2">
                  {{ pengumuman.tanggal }}
                </td>
                <td class="text-center px-2">
                  {{ pengumuman.author }}
                </td>
                <td class="text-center px-2">
                  <div class="line-clamp-3">
                    {{ pengumuman.isi }}
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="text-gray-600">
              <tr class="border-b select-none bg-white hover:bg-blue-200 h-12">
                <td
                  v-if="isLoadData"
                  colspan="6"
                  class="text-center font-semibold"
                >
                  Sedang Memuat Data
                </td>
                <td v-else colspan="6" class="text-center font-semibold">
                  Tidak Ada Data Tersedia
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="flex flex-col lg:flex-row justify-between items-center pb-10 pt-5 px-10 gap-y-6"
        >
          <div class="text-gray-600 gap-x-5 flex">
            <span
              >Menampilkan {{ startIndex }} Sampai {{ endIndex }} Dari
              {{ filteredData.length }}</span
            >
            <span v-if="selectedRows.length > 0"
              >{{ selectedRows.length }} Baris Terpilih</span
            >
          </div>
          <div class="text-gray-600 flex gap-x-10">
            <button
              @click="previousPage"
              class="hover:underline disabled:text-gray-400 disabled:hover:no-underline"
              :disabled="currentPage === 1"
            >
              Sebelumnya
            </button>
            <button
              @click="nextPage"
              class="hover:underline disabled:text-gray-400 disabled:hover:no-underline"
              :disabled="currentPage === totalPages"
            >
              Selanjutnya
            </button>
          </div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
  </div>
  <detailModal
    :isModalOpen="isModalDetailOpen"
    title="Data Pengumuman"
    :inputFields="detailDataModal"
    @modal-toggle="toggleDetailModal"
  />
  <inputModal
    :isModalOpen="isModalTambahOpen"
    title="Tambah Data Pengumuman"
    btnTitle="Tambah Data"
    :inputFields="fieldsTambahModal"
    urlEndpoint="pengumuman"
    urlMethod="POST"
    @modal-toggle="toggleTambahModal"
    @alert-toggle="openAlert"
    @action-after-submit="loadData"
  />
  <inputModal
    :isModalOpen="isModalUbahOpen"
    title="Ubah Data Pengumuman"
    btnTitle="Ubah Data"
    :inputFields="fieldsUbahModal"
    urlEndpoint="pengumuman"
    urlMethod="PUT"
    :urlId="idData"
    @modal-toggle="toggleUbahModal"
    @alert-toggle="openAlert"
    @action-after-submit="loadData"
  />
  <deleteModal
    :isModalOpen="isModalHapusOpen"
    title="Hapus Data Pengumuman"
    urlEndpoint="pengumuman"
    :urlId="idData"
    @modal-toggle="toggleHapusModal"
    @alert-toggle="openAlert"
    @action-after-submit="loadData"
  />
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { env } from "@/env";
import axios from "axios";
import { useAuthStore } from "@/stores/AuthStore";
import SuccessAlert from "@/components/Alerts/SuccessAlert.vue";
import detailModal from "@/components/Modals/detailModal.vue";
import inputModal from "@/components/Modals/inputModal.vue";
import deleteModal from "@/components/Modals/deleteModal.vue";

const instance = getCurrentInstance();
const authStore = useAuthStore();
defineEmits(["route-changed"]);
const rawApiData = ref([]);
const isLoadData = ref(false);
const showSuccessAlert = ref(false);
const alertTimeout = ref(null);
const successResponseMessage = ref("");

function openAlert(responseText) {
  successResponseMessage.value = responseText;
  showSuccessAlert.value = true;

  alertTimeout.value = setTimeout(() => {
    closeAlert();
  }, 5000);
}

function closeAlert() {
  showSuccessAlert.value = false;
  clearTimeout(alertTimeout.value);
}

//#region Filtering
const isAuthorCollapse = ref(true);

function collapseAuthorHandle() {
  isAuthorCollapse.value = !isAuthorCollapse.value;
}

const searchQuery = ref("");
const selectedFilters = ref({});

const filters = computed(() => {
  const uniqueFilters = {};

  rawApiData.value.forEach((pengumuman) => {
    for (const key in pengumuman) {
      if (!uniqueFilters[key]) {
        uniqueFilters[key] = {};
      }
      const value = pengumuman[key];
      if (!uniqueFilters[key][value]) {
        uniqueFilters[key][value] = 0;
      }
      uniqueFilters[key][value]++;
    }
  });

  return uniqueFilters;
});

function isFilterSelected(key, value) {
  return (
    selectedFilters.value[key] && selectedFilters.value[key].includes(value)
  );
}

function toggleFilter(key, value) {
  if (!selectedFilters.value[key]) {
    selectedFilters.value[key] = [];
  }

  const index = selectedFilters.value[key].indexOf(value);
  if (index > -1) {
    selectedFilters.value[key].splice(index, 1);
  } else {
    selectedFilters.value[key].push(value);
  }
}

const filteredData = computed(() => {
  let filtered = rawApiData.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLocaleLowerCase();
    filtered = filtered.filter((pengumuman) =>
      Object.values(pengumuman).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }

  for (const key in selectedFilters.value) {
    const selectedValues = selectedFilters.value[key];
    if (selectedValues.length > 0) {
      filtered = filtered.filter((pengumuman) =>
        selectedValues.includes(pengumuman[key])
      );
    }
  }
  return filtered;
});
//#endregion

//#region Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredData.value.slice(startIndex, endIndex);
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const endIndex = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage.value,
    filteredData.value.length
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
});

function nextPage() {
  currentPage.value++;
}

function previousPage() {
  currentPage.value--;
}

function changeItemsPerPage() {
  currentPage.value = 1;
}
//#endregion

onMounted(() => {
  instance.emit("route-changed", "Data Pengumuman");

  loadData();
});

function loadData() {
  selectedRows.value = [];
  isLoadData.value = true;
  axios
    .get(`${env.API_URL}/pengumuman`)
    .then((response) => {
      const formattedData = response.data.data
        .sort((a, b) => {
          const dateA = new Date(a.tanggal).getTime();
          const dateB = new Date(b.tanggal).getTime();
          return dateB - dateA;
        })
        .map((pengumuman) => {
          const date = new Date(pengumuman.tanggal);
          const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hourCycle: "h24",
            hour: "2-digit",
            minute: "2-digit",
          };

          return {
            ...pengumuman,
            tanggal: date.toLocaleDateString("id-ID", options),
          };
        });
      rawApiData.value = formattedData;
    })
    .catch((error) => {
      rawApiData.value = [];
      console.error(error);
    })
    .finally(() => {
      isLoadData.value = false;
    });
}

//#region Select Single Row or Multiple Row
const selectedRows = ref([]);

function selectRow(data) {
  if (selectedRows.value.includes(data)) {
    selectedRows.value = selectedRows.value.filter((id) => id !== data);
  } else {
    detailDataModal.value = [
      { label: "ID", type: "text", value: data.id },
      { label: "Gambar", type: "image", value: data.gambar },
      { label: "Judul", type: "text", value: data.judul },
      { label: "Tanggal", type: "text", value: data.tanggal },
      { label: "Author", type: "text", value: data.author },
      { label: "Isi", type: "textarea", value: data.isi },
    ];
    idData.value = data.id;
    selectedRows.value = [data];
  }
}

function isSelected(data) {
  return selectedRows.value.includes(data);
}
//#endregion

//#region Modal
const idData = ref("");
const isModalDetailOpen = ref(false);
const isModalTambahOpen = ref(false);
const isModalUbahOpen = ref(false);
const isModalHapusOpen = ref(false);
const detailDataModal = ref([]);
const fieldsUbahModal = computed(() => {
  if (authStore.userData && selectedRows.value.length > 0) {
    return [
      {
        label: "Judul",
        name: "judul",
        type: "text",
        placeholder: "Judul Pengumuman",
        isDisable: false,
        isRequire: true,
        value: selectedRows.value[0].judul,
        defaultValue: selectedRows.value[0].judul,
      },
      {
        label: "Gambar",
        name: "gambar",
        type: "file",
        placeholder: "",
        isDisable: false,
        isRequire: false,
        value: "",
        defaultValue: selectedRows.value[0].gambar,
      },
      {
        label: "Author",
        name: "author",
        type: "text",
        placeholder: "",
        isDisable: true,
        isRequire: true,
        value: authStore.userData.nama_lengkap,
        defaultValue: authStore.userData.nama_lengkap,
      },
      {
        label: "Isi",
        name: "isi",
        type: "textarea",
        placeholder: "Isi Pengumuman",
        isDisable: false,
        isRequire: true,
        value: selectedRows.value[0].isi,
        defaultValue: selectedRows.value[0].isi,
      },
    ];
  } else {
    return [];
  }
});
const fieldsTambahModal = computed(() => {
  if (authStore.userData) {
    return [
      {
        label: "Judul",
        name: "judul",
        type: "text",
        placeholder: "Judul Pengumuman",
        isDisable: false,
        isRequire: true,
        value: "",
        defaultValue: "",
      },
      {
        label: "Gambar",
        name: "gambar",
        type: "file",
        placeholder: "",
        isDisable: false,
        isRequire: true,
        value: "",
        defaultValue: "",
      },
      {
        label: "Author",
        name: "author",
        type: "text",
        placeholder: "",
        isDisable: true,
        isRequire: true,
        value: authStore.userData.nama_lengkap,
        defaultValue: authStore.userData.nama_lengkap,
      },
      {
        label: "Isi",
        name: "isi",
        type: "textarea",
        placeholder: "Isi Pengumuman",
        isDisable: false,
        isRequire: true,
        value: "",
        defaultValue: "",
      },
    ];
  } else {
    return [];
  }
});

function toggleDetailModal() {
  isModalDetailOpen.value = !isModalDetailOpen.value;
}
function toggleTambahModal() {
  isModalTambahOpen.value = !isModalTambahOpen.value;
}
function toggleUbahModal() {
  isModalUbahOpen.value = !isModalUbahOpen.value;
}
function toggleHapusModal() {
  isModalHapusOpen.value = !isModalHapusOpen.value;
}
//#endregion
</script>
