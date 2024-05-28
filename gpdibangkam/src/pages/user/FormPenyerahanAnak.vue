<template>
  <section class="relative py-16 bg-gray-200">
    <div class="container mx-auto px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full -mb-16 pb-16 shadow-xl rounded-lg -mt-44"
      >
        <div class="lg:p-12 p-4 flex lg:gap-8 gap-4 lg:mb-0 mb-4">
          <router-link
            class="bg-blue-500 lg:text-base text-xs active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            :to="{ name: 'HomePage', hash: '#layanan' }"
          >
            Ke Halaman Utama
          </router-link>
        </div>
        <div class="relative w-full text-center lg:mb-5">
          <span class="text-sm text-orange-400 italic"
            >Dapatkan Layanan Kami Secara Online</span
          >
          <h6 class="text-3xl font-bold text-blue-700">
            Formulir Penyerahan Anak
          </h6>
        </div>

        <form
          @submit.prevent="submitFormPenyerahanAnak"
          class="px-6 pb-16 flex flex-col items-center"
        >
          <div
            class="w-full pb-8 grid lg:px-24 grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div class="lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <label
                  for="nama_lengkap"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Nama Lengkap</label
                >
                <input
                  type="text"
                  id="nama_lengkap"
                  v-model="dataPenyerahanAnak.nama_lengkap"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nama Lengkap"
                />
              </div>
              <div>
                <label
                  for="jenis_kelamin"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Jenis Kelamin</label
                >
                <select
                  id="jenis_kelamin"
                  v-model="dataPenyerahanAnak.jenis_kelamin"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label
                  for="tempat_tanggal_lahir"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Tempat / Tanggal Lahir</label
                >
                <div class="flex items-center">
                  <input
                    type="text"
                    v-model="dataPenyerahanAnak.tempat_lahir"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Tempat Lahir"
                  />
                  <span class="px-4">-</span>
                  <input
                    type="date"
                    v-model="dataPenyerahanAnak.tanggal_lahir"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Tanggal Lahir"
                  />
                </div>
              </div>
            </div>
            <div class="lg:col-span-2">
              <label
                for="alamat"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Alamat</label
              >
              <textarea
                id="alamat"
                rows="4"
                v-model="dataPenyerahanAnak.alamat"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none overflow-y-auto"
                placeholder="Alamat Lengkap"
              ></textarea>
            </div>
            <div class="lg:col-span-2 grid lg:grid-cols-3 grid-cols-1 gap-8">
              <div>
                <label
                  for="rt_rw"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >RT / RW</label
                >
                <div class="flex items-center">
                  <input
                    type="number"
                    min="0"
                    v-model="dataPenyerahanAnak.rt"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="RT"
                  />
                  <span class="px-4">/</span>
                  <input
                    type="number"
                    min="0"
                    v-model="dataPenyerahanAnak.rw"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="RW"
                  />
                </div>
              </div>
              <div>
                <label
                  for="kelurahan"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Kelurahan</label
                >
                <input
                  type="text"
                  id="kelurahan"
                  v-model="dataPenyerahanAnak.kelurahan"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Kelurahan"
                />
              </div>
              <div>
                <label
                  for="kecamatan"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Kecamatan</label
                >
                <input
                  type="text"
                  id="kecamatan"
                  v-model="dataPenyerahanAnak.kecamatan"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Kecamatan"
                />
              </div>
            </div>
            <div>
              <label
                for="kota_kabupaten"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Kota / Kabupaten</label
              >
              <input
                type="text"
                id="kota_kabupaten"
                v-model="dataPenyerahanAnak.kota_kabupaten"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Kota / Kabupaten"
              />
            </div>
            <div>
              <label
                for="provinsi"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Provinsi</label
              >
              <input
                type="text"
                id="provinsi"
                v-model="dataPenyerahanAnak.provinsi"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Provinsi"
              />
            </div>
            <div>
              <label
                for="nama_ayah"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Nama Ayah</label
              >
              <input
                type="text"
                id="nama_ayah"
                v-model="dataPenyerahanAnak.nama_ayah"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Ayah"
                :disabled="isAyahSet"
              />
            </div>
            <div>
              <label
                for="nama_ibu"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Nama Ibu</label
              >
              <input
                type="text"
                id="nama_ibu"
                v-model="dataPenyerahanAnak.nama_ibu"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Ibu"
                :disabled="isIbuSet"
              />
            </div>
          </div>
          <h6
            class="pb-4 text-lg font-semibold text-gray-600 uppercase tracking-wider"
          >
            Berkas Pendukung
          </h6>
          <div
            class="w-full pb-8 grid lg:px-24 grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div class="lg:col-span-2 grid lg:grid-cols-2 grid-cols-1 gap-8">
              <div>
                <label
                  for="pas_foto"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Pas Foto Anak</label
                >
                <input
                  type="file"
                  id="pas_foto"
                  accept="image/*"
                  @change="uploadBerkas($event, 'pas_foto')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
              </div>
              <div>
                <label
                  for="akta_kelahiran"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Akta Kelahiran</label
                >
                <input
                  type="file"
                  id="akta_kelahiran"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'akta_kelahiran')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
              </div>
            </div>
          </div>
          <button
            :class="[
              isLoading
                ? 'bg-emerald-300 text-gray-400'
                : 'bg-emerald-500 text-white',
            ]"
            class="lg:col-span-2 active:bg-emerald-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Sedang Loading</span>
            <span v-else>Submit</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { env } from "@/env";
import { useFetch } from "@/helpers";
import axios from "axios";

const authStore = useAuthStore();
const router = useRouter();

