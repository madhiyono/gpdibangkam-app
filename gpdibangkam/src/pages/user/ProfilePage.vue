<template>
  <section class="relative py-16 bg-gray-200">
    <div class="container mx-auto px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full -mb-16 shadow-xl rounded-lg -mt-36"
      >
        <div class="pb-16">
          <div class="flex flex-wrap justify-center">
            <div
              class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center -my-16"
            >
              <div
                :class="[isChangePhotoLoading ? 'absolute' : 'hidden']"
                class="bg-black bg-opacity-50 min-w-[170px] min-h-[170px] rounded-full z-10 flex justify-center items-center"
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
              <img
                :src="dataBiodata.foto_profile"
                class="shadow-xl rounded-full object-cover object-top align-middle border-none absolute w-[170px] h-[170px]"
              />
              <div
                v-if="ChangeProfile"
                class="z-10 absolute top-16 translate-x-14"
              >
                <input
                  type="file"
                  ref="ProfilePhoto"
                  class="hidden"
                  @change="changeProfilePhoto($event)"
                />
                <button
                  class="w-10 h-10 flex justify-center bg-gray-600 hover:bg-gray-400 rounded-full text-white"
                  @click="$refs.ProfilePhoto.click()"
                >
                  <i class="fas fa-pencil text-lg self-center"></i>
                </button>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-1 lg:mt-14 mt-32">
              <div class="flex justify-center lg:justify-start">
                <span class="text-sm text-gray-400"
                  >Terakhir Diubah: {{ dataBiodata.updated_at }}</span
                >
              </div>
            </div>
            <div
              class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right text-center lg:self-center"
            >
              <div class="px-3 my-4 lg:mt-14 mt-8">
                <button
                  v-if="!ChangeProfile"
                  class="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                  @click="openChangeProfile"
                >
                  Ubah Data
                </button>
                <div v-else class="inline-flex gap-4">
                  <button
                    class="bg-yellow-500 active:bg-yellow-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                    @click="cancelChangeProfile"
                  >
                    Batal
                  </button>
                  <button
                    class="bg-emerald-500 active:bg-emerald-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                    @click="saveChangeProfile"
                  >
                    <span v-if="!isLoading">Simpan</span>
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
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10 md:px-24 px-6">
            <SuccessAlert
              v-if="showSuccessAlert"
              judulAlert="Profil"
              :toggleFunction="closeAlert"
              :isiAlert="successResponseMessage"
            />
            <h2
              class="text-center mb-8 text-4xl font-bold uppercase text-blue-600"
            >
              Biodata
            </h2>
            <section class="grid lg:grid-cols-2 grid-cols-1 gap-8">
              <div>
                <label
                  for="nama_lengkap"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Nama Lengkap</label
                >
                <input
                  type="text"
                  id="nama_lengkap"
                  v-model="dataBiodata.nama_lengkap"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nama Lengkap"
                  :disabled="!ChangeProfile"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Email</label
                >
                <div class="flex">
                  <input
                    type="email"
                    id="email"
                    v-model="dataBiodata.email"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Email"
                    disabled
                  />
                  <button
                    class="bg-emerald-500 active:bg-emerald-600 disabled:bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow outline-none focus:outline-none px-5 rounded-r-lg text-sm"
                    type="button"
                    :disabled="!ChangeProfile"
                  >
                    Ubah
                  </button>
                </div>
              </div>
              <div>
                <label
                  for="tempat_tanggal_lahir"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Tempat / Tanggal Lahir</label
                >
                <input
                  v-if="!ChangeProfile"
                  type="text"
                  id="tempat_tanggal_lahir"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Tempat / Tanggal Lahir"
                  disabled
                  :value="`${dataBiodata.tempat_lahir}, ${dataBiodata.formatted_tanggal_lahir}`"
                />
                <div v-else class="flex items-center">
                  <input
                    type="text"
                    v-model="dataBiodata.tempat_lahir"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Tempat Lahir"
                  />
                  <span class="px-4">-</span>
                  <input
                    type="date"
                    v-model="dataBiodata.tanggal_lahir"
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
                  v-model="dataBiodata.jenis_kelamin"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :disabled="!ChangeProfile"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label
                  for="status"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Status Hubungan</label
                >
                <select
                  id="status"
                  v-model="dataBiodata.status"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :disabled="!ChangeProfile"
                >
                  <option value="Belum Menikah">Belum Menikah</option>
                  <option value="Menikah">Menikah</option>
                  <option value="Janda">Janda</option>
                  <option value="Duda">Duda</option>
                </select>
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
                  v-model="dataBiodata.asal_gereja"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Asal Gereja"
                  :disabled="!ChangeProfile"
                />
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
                  v-model="dataBiodata.alamat"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none overflow-y-auto"
                  placeholder="Alamat Lengkap"
                  :disabled="!ChangeProfile"
                ></textarea>
              </div>
              <div class="lg:col-span-2 grid lg:grid-cols-3 grid-cols-1 gap-8">
                <div>
                  <label
                    for="rt_rw"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >RT / RW</label
                  >
                  <input
                    v-if="!ChangeProfile"
                    type="text"
                    id="rt_rw"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Tempat / Tanggal Lahir"
                    disabled
                    :value="`${dataBiodata.rt} / ${dataBiodata.rw}`"
                  />
                  <div v-else class="flex items-center">
                    <input
                      type="number"
                      min="0"
                      v-model="dataBiodata.rt"
                      class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="RT"
                    />
                    <span class="px-4">/</span>
                    <input
                      type="number"
                      min="0"
                      v-model="dataBiodata.rw"
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
                    v-model="dataBiodata.kelurahan"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Kelurahan"
                    :disabled="!ChangeProfile"
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
                    v-model="dataBiodata.kecamatan"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Kecamatan"
                    :disabled="!ChangeProfile"
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
                  v-model="dataBiodata.kota_kabupaten"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Kota / Kabupaten"
                  :disabled="!ChangeProfile"
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
                  v-model="dataBiodata.provinsi"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Provinsi"
                  :disabled="!ChangeProfile"
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
                  v-model="dataBiodata.pendidikan"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :disabled="!ChangeProfile"
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
                    v-model="dataBiodata.pekerjaan"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    :disabled="!ChangeProfile"
                  >
                    <option value="Wiraswasta">Wiraswasta</option>
                    <option value="Pegawai Negeri">Pegawai Negeri</option>
                    <option value="Pegawai Swasta">Pegawai Swasta</option>
                    <option value="Guru / Dosen">Guru / Dosen</option>
                    <option value="Lain-lain">Lain-lain</option>
                  </select>
                  <input
                    v-if="dataBiodata.pekerjaan === 'Lain-lain'"
                    type="text"
                    id="pekerjaan"
                    v-model="dataBiodata.pekerjaan_lainnya"
                    class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Pekerjaan Lainnya"
                    :disabled="!ChangeProfile"
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
                  v-model="dataBiodata.bidang_ilmu"
                  class="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Bidang Ilmu / Keahlian"
                  :disabled="!ChangeProfile"
                />
              </div>
            </section>
          </div>
          <div class="mt-10 py-10 border-t border-gray-200 text-center">
            <h2
              class="text-center mb-8 text-4xl font-bold uppercase text-blue-600"
            >
              Berkas Jemaat
            </h2>
            <div class="lg:px-64 px-4">
              <div class="py-6">
                <label
                  for="akta"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Akta Lahir</label
                >
                <div
                  v-if="isUploadBerkasLoading.berkas_akta"
                  class="flex justify-center"
                >
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
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
                <input
                  v-else-if="
                    !berkasJemaat.berkas_akta &&
                    !isUploadBerkasLoading.berkas_akta
                  "
                  type="file"
                  id="akta"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'AktaLahir')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
                <div
                  v-else
                  class="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4"
                >
                  <input
                    type="file"
                    ref="AktaLahir"
                    class="hidden"
                    accept=".pdf"
                    @change="
                      changeBerkas(
                        $event,
                        berkasJemaat.berkas_akta.id,
                        'AktaLahir'
                      )
                    "
                  />
                  <h4
                    class="border-[1.5px] py-2.5 rounded-lg text-gray-600 w-full"
                  >
                    {{ berkasJemaat.berkas_akta.file }}
                  </h4>
                  <button
                    class="bg-orange-500 active:bg-orange-600 disabled:bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow outline-none focus:outline-none lg:px-5 py-2 rounded-lg text-sm"
                    type="button"
                    @click="$refs.AktaLahir.click()"
                    :disabled="isChangeBerkasLoading.berkas_akta"
                  >
                    <span v-if="!isChangeBerkasLoading.berkas_akta">Ubah</span>
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
                    class="bg-emerald-500 active:bg-emerald-600 disabled:bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow outline-none focus:outline-none lg:px-5 py-2 rounded-lg text-sm"
                    type="button"
                    @click="
                      downloadBerkas(
                        berkasJemaat.berkas_akta.id,
                        authStore.accessToken,
                        berkasJemaat.berkas_akta.file
                      )
                    "
                    :disabled="isChangeBerkasLoading.berkas_akta"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div class="py-6">
                <label
                  for="ktp"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Kartu Tanda Pengenal (KTP)</label
                >
                <div
                  v-if="isUploadBerkasLoading.berkas_ktp"
                  class="flex justify-center"
                >
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
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
                <input
                  v-else-if="
                    !berkasJemaat.berkas_ktp &&
                    !isUploadBerkasLoading.berkas_ktp
                  "
                  type="file"
                  id="ktp"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'KTP')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
                <div
                  v-else
                  class="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4"
                >
                  <input
                    type="file"
                    ref="KTP"
                    class="hidden"
                    accept=".pdf"
                    @change="
                      changeBerkas($event, berkasJemaat.berkas_ktp.id, 'KTP')
                    "
                  />
                  <h4
                    class="border-[1.5px] py-2.5 rounded-lg text-gray-600 w-full"
                  >
                    {{ berkasJemaat.berkas_ktp.file }}
                  </h4>
                  <button
                    class="bg-orange-500 active:bg-orange-600 disabled:bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow outline-none focus:outline-none lg:px-5 py-2 rounded-lg text-sm"
                    type="button"
                    @click="$refs.KTP.click()"
                    :disabled="isChangeBerkasLoading.berkas_ktp"
                  >
                    <span v-if="!isChangeBerkasLoading.berkas_ktp">Ubah</span>
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
                    class="bg-emerald-500 active:bg-emerald-600 disabled:bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow outline-none focus:outline-none lg:px-5 py-2 rounded-lg text-sm"
                    type="button"
                    @click="
                      downloadBerkas(
                        berkasJemaat.berkas_ktp.id,
                        authStore.accessToken,
                        berkasJemaat.berkas_ktp.file
                      )
                    "
                    :disabled="isChangeBerkasLoading.berkas_ktp"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div class="py-6">
                <label
                  for="kk"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Kartu Keluarga (KK)</label
                >
                <div
                  v-if="isUploadBerkasLoading.berkas_kk"
                  class="flex justify-center"
                >
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
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
                <input
                  v-else-if="
                    !berkasJemaat.berkas_kk && !isUploadBerkasLoading.berkas_kk
                  "
                  type="file"
                  id="kk"
                  accept=".pdf"
                  @change="uploadBerkas($event, 'KK')"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                />
                <div
                  v-else
                  class="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4"
                >
                  <input
                    type="file"
                    ref="KK"
                    class="hidden"
                    accept=".pdf"
                    @change="
                      changeBerkas($event, berkasJemaat.berkas_kk.id, 'KK')
                    "
                  />
                  <h4
                    class="border-[1.5px] py-2.5 rounded-lg text-gray-600 w-full"
                  >
                    {{ berkasJemaat.berkas_kk.file }}
                  </h4>
                  <button
                    class="bg-orange-500 active:bg-orange-600 disabled:bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow outline-none focus:outline-none lg:px-5 py-2 rounded-lg text-sm"
                    type="button"
                    @click="$refs.KK.click()"
                    :disabled="isChangeBerkasLoading.berkas_kk"
                  >
                    <span v-if="!isChangeBerkasLoading.berkas_kk">Ubah</span>
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
                    class="bg-emerald-500 active:bg-emerald-600 disabled:bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow outline-none focus:outline-none lg:px-5 py-2 rounded-lg text-sm"
                    type="button"
                    @click="
                      downloadBerkas(
                        berkasJemaat.berkas_kk.id,
                        authStore.accessToken,
                        berkasJemaat.berkas_kk.file
                      )
                    "
                    :disabled="isChangeBerkasLoading.berkas_kk"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="mt-10 py-10 border-t border-gray-200 text-center">
            <h2
              class="text-center mb-8 text-4xl font-bold uppercase text-blue-600"
            >
              Data Relasi
            </h2>
          </div> -->
          <div
            id="layananjemaat"
            class="mt-10 py-10 border-t border-gray-200 text-center"
          >
            <h2
              class="text-center mb-8 text-4xl font-bold uppercase text-blue-600"
            >
              Layanan Jemaat
            </h2>
            <div
              v-for="data in dataLayanan"
              :key="data.id"
              class="lg:px-40 px-4"
            >
              <div
                v-if="data.jenis_data === 'Baptis'"
                class="block p-6 bg-white border border-gray-200 rounded-lg shadow my-4"
              >
                <div
                  class="grid lg:grid-cols-[70%_30%] grid-cols-1 items-center"
                >
                  <div
                    class="lg:border-r-2 lg:border-b-0 border-b-2 lg:pb-0 pb-4"
                  >
                    <div
                      class="flex flex-col lg:flex-row mb-2 items-center lg:gap-x-4 gap-y-4 text-left"
                    >
                      <h5
                        class="text-2xl font-bold tracking-tight text-gray-900"
                      >
                        Permintaan Baptis
                      </h5>
                      <span v-if="data.nama_pelaksana" class="font-semibold"
                        >(Pendeta yang Melaksanakan:
                        {{ data.nama_pelaksana }})</span
                      >
                    </div>
                    <div
                      class="grid lg:grid-cols-2 grid-cols-1 text-left text-sm mb-4"
                    >
                      <p class="font-normal text-gray-700">
                        <b>Tempat Baptis:</b>
                        {{ data.tempat !== null ? data.tempat : "-" }}
                      </p>
                      <p class="font-normal text-gray-700">
                        <b>Tanggal Baptis:</b>
                        {{ data.tanggal !== null ? data.tanggal : "-" }}
                      </p>
                    </div>
                    <div class="flex justify-between items-center mr-6">
                      <div class="text-left">
                        <span
                          v-if="data.status === 'Belum Diproses'"
                          class="bg-rose-200 text-rose-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Belum Diproses</span
                        >
                        <span
                          v-else-if="data.status === 'Sedang Proses'"
                          class="bg-orange-200 text-orange-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Sedang Proses</span
                        >
                        <span
                          v-else
                          class="bg-emerald-200 text-emerald-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Selesai</span
                        >
                      </div>
                      <button
                        class="bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-1 rounded-lg hover:bg-blue-500"
                        @click="data.detail = !data.detail"
                      >
                        <span v-if="!data.detail">
                          Detail
                          <i
                            class="fas fa-chevron-circle-down ml-2 text-sm"
                          ></i>
                        </span>
                        <span v-else>
                          Tutup
                          <i class="fas fa-chevron-circle-up ml-2 text-sm"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="lg:pt-0 pt-2">
                    <h5 class="font-bold text-2xl tracking-wide mb-4">
                      Sertifikat
                    </h5>
                    <button
                      class="bg-emerald-700 text-white uppercase font-semibold tracking-wide px-4 py-2 rounded-lg hover:bg-emerald-500 disabled:bg-gray-700"
                      :disabled="data.sertifikat === null"
                      @click="
                        downloadSertifikat(
                          data.id,
                          authStore.accessToken,
                          data.sertifikat,
                          data.jenis_data
                        )
                      "
                    >
                      Download
                    </button>
                  </div>
                </div>
                <div
                  :class="[data.detail ? 'block' : 'hidden']"
                  class="border-t-2 mt-6 pt-4"
                >
                  <h4 class="font-bold text-2xl pb-4">Detail Data</h4>
                  <div class="flex">
                    <img
                      :src="data.pasfoto"
                      alt=""
                      class="w-[15rem] h-[20rem] object-cover object-top rounded-lg"
                    />
                    <div class="w-full text-left ml-8">
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >ID Baptis</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.id"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Created At</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.created_at"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Nama Lengkap</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.nama_lengkap"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Jenis Kelamin</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.jenis_kelamin"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Nama Ayah</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.nama_ayah"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Nama Ibu</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.nama_ibu"
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else-if="data.jenis_data === 'Anak'"
                class="block p-6 bg-white border border-gray-200 rounded-lg shadow my-4"
              >
                <div
                  class="grid lg:grid-cols-[70%_30%] grid-cols-1 items-center"
                >
                  <div
                    class="lg:border-r-2 lg:border-b-0 border-b-2 lg:pb-0 pb-4"
                  >
                    <div
                      class="flex flex-col lg:flex-row mb-2 items-center lg:gap-x-4 gap-y-4 text-left"
                    >
                      <h5
                        class="text-2xl font-bold tracking-tight text-gray-900"
                      >
                        Penyerahan Anak
                      </h5>
                      <span v-if="data.nama_pelaksana" class="font-semibold"
                        >(Pendeta yang Melaksanakan:
                        {{ data.nama_pelaksana }})</span
                      >
                    </div>
                    <div class="text-left text-sm">
                      <p class="font-normal text-gray-700">
                        <b>Nama Lengkap Anak:</b>
                        {{ data.nama_lengkap }}
                      </p>
                    </div>
                    <div
                      class="grid lg:grid-cols-2 grid-cols-1 text-left text-sm mb-4"
                    >
                      <p class="font-normal text-gray-700">
                        <b>Tempat Lahir:</b>
                        {{
                          data.tempat_lahir !== null ? data.tempat_lahir : "-"
                        }}
                      </p>
                      <p class="font-normal text-gray-700">
                        <b>Tanggal Lahir:</b>
                        {{
                          data.tanggal_lahir !== null ? data.tanggal_lahir : "-"
                        }}
                      </p>
                    </div>
                    <div class="flex justify-between items-center mr-6">
                      <div class="text-left">
                        <span
                          v-if="data.status === 'Belum Diproses'"
                          class="bg-rose-200 text-rose-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Belum Diproses</span
                        >
                        <span
                          v-else-if="data.status === 'Sedang Proses'"
                          class="bg-orange-200 text-orange-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Sedang Proses</span
                        >
                        <span
                          v-else
                          class="bg-emerald-200 text-emerald-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Selesai</span
                        >
                      </div>
                      <button
                        class="bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-1 rounded-lg hover:bg-blue-500"
                        @click="data.detail = !data.detail"
                      >
                        <span v-if="!data.detail">
                          Detail
                          <i
                            class="fas fa-chevron-circle-down ml-2 text-sm"
                          ></i>
                        </span>
                        <span v-else>
                          Tutup
                          <i class="fas fa-chevron-circle-up ml-2 text-sm"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="lg:pt-0 pt-2">
                    <h5 class="font-bold text-2xl tracking-wide mb-4">
                      Sertifikat
                    </h5>
                    <button
                      class="bg-emerald-700 text-white uppercase font-semibold tracking-wide px-4 py-2 rounded-lg hover:bg-emerald-500 disabled:bg-gray-700"
                      :disabled="data.sertifikat === null"
                      @click="
                        downloadSertifikat(
                          data.id,
                          authStore.accessToken,
                          data.sertifikat,
                          data.jenis_data
                        )
                      "
                    >
                      Download
                    </button>
                  </div>
                </div>
                <div
                  :class="[data.detail ? 'block' : 'hidden']"
                  class="border-t-2 mt-6 pt-4"
                >
                  <h4 class="font-bold text-2xl pb-4">Detail Data</h4>
                  <div class="flex">
                    <img
                      :src="data.pas_foto"
                      alt=""
                      class="w-[15rem] h-[20rem] object-cover object-top rounded-lg"
                    />
                    <div class="w-full text-left ml-8">
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >ID Penyerahan Anak</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.id"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Created At</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.created_at"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Jenis Kelamin</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.jenis_kelamin"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Akta Kelahiran</label
                          >
                          <div class="w-full flex justify-center">
                            <a
                              class="bg-blue-700 hover:bg-blue-500 text-white w-full text-center rounded-lg py-2 font-semibold"
                              :href="data.akta_kelahiran"
                              >Download</a
                            >
                          </div>
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Nama Ayah</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.nama_ayah"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Nama Ibu</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.nama_ibu"
                            readonly
                          />
                        </div>
                        <div class="lg:col-span-2">
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Alamat</label
                          >
                          <textarea
                            rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            readonly
                            v-model="data.alamat"
                          ></textarea>
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >RT / RW</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.rt_rw"
                            readonly
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Updated At</label
                          >
                          <input
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="data.updated_at"
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else-if="data.jenis_data === 'Nikah'"
                class="block p-6 bg-white border border-gray-200 rounded-lg shadow my-4"
              >
                <div
                  class="grid lg:grid-cols-[70%_30%] grid-cols-1 items-center"
                >
                  <div
                    class="lg:border-r-2 lg:border-b-0 border-b-2 lg:pb-0 pb-4"
                  >
                    <div
                      class="flex flex-col lg:flex-row mb-2 items-center lg:gap-x-4 gap-y-4 text-left"
                    >
                      <h5
                        class="text-2xl font-bold tracking-tight text-gray-900"
                      >
                        Pernikahan
                      </h5>
                      <span v-if="data.nama_pelaksana" class="font-semibold"
                        >(Pendeta yang Melaksanakan:
                        {{ data.nama_pelaksana }})</span
                      >
                    </div>
                    <div
                      class="grid lg:grid-cols-2 grid-cols-1 text-left text-sm"
                    >
                      <p class="font-normal text-gray-700">
                        <b>Pihak Pertama:</b>
                        {{ data.nama_jemaat_pertama }}
                      </p>
                      <p class="font-normal text-gray-700">
                        <b>Pihak Kedua:</b>
                        {{
                          `${data.nama_jemaat_kedua} (${data.asal_jemaat_kedua})`
                        }}
                      </p>
                    </div>
                    <div
                      class="grid lg:grid-cols-2 grid-cols-1 text-left text-sm mb-4"
                    >
                      <p class="font-normal text-gray-700">
                        <b>Tempat / Tanggal Lahir Pihak Pertama</b><br />
                        {{
                          `${data.tempat_lahir_jemaat_pertama}, ${data.tanggal_lahir_jemaat_pertama}`
                        }}
                      </p>
                      <p class="font-normal text-gray-700">
                        <b>Tempat / Tanggal Lahir Pihak Kedua</b><br />
                        {{
                          `${data.tempat_lahir_jemaat_kedua}, ${data.tanggal_lahir_jemaat_kedua}`
                        }}
                      </p>
                    </div>
                    <div class="flex justify-between items-center mr-6">
                      <div class="text-left">
                        <span
                          v-if="data.status === 'Belum Diproses'"
                          class="bg-rose-200 text-rose-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Belum Diproses</span
                        >
                        <span
                          v-else-if="data.status === 'Sedang Proses'"
                          class="bg-orange-200 text-orange-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Sedang Proses</span
                        >
                        <span
                          v-else
                          class="bg-emerald-200 text-emerald-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                          >Selesai</span
                        >
                      </div>
                      <button
                        class="bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-1 rounded-lg hover:bg-blue-500"
                        @click="data.detail = !data.detail"
                      >
                        <span v-if="!data.detail">
                          Detail
                          <i
                            class="fas fa-chevron-circle-down ml-2 text-sm"
                          ></i>
                        </span>
                        <span v-else>
                          Tutup
                          <i class="fas fa-chevron-circle-up ml-2 text-sm"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="lg:pt-0 pt-2">
                    <h5 class="font-bold text-2xl tracking-wide mb-4">
                      Sertifikat
                    </h5>
                    <button
                      class="bg-emerald-700 text-white uppercase font-semibold tracking-wide px-4 py-2 rounded-lg hover:bg-emerald-500 disabled:bg-gray-700"
                      :disabled="data.sertifikat === null"
                      @click="
                        downloadSertifikat(
                          data.id,
                          authStore.accessToken,
                          data.sertifikat,
                          data.jenis_data
                        )
                      "
                    >
                      Download
                    </button>
                  </div>
                </div>
                <div
                  :class="[data.detail ? 'block' : 'hidden']"
                  class="border-t-2 mt-6 pt-4"
                >
                  <h4 class="font-bold text-2xl pb-4">Detail Data</h4>
                  <div class="w-full text-left">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >ID Pernikahan</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.id"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Created At</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.created_at"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Updated At</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.updated_at"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Tanggal Pengumuman Pertama</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.tanggal_pengumuman_pertama"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Tanggal Pengumuman Kedua</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.tanggal_pengumuman_kedua"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Tanggal Pernikahan</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.tanggal_nikah"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Tanggal Proses Pernikahan</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.tanggal_proses"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Nama Pengurus Catatan Sipil</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.nama_pelaksana_cs"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Tanggal Nikah Catatan Sipil</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.tanggal_nikah_cs"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Foto Berpasangan</label
                        >
                        <div class="w-full flex justify-center">
                          <a
                            class="bg-blue-700 hover:bg-blue-500 text-white w-full text-center rounded-lg py-2 font-semibold"
                            :href="data.foto_berpasangan"
                            >Download</a
                          >
                        </div>
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Surat Keterangan Kelurahan</label
                        >
                        <div class="w-full flex justify-center">
                          <a
                            class="bg-blue-700 hover:bg-blue-500 text-white w-full text-center rounded-lg py-2 font-semibold"
                            :href="data.surat_keterangan_kelurahan"
                            >Download</a
                          >
                        </div>
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Surat Keterangan Belum Menikah</label
                        >
                        <div class="w-full flex justify-center">
                          <a
                            class="bg-blue-700 hover:bg-blue-500 text-white w-full text-center rounded-lg py-2 font-semibold"
                            :href="data.surat_keterangan_belum_menikah"
                            >Download</a
                          >
                        </div>
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Nama Ayah Pihak Pertama</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.ayah_jemaat_pertama"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Nama Ibu Pihak Pertama</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.ibu_jemaat_pertama"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Nama Saksi Pertama</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.nama_saksi_pertama"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Agama Ayah Pihak Pertama</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.agama_ayah_jemaat_pertama"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Agama Ibu Pihak Pertama</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.agama_ibu_jemaat_pertama"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Asal Gereja Saksi Pertama</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.asal_gereja_saksi_pertama"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Nama Ayah Pihak Kedua</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.ayah_jemaat_kedua"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Nama Ibu Pihak Kedua</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.ibu_jemaat_kedua"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Nama Saksi Kedua</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.nama_saksi_kedua"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Agama Ayah Pihak Kedua</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.agama_ayah_jemaat_kedua"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Agama Ibu Pihak Kedua</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.agama_ibu_jemaat_kedua"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Asal Gereja Saksi Kedua</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.asal_gereja_saksi_kedua"
                          readonly
                        />
                      </div>
                      <div class="lg:col-span-3">
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Nama-nama Gembala Nikah</label
                        >
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          :value="data.pengembala_nikah"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive, ref, onBeforeMount } from "vue";
import { saveAs } from "file-saver";
import { useAuthStore } from "@/stores/AuthStore";
import { env } from "@/env";
import { useFetch } from "@/helpers";
import axios from "axios";
import SuccessAlert from "@/components/Alerts/SuccessAlert.vue";

