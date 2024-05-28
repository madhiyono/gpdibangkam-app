<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white"
      >
        <div
          :class="[isSendEmail ? 'absolute' : 'hidden']"
          class="bg-black bg-opacity-50 min-w-full min-h-full rounded-lg z-10 flex justify-center items-center"
        >
          <svg
            aria-hidden="true"
            class="w-12 h-12 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-blue-700">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Data Acara</h3>
            </div>
          </div>
        </div>
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
          <button
            class="bg-gray-200 text-gray-600 border border-gray-400 px-4 py-2 rounded hover:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:border"
            :disabled="selectedRows.length === 0"
            @click="toggleSendEmail"
          >
            Kirim Email
          </button>
        </div>
        <SuccessAlert
          v-if="showSuccessAlert"
          class="mx-4 lg:mx-10"
          judulAlert="Acara"
          :toggleFunction="closeAlert"
          :isiAlert="successResponseMessage"
        />
        <div class="relative overflow-x-auto lg:px-10">
          <table class="table-fixed w-full text-sm text-left text-white">
            <thead class="text-xs uppercase bg-blue-700 text-center">
              <th class="w-16">No.</th>
              <th class="px-6 py-3">Nama</th>
              <th class="px-6 py-3">Tanggal</th>
              <th class="px-6 py-3">Lokasi</th>
              <th class="px-6 py-3">Keterangan</th>
              <th class="px-6 py-3">Created At</th>
            </thead>
            <tbody v-if="paginatedData.length > 0" class="text-gray-600">
              <tr
                v-for="(acara, index) in paginatedData"
                :key="acara.id"
                :class="[
                  isSelected(acara)
                    ? 'bg-blue-500 text-white hover:bg-blue-500'
                    : 'bg-white hover:bg-blue-200',
                ]"
                class="border-b select-none"
                @click="selectRow(acara)"
              >
                <td class="text-center">
                  {{ startIndex + index }}
                </td>
                <td class="text-center p-2">
                  <div class="line-clamp-3">
                    {{ acara.nama }}
                  </div>
                </td>
                <td class="text-center p-2">
                  {{ acara.tanggal_mulai }} - {{ acara.tanggal_selesai }}
                </td>
                <td class="text-center p-2">
                  {{ acara.lokasi }}
                </td>
                <td class="text-center p-2">
                  <div class="line-clamp-3">
                    {{ acara.keterangan }}
                  </div>
                </td>
                <td class="text-center p-2">
                  {{ acara.created_at }}
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
    title="Data Acara"
    :inputFields="detailDataModal"
    @modal-toggle="toggleDetailModal"
  />
  <inputModal
    :isModalOpen="isModalTambahOpen"
    pesan="Harap Mengisi Informasi Acara Dengan Baik dan Benar, Karena Acara
              Akan Langsung Dikirim Melalui Email Setelah Ditambah!"
    title="Tambah Data Acara"
    btnTitle="Tambah Data"
    :inputFields="fieldsTambahModal"
    urlEndpoint="acara"
    urlMethod="POST"
    @modal-toggle="toggleTambahModal"
    @alert-toggle="openAlert"
    @action-after-submit="loadData"
  />
  <deleteModal
    :isModalOpen="isModalHapusOpen"
    title="Hapus Data Acara"
    urlEndpoint="acara"
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
import { verifyToken, doRefreshToken } from "@/helpers";
import { encryptKey } from "@/secured";
import SuccessAlert from "@/components/Alerts/SuccessAlert.vue";
import detailModal from "@/components/Modals/detailModal.vue";
import inputModal from "@/components/Modals/inputModal.vue";
import deleteModal from "@/components/Modals/deleteModal.vue";

const instance = getCurrentInstance();
const authStore = useAuthStore();
defineEmits(["route-changed"]);
const rawApiData = ref([]);
const isLoadData = ref(false);
const isSendEmail = ref(false);
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
const searchQuery = ref("");

const filteredData = computed(() => {
  let filtered = rawApiData.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLocaleLowerCase();
    filtered = filtered.filter((acara) =>
      Object.values(acara).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
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
  instance.emit("route-changed", "Data Acara");

  loadData();
});

function loadData() {
  selectedRows.value = [];
  isLoadData.value = true;
  axios
    .get(`${env.API_URL}/acara`)
    .then((response) => {
      const formattedData = response.data.data
        .sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        })
        .map((acara) => {
          const tanggalMulai = new Date(acara.tanggal_mulai);
          const tanggalSelesai = new Date(acara.tanggal_selesai);
          const createdAt = new Date(acara.created_at);
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
            tanggal_mulai: tanggalMulai.toLocaleDateString("id-ID", options),
            tanggal_selesai: tanggalSelesai.toLocaleDateString(
              "id-ID",
              options
            ),
            created_at: createdAt.toLocaleDateString("id-ID", options),
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
      { label: "Nama", type: "text", value: data.nama },
      { label: "Tanggal Mulai", type: "text", value: data.tanggal_mulai },
      { label: "Tanggal Selesai", type: "text", value: data.tanggal_selesai },
      { label: "Lokasi", type: "text", value: data.lokasi },
      { label: "Keterangan", type: "longtext", value: data.keterangan },
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
const fieldsTambahModal = [
  {
    label: "Nama Acara",
    name: "nama",
    type: "text",
    placeholder: "Nama Acara",
    isDisable: false,
    isRequire: true,
    value: "",
    defaultValue: "",
  },
  {
    label: "Lokasi",
    name: "lokasi",
    type: "text",
    placeholder: "Lokasi Acara",
    isDisable: false,
    isRequire: true,
    value: "",
    defaultValue: "",
  },
  {
    label: "Tanggal Mulai",
    name: "tanggal_mulai",
    type: "datetime-local",
    placeholder: "Tanggal Mulai Acara",
    isDisable: false,
    isRequire: true,
    value: "",
    defaultValue: "",
  },
  {
    label: "Tanggal Selesai",
    name: "tanggal_selesai",
    type: "datetime-local",
    placeholder: "Tanggal Selesai Acara",
    isDisable: false,
    isRequire: true,
    value: "",
    defaultValue: "",
  },
  {
    label: "Keterangan",
    name: "keterangan",
    type: "longtext",
    placeholder: "Keterangan Acara",
    isDisable: false,
    isRequire: true,
    value: "",
    defaultValue: "",
  },
];

function toggleDetailModal() {
  isModalDetailOpen.value = !isModalDetailOpen.value;
}
function toggleTambahModal() {
  isModalTambahOpen.value = !isModalTambahOpen.value;
}
function toggleHapusModal() {
  isModalHapusOpen.value = !isModalHapusOpen.value;
}
function toggleSendEmail() {
  isSendEmail.value = true;

  if (verifyToken(authStore.accessToken)) {
    axios
      .get(`${env.API_URL}/acara/send/${idData.value}`, {
        headers: {
          authorization: authStore.accessToken,
        },
      })
      .then(() => {
        isSendEmail.value = false;
        openAlert("Email Berhasil Dikirim");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    doRefreshToken(authStore.refreshToken)
      .then((response) => {
        authStore.saveTokens(response, authStore.refreshToken);
        localStorage.setItem("_SSIDGSB1", encryptKey(response, env.APP_KEY));

        axios
          .get(`${env.API_URL}/acara/send/${idData.value}`, {
            headers: {
              authorization: response,
            },
          })
          .then(() => {
            isSendEmail.value = false;
            openAlert("Email Berhasil Dikirim");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
//#endregion
</script>
