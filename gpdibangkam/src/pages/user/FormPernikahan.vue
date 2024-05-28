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
          <h6 class="text-3xl font-bold text-blue-700">Formulir Pernikahan</h6>
        </div>

        <form
          @submit.prevent="submitFormPernikahan"
          class="px-6 pb-16 flex flex-col items-center"
        >
          <h6
            class="pb-4 text-lg font-semibold text-gray-600 uppercase tracking-wider"
          >
            Biodata Diri
          </h6>
          <div
            class="w-full pb-8 grid lg:px-24 grid-cols-1 lg:grid-cols-2 gap-8"
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
                v-model="dataOrangPertama.nama_lengkap"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Lengkap"
                disabled
              />
            </div>
            <div>
              <label
                for="tempat_tanggal_lahir"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Tempat / Tanggal Lahir</label
              >
              <input
                type="text"
                id="tempat_tanggal_lahir"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tempat / Tanggal Lahir"
                disabled
                :value="`${dataOrangPertama.tempat_lahir}, ${dataOrangPertama.tanggal_lahir}`"
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
                v-model="dataOrangPertama.jenis_kelamin"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label
                for="tanggal_baptis"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Tanggal Baptis</label
              >
              <input
                type="text"
                id="tanggal_baptis"
                v-model="dataOrangPertama.tanggal_baptis"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tanggal Baptis"
                disabled
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
                v-model="dataPernikahan.ayah_jemaat_pertama"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Ayah"
                :disabled="isAyahSet"
              />
            </div>
            <div>
              <label
                for="agama_ayah"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Agama Ayah</label
              >
              <select
                id="agama_ayah"
                v-model="dataPernikahan.agama_ayah_jemaat_pertama"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                :disabled="isAyahSet"
              >
                <option value="" selected disabled>Pilih Agama Ayah</option>
                <option value="Islam">Islam</option>
                <option value="Kristen (Protestan)">Kristen (Protestan)</option>
                <option value="Kristen (Katolik)">Kristen (Katolik)</option>
                <option value="Budha">Budha</option>
                <option value="Hindu">Hindu</option>
              </select>
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
                v-model="dataPernikahan.ibu_jemaat_pertama"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Ibu"
                :disabled="isIbuSet"
              />
            </div>
            <div>
              <label
                for="agama_ibu"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Agama Ibu</label
              >
              <select
                id="agama_ibu"
                v-model="dataPernikahan.agama_ibu_jemaat_pertama"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                :disabled="isIbuSet"
              >
                <option value="" selected disabled>Pilih Agama Ibu</option>
                <option value="Islam">Islam</option>
                <option value="Kristen (Protestan)">Kristen (Protestan)</option>
                <option value="Kristen (Katolik)">Kristen (Katolik)</option>
                <option value="Budha">Budha</option>
                <option value="Hindu">Hindu</option>
              </select>
            </div>
          </div>
          <h6
            class="pb-4 text-lg font-semibold text-gray-600 uppercase tracking-wider"
          >
            Biodata Pasangan
          </h6>
          <div class="w-full pb-8 lg:px-24">
            <h3 class="mb-4 font-semibold text-gray-900">
              Asal Gereja Pasangan
            </h3>
            <ul
              class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex"
            >
              <li
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
              >
                <div class="flex items-center pl-3">
                  <input
                    id="jemaat-gpdi"
                    type="radio"
                    name="status-jemaat"
                    value="1"
                    v-model="statusJemaat"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    for="jemaat-gpdi"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                    >Jemaat GPdI El-Shaddai Bangkam
                  </label>
                </div>
              </li>
              <li
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
              >
                <div class="flex items-center pl-3">
                  <input
                    id="jemaat-luar"
                    type="radio"
                    name="status-jemaat"
                    value="0"
                    v-model="statusJemaat"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    for="jemaat-luar"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                    >Bukan Jemaat GPdI El-Shaddai Bangkam
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="isShowAkunPasangan" class="w-full pb-8 lg:px-24">
            <h3 class="mb-4 font-semibold text-gray-900">
              Apakah Pasangan Memiliki Akun?
            </h3>
            <ul
              class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex"
            >
              <li
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
              >
                <div class="flex items-center pl-3">
                  <input
                    id="akun-sudah"
                    type="radio"
                    name="akun-pasangan"
                    value="1"
                    v-model="akunPasangan"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    for="akun-sudah"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                    >Sudah Memiliki Akun
                  </label>
                </div>
              </li>
              <li
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
              >
                <div class="flex items-center pl-3">
                  <input
                    id="akun-belum"
                    type="radio"
                    name="akun-pasangan"
                    value="0"
                    v-model="akunPasangan"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    for="akun-belum"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                    >Belum Memiliki Akun
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-if="
              isShowAkunPasangan !== undefined && isShowAkunPasangan !== true
            "
            class="w-full pb-8 grid lg:px-24 grid-cols-1 lg:grid-cols-2 gap-8"
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
                v-model="dataJemaatLuar.nama_lengkap"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="dataJemaatLuar.email"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email Pasangan"
              />
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
                  v-model="dataJemaatLuar.tempat_lahir"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Tempat Lahir"
                />
                <span class="px-4">-</span>
                <input
                  type="date"
                  v-model="dataJemaatLuar.tanggal_lahir"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Tanggal Lahir"
                />
              </div>
            </div>
            <div>
              <label
                for="jenis_kelamin"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Jenis Kelamin</label
              >
              <select
                id="jenis_kelamin"
                v-model="dataJemaatLuar.jenis_kelamin"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
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
                v-model="dataJemaatLuar.alamat"
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
                    v-model="dataJemaatLuar.rt"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="RT"
                  />
                  <span class="px-4">/</span>
                  <input
                    type="number"
                    min="0"
                    v-model="dataJemaatLuar.rw"
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
                  v-model="dataJemaatLuar.kelurahan"
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
                  v-model="dataJemaatLuar.kecamatan"
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
                v-model="dataJemaatLuar.kota_kabupaten"
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
                v-model="dataJemaatLuar.provinsi"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Provinsi"
              />
            </div>
            <div>
              <label
                for="pendidikan"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Pendidikan</label
              >
              <select
                id="pendidikan"
                v-model="dataJemaatLuar.pendidikan"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="SD">SD</option>
                <option value="SMP / SLTP">SMP / SLTP</option>
                <option value="SMA / SLTA">SMA / SLTA</option>
                <option value="SMK">SMK</option>
                <option value="D1">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </select>
            </div>
            <div>
              <label
                for="pekerjaan"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Pekerjaan</label
              >
              <div class="flex gap-4">
                <select
                  id="pekerjaan"
                  v-model="dataJemaatLuar.pekerjaan"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="Wiraswasta">Wiraswasta</option>
                  <option value="Pegawai Negeri">Pegawai Negeri</option>
                  <option value="Pegawai Swasta">Pegawai Swasta</option>
                  <option value="Guru / Dosen">Guru / Dosen</option>
                  <option value="Lain-lain">Lain-lain</option>
                </select>
                <input
                  v-if="dataJemaatLuar.pekerjaan === 'Lain-lain'"
                  type="text"
                  id="pekerjaan"
                  v-model="dataJemaatLuar.pekerjaan_lainnya"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Pekerjaan Lainnya"
                />
              </div>
            </div>
            <div class="lg:col-span-2">
              <label
                for="bidang_ilmu"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Bidang Ilmu / Keahlian</label
              >
              <input
                type="text"
                id="bidang_ilmu"
                v-model="dataJemaatLuar.bidang_ilmu"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Bidang Ilmu / Keahlian"
              />
            </div>
            <div>
              <label
                for="asal_gereja"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Asal Gereja</label
              >
              <input
                type="text"
                id="asal_gereja"
                v-model="dataJemaatLuar.asal_gereja"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Asal Gereja"
              />
            </div>
            <div>
              <label
                for="tanggal_baptis"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Tanggal Baptis</label
              >
              <input
                type="date"
                id="tanggal_baptis"
                v-model="dataJemaatLuar.tanggal_baptis"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tanggal Baptis"
              />
            </div>
            <div class="lg:col-span-2 grid lg:grid-cols-4 grid-cols-1 gap-8">
              <div>
                <label
                  for="surat_baptis"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Surat Baptis</label
                >
                <input
                  type="file"
                  id="surat_baptis"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'surat_baptis')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
              </div>
              <div>
                <label
                  for="ktp"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Kartu Tanda Pengenal (KTP)</label
                >
                <input
                  type="file"
                  id="ktp"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'ktp')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
              </div>
              <div>
                <label
                  for="akta_lahir"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Akta Lahir</label
                >
                <input
                  type="file"
                  id="akta_lahir"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'akta_lahir')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
              </div>
              <div>
                <label
                  for="surat_keanggotaan"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Surat Keanggotaan Gereja</label
                >
                <input
                  type="file"
                  id="surat_keanggotaan"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'surat_keanggotaan')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
              </div>
            </div>
          </div>
          <div
            v-if="akunPasangan !== undefined && akunPasangan === '1'"
            class="w-full pb-8 grid lg:px-24 grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div>
              <label
                for="nama_lengkap"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Nama Lengkap</label
              >
              <div class="relative">
                <input
                  type="text"
                  id="nama_lengkap"
                  v-model="findPasangan"
                  v-on:keyup="keyUpFind"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nama Lengkap"
                />
                <ul
                  v-if="isShowNama"
                  class="absolute w-full p-2.5 list-none list-inside border border-gray-300 bg-gray-50 rounded-lg text-sm h-min overflow-y-auto"
                  style="max-height: 12rem"
                >
                  <li v-for="user in dataFilter" :key="user.id">
                    <a
                      v-on:click.prevent="getDataOrangKedua(user)"
                      class="block px-4 py-2 hover:bg-gray-100"
                    >
                      {{ user.nama_lengkap }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label
                for="tempat_tanggal_lahir_orang_kedua"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Tempat / Tanggal Lahir</label
              >
              <input
                type="text"
                id="tempat_tanggal_lahir_orang_kedua"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tempat / Tanggal Lahir"
                disabled
                :value="`${dataOrangKedua.tempat_lahir}, ${dataOrangKedua.tanggal_lahir}`"
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
                v-model="dataOrangKedua.jenis_kelamin"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label
                for="tanggal_baptis"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Tanggal Baptis</label
              >
              <input
                type="text"
                id="tanggal_baptis"
                v-model="dataOrangKedua.tanggal_baptis"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tanggal Baptis"
                disabled
              />
            </div>
          </div>
          <div
            class="w-full pb-8 grid lg:px-24 grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div>
              <label
                for="nama_ayah"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Nama Ayah</label
              >
              <input
                type="text"
                id="nama_ayah"
                v-model="dataPernikahan.ayah_jemaat_kedua"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Ayah"
                :disabled="isAyahSet"
              />
            </div>
            <div>
              <label
                for="agama_ayah"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Agama Ayah</label
              >
              <select
                id="agama_ayah"
                v-model="dataPernikahan.agama_ayah_jemaat_kedua"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                :disabled="isAyahSet"
              >
                <option value="" selected disabled>Pilih Agama Ayah</option>
                <option value="Islam">Islam</option>
                <option value="Kristen (Protestan)">Kristen (Protestan)</option>
                <option value="Kristen (Katolik)">Kristen (Katolik)</option>
                <option value="Budha">Budha</option>
                <option value="Hindu">Hindu</option>
              </select>
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
                v-model="dataPernikahan.ibu_jemaat_kedua"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Ibu"
                :disabled="isIbuSet"
              />
            </div>
            <div>
              <label
                for="agama_ibu"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Agama Ibu</label
              >
              <select
                id="agama_ibu"
                v-model="dataPernikahan.agama_ibu_jemaat_kedua"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                :disabled="isIbuSet"
              >
                <option value="" selected disabled>Pilih Agama Ibu</option>
                <option value="Islam">Islam</option>
                <option value="Kristen (Protestan)">Kristen (Protestan)</option>
                <option value="Kristen (Katolik)">Kristen (Katolik)</option>
                <option value="Budha">Budha</option>
                <option value="Hindu">Hindu</option>
              </select>
            </div>
          </div>
          <h6
            class="pb-4 text-lg font-semibold text-gray-600 uppercase tracking-wider"
          >
            Biodata Saksi
          </h6>
          <div
            class="w-full pb-8 grid lg:px-24 grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div>
              <label
                for="nama_lengkap_saksi_pertama"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Nama Lengkap Saksi Pertama</label
              >
              <input
                type="text"
                id="nama_lengkap_saksi_pertama"
                v-model="dataPernikahan.nama_saksi_pertama"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Lengkap Saksi Pertama"
              />
            </div>
            <div>
              <label
                for="asal_gereja_saksi_pertama"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Asal Gereja Saksi Pertama</label
              >
              <input
                type="text"
                id="asal_gereja_saksi_pertama"
                v-model="dataPernikahan.asal_gereja_saksi_pertama"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Asal Gereja Saksi Pertama"
              />
            </div>
            <div>
              <label
                for="nama_lengkap_saksi_kedua"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Nama Lengkap Saksi Kedua</label
              >
              <input
                type="text"
                id="nama_lengkap_saksi_kedua"
                v-model="dataPernikahan.nama_saksi_kedua"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Lengkap Saksi Kedua"
              />
            </div>
            <div>
              <label
                for="asal_gereja_saksi_kedua"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Asal Gereja Saksi Kedua</label
              >
              <input
                type="text"
                id="asal_gereja_saksi_kedua"
                v-model="dataPernikahan.asal_gereja_saksi_kedua"
                class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Asal Gereja Saksi Kedua"
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
            <div class="lg:col-span-2 grid lg:grid-cols-3 grid-cols-1 gap-8">
              <div>
                <label
                  for="surat_keterangan_kelurahan"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Surat Keterangan Kelurahan</label
                >
                <input
                  type="file"
                  id="surat_keterangan_kelurahan"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'surat_keterangan_kelurahan')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
              </div>
              <div>
                <label
                  for="surat_keterangan_belum_menikah"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Surat Keterangan Belum Menikah</label
                >
                <input
                  type="file"
                  id="surat_keterangan_belum_menikah"
                  accept=".pdf"
                  @change="
                    uploadBerkas($event, 'surat_keterangan_belum_menikah')
                  "
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
              </div>
              <div>
                <label
                  for="foto_berpasangan"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Foto Berpasangan</label
                >
                <input
                  type="file"
                  id="foto_berpasangan"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'foto_berpasangan')"
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
import { reactive, ref, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { useFetch } from "@/helpers";
import { env } from "@/env";
import axios from "axios";

// Realtime Socket.io
import { socket } from "@/socket";

const authStore = useAuthStore();
const router = useRouter();

const dataOrangPertama = reactive({
  id_jemaat: "",
  nama_lengkap: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  tanggal_baptis: "",
});

const dataOrangKedua = reactive({
  id_jemaat: "",
  nama_lengkap: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  tanggal_baptis: "",
});

const dataJemaatLuar = reactive({
  id: "",
  nama_lengkap: "",
  email: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  jenis_kelamin: "",
  alamat: "",
  rt: "",
  rw: "",
  kelurahan: "",
  kecamatan: "",
  kota_kabupaten: "",
  provinsi: "",
  asal_gereja: "",
  tanggal_baptis: "",
  pendidikan: "",
  bidang_ilmu: "",
  pekerjaan: "",
  pekerjaan_lainnya: "",
  surat_baptis: "",
  ktp: "",
  akta_lahir: "",
  surat_keanggotaan: "",
});

const dataPernikahan = reactive({
  id_jemaat_pertama: "",
  ayah_jemaat_pertama: "",
  agama_ayah_jemaat_pertama: "",
  ibu_jemaat_pertama: "",
  agama_ibu_jemaat_pertama: "",
  id_jemaat_kedua: "",
  asal_jemaat_kedua: "",
  ayah_jemaat_kedua: "",
  agama_ayah_jemaat_kedua: "",
  ibu_jemaat_kedua: "",
  agama_ibu_jemaat_kedua: "",
  nama_saksi_pertama: "",
  asal_gereja_saksi_pertama: "",
  nama_saksi_kedua: "",
  asal_gereja_saksi_kedua: "",
  surat_keterangan_kelurahan: "",
  surat_keterangan_belum_menikah: "",
  foto_berpasangan: "",
});

const isLoading = ref(false);
const isAyahSet = ref(false);
const isIbuSet = ref(false);

const isShowAkunPasangan = ref();
const statusJemaat = ref();
watch(statusJemaat, () => {
  if (statusJemaat.value === "0") {
    isShowAkunPasangan.value = false;

    if (dataPernikahan.id_jemaat_kedua === "" && dataJemaatLuar.id === "") {
      getIDJemaatLuar(authStore.accessToken)
        .then((response) => {
          dataJemaatLuar.id = response;
          dataPernikahan.id_jemaat_kedua = response;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    dataPernikahan.asal_jemaat_kedua = "Jemaat Luar";
  } else {
    isShowAkunPasangan.value = true;

    dataPernikahan.asal_jemaat_kedua = "Jemaat";
  }
});

const akunPasangan = ref();
watch(akunPasangan, () => {
  if (akunPasangan.value === "0") {
    if (
      window.confirm(
        "Silahkan Membuat Akun Pasangan Anda\nApakah Anda Ingin Logout dan Membuat Akun Pasangan Anda?"
      )
    ) {
      localStorage.removeItem("_SSIDGSB0");
      localStorage.removeItem("_SSIDGSB1");
      localStorage.removeItem("_SSIDGSB2");
      localStorage.removeItem("_SSIDGSB3");
      localStorage.removeItem("_SSIDGSB4");

      authStore.resetAuthStore();
      socket.disconnect();
      router.push({ name: "AuthRegister" });
    } else {
      console.log("uncheck");
      akunPasangan.value = null;
    }
  }
});

const isShowNama = ref(false);
const dataAllUser = ref([]);
const dataFilter = ref([]);
const findPasangan = ref("");

function keyUpFind() {
  const query = findPasangan.value.toLocaleLowerCase();
  const deleteUserPertama = dataAllUser.value.filter(
    (user) => user.nama_lengkap !== dataOrangPertama.nama_lengkap
  );
  const filteringData = deleteUserPertama.filter((user) =>
    user.nama_lengkap.toLowerCase().includes(query)
  );

  if (filteringData.length <= 5) {
    isShowNama.value = true;
    dataFilter.value = filteringData;
  } else {
    isShowNama.value = false;
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

async function getPernikahan(id, token) {
  try {
    const response = await axios.get(`${env.API_URL}/pernikahan/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllUser(token) {
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

async function getIDJemaatLuar(token) {
  try {
    const response = await axios.get(`${env.API_URL}/jemaatluar/id`, {
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

function uploadBerkas(event, jenis_file) {
  if (event.target.files[0].type === "application/pdf") {
    if (jenis_file === "surat_baptis") {
      dataJemaatLuar.surat_baptis = event.target.files[0];
    } else if (jenis_file === "ktp") {
      dataJemaatLuar.ktp = event.target.files[0];
    } else if (jenis_file === "akta_lahir") {
      dataJemaatLuar.akta_lahir = event.target.files[0];
    } else if (jenis_file === "surat_keanggotaan") {
      dataJemaatLuar.surat_keanggotaan = event.target.files[0];
    } else if (jenis_file === "foto_berpasangan") {
      dataPernikahan.foto_berpasangan = event.target.files[0];
    } else if (jenis_file === "surat_keterangan_kelurahan") {
      dataPernikahan.surat_keterangan_kelurahan = event.target.files[0];
    } else {
      dataPernikahan.surat_keterangan_belum_menikah = event.target.files[0];
    }
  } else {
    window.alert("Berkas Harus Bertipe PDF");
    event.target.files = null;
  }
}

function setDefaultValue(data, relasi) {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  dataOrangPertama.id_jemaat = data.id_jemaat;
  dataPernikahan.id_jemaat_pertama = data.id_jemaat;
  dataOrangPertama.nama_lengkap = data.nama_lengkap;
  dataOrangPertama.tempat_lahir = data.tempat_lahir;

  let tanggal_lahir = new Date(data.tanggal_lahir);
  dataOrangPertama.tanggal_lahir = tanggal_lahir.toLocaleDateString(
    "id-ID",
    options
  );

  if (data.jenis_kelamin) {
    dataOrangPertama.jenis_kelamin = data.jenis_kelamin;
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
          dataPernikahan.ayah_jemaat_pertama = response[0].nama_lengkap;
          dataPernikahan.agama_ayah_jemaat_pertama = "Kristen (Protestan)";
        }
      );
    }

    if (ibu.id_jemaat_kedua) {
      isIbuSet.value = true;
      getUserInfo(ibu.id_jemaat_kedua, authStore.accessToken).then(
        (response) => {
          dataPernikahan.ibu_jemaat_pertama = response[0].nama_lengkap;
          dataPernikahan.agama_ibu_jemaat_pertama = "Kristen (Protestan)";
        }
      );
    }
  }
}

function setDefaultValueOrangKedua(data, relasi) {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  dataOrangKedua.id_jemaat = data.id_jemaat;
  dataPernikahan.id_jemaat_kedua = data.id_jemaat;
  dataOrangKedua.nama_lengkap = data.nama_lengkap;
  dataOrangKedua.tempat_lahir = data.tempat_lahir;

  let tanggal_lahir = new Date(data.tanggal_lahir);
  dataOrangKedua.tanggal_lahir = tanggal_lahir.toLocaleDateString(
    "id-ID",
    options
  );

  if (data.jenis_kelamin) {
    dataOrangKedua.jenis_kelamin = data.jenis_kelamin;
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
          dataPernikahan.ayah_jemaat_kedua = response[0].nama_lengkap;
          dataPernikahan.agama_ayah_jemaat_kedua = "Kristen (Protestan)";
        }
      );
    }

    if (ibu.id_jemaat_kedua) {
      isIbuSet.value = true;
      getUserInfo(ibu.id_jemaat_kedua, authStore.accessToken).then(
        (response) => {
          dataPernikahan.ibu_jemaat_kedua = response[0].nama_lengkap;
          dataPernikahan.agama_ibu_jemaat_kedua = "Kristen (Protestan)";
        }
      );
    }
  }
}

onBeforeMount(() => {
  if (authStore.isLoggedIn) {
    getAllUser(authStore.accessToken).then((response) => {
      dataAllUser.value = response;
    });

    if (!authStore.userData && !authStore.userRelasi) {
      getUserData(authStore.idUser, authStore.accessToken).then(
        (responseUser) => {
          authStore.saveUserData(responseUser);
          getPernikahan(responseUser.id_jemaat, authStore.accessToken).then(
            (responsePernikahan) => {
              if (responsePernikahan.length > 0) {
                const sedangMenikah = responsePernikahan.find(
                  (pernikahan) =>
                    pernikahan.status === "Belum Diproses" ||
                    pernikahan.status === "Sedang Proses"
                );

                if (sedangMenikah) {
                  window.alert("Permintaan Pernikahan Anda Sedang Diproses");
                  router.push({
                    name: "ProfilePage",
                    hash: "#layananjemaat",
                  });
                } else {
                  window.alert("Anda Sudah Menikah");
                  router.push({ name: "ProfilePage", hash: "#layananjemaat" });
                }
              }
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
                      const dataBaptis = responseBaptis.find(
                        (baptis) => baptis.status === "Selesai"
                      );
                      const options = {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hourCycle: "h24",
                        hour: "2-digit",
                        minute: "2-digit",
                      };

                      let tanggal_baptis = new Date(dataBaptis.tanggal);
                      dataOrangPertama.tanggal_baptis =
                        tanggal_baptis.toLocaleDateString("id-ID", options);
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
        }
      );
    } else {
      getPernikahan(authStore.userData.id_jemaat, authStore.accessToken).then(
        (responsePernikahan) => {
          if (responsePernikahan.length > 0) {
            const sedangMenikah = responsePernikahan.find(
              (pernikahan) =>
                pernikahan.status === "Belum Diproses" ||
                pernikahan.status === "Sedang Proses"
            );

            if (sedangMenikah) {
              window.alert("Permintaan Pernikahan Anda Sedang Diproses");
              router.push({
                name: "ProfilePage",
                hash: "#layananjemaat",
              });
            } else {
              window.alert("Anda Sudah Menikah");
              router.push({ name: "ProfilePage", hash: "#layananjemaat" });
            }
          }
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
                  const dataBaptis = responseBaptis.find(
                    (baptis) => baptis.status === "Selesai"
                  );
                  const options = {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hourCycle: "h24",
                    hour: "2-digit",
                    minute: "2-digit",
                  };

                  let tanggal_baptis = new Date(dataBaptis.tanggal);
                  dataOrangPertama.tanggal_baptis =
                    tanggal_baptis.toLocaleDateString("id-ID", options);
                  setDefaultValue(authStore.userData, authStore.userRelasi);
                }
              } else {
                window.alert("Anda Belum Dibaptis");
                router.push({ name: "FormBaptis" });
              }
            }
          );
        }
      );
    }
  }
});

function getDataOrangKedua(user) {
  findPasangan.value = user.nama_lengkap;
  isShowNama.value = false;

  getUserData(user.id, authStore.accessToken).then((responseUser) => {
    getBaptis(responseUser.id_jemaat, authStore.accessToken).then(
      (responseBaptis) => {
        if (responseBaptis.length > 0) {
          const belumPernah = responseBaptis.find(
            (baptis) =>
              baptis.status === "Belum Diproses" ||
              baptis.status === "Sedang Proses"
          );

          if (belumPernah) {
            findPasangan.value = "";
            isShowNama.value = false;
            window.alert("Permintaan Baptis Pasangan Anda Sedang Diproses");
          } else {
            const dataBaptis = responseBaptis.find(
              (baptis) => baptis.status === "Selesai"
            );
            const options = {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hourCycle: "h24",
              hour: "2-digit",
              minute: "2-digit",
            };

            let tanggal_baptis = new Date(dataBaptis.tanggal);
            dataOrangKedua.tanggal_baptis = tanggal_baptis.toLocaleDateString(
              "id-ID",
              options
            );
            getUserRelasi(responseUser.id_jemaat, authStore.accessToken).then(
              (responseRelasi) => {
                setDefaultValueOrangKedua(responseUser, responseRelasi);
              }
            );
          }
        } else {
          findPasangan.value = "";
          isShowNama.value = false;
          window.alert("Pasangan Anda Belum Dibaptis");
        }
      }
    );
  });
}

function submitFormPernikahan() {
  isLoading.value = true;

  if (statusJemaat.value === "0") {
    const cloneDataJemaatLuar = { ...dataJemaatLuar };
    const formDataJemaatLuar = new FormData();

    delete cloneDataJemaatLuar.rt;
    delete cloneDataJemaatLuar.rw;
    delete cloneDataJemaatLuar.pekerjaan;
    delete cloneDataJemaatLuar.pekerjaan_lainnya;
    Object.entries(cloneDataJemaatLuar).forEach((input) => {
      const [key, value] = input;
      formDataJemaatLuar.append(key, value);
    });

    formDataJemaatLuar.append(
      "rt_rw",
      [dataJemaatLuar.rt, dataJemaatLuar.rw].join(" / ")
    );

    if (dataJemaatLuar.pekerjaan === "Lain-lain") {
      formDataJemaatLuar.append("pekerjaan", dataJemaatLuar.pekerjaan_lainnya);
    } else {
      formDataJemaatLuar.append("pekerjaan", dataJemaatLuar.pekerjaan);
    }

    useFetch(
      "POST",
      "jemaatluar",
      formDataJemaatLuar,
      authStore.accessToken
    ).catch((error) => {
      console.error(error);
    });
  }

  const formDataPernikahan = new FormData();

  Object.entries(dataPernikahan).forEach((input) => {
    const [key, value] = input;
    formDataPernikahan.append(key, value);
  });

  useFetch("POST", "pernikahan", formDataPernikahan, authStore.accessToken)
    .then(() => {
      isLoading.value = false;
      router.push({ name: "ProfilePage", hash: "#layananjemaat" });
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