// Image
import profilePhoto from "@/assets/img/profile.jpg";

const authStore = useAuthStore();

const showSuccessAlert = ref(false);
const alertTimeout = ref(null);
const successResponseMessage = ref("");
const dataLayanan = ref([]);

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

const dataBiodata = reactive({
  id_jemaat: "",
  nama_lengkap: "",
  email: "",
  foto_profile: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  formatted_tanggal_lahir: "",
  jenis_kelamin: "",
  status: "",
  alamat: "",
  rt: "",
  rw: "",
  kelurahan: "",
  kecamatan: "",
  kota_kabupaten: "",
  provinsi: "",
  asal_gereja: "",
  pendidikan: "",
  bidang_ilmu: "",
  pekerjaan: "",
  pekerjaan_lainnya: "",
  updated_at: "",
  baptis: [],
});

const berkasJemaat = reactive({
  berkas_akta: "",
  berkas_ktp: "",
  berkas_kk: "",
});

const ChangeProfile = ref(false);
const isLoading = ref(false);
const isChangePhotoLoading = ref(false);
const isUploadBerkasLoading = reactive({
  berkas_akta: false,
  berkas_ktp: false,
  berkas_kk: false,
});
const isChangeBerkasLoading = reactive({
  berkas_akta: false,
  berkas_ktp: false,
  berkas_kk: false,
});

