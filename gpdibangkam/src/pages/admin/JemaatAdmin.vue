<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-blue-700">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Data Umat</h3>
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
              :class="[isAsalGerejaCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Asal Gereja</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseAsalGerejaHandle"
              >
                <i
                  v-if="isAsalGerejaCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isAsalGerejaCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.asal_gereja"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('asal_gereja', value)"
                  @change="toggleFilter('asal_gereja', value)"
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
              :class="[isStatusJemaatCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Status Jemaat</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseStatusJemaatHandle"
              >
                <i
                  v-if="isStatusJemaatCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isStatusJemaatCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.status_jemaat"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('status_jemaat', value)"
                  @change="toggleFilter('status_jemaat', value)"
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
              :class="[isKecamatanCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Kecamatan</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseKecamatanHandle"
              >
                <i
                  v-if="isKecamatanCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isKecamatanCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.kecamatan"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('kecamatan', value)"
                  @change="toggleFilter('kecamatan', value)"
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
              :class="[isKelurahanCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Kelurahan</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseKelurahanHandle"
              >
                <i
                  v-if="isKelurahanCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isKelurahanCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.kelurahan"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('kelurahan', value)"
                  @change="toggleFilter('kelurahan', value)"
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
              :class="[isKotaKabupatenCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Kota / Kabupaten</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseKotaKabupatenHandle"
              >
                <i
                  v-if="isKotaKabupatenCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isKotaKabupatenCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.kota_kabupaten"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('kota_kabupaten', value)"
                  @change="toggleFilter('kota_kabupaten', value)"
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
              :class="[isProvinsiCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Provinsi</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseProvinsiHandle"
              >
                <i
                  v-if="isProvinsiCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isProvinsiCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.provinsi"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('provinsi', value)"
                  @change="toggleFilter('provinsi', value)"
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
              :class="[isTempatLahirCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Tempat Lahir</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapseTempatLahirHandle"
              >
                <i
                  v-if="isTempatLahirCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isTempatLahirCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.tempat_lahir"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('tempat_lahir', value)"
                  @change="toggleFilter('tempat_lahir', value)"
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
              :class="[isPekerjaanCollapse ? 'border border-gray-400' : '']"
              class="flex items-center justify-between p-2"
            >
              <span class="font-semibold text-lg">Filter Pekerjaan</span>
              <button
                class="flex items-center justify-center px-2 text-gray-400 hover:bg-gray-200"
                @click="collapsePekerjaanHandle"
              >
                <i
                  v-if="isPekerjaanCollapse"
                  class="fas fa-angle-down text-lg"
                />
                <i v-else class="fas fa-angle-up text-lg" />
              </button>
            </div>

            <ul
              :class="[isPekerjaanCollapse ? 'hidden' : 'flex flex-col']"
              class="w-full border max-h-48 overflow-y-auto border-gray-200"
            >
              <li
                v-for="(count, value) in filters.pekerjaan"
                :key="value"
                class="w-full"
              >
                <input
                  :id="`option-${value}`"
                  type="checkbox"
                  class="hidden peer"
                  :checked="isFilterSelected('pekerjaan', value)"
                  @change="toggleFilter('pekerjaan', value)"
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
            @click="toggleDetailModal"
            :disabled="selectedRows.length === 0"
          >
            Detail
          </button>
        </div>
        <div class="relative overflow-x-auto lg:px-10">
          <table class="table-fixed w-full text-sm text-left text-white">
            <thead class="text-xs uppercase bg-blue-700 text-center">
              <th class="w-16">No.</th>
              <th class="px-6 py-3">Nama Lengkap</th>
              <th class="px-6 py-3">Jenis Kelamin</th>
              <th class="px-6 py-3">Tempat Lahir</th>
              <th class="px-6 py-3">Tanggal Lahir</th>
              <th class="px-6 py-3">Asal Gereja</th>
              <th class="px-6 py-3">Provinsi</th>
              <th class="px-6 py-3">Updated_At</th>
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
                <td class="text-center px-2">
                  {{ data.tempat_lahir }}
                </td>
                <td class="text-center px-2">
                  {{ data.tanggal_lahir }}
                </td>
                <td class="text-center px-2">
                  {{ data.asal_gereja }}
                </td>
                <td class="text-center px-2">
                  {{ data.provinsi }}
                </td>
                <td class="text-center px-2">
                  {{ data.updated_at }}
                </td>
              </tr>
            </tbody>
            <tbody v-else class="text-gray-600">
              <tr class="border-b select-none bg-white hover:bg-blue-200 h-12">
                <td
                  v-if="isLoadData"
                  colspan="8"
                  class="text-center font-semibold"
                >
                  Sedang Memuat Data
                </td>
                <td v-else colspan="8" class="text-center font-semibold">
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
    title="Data Jemaat"
    :inputFields="detailDataModal"
    @modal-toggle="toggleDetailModal"
  />
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useFetch } from "@/helpers";
import { useAuthStore } from "@/stores/AuthStore";
import detailModal from "@/components/Modals/detailModal.vue";

const instance = getCurrentInstance();
const authStore = useAuthStore();
defineEmits(["route-changed"]);
const rawApiData = ref([]);
const isLoadData = ref(false);

//#region Filtering
const isJenisKelaminCollapse = ref(true);
const isAsalGerejaCollapse = ref(true);
const isKecamatanCollapse = ref(true);
const isKelurahanCollapse = ref(true);
const isKotaKabupatenCollapse = ref(true);
const isPekerjaanCollapse = ref(true);
const isProvinsiCollapse = ref(true);
const isStatusJemaatCollapse = ref(true);
const isTempatLahirCollapse = ref(true);

