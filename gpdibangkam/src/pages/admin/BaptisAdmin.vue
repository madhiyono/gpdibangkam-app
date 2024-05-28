<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-blue-700">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Data Baptis</h3>
            </div>
          </div>
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 px-4 lg:px-10 py-5">
          <!-- #region Search Panes / Filter -->
          <div class="text-sm font-medium text-gray-900 bg-white">
            <div
              :class="[isJenisKelaminCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Jenis Kelamin</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseJenisKelaminHandle"
              >
                <i
                  v-if="isJenisKelaminCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isJenisKelaminCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.jenis_kelamin"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('jenis_kelamin', value)"
                  @change="toggleFilter('jenis_kelamin', value)"
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
          <div class="text-sm font-medium text-gray-900 bg-white">
            <div
              :class="[isStatusCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Status Baptis</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseStatusHandle"
              >
                <i v-if="isStatusCollapse" class="fas fa-angle-down text-lg" />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isStatusCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.status"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('status', value)"
                  @change="toggleFilter('status', value)"
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
          <input
            type="file"
            ref="sertifikat"
            class="hidden"
            accept=".pdf"
            @change="uploadSertifikat($event)"
          />
          <button
            class="bg-gray-200 text-gray-600 border border-gray-400 px-4 py-2 rounded hover:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:border"
            :disabled="
              selectedRows.length === 0 ||
              selectedRows[0].status !== 'Selesai' ||
              selectedRows[0].sertifikat ||
              isUploadSertifikatLoading
            "
            @click="$refs.sertifikat.click()"
          >
            <span v-if="!isUploadSertifikatLoading">Upload Sertifikat</span>
            <svg
              v-else
              aria-hidden="true"
              class="w-6 h-6 text-gray-200 animate-spin fill-blue-600 mx-4"
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
          </button>
          <button
            class="bg-gray-200 text-gray-600 border border-gray-400 px-4 py-2 rounded hover:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:border"
            :disabled="
              selectedRows.length === 0 || selectedRows[0].status === 'Selesai'
            "
            @click="toggleUbahModal"
          >
            Update Status
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
          judulAlert="Baptis"
          :toggleFunction="closeAlert"
          :isiAlert="successResponseMessage"
        />
        <div class="relative overflow-x-auto lg:px-10">
          <table class="table-fixed w-full text-sm text-left text-white">
            <thead class="text-xs uppercase bg-blue-700 text-center">
              <th class="w-16">No.</th>
              <th class="px-6 py-3">Nama Lengkap</th>
              <th class="px-6 py-3">Jenis Kelamin</th>
              <th class="px-6 py-3">Pas Foto</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Created_At</th>
              <th class="px-6 py-3">Sertifikat</th>
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
                  {{ data.nama_lengkap }}
                </td>
                <td class="text-center px-2">
                  {{ data.jenis_kelamin }}
                </td>
                <td class="p-2">
                  <img
                    :src="data.pasfoto"
                    class="mx-auto max-h-16"
                    :alt="`gambar-${index}`"
                  />
                </td>
                <td class="text-center px-2">
                  {{ data.status }}
                </td>
                <td class="text-center px-2">
                  {{ data.created_at }}
                </td>
                <td class="text-center px-2">
                  <button
                    class="bg-emerald-500 active:bg-emerald-600 disabled:bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow outline-none focus:outline-none py-3 px-3 rounded-lg text-xs"
                    type="button"
                    @click="
                      downloadBerkas(
                        data.id,
                        authStore.accessToken,
                        data.sertifikat
                      )
                    "
                    :disabled="!data.sertifikat"
                  >
                    Download
                  </button>
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
    title="Data Baptis"
    :inputFields="detailDataModal"
    @modal-toggle="toggleDetailModal"
  />
  <inputModal
    :isModalOpen="isModalUbahOpen"
    title="Ubah Data Baptis"
    btnTitle="Ubah Data"
    :inputFields="fieldsUbahModal"
    urlEndpoint="baptis"
    urlMethod="PUT"
    :urlId="idData"
    @modal-toggle="toggleUbahModal"
    @alert-toggle="openAlert"
    @action-after-submit="loadData"
  />
  <deleteModal
    :isModalOpen="isModalHapusOpen"
    title="Hapus Data Baptis"
    urlEndpoint="baptis"
    :urlId="idData"
    @modal-toggle="toggleHapusModal"
    @alert-toggle="openAlert"
    @action-after-submit="loadData"
  />
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useFetch } from "@/helpers";
import { useAuthStore } from "@/stores/AuthStore";
import moment from "moment-timezone";
import { saveAs } from "file-saver";
import axios from "axios";
import { env } from "@/env";
import SuccessAlert from "@/components/Alerts/SuccessAlert.vue";
import detailModal from "@/components/Modals/detailModal.vue";
import inputModal from "@/components/Modals/inputModal.vue";
import deleteModal from "@/components/Modals/deleteModal.vue";

const instance = getCurrentInstance();
const authStore = useAuthStore();
defineEmits(["route-changed"]);
const rawApiData = ref([]);
const allUserData = ref([]);
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
const isJenisKelaminCollapse = ref(true);

function collapseJenisKelaminHandle() {
  isJenisKelaminCollapse.value = !isJenisKelaminCollapse.value;
}

const isStatusCollapse = ref(true);

function collapseStatusHandle() {
  isStatusCollapse.value = !isStatusCollapse.value;
}

const searchQuery = ref("");
const selectedFilters = ref({});

