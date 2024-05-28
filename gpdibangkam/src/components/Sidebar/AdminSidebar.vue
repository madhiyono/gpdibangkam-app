<template>
  <nav
    class="lg:left-0 lg:block lg:fixed lg:top-0 lg:bottom-0 lg:overflow-y-auto lg:flex-row lg:flex-nowrap lg:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative lg:w-64 z-10 py-4 px-6"
  >
    <div
      class="lg:flex-col lg:items-stretch lg:min-h-full lg:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        @click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Brand -->
      <router-link
        class="lg:hidden text-left lg:pb-0 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm font-bold p-4 px-0"
        :to="{ name: 'AdminDashboard' }"
      >
        GPdI ESB
      </router-link>
      <router-link
        class="hidden lg:inline-block text-left lg:pb-0 text-gray-600 mr-0 whitespace-nowrap text-sm font-bold p-4 px-0"
        :to="{ name: 'AdminDashboard' }"
      >
        GPdI El-Shaddai Bangkam
      </router-link>
      <!-- User -->
      <ul class="lg:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <AdminProfileDropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="lg:flex lg:flex-col lg:items-stretch lg:opacity-100 lg:relative lg:mt-4 lg:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        :class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="lg:min-w-full lg:hidden block pb-4 mb-4 border-b border-solid border-gray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="lg:block text-left lg:pb-0 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm font-bold p-4 px-0"
                to="/"
              >
                GPdI El-Shaddai Bangkam
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                @click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="hidden my-4 lg:min-w-full lg:block" />
        <!-- Heading -->
        <h6
          class="lg:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Management Website
        </h6>
        <!-- Navigation -->

        <ul class="lg:flex-col lg:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/admin/dashboard"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-tv mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Dashboard
              </a>
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 lg:min-w-full" />
        <!-- Heading -->
        <h6
          class="lg:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Management Content
        </h6>
        <!-- Navigation -->

        <ul class="lg:flex-col lg:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/admin/pengumuman"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-bullhorn mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Data Pengumuman
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/renungan"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-cross mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Data Renungan
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/acara"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-calendar-alt mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Data Acara
              </a>
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 lg:min-w-full" />
        <!-- Heading -->
        <h6
          class="lg:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Management Gereja
        </h6>
        <!-- Navigation -->

        <ul class="lg:flex-col lg:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link to="/admin/umat" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-users mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Data Umat
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/baptis"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-praying-hands mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Data Baptis
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link to="/admin/anak" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-baby-carriage mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Data Penyerahan Anak
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/pernikahan"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-ring mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Data Pernikahan
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link to="/admin/kas" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-700 hover:text-gray-500',
                ]"
              >
                <i
                  class="fas fa-coins mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                Data Keuangan
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref } from "vue";
import AdminProfileDropdown from "@/components/Dropdowns/AdminProfileDropdown.vue";

const collapseShow = ref("hidden");

function toggleCollapseShow(classes) {
  collapseShow.value = classes;
}
</script>
