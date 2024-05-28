<template>
  <div>
    <AdminSidebar />
    <div class="relative lg:ml-64 bg-gray-100">
      <AdminNavbar :namaHalaman="namaHalaman" />
      <!-- Header -->
      <div
        class="w-full bg-center bg-cover"
        :style="{ 'background-image': 'url(' + adminbg + ')' }"
      >
        <div
          class="relative lg:pt-32 lg:pb-48 pb-32 pt-12 bg-opacity-60 bg-black"
        >
          <div class="px-4 lg:px-10 mx-auto w-full">
            <div>
              <!-- Card stats -->
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <StatsCard
                    statSubtitle="Jumlah Umat Gereja"
                    :statTitle="dataCount.user.length.toString()"
                    statIconName="fas fa-users"
                    statIconColor="bg-red-500"
                  />
                </div>
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <StatsCard
                    statSubtitle="Umat Yang Telah Dibaptis"
                    :statTitle="dataCount.baptis.length.toString()"
                    statIconName="fas fa-praying-hands"
                    statIconColor="bg-orange-500"
                  />
                </div>
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <StatsCard
                    statSubtitle="Jumlah Pernikahan"
                    :statTitle="dataCount.pernikahan.length.toString()"
                    statIconName="fas fa-ring"
                    statIconColor="bg-pink-500"
                  />
                </div>
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <StatsCard
                    statSubtitle="Jumlah Kas Gereja"
                    :statTitle="rupiah.format(dataCount.kas_gereja)"
                    statIconName="fas fa-percent"
                    statIconColor="bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 lg:px-10 mx-auto w-full -mt-24 lg:-mt-36">
        <router-view @route-changed="onRouteChanged" />
        <footer class="block py-4">
          <div class="container mx-auto px-4">
            <hr class="mb-4 border-b-[1px] border-gray-200" />
            <div
              class="flex flex-wrap items-center lg:justify-between justify-center"
            >
              <div class="w-full lg:w-4/12 px-4">
                <div
                  class="text-sm text-gray-500 font-semibold py-1 text-center lg:text-left"
                >
                  Copyright © {{ date }}
                  <a
                    href="https://www.creative-tim.com?ref=vn-footer-admin"
                    class="text-gray-500 hover:text-gray-700 text-sm font-semibold py-1"
                  >
                    Creative Tim
                  </a>
                </div>
              </div>
              <div class="w-full lg:w-8/12 px-4">
                <ul
                  class="flex flex-wrap list-none lg:justify-end justify-center"
                >
                  <li>
                    <a
                      href="https://www.creative-tim.com?ref=vn-footer-admin"
                      class="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.creative-tim.com/presentation?ref=vn-footer-admin"
                      class="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://blog.creative-tim.com?ref=vn-footer-admin"
                      class="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/creativetimofficial/vue-notus/blob/main/LICENSE.lg?ref=vn-footer-admin"
                      class="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                    >
                      MIT License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import axios from "axios";
import { env } from "@/env";
import { useAuthStore } from "@/stores/AuthStore";

// Realtime Socket.io
import { socket } from "@/socket";

const authStore = useAuthStore();

import AdminSidebar from "@/components/Sidebar/AdminSidebar.vue";
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import StatsCard from "@/components/Cards/StatsCard.vue";

// Images
import adminbg from "@/assets/img/AdminBg.jpg";

const namaHalaman = ref();
const date = ref(new Date().getFullYear());

function onRouteChanged(route) {
  namaHalaman.value = route;
}

let rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const dataCount = reactive({
  user: [],
  baptis: [],
  pernikahan: [],
  kas_gereja: 0,
});

async function countUser(token) {
  try {
    const response = await axios.get(`${env.API_URL}/users`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function countBaptis(token) {
  try {
    const response = await axios.get(`${env.API_URL}/baptis`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function countPernikahan(token) {
  try {
    const response = await axios.get(`${env.API_URL}/pernikahan`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function countKas(token) {
  try {
    const response = await axios.get(`${env.API_URL}/kas`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(() => {
  if (authStore.isLoggedIn) {
    countUser(authStore.accessToken)
      .then((count) => {
        count.map((data) => {
          dataCount.user.push(data.id_jemaat);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    countBaptis(authStore.accessToken)
      .then((count) => {
        count.map((data) => {
          dataCount.baptis.push(data.id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    countPernikahan(authStore.accessToken)
      .then((count) => {
        count.map((data) => {
          dataCount.pernikahan.push(data.id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    countKas(authStore.accessToken).then((responseKas) => {
      responseKas.map((kas) => {
        if (kas.jenis_kas === "Pemasukan") {
          const nilaiKas = parseInt(kas.nilai);
          dataCount.kas_gereja += nilaiKas;
        } else {
          const nilaiKas = parseInt(kas.nilai);
          dataCount.kas_gereja -= nilaiKas;
        }
      });
    });
  }
});

onMounted(() => {
  socket.on("user", (data) => {
    dataCount.user.push(data.idJemaat);
  });
  socket.on("baptis", (data) => {
    dataCount.baptis.push(data.id);
  });
  socket.on("deleteBaptis", (data) => {
    dataCount.baptis.filter((baptis) => baptis !== data.id);
  });
  socket.on("pernikahan", (data) => {
    dataCount.pernikahan.push(data.idPernikahan);
  });
  socket.on("kas", (data) => {
    if (data.jenis_kas === "Pemasukan") {
      const nilaiKas = parseInt(data.nilai);
      dataCount.kas_gereja += nilaiKas;
    } else {
      const nilaiKas = parseInt(data.nilai);
      dataCount.kas_gereja -= nilaiKas;
    }
  });
  socket.on("deleteKas", (data) => {
    if (data.jenis_kas === "Pemasukan") {
      const nilaiKas = parseInt(data.nilai);
      dataCount.kas_gereja -= nilaiKas;
    } else {
      const nilaiKas = parseInt(data.nilai);
      dataCount.kas_gereja += nilaiKas;
    }
  });
});
</script>