function collapseJenisKelaminHandle() {
  isJenisKelaminCollapse.value = !isJenisKelaminCollapse.value;
}
function collapseAsalGerejaHandle() {
  isAsalGerejaCollapse.value = !isAsalGerejaCollapse.value;
}
function collapseKecamatanHandle() {
  isKecamatanCollapse.value = !isKecamatanCollapse.value;
}
function collapseKelurahanHandle() {
  isKelurahanCollapse.value = !isKelurahanCollapse.value;
}
function collapseKotaKabupatenHandle() {
  isKotaKabupatenCollapse.value = !isKotaKabupatenCollapse.value;
}
function collapsePekerjaanHandle() {
  isPekerjaanCollapse.value = !isPekerjaanCollapse.value;
}
function collapseProvinsiHandle() {
  isProvinsiCollapse.value = !isProvinsiCollapse.value;
}
function collapseStatusJemaatHandle() {
  isStatusJemaatCollapse.value = !isStatusJemaatCollapse.value;
}
function collapseTempatLahirHandle() {
  isTempatLahirCollapse.value = !isTempatLahirCollapse.value;
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
  instance.emit("route-changed", "Data Umat");

  loadData();
});

function loadData() {
  selectedRows.value = [];
  rawApiData.value = [];
  isLoadData.value = true;

  useFetch("GET", "users", null, authStore.accessToken)
    .then((responseUsers) => {
      responseUsers.data.map((user) => {
        useFetch(
          "GET",
          `users/jemaat/${user.id_jemaat}`,
          null,
          authStore.accessToken
        ).then((responseJemaat) => {
          delete responseJemaat.data.id;
          delete responseJemaat.data.foto_profile;
          delete responseJemaat.data.level;
          delete responseJemaat.data.status;

          const dateTanggalLahir = new Date(responseJemaat.data.tanggal_lahir);
          const dateUpdatedAt = new Date(responseJemaat.data.updated_at);
          const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
          };

          responseJemaat.data.updated_at = dateUpdatedAt.toLocaleDateString(
            "id-ID",
            { ...options, hourCycle: "h24", hour: "2-digit", minute: "2-digit" }
          );

          if (responseJemaat.data.tanggal_lahir) {
            responseJemaat.data.tanggal_lahir =
              dateTanggalLahir.toLocaleDateString("id-ID", options);
          }

          rawApiData.value.push(responseJemaat.data);
        });
      });
      useFetch("GET", "jemaatluar", null, authStore.accessToken).then(
        (responseJemaatLuar) => {
          if (responseJemaatLuar.data.length > 0) {
            responseJemaatLuar.data.id_jemaat = responseJemaatLuar.data.id;
            delete responseJemaatLuar.data.id;
            delete responseJemaatLuar.data.tanggal_baptis;
            delete responseJemaatLuar.data.surat_baptis;
            delete responseJemaatLuar.data.ktp;
            delete responseJemaatLuar.data.akta_lahir;
            delete responseJemaatLuar.data.surat_keanggotaan;

            const dateTanggalLahir = new Date(
              responseJemaatLuar.data.tanggal_lahir
            );
            const dateUpdatedAt = new Date(responseJemaatLuar.data.updated_at);
            const options = {
              day: "2-digit",
              month: "long",
              year: "numeric",
            };

            responseJemaatLuar.data.updated_at =
              dateUpdatedAt.toLocaleDateString("id-ID", {
                ...options,
                hourCycle: "h24",
                hour: "2-digit",
                minute: "2-digit",
              });

            if (responseJemaatLuar.data.tanggal_lahir) {
              responseJemaatLuar.data.tanggal_lahir =
                dateTanggalLahir.toLocaleDateString("id-ID", options);
            }

            rawApiData.value.push(responseJemaatLuar.data);
          }
        }
      );
    })
    .catch((error) => {
      rawApiData.value = [];
      console.error(error);
    })
    .finally(() => {
      isLoadData.value = false;
      console.log(rawApiData.value);
    });
}

//#region Select Single Row or Multiple Row
const selectedRows = ref([]);

function selectRow(data) {
  if (selectedRows.value.includes(data)) {
    selectedRows.value = selectedRows.value.filter((id) => id !== data);
  } else {
    detailDataModal.value = [
      { label: "ID", type: "text", value: data.id_jemaat },
      { label: "Nama Lengkap", type: "text", value: data.nama_lengkap },
      { label: "Email", type: "text", value: data.email },
      { label: "Jenis Kelamin", type: "text", value: data.jenis_kelamin },
      { label: "Tempat Lahir", type: "text", value: data.tempat_lahir },
      { label: "Tanggal Lahir", type: "text", value: data.tanggal_lahir },
      { label: "Status Jemaat", type: "text", value: data.status_jemaat },
      { label: "Alamat", type: "longtext", value: data.alamat },
      { label: "RT / RW", type: "text", value: data.rt_rw },
      { label: "Kelurahan", type: "text", value: data.kelurahan },
      { label: "Kecamatan", type: "text", value: data.kecamatan },
      { label: "Kota / Kabupaten", type: "text", value: data.kota_kabupaten },
      { label: "Provinsi", type: "text", value: data.provinsi },
      { label: "Pendidikan", type: "text", value: data.pendidikan },
      { label: "Bidang Ilmu", type: "text", value: data.bidang_ilmu },
      { label: "Pekerjaan", type: "text", value: data.pekerjaan },
      { label: "Asal Gereja", type: "text", value: data.asal_gereja },
      { label: "Updated At", type: "text", value: data.updated_at },
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
const detailDataModal = ref([]);

function toggleDetailModal() {
  isModalDetailOpen.value = !isModalDetailOpen.value;
}
//#endregion
</script>