const dataPenyerahanAnak = reactive({
  id_jemaat: "",
  nama_lengkap: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  alamat: "",
  rt: "",
  rw: "",
  kelurahan: "",
  kecamatan: "",
  kota_kabupaten: "",
  provinsi: "",
  nama_ayah: "",
  nama_ibu: "",
  pas_foto: "",
  akta_kelahiran: "",
});

const isLoading = ref(false);
const isAyahSet = ref(false);
const isIbuSet = ref(false);

function uploadBerkas(event, jenis_file) {
  if (jenis_file === "pas_foto") {
    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png"
    ) {
      dataPenyerahanAnak.pas_foto = event.target.files[0];
    } else {
      window.alert("Pas Foto Harus Bertipe Jpeg atau PNG");
      event.target.files = null;
    }
  } else {
    if (event.target.files[0].type === "application/pdf") {
      dataPenyerahanAnak.akta_kelahiran = event.target.files[0];
    } else {
      window.alert("Berkas Harus Bertipe PDF");
      event.target.files = null;
    }
  }
}

async function getBaptis(id, token) {
  try {
    const response = await axios.get(`${env.API_URL}/baptis/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getUserData(id, token) {
  try {
    const response = await axios.get(`${env.API_URL}/users/${id}`, {
      headers: {
        authorization: token,
      },
    });

    authStore.saveUserData(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getUserRelasi(id, token) {
  try {
    const response = await axios.get(`${env.API_URL}/relasi/${id}`, {
      headers: {
        authorization: token,
      },
    });

    authStore.saveUserRelasi(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getUserInfo(id, token) {
  try {
    const response = await axios.get(`${env.API_URL}/relasi/user/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

function setDefaultValue(data, relasi) {
  dataPenyerahanAnak.id_jemaat = data.id_jemaat;
  if (data.jenis_kelamin) {
    if (data.jenis_kelamin === "Laki-laki") {
      isAyahSet.value = true;
      dataPenyerahanAnak.nama_ayah = data.nama_lengkap;
    } else {
      isIbuSet.value = true;
      dataPenyerahanAnak.nama_ibu = data.nama_lengkap;
    }
  } else {
    window.alert("Silahkan Lengkapi Data Profil Anda!");
    router.push({ name: "ProfilePage" });
  }

  if (relasi.length > 0) {
    const ayah = relasi.find((relasi) => relasi.relasi === "Istri");
    const ibu = relasi.find((relasi) => relasi.relasi === "Suami");

    if (ayah.id_jemaat_kedua) {
      isAyahSet.value = true;
      getUserInfo(ayah.id_jemaat_kedua, authStore.accessToken).then(
        (response) => {
          dataPenyerahanAnak.nama_ayah = response[0].nama_lengkap;
        }
      );
    }

    if (ibu.id_jemaat_kedua) {
      isIbuSet.value = true;
      getUserInfo(ibu.id_jemaat_kedua, authStore.accessToken).then(
        (response) => {
          dataPenyerahanAnak.nama_ibu = response[0].nama_lengkap;
        }
      );
    }
  }
}

onBeforeMount(() => {
  if (authStore.isLoggedIn) {
    if (!authStore.userData && !authStore.userRelasi) {
      getUserData(authStore.idUser, authStore.accessToken).then(
        (responseUser) => {
          getBaptis(responseUser.id_jemaat, authStore.accessToken).then(
            (responseBaptis) => {
              if (responseBaptis.length > 0) {
                const belumPernah = responseBaptis.find(
                  (baptis) =>
                    baptis.status === "Belum Diproses" ||
                    baptis.status === "Sedang Proses"
                );

                if (belumPernah) {
                  window.alert("Permintaan Baptis Anda Sedang Diproses");
                  router.push({
                    name: "ProfilePage",
                    hash: "#layananjemaat",
                  });
                } else {
                  getUserRelasi(
                    responseUser.id_jemaat,
                    authStore.accessToken
                  ).then((responseRelasi) => {
                    authStore.saveUserRelasi(responseRelasi);
                    setDefaultValue(responseUser, responseRelasi);
                  });
                }
              } else {
                window.alert("Anda Belum Dibaptis");
                router.push({ name: "FormBaptis" });
              }
            }
          );
        }
      );
    } else {
      getBaptis(authStore.userData.id_jemaat, authStore.accessToken).then(
        (responseBaptis) => {
          if (responseBaptis.length > 0) {
            const belumPernah = responseBaptis.find(
              (baptis) =>
                baptis.status === "Belum Diproses" ||
                baptis.status === "Sedang Proses"
            );

            if (belumPernah) {
              window.alert("Permintaan Baptis Anda Sedang Diproses");
              router.push({ name: "ProfilePage", hash: "#layananjemaat" });
            } else {
              setDefaultValue(authStore.userData, authStore.userRelasi);
            }
          } else {
            window.alert("Anda Belum Dibaptis");
            router.push({ name: "FormBaptis" });
          }
        }
      );
    }
  }
});

function submitFormPenyerahanAnak() {
  isLoading.value = true;

  const cloneDataPenyerahanAnak = { ...dataPenyerahanAnak };
  const formData = new FormData();

  delete cloneDataPenyerahanAnak.rt;
  delete cloneDataPenyerahanAnak.rw;
  Object.entries(cloneDataPenyerahanAnak).forEach((input) => {
    const [key, value] = input;
    formData.append(key, value);
  });

  formData.append(
    "rt_rw",
    [dataPenyerahanAnak.rt, dataPenyerahanAnak.rw].join(" / ")
  );

  useFetch("POST", "penyerahananak", formData, authStore.accessToken)
    .then(() => {
      isLoading.value = false;
      router.push({ name: "ProfilePage", hash: "#layananjemaat" });
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