function openChangeProfile() {
  ChangeProfile.value = true;
}

function cancelChangeProfile() {
  ChangeProfile.value = false;
  setDefaultValue(authStore.userData);
}

function saveChangeProfile() {
  isLoading.value = true;
  let formData = {};

  formData["id_jemaat"] = dataBiodata.id_jemaat;
  formData["nama_lengkap"] = dataBiodata.nama_lengkap;
  formData["tempat_lahir"] = dataBiodata.tempat_lahir;
  formData["tanggal_lahir"] = dataBiodata.tanggal_lahir;
  formData["jenis_kelamin"] = dataBiodata.jenis_kelamin;
  formData["status"] = dataBiodata.status;
  formData["alamat"] = dataBiodata.alamat;
  formData["rt_rw"] = [dataBiodata.rt, dataBiodata.rw].join(" / ");
  formData["kelurahan"] = dataBiodata.kelurahan;
  formData["kecamatan"] = dataBiodata.kecamatan;
  formData["kota_kabupaten"] = dataBiodata.kota_kabupaten;
  formData["provinsi"] = dataBiodata.provinsi;
  formData["asal_gereja"] = dataBiodata.asal_gereja;
  formData["pendidikan"] = dataBiodata.pendidikan;
  formData["bidang_ilmu"] = dataBiodata.bidang_ilmu;
  if (dataBiodata.pekerjaan === "Lain-lain") {
    formData["pekerjaan"] = dataBiodata.pekerjaan_lainnya;
  } else {
    formData["pekerjaan"] = dataBiodata.pekerjaan;
  }

  useFetch("PUT", `users/${authStore.idUser}`, formData, authStore.accessToken)
    .then(() => {
      isLoading.value = false;
      ChangeProfile.value = false;
      openAlert("Biodata Berhasil Diupdate");
      getUserData(authStore.idUser, authStore.accessToken).then((response) => {
        setDefaultValue(response);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function changeProfilePhoto(event) {
  isChangePhotoLoading.value = true;

  const formData = new FormData();
  formData.append("foto_profile", event.target.files[0]);

  useFetch(
    "PUT",
    `users/upload/profile/${dataBiodata.id_jemaat}`,
    formData,
    authStore.accessToken
  )
    .then(() => {
      ChangeProfile.value = false;
      isChangePhotoLoading.value = false;
      openAlert("Foto Berhasil Diupdate");
      getUserData(authStore.idUser, authStore.accessToken).then((response) => {
        setDefaultValue(response);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function uploadBerkas(event, jenis_file) {
  if (event.target.files[0].type === "application/pdf") {
    if (jenis_file === "AktaLahir") {
      isUploadBerkasLoading.berkas_akta = true;
    } else if (jenis_file === "KTP") {
      isUploadBerkasLoading.berkas_ktp = true;
    } else {
      isUploadBerkasLoading.berkas_kk = true;
    }

    const formData = new FormData();
    formData.append("id_jemaat", dataBiodata.id_jemaat);
    formData.append("jenis_file", jenis_file);
    formData.append("tipe_file", "PDF");
    formData.append("file", event.target.files[0]);

    useFetch("POST", "berkas", formData, authStore.accessToken)
      .then(() => {
        getNamaBerkas(authStore.userData.id_jemaat, authStore.accessToken).then(
          (responseBerkas) => {
            berkasJemaat.berkas_akta = responseBerkas.find(
              (berkas) => berkas.jenis_file === "AktaLahir"
            );
            console.log(berkasJemaat.berkas_akta);
            berkasJemaat.berkas_ktp = responseBerkas.find(
              (berkas) => berkas.jenis_file === "KTP"
            );
            berkasJemaat.berkas_kk = responseBerkas.find(
              (berkas) => berkas.jenis_file === "KK"
            );

            if (jenis_file === "AktaLahir") {
              isUploadBerkasLoading.berkas_akta = false;
            } else if (jenis_file === "KTP") {
              isUploadBerkasLoading.berkas_ktp = false;
            } else {
              isUploadBerkasLoading.berkas_kk = false;
            }
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    window.alert("Berkas Harus Bertipe PDF");
    event.target.files = null;
  }
}

function changeBerkas(event, id, jenis_file) {
  if (event.target.files[0].type === "application/pdf") {
    if (jenis_file === "AktaLahir") {
      isUploadBerkasLoading.berkas_akta = true;
    } else if (jenis_file === "KTP") {
      isUploadBerkasLoading.berkas_ktp = true;
    } else {
      isUploadBerkasLoading.berkas_kk = true;
    }

    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    useFetch("PUT", `berkas/${id}`, formData, authStore.accessToken)
      .then(() => {
        getNamaBerkas(authStore.userData.id_jemaat, authStore.accessToken).then(
          (responseBerkas) => {
            berkasJemaat.berkas_akta = responseBerkas.find(
              (berkas) => berkas.jenis_file === "AktaLahir"
            );
            berkasJemaat.berkas_ktp = responseBerkas.find(
              (berkas) => berkas.jenis_file === "KTP"
            );
            berkasJemaat.berkas_kk = responseBerkas.find(
              (berkas) => berkas.jenis_file === "KK"
            );

            if (jenis_file === "AktaLahir") {
              isUploadBerkasLoading.berkas_akta = false;
            } else if (jenis_file === "KTP") {
              isUploadBerkasLoading.berkas_ktp = false;
            } else {
              isUploadBerkasLoading.berkas_kk = false;
            }
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    window.alert("Berkas Harus Bertipe PDF");
    event.target.files = null;
  }
}

onBeforeMount(() => {
  dataLayanan.value = [];

  if (authStore.isLoggedIn) {
    if (!authStore.userData) {
      getUserData(authStore.idUser, authStore.accessToken).then(
        (responseUser) => {
          getBaptis(responseUser.id_jemaat, authStore.accessToken).then(
            (responseBaptis) => {
              responseBaptis.map((baptis) => {
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
                  baptis.nama_lengkap = responseJemaat.data.nama_lengkap;
                  baptis.jenis_kelamin = responseJemaat.data.jenis_kelamin;
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
                  baptis.created_at = dateCreatedAt.toLocaleDateString(
                    "id-ID",
                    options
                  );
                  if (baptis.tanggal) {
                    baptis.tanggal = dateTanggal.toLocaleDateString(
                      "id-ID",
                      options
                    );
                  }

                  baptis.jenis_data = "Baptis";
                  baptis.detail = false;

                  dataLayanan.value.push(baptis);
                });
              });
            }
          );
          getPenyerahanAnak(responseUser.id_jemaat, authStore.accessToken).then(
            (responsePenyerahanAnak) => {
              responsePenyerahanAnak.map((anak) => {
                const newAlamat = `${anak.alamat}, ${anak.kelurahan}, Kec. ${anak.kecamatan}, ${anak.kota_kabupaten}, ${anak.provinsi}`;
                anak.alamat = newAlamat;
                delete anak.kelurahan;
                delete anak.kecamatan;
                delete anak.kota_kabupaten;
                delete anak.provinsi;

                const dateTanggalLahir = new Date(anak.tanggal_lahir);
                const dateUpdatedAt = new Date(anak.updated_at);
                const dateCreatedAt = new Date(anak.created_at);
                const options = {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                };

                anak.created_at = dateCreatedAt.toLocaleDateString("id-ID", {
                  ...options,
                  hourCycle: "h24",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                anak.updated_at = dateUpdatedAt.toLocaleDateString("id-ID", {
                  ...options,
                  hourCycle: "h24",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                anak.tanggal_lahir = dateTanggalLahir.toLocaleDateString(
                  "id-ID",
                  options
                );

                anak.jenis_data = "Anak";
                anak.detail = false;

                dataLayanan.value.push(anak);
              });
            }
          );
          getPernikahan(responseUser.id_jemaat, authStore.accessToken).then(
            (responsePernikahan) => {
              const options = {
                day: "2-digit",
                month: "long",
                year: "numeric",
              };
              responsePernikahan.map((nikah) => {
                if (nikah.tanggal_nikah !== null) {
                  const dateTanggalNikah = new Date(nikah.tanggal_nikah);
                  nikah.tanggal_nikah = dateTanggalNikah.toLocaleDateString(
                    "id-ID",
                    {
                      ...options,
                      hourCycle: "h24",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );
                }
                if (nikah.tanggal_nikah_cs !== null) {
                  const dateTanggalNikahCS = new Date(nikah.tanggal_nikah_cs);
                  nikah.tanggal_nikah_cs =
                    dateTanggalNikahCS.toLocaleDateString("id-ID", {
                      ...options,
                      hourCycle: "h24",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                }
                if (nikah.tanggal_pengumuman_kedua !== null) {
                  const datePengumumanKedua = new Date(
                    nikah.tanggal_pengumuman_kedua
                  );
                  nikah.tanggal_pengumuman_kedua =
                    datePengumumanKedua.toLocaleDateString("id-ID", {
                      ...options,
                      hourCycle: "h24",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                }
                if (nikah.tanggal_pengumuman_pertama !== null) {
                  const datePengumumanPertama = new Date(
                    nikah.tanggal_pengumuman_pertama
                  );
                  nikah.tanggal_pengumuman_pertama =
                    datePengumumanPertama.toLocaleDateString("id-ID", {
                      ...options,
                      hourCycle: "h24",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                }
                if (nikah.tanggal_proses !== null) {
                  const dateProses = new Date(nikah.tanggal_proses);
                  nikah.tanggal_proses = dateProses.toLocaleDateString(
                    "id-ID",
                    {
                      ...options,
                      hourCycle: "h24",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );
                }
                if (nikah.updated_at !== null) {
                  const dateUpdatedAt = new Date(nikah.updated_at);
                  nikah.updated_at = dateUpdatedAt.toLocaleDateString("id-ID", {
                    ...options,
                    hourCycle: "h24",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }

                const dateCreatedAt = new Date(nikah.created_at);
                nikah.created_at = dateCreatedAt.toLocaleDateString("id-ID", {
                  ...options,
                  hourCycle: "h24",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const dateTanggalLahirPertama = new Date(
                  nikah.tanggal_lahir_jemaat_pertama
                );
                nikah.tanggal_lahir_jemaat_pertama =
                  dateTanggalLahirPertama.toLocaleDateString("id-ID", options);

                const dateTanggalLahirKedua = new Date(
                  nikah.tanggal_lahir_jemaat_kedua
                );
                nikah.tanggal_lahir_jemaat_kedua =
                  dateTanggalLahirKedua.toLocaleDateString("id-ID", options);

                nikah.jenis_data = "Nikah";
                nikah.detail = false;
                dataLayanan.value.push(nikah);
              });
            }
          );
          getNamaBerkas(responseUser.id_jemaat, authStore.accessToken).then(
            (responseBerkas) => {
              berkasJemaat.berkas_akta = responseBerkas.find(
                (berkas) => berkas.jenis_file === "AktaLahir"
              );
              berkasJemaat.berkas_ktp = responseBerkas.find(
                (berkas) => berkas.jenis_file === "KTP"
              );
              berkasJemaat.berkas_kk = responseBerkas.find(
                (berkas) => berkas.jenis_file === "KK"
              );
            }
          );

          console.log(dataLayanan.value);

          setDefaultValue(responseUser);
        }
      );
    } else {
      getBaptis(authStore.userData.id_jemaat, authStore.accessToken).then(
        (responseBaptis) => {
          responseBaptis.map((baptis) => {
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
              baptis.nama_lengkap = responseJemaat.data.nama_lengkap;
              baptis.jenis_kelamin = responseJemaat.data.jenis_kelamin;
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
              baptis.created_at = dateCreatedAt.toLocaleDateString(
                "id-ID",
                options
              );
              if (baptis.tanggal) {
                baptis.tanggal = dateTanggal.toLocaleDateString(
                  "id-ID",
                  options
                );
              }

              baptis.jenis_data = "Baptis";
              baptis.detail = false;

              dataLayanan.value.push(baptis);
              console.log(dataLayanan.value);
            });
          });
        }
      );
      getPenyerahanAnak(
        authStore.userData.id_jemaat,
        authStore.accessToken
      ).then((responsePenyerahanAnak) => {
        responsePenyerahanAnak.map((anak) => {
          const newAlamat = `${anak.alamat}, ${anak.kelurahan}, Kec. ${anak.kecamatan}, ${anak.kota_kabupaten}, ${anak.provinsi}`;
          anak.alamat = newAlamat;
          delete anak.kelurahan;
          delete anak.kecamatan;
          delete anak.kota_kabupaten;
          delete anak.provinsi;

          const dateTanggalLahir = new Date(anak.tanggal_lahir);
          const dateUpdatedAt = new Date(anak.updated_at);
          const dateCreatedAt = new Date(anak.created_at);
          const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
          };

          anak.created_at = dateCreatedAt.toLocaleDateString("id-ID", {
            ...options,
            hourCycle: "h24",
            hour: "2-digit",
            minute: "2-digit",
          });

          anak.updated_at = dateUpdatedAt.toLocaleDateString("id-ID", {
            ...options,
            hourCycle: "h24",
            hour: "2-digit",
            minute: "2-digit",
          });

          anak.tanggal_lahir = dateTanggalLahir.toLocaleDateString(
            "id-ID",
            options
          );

          anak.jenis_data = "Anak";
          anak.detail = false;

          dataLayanan.value.push(anak);
        });
      });
      getPernikahan(authStore.userData.id_jemaat, authStore.accessToken).then(
        (responsePernikahan) => {
          const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
          };
          responsePernikahan.map((nikah) => {
            if (nikah.tanggal_nikah !== null) {
              const dateTanggalNikah = new Date(nikah.tanggal_nikah);
              nikah.tanggal_nikah = dateTanggalNikah.toLocaleDateString(
                "id-ID",
                {
                  ...options,
                  hourCycle: "h24",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
            }
            if (nikah.tanggal_nikah_cs !== null) {
              const dateTanggalNikahCS = new Date(nikah.tanggal_nikah_cs);
              nikah.tanggal_nikah_cs = dateTanggalNikahCS.toLocaleDateString(
                "id-ID",
                {
                  ...options,
                  hourCycle: "h24",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
            }
            if (nikah.tanggal_pengumuman_kedua !== null) {
              const datePengumumanKedua = new Date(
                nikah.tanggal_pengumuman_kedua
              );
              nikah.tanggal_pengumuman_kedua =
                datePengumumanKedua.toLocaleDateString("id-ID", {
                  ...options,
                  hourCycle: "h24",
                  hour: "2-digit",
                  minute: "2-digit",
                });
            }
            if (nikah.tanggal_pengumuman_pertama !== null) {
              const datePengumumanPertama = new Date(
                nikah.tanggal_pengumuman_pertama
              );
              nikah.tanggal_pengumuman_pertama =
                datePengumumanPertama.toLocaleDateString("id-ID", {
                  ...options,
                  hourCycle: "h24",
                  hour: "2-digit",
                  minute: "2-digit",
                });
            }
            if (nikah.tanggal_proses !== null) {
              const dateProses = new Date(nikah.tanggal_proses);
              nikah.tanggal_proses = dateProses.toLocaleDateString("id-ID", {
                ...options,
                hourCycle: "h24",
                hour: "2-digit",
                minute: "2-digit",
              });
            }
            if (nikah.updated_at !== null) {
              const dateUpdatedAt = new Date(nikah.updated_at);
              nikah.updated_at = dateUpdatedAt.toLocaleDateString("id-ID", {
                ...options,
                hourCycle: "h24",
                hour: "2-digit",
                minute: "2-digit",
              });
            }

            const dateCreatedAt = new Date(nikah.created_at);
            nikah.created_at = dateCreatedAt.toLocaleDateString("id-ID", {
              ...options,
              hourCycle: "h24",
              hour: "2-digit",
              minute: "2-digit",
            });

            const dateTanggalLahirPertama = new Date(
              nikah.tanggal_lahir_jemaat_pertama
            );
            nikah.tanggal_lahir_jemaat_pertama =
              dateTanggalLahirPertama.toLocaleDateString("id-ID", options);

            const dateTanggalLahirKedua = new Date(
              nikah.tanggal_lahir_jemaat_kedua
            );
            nikah.tanggal_lahir_jemaat_kedua =
              dateTanggalLahirKedua.toLocaleDateString("id-ID", options);

            nikah.jenis_data = "Nikah";
            nikah.detail = false;
            dataLayanan.value.push(nikah);
          });
        }
      );
      getNamaBerkas(authStore.userData.id_jemaat, authStore.accessToken).then(
        (responseBerkas) => {
          berkasJemaat.berkas_akta = responseBerkas.find(
            (berkas) => berkas.jenis_file === "AktaLahir"
          );
          berkasJemaat.berkas_ktp = responseBerkas.find(
            (berkas) => berkas.jenis_file === "KTP"
          );
          berkasJemaat.berkas_kk = responseBerkas.find(
            (berkas) => berkas.jenis_file === "KK"
          );
        }
      );

      setDefaultValue(authStore.userData);
    }
  }
});

function setDefaultValue(data) {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  dataBiodata.id_jemaat = data.id_jemaat;
  dataBiodata.nama_lengkap = data.nama_lengkap;
  dataBiodata.email = data.email;
  if (data.tempat_lahir) {
    dataBiodata.tempat_lahir = data.tempat_lahir;
  } else {
    dataBiodata.tempat_lahir = "";
  }
  if (data.tanggal_lahir) {
    let tanggal_lahir = new Date(data.tanggal_lahir);
    const offset = tanggal_lahir.getTimezoneOffset();
    const tanggal_lahir_time = tanggal_lahir.getTime();
    tanggal_lahir = new Date(tanggal_lahir_time - offset * 60 * 1000);
    dataBiodata.tanggal_lahir = tanggal_lahir.toISOString().slice(0, 10);
    dataBiodata.formatted_tanggal_lahir = tanggal_lahir.toLocaleDateString(
      "id-ID",
      options
    );
  } else {
    dataBiodata.tanggal_lahir = "";
    dataBiodata.formatted_tanggal_lahir = "";
  }
  dataBiodata.jenis_kelamin = data.jenis_kelamin;
  dataBiodata.status = data.status_jemaat;
  dataBiodata.alamat = data.alamat;
  if (data.rt_rw) {
    dataBiodata.rt = data.rt_rw.split(" / ")[0];
    dataBiodata.rw = data.rt_rw.split(" / ")[1];
  } else {
    dataBiodata.rt = "";
    dataBiodata.rw = "";
  }
  dataBiodata.kelurahan = data.kelurahan;
  dataBiodata.kecamatan = data.kecamatan;
  dataBiodata.kota_kabupaten = data.kota_kabupaten;
  dataBiodata.provinsi = data.provinsi;
  dataBiodata.asal_gereja = data.asal_gereja;
  dataBiodata.pendidikan = data.pendidikan;
  dataBiodata.bidang_ilmu = data.bidang_ilmu;
  if (
    data.pekerjaan !== "Wiraswasta" &&
    data.pekerjaan !== "Pegawai Negeri" &&
    data.pekerjaan !== "Pegawai Swasta" &&
    data.pekerjaan !== "Guru / Dosen"
  ) {
    dataBiodata.pekerjaan = "Lain-lain";
    dataBiodata.pekerjaan_lainnya = data.pekerjaan;
  } else {
    dataBiodata.pekerjaan = data.pekerjaan;
  }
  if (data.foto_profile) {
    dataBiodata.foto_profile = data.foto_profile;
  } else {
    dataBiodata.foto_profile = profilePhoto;
  }
  let updated_at = new Date(data.updated_at);
  dataBiodata.updated_at = updated_at.toLocaleDateString("id-ID", {
    ...options,
    hourCycle: "h24",
    hour: "2-digit",
    minute: "2-digit",
  });
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

async function getPenyerahanAnak(id, token) {
  try {
    const response = await axios.get(`${env.API_URL}/penyerahananak/${id}`, {
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

async function getNamaBerkas(id, token) {
  try {
    const response = await axios.get(`${env.API_URL}/berkas/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

function downloadBerkas(id, token, nama_file) {
  axios({
    method: "GET",
    url: `${env.API_URL}/berkas/download/${id}`,
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

function downloadSertifikat(id, token, nama_file, jenis) {
  if (jenis === "Baptis") {
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
  } else if (jenis === "Anak") {
    axios({
      method: "GET",
      url: `${env.API_URL}/penyerahananak/download/${id}`,
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
  } else if (jenis === "Nikah") {
    axios({
      method: "GET",
      url: `${env.API_URL}/pernikahan/download/${id}`,
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
}
</script>
