const express = require("express");
const db = require("../utils/Database");
const multer = require("multer");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { createResponse } = require("../utils/Response");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
const uploadBerkas = multer({ dest: "resources/uploads/jemaatluar/" });

router.get("/", authenticateToken, (req, res) => {
  db.query("SELECT * FROM tb_jemaat_luar", (error, results) => {
    if (error) {
      console.error("Error retrieving jemaat luar:", error);
      createResponse(res, 500, false, "Failed to retrieve jemaat luar");
    } else {
      createResponse(res, 200, true, undefined, results);
    }
  });
});

router.get("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM tb_jemaat_luar WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error retrieving jemaat luar:", error);
        createResponse(res, 500, false, "Failed to retrieve jemaat luar");
      } else {
        createResponse(res, 200, true, undefined, results);
      }
    }
  );
});

// Mengenerate ID untuk Jemaat Luar
router.get("/id", authenticateToken, (req, res) => {
  const id = randomstring.generate({
    length: 10,
    charset: "alphanumeric",
  });
  createResponse(res, 200, true, undefined, id);
});

router.post(
  "/",
  uploadBerkas.fields([
    { name: "surat_baptis", maxCount: 1 },
    { name: "ktp", maxCount: 1 },
    { name: "akta_lahir", maxCount: 1 },
    { name: "surat_keanggotaan", maxCount: 1 },
  ]),
  authenticateToken,
  async (req, res) => {
    const {
      id,
      nama_lengkap,
      email,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      alamat,
      rt_rw,
      kelurahan,
      kecamatan,
      kota_kabupaten,
      provinsi,
      asal_gereja,
      tanggal_baptis,
      pendidikan,
      bidang_ilmu,
      pekerjaan,
    } = req.body;

    try {
      const files = req.files;
      const renameSuratBaptis = `SuratBaptis-${id}${path.extname(
        files.surat_baptis[0].originalname
      )}`;
      const renameKTP = `KTP-${id}${path.extname(files.ktp[0].originalname)}`;
      const renameAktaLahir = `AktaLahir-${id}${path.extname(
        files.akta_lahir[0].originalname
      )}`;
      const renameSuratKeanggotaan = `SuratKeanggotaan-${id}${path.extname(
        files.surat_keanggotaan[0].originalname
      )}`;
      fs.renameSync(
        files.surat_baptis[0].path,
        `resources/uploads/jemaatluar/${renameSuratBaptis}`
      );
      fs.renameSync(
        files.ktp[0].path,
        `resources/uploads/jemaatluar/${renameKTP}`
      );
      fs.renameSync(
        files.akta_lahir[0].path,
        `resources/uploads/jemaatluar/${renameAktaLahir}`
      );
      fs.renameSync(
        files.surat_keanggotaan[0].path,
        `resources/uploads/jemaatluar/${renameSuratKeanggotaan}`
      );

      const results = await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO tb_jemaat_luar (id, nama_lengkap, email, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, rt_rw, kelurahan, kecamatan, kota_kabupaten, provinsi, asal_gereja, tanggal_baptis, pendidikan, bidang_ilmu, pekerjaan, surat_baptis, ktp, akta_lahir, surat_keanggotaan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            id,
            nama_lengkap,
            email,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin,
            alamat,
            rt_rw,
            kelurahan,
            kecamatan,
            kota_kabupaten,
            provinsi,
            asal_gereja,
            tanggal_baptis,
            pendidikan,
            bidang_ilmu,
            pekerjaan,
            renameSuratBaptis,
            renameKTP,
            renameAktaLahir,
            renameSuratKeanggotaan,
          ],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
      createResponse(
        res,
        200,
        true,
        "Data Jemaat Luar Berhasil Ditambahkan",
        `affectedRows = ${results.affectedRows}`
      );
    } catch (error) {
      console.error("Database error:", error);
      createResponse(
        res,
        500,
        false,
        "Gagal Untuk Menambahkan Data Jemaat Luar"
      );
    }
  }
);

module.exports = router;
