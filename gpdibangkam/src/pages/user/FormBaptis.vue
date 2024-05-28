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
          <h6 class="text-3xl font-bold text-blue-700">Formulir Baptis</h6>
        </div>

        <form
          @submit.prevent="submitFormBaptis"
          class="grid lg:px-24 px-6 pb-16 grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div>
            <label
              for="nama_lengkap"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Nama Lengkap</label
            >
            <input
              type="text"
              id="nama_lengkap"
              v-model="dataBaptis.nama_lengkap"
              class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nama Lengkap"
              disabled
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
              v-model="dataBaptis.jenis_kelamin"
              class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
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
              v-model="dataBaptis.nama_ayah"
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
              v-model="dataBaptis.nama_ibu"
              class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nama Ibu"
              :disabled="isIbuSet"
            />
          </div>
          <div class="lg:col-span-2">
            <label
              for="pas_foto"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Pas Foto</label
            >
            <input
              type="file"
              id="pas_foto"
              ref="pas_foto"
              accept="image/*"
              @change="handleFileUpload($event)"
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
            />
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
import { verifyToken, doRefreshToken } from "@/helpers";
import { encryptKey } from "@/secured";
import axios from "axios";

const authStore = useAuthStore();
const router = useRouter();

const dataBaptis = reactive({
  id_jemaat: "",
  nama_lengkap: "",
  jenis_kelamin: "",
  nama_ayah: "",
  nama_ibu: "",
  pasfoto: "",
});

const isLoading = ref(false);
const isAyahSet = ref(false);
const isIbuSet = ref(false);
const pas_foto = ref(null);

function handleFileUpload(event) {
  if (
    event.target.files[0].type === "image/jpeg" ||
    event.target.files[0].type === "image/png"
  ) {
    dataBaptis.pasfoto = event.target.files[0];
  } else {
    window.alert("Pas Foto Harus Bertipe Jpeg atau PNG");
    event.target.files = null;
    pas_foto.value.value = null;
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
  dataBaptis.id_jemaat = data.id_jemaat;
  dataBaptis.nama_lengkap = data.nama_lengkap;

  if (data.jenis_kelamin) {
    dataBaptis.jenis_kelamin = data.jenis_kelamin;
  } else {
    window.alert("Silahkan Lengkapi Data Profil Anda!");
    router.push({ name: "ProfilePage" });
  }

  if (relasi.length > 0) {
    const ayah = relasi.find((relasi) => relasi.relasi === "Anak(A)");
    const ibu = relasi.find((relasi) => relasi.relasi === "Anak(B)");

    if (ayah.id_jemaat_kedua) {
      isAyahSet.value = true;
      getUserInfo(ayah.id_jemaat_kedua, authStore.accessToken).then(
        (response) => {
          dataBaptis.nama_ayah = response[0].nama_lengkap;
        }
      );
    }

    if (ibu.id_jemaat_kedua) {
      isIbuSet.value = true;
      getUserInfo(ibu.id_jemaat_kedua, authStore.accessToken).then(
        (response) => {
          dataBaptis.nama_ibu = response[0].nama_lengkap;
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
                  router.push({ name: "ProfilePage", hash: "#layananjemaat" });
                } else {
                  window.alert("Anda Sudah Pernah Baptis");
                  router.push({ name: "ProfilePage", hash: "#layananjemaat" });
                }
              } else {
                getUserRelasi(
                  responseUser.id_jemaat,
                  authStore.accessToken
                ).then((responseRelasi) => {
                  setDefaultValue(responseUser, responseRelasi);
                });
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
              window.alert("Anda Sudah Pernah Baptis");
              router.push({ name: "ProfilePage", hash: "#layananjemaat" });
            }
          } else {
            setDefaultValue(authStore.userData, authStore.userRelasi);
          }
        }
      );
    }
  }
});

function submitFormBaptis() {
  isLoading.value = true;
  const formData = new FormData();

  formData.append("id_jemaat", dataBaptis.id_jemaat);
  formData.append("nama_ayah", dataBaptis.nama_ayah);
  formData.append("nama_ibu", dataBaptis.nama_ibu);
  formData.append("pasfoto", dataBaptis.pasfoto);

  if (verifyToken(authStore.accessToken)) {
    axios
      .post(`${env.API_URL}/baptis`, formData, {
        headers: {
          authorization: authStore.accessToken,
        },
      })
      .then(() => {
        isLoading.value = false;
        router.push({ name: "ProfilePage", hash: "#layananjemaat" });
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
          .post(`${env.API_URL}/baptis`, formData, {
            headers: {
              authorization: response,
            },
          })
          .then(() => {
            isLoading.value = false;
            router.push({ name: "ProfilePage", hash: "#layananjemaat" });
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
</script>
