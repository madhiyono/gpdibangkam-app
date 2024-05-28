const express = require("express");
const multer = require("multer");
const db = require("../utils/Database");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { createResponse } = require("../utils/Response");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
const uploadProfile = multer({ dest: "resources/uploads/profile/" });

// Mendapatkan daftar semua pengguna
router.get("/", authenticateToken, (req, res) => {
  db.query("SELECT * FROM tb_users", (error, results) => {
    if (error) {
      console.error("Error retrieving users:", error);
      createResponse(res, 500, false, "Failed to retrieve users");
    } else {
      createResponse(res, 200, true, undefined, results);
    }
  });
});

// Mendapatkan Data Users Berdasarkan ID Jemaat
router.get("/jemaat/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT tb_users.id, tb_users.id_jemaat, tb_users.nama_lengkap, tb_users.email, tb_users.`status`, tb_users.`level`, tb_jemaat.foto_profile, tb_jemaat.tempat_lahir, tb_jemaat.tanggal_lahir, tb_jemaat.jenis_kelamin, tb_jemaat.`status` AS status_jemaat, tb_jemaat.alamat, tb_jemaat.rt_rw, tb_jemaat.kelurahan, tb_jemaat.kecamatan, tb_jemaat.kota_kabupaten, tb_jemaat.provinsi, tb_jemaat.asal_gereja, tb_jemaat.pendidikan, tb_jemaat.bidang_ilmu, tb_jemaat.pekerjaan, tb_jemaat.updated_at FROM tb_users INNER JOIN tb_jemaat ON tb_users.id_jemaat = tb_jemaat.id WHERE tb_users.id_jemaat = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (results.length > 0) {
      if (results[0].foto_profile) {
        const gambarUrl = `${req.protocol}://${req.get("host")}/users/profile/${
          results[0].foto_profile
        }`;
        results[0].foto_profile = gambarUrl;
      }

      console.log(results[0].foto_profile);
      createResponse(res, 200, true, undefined, results[0]);
    } else {
      createResponse(res, 404, false, "Data User Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan User");
  }
});

// Mendapatkan Data Users Berdasarkan ID
router.get("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT tb_users.id, tb_users.id_jemaat, tb_users.nama_lengkap, tb_users.email, tb_users.`status`, tb_users.`level`, tb_jemaat.foto_profile, tb_jemaat.tempat_lahir, tb_jemaat.tanggal_lahir, tb_jemaat.jenis_kelamin, tb_jemaat.`status` AS status_jemaat, tb_jemaat.alamat, tb_jemaat.rt_rw, tb_jemaat.kelurahan, tb_jemaat.kecamatan, tb_jemaat.kota_kabupaten, tb_jemaat.provinsi, tb_jemaat.asal_gereja, tb_jemaat.pendidikan, tb_jemaat.bidang_ilmu, tb_jemaat.pekerjaan, tb_jemaat.updated_at FROM tb_users INNER JOIN tb_jemaat ON tb_users.id_jemaat = tb_jemaat.id WHERE tb_users.id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (results.length > 0) {
      if (results[0].foto_profile) {
        const gambarUrl = `${req.protocol}://${req.get("host")}/users/profile/${
          results[0].foto_profile
        }`;
        results[0].foto_profile = gambarUrl;
      }

      console.log(results[0].foto_profile);
      createResponse(res, 200, true, undefined, results[0]);
    } else {
      createResponse(res, 404, false, "Data User Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan User");
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const {
    id_jemaat,
    nama_lengkap,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    status,
    alamat,
    rt_rw,
    kelurahan,
    kecamatan,
    kota_kabupaten,
    provinsi,
    asal_gereja,
    pendidikan,
    bidang_ilmu,
    pekerjaan,
  } = req.body;

  try {
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE tb_jemaat SET tempat_lahir = ?, tanggal_lahir = ?, jenis_kelamin = ?, `status` = ?, alamat = ?, rt_rw = ?, kelurahan = ?, kecamatan = ?, kota_kabupaten = ?, provinsi = ?, asal_gereja = ?, pendidikan = ?, bidang_ilmu = ?, pekerjaan = ? WHERE id = ?",
        [
          tempat_lahir,
          tanggal_lahir,
          jenis_kelamin,
          status,
          alamat,
          rt_rw,
          kelurahan,
          kecamatan,
          kota_kabupaten,
          provinsi,
          asal_gereja,
          pendidikan,
          bidang_ilmu,
          pekerjaan,
          id_jemaat,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );

      db.query(
        "UPDATE tb_users SET nama_lengkap = ? WHERE id = ?",
        [nama_lengkap, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    createResponse(res, 200, true, "Profile Berhasil Diubah");
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mengubah Profile");
  }
});

router.put(
  "/upload/profile/:id",
  uploadProfile.single("foto_profile"),
  authenticateToken,
  async (req, res) => {
    const id = req.params.id;

    if (!req.file) {
      createResponse(res, 400, false, "Foto Diperlukan");
    } else {
      try {
        const results = await new Promise((resolve, reject) => {
          db.query(
            "SELECT foto_profile FROM tb_jemaat WHERE id = ?",
            [id],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        });

        if (results.length > 0) {
          if (results[0].foto_profile) {
            fs.unlinkSync(
              `resources/uploads/profile/${results[0].foto_profile}`
            );
          }

          // Rename Gambar Baru
          const idGambar = randomstring.generate({
            length: 20,
            charset: "alphanumeric",
          });
          const renameGambar = `${idGambar}${path.extname(
            req.file.originalname
          )}`;
          fs.renameSync(
            req.file.path,
            `resources/uploads/profile/${renameGambar}`
          );

          const foto_profile = renameGambar;

          // Update Data di Database
          await new Promise((resolve, reject) => {
            db.query(
              "UPDATE tb_jemaat SET foto_profile = ? WHERE id = ?",
              [foto_profile, id],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          });

          createResponse(res, 200, true, "Foto Profile Berhasil Diubah");
        } else {
          createResponse(res, 404, false, "Profile User Tidak Ditemukan");
        }
      } catch (error) {
        console.error("Database error:", error);
        createResponse(res, 500, false, "Gagal Untuk Foto Profile");
      }
    }
  }
);

module.exports = router;
