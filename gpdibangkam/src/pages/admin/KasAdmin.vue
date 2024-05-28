<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-blue-700">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Data Keuangan</h3>
            </div>
          </div>
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 px-4 lg:px-10 py-5">
          <!-- #region Search Panes / Filter -->
          <div class="text-sm font-medium text-gray-900 bg-white">
            <div
              :class="[isJenisKasCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Jenis Kas Filter</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseJenisKasHandle"
              >
                <i
                  v-if="isJenisKasCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isJenisKasCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.jenis_kas"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('jenis_kas', value)"
                  @change="toggleFilter('jenis_kas', value)"
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
        <div class="px-4 pb-3 lg:px-10">
          <div class="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div class="bg-emerald-700 text-white px-4 py-3 rounded-xl">
              <h2 class="font-bold text-xl tracking-wider">Total Pemasukan:</h2>
              <span>{{ rupiah.format(countData.pemasukan) }}</span>
            </div>
            <div class="bg-rose-700 text-white px-4 py-3 rounded-xl">
              <h2 class="font-bold text-xl tracking-wider">
                Total Pengeluaran:
              </h2>
              <span>{{ rupiah.format(countData.pengeluaran) }}</span>
            </div>
            <div class="bg-blue-700 text-white px-4 py-3 rounded-xl">
              <h2 class="font-bold text-xl tracking-wider">Total:</h2>
              <span>{{
                rupiah.format(countData.pemasukan - countData.pengeluaran)
              }}</span>
            </div>
          </div>
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
              <th class="px-6 py-3">Jenis Kas</th>
              <th class="px-6 py-3">Sumber Kas</th>
              <th class="px-6 py-3">Nilai</th>
              <th class="px-6 py-3">Bukti</th>
              <th class="px-6 py-3">Keterangan</th>
            </thead>
            <tbody v-if="paginatedData.length > 0" class="text-gray-600">
              <tr
                v-for="(data, index) in paginatedData"
                :key="data.id"
                :class="[
                  isSelected(data)
                    ? 'bg-blue-500 text-white hover:bg-blue-500'
                    : 'bg-white hover:bg-blue-200',
                ]"
                class="border-b select-none"
                @click="selectRow(data)"
              >
                <td class="text-center">
                  {{ startIndex + index }}
                </td>
                <td class="text-center px-2">
                  <div
                    :class="[
                      data.jenis_kas === 'Pemasukan'
                        ? 'bg-emerald-700'
                        : 'bg-rose-700',
                    ]"
                    class="text-white font-semibold py-2 rounded-lg"
                  >
                    {{ data.jenis_kas }}
                  </div>
                </td>
                <td class="text-center px-2">
                  {{ data.sumber_kas }}
                </td>
                <td class="text-center px-2">
                  {{ rupiah.format(parseInt(data.nilai)) }}
                </td>
                <td class="p-2">
                  <img
                    :src="data.bukti"
                    class="mx-auto max-h-16"
                    :alt="`bukti-${index}`"
                  />
                </td>
                <td class="text-center px-2">
                  <div class="line-clamp-3">
                    {{ data.keterangan }}
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
    title="Data Keuangan"
    :inputFields="detailDataModal"
    @modal-toggle="toggleDetailModal"
  />
  <inputModal
    :isModalOpen="isModalTambahOpen"
    title="Tambah Data Keuangan"
    btnTitle="Tambah Data"
    :inputFields="fieldsTambahModal"
    urlEndpoint="kas"
    urlMethod="POST"
    @modal-toggle="toggleTambahModal"
    @alert-toggle="openAlert"
    @action-after-submit="loadData"
  />
  <deleteModal
    :isModalOpen="isModalHapusOpen"
    title="Hapus Data Keuangan"
    urlEndpoint="kas"
    :urlId="idData"
    @modal-toggle="toggleHapusModal"
    @alert-toggle="openAlert"
    @action-after-submit="loadData"
  />
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed, reactive } from "vue";
import { useFetch } from "@/helpers";
import { useAuthStore } from "@/stores/AuthStore";
import SuccessAlert from "@/components/Alerts/SuccessAlert.vue";
import detailModal from "@/components/Modals/detailModal.vue";
import inputModal from "@/components/Modals/inputModal.vue";
import deleteModal from "@/components/Modals/deleteModal.vue";