const filters = computed(() => {
  const uniqueFilters = {};

  filteredData.value.forEach((data) => {
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
  instance.emit("route-changed", "Data Baptis");
  useFetch("GET", "users", null, authStore.accessToken).then((response) => {
    allUserData.value = response.data.map((data) => {
      return {
        value: data.id_jemaat,
        label: data.nama_lengkap,
      };
    });
  });

  loadData();
});

function loadData() {
  selectedRows.value = [];
  rawApiData.value = [];
  isLoadData.value = true;

  useFetch("GET", "baptis", null, authStore.accessToken)
    .then((responseBaptis) => {
      responseBaptis.data
        .sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        })
        .map((baptis) => {
          if (baptis.id_pelaksana) {
            useFetch(
              "GET",
              `users/jemaat/${baptis.id_pelaksana}`,
              null,
              authStore.accessToken
            ).then((responsePelaksana) => {
              baptis.nama_pelaksana = responsePelaksana.data.nama_lengkap;
            });
          } else {
            baptis.nama_pelaksana = null;
          }
          useFetch(
            "GET",
            `users/jemaat/${baptis.id_jemaat}`,
            null,
            authStore.accessToken
          ).then((responseJemaat) => {
            const dateCreatedAt = new Date(baptis.created_at);
            const dateTanggal = new Date(baptis.tanggal);
            const options = {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hourCycle: "h24",
              hour: "2-digit",
              minute: "2-digit",
            };

            const mappingData = {
              ...baptis,
              nama_lengkap: responseJemaat.data.nama_lengkap,
              jenis_kelamin: responseJemaat.data.jenis_kelamin,
              created_at: dateCreatedAt.toLocaleDateString("id-ID", options),
            };

            if (baptis.tanggal) {
              mappingData.tanggal = dateTanggal.toLocaleDateString(
                "id-ID",
                options
              );

              const convertedTime = moment(dateTanggal)
                .tz("Asia/Jakarta")
                .format("YYYY-MM-DDTHH:mm");
              mappingData.raw_tanggal = convertedTime;
            } else {
              mappingData.raw_tanggal = null;
            }

            rawApiData.value.push(mappingData);
          });
        });
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
      { label: "Created At", type: "text", value: data.created_at },
      { label: "Pas Foto", type: "image", value: data.pasfoto },
      { label: "Nama Lengkap", type: "text", value: data.nama_lengkap },
      { label: "Jenis Kelamin", type: "text", value: data.jenis_kelamin },
      { label: "Nama Ayah", type: "text", value: data.nama_ayah },
      { label: "Nama Ibu", type: "text", value: data.nama_ibu },
      { label: "Nama Pendeta", type: "text", value: data.nama_pelaksana },
      { label: "Tanggal Baptis", type: "text", value: data.tanggal },
      { label: "Tempat Baptis", type: "text", value: data.tempat },
      { label: "Status", type: "text", value: data.status },
    ];
    idData.value = data.id;
    selectedRows.value = [data];
  }
}

function downloadBerkas(id, token, nama_file) {
  axios({
    method: "GET",
    url: `${env.API_URL}/baptis/download/${id}`,
    responseType: "blob",
    headers: {
      authorization: token,
    },
  })
    .then((response) => {
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, nama_file);
    })
    .catch((error) => {
      console.error(error);
    });
}

const isUploadSertifikatLoading = ref(false);
function uploadSertifikat(event) {
  if (event.target.files[0].type === "application/pdf") {
    isUploadSertifikatLoading.value = true;

    const formData = new FormData();
    formData.append("sertifikat", event.target.files[0]);
    formData.append("id_jemaat", selectedRows.value[0].id_jemaat);

    useFetch(
      "PUT",
      `baptis/upload/${selectedRows.value[0].id}`,
      formData,
      authStore.accessToken
    )
      .then(() => {
        loadData();
        isUploadSertifikatLoading.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    window.alert("Berkas Harus Bertipe PDF");
    event.target.files = null;
  }
}

function isSelected(data) {
  return selectedRows.value.includes(data);
}
//#endregion

//#region Modal
const idData = ref("");
const isModalDetailOpen = ref(false);
const isModalUbahOpen = ref(false);
const isModalHapusOpen = ref(false);
const detailDataModal = ref([]);
const fieldsUbahModal = computed(() => {
  if (authStore.userData && selectedRows.value.length > 0) {
    return [
      {
        label: "Nama Pendeta",
        name: "id_pelaksana",
        type: "select",
        isDisable: false,
        isRequire: true,
        value: selectedRows.value[0].id_pelaksana,
        defaultValue: selectedRows.value[0].id_pelaksana,
        list: allUserData.value,
      },
      {
        label: "Tempat Baptis",
        name: "tempat",
        type: "text",
        placeholder: "Tempat Baptis",
        isDisable: false,
        isRequire: true,
        value: selectedRows.value[0].tempat,
        defaultValue: selectedRows.value[0].tempat,
      },
      {
        label: "Tanggal Baptis",
        name: "tanggal",
        type: "datetime-local",
        placeholder: "Tanggal Baptis",
        isDisable: false,
        isRequire: false,
        value: selectedRows.value[0].raw_tanggal,
        defaultValue: selectedRows.value[0].raw_tanggal,
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        isDisable: false,
        isRequire: true,
        value: selectedRows.value[0].status,
        defaultValue: selectedRows.value[0].status,
        list: [
          { value: "Belum Diproses", label: "Belum Diproses" },
          { value: "Sedang Proses", label: "Sedang Proses" },
          { value: "Selesai", label: "Selesai" },
        ],
      },
    ];
  } else {
    return [];
  }
});

function toggleDetailModal() {
  isModalDetailOpen.value = !isModalDetailOpen.value;
}
function toggleUbahModal() {
  isModalUbahOpen.value = !isModalUbahOpen.value;
}
function toggleHapusModal() {
  isModalHapusOpen.value = !isModalHapusOpen.value;
}
//#endregion
</script>