const instance = getCurrentInstance();
const authStore = useAuthStore();
defineEmits(["route-changed"]);

let rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

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
const isJenisKasCollapse = ref(true);

function collapseJenisKasHandle() {
  isJenisKasCollapse.value = !isJenisKasCollapse.value;
}

const searchQuery = ref("");
const selectedFilters = ref({});

const filters = computed(() => {
  const uniqueFilters = {};

  rawApiData.value.forEach((data) => {
    for (const key in data) {
      if (!uniqueFilters[key]) {
        uniqueFilters[key] = {};
      }
      const value = data[key];
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
    filtered = filtered.filter((data) =>
      Object.values(data).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }

  for (const key in selectedFilters.value) {
    const selectedValues = selectedFilters.value[key];
    if (selectedValues.length > 0) {
      filtered = filtered.filter((data) => selectedValues.includes(data[key]));
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
  instance.emit("route-changed", "Data Keuangan");

  loadData();
});

const countData = reactive({
  pemasukan: 0,
  pengeluaran: 0,
});

function loadData() {
  countData.pemasukan = 0;
  countData.pengeluaran = 0;
  selectedRows.value = [];
  rawApiData.value = [];
  isLoadData.value = true;

  useFetch("GET", "kas", null, authStore.accessToken)
    .then((responseKas) => {
      responseKas.data
        .sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        })
        .map((kas) => {
          if (kas.jenis_kas === "Pemasukan") {
            const nilaiKas = parseInt(kas.nilai);
            countData.pemasukan += nilaiKas;
          } else {
            const nilaiKas = parseInt(kas.nilai);
            countData.pengeluaran += nilaiKas;
          }

          const dateCreatedAt = new Date(kas.created_at);
          const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hourCycle: "h24",
            hour: "2-digit",
            minute: "2-digit",
          };

          kas.created_at = dateCreatedAt.toLocaleDateString("id-ID", options);

          rawApiData.value.push(kas);
        });
    })
    .catch((error) => {
      rawApiData.value = [];
      console.error(error);
    })
    .finally(() => {
      console.log(rawApiData.value);
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
      { label: "Created At", type: "text", value: data.created_at },
      { label: "Jenis Kas", type: "text", value: data.jenis_kas },
      { label: "Sumber Kas", type: "text", value: data.sumber_kas },
      { label: "Nilai", type: "text", value: data.nilai },
      { label: "Keterangan", type: "longtext", value: data.keterangan },
      { label: "Bukti", type: "image", value: data.bukti },
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
const isModalHapusOpen = ref(false);
const detailDataModal = ref([]);
const fieldsTambahModal = computed(() => {
  if (authStore.userData) {
    return [
      {
        label: "Jenis Kas",
        name: "jenis_kas",
        type: "select",
        placeholder: "Jenis Kas",
        isDisable: false,
        isRequire: true,
        value: "",
        defaultValue: "",
        list: [
          { value: "Pemasukan", label: "Pemasukan" },
          { value: "Pengeluaran", label: "Pengeluaran" },
        ],
      },
      {
        label: "Sumber Kas",
        name: "sumber_kas",
        type: "text",
        placeholder: "Sumber Kas",
        isDisable: false,
        isRequire: true,
        value: "",
        defaultValue: "",
      },
      {
        label: "Nilai",
        name: "nilai",
        type: "number",
        placeholder: 0,
        isDisable: false,
        isRequire: true,
        value: "",
        defaultValue: "",
      },
      {
        label: "Foto Bukti",
        name: "bukti",
        type: "file",
        placeholder: "",
        isDisable: false,
        isRequire: true,
        value: "",
        defaultValue: "",
      },
      {
        label: "Keterangan",
        name: "keterangan",
        type: "longtext",
        placeholder: "Keterangan",
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
function toggleHapusModal() {
  isModalHapusOpen.value = !isModalHapusOpen.value;
}
//#endregion
</script>
