const express = require("express");
const db = require("../utils/Database");
const multer = require("multer");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { createResponse } = require("../utils/Response");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
const uploadBerkas = multer({
  dest: "resources/uploads/penyerahanAnak/berkas/",
});
const uploadSertifikat = multer({
  dest: "resources/uploads/penyerahanAnak/sertifikat/",
});

router.get("/", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tb_penyerahan_anak", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      const newResults = results.map((result) => {
        const newPasFoto = `${req.protocol}://${req.get(
          "host"
        )}/penyerahananak/uploads/berkas/${result.pas_foto}`;
        const newAkta = `${req.protocol}://${req.get(
          "host"
        )}/penyerahananak/uploads/berkas/${result.akta_kelahiran}`;
        return {
          ...result,
          pas_foto: newPasFoto,
          akta_kelahiran: newAkta,
        };
      });

      createResponse(res, 200, true, undefined, newResults);
    } else {
      createResponse(res, 404, false, "Data Penyerahan Anak Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Penyerahan Anak");
  }
});

// Mendapatkan Data Penyerahan Anak Berdasarkan ID
router.get("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_penyerahan_anak WHERE id_jemaat = ?",
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
      const newResults = await Promise.all(
        results.map(async (result) => {
          const newPasFoto = `${req.protocol}://${req.get(
            "host"
          )}/penyerahananak/uploads/berkas/${result.pas_foto}`;
          const newAkta = `${req.protocol}://${req.get(
            "host"
          )}/penyerahananak/uploads/berkas/${result.akta_kelahiran}`;

          let namaPelaksana = null;
          if (result.id_pelaksana) {
            const pelaksanaResults = await new Promise((resolve, reject) => {
              db.query(
                "SELECT nama_lengkap FROM tb_users WHERE id_jemaat = ?",
                [result.id_pelaksana],
                (error, results) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(results);
                  }
                }
              );
            });

            namaPelaksana = pelaksanaResults[0].nama_lengkap;
          }
          delete result.id_pelaksana;

          return {
            ...result,
            nama_pelaksana: namaPelaksana,
            pas_foto: newPasFoto,
            akta_kelahiran: newAkta,
          };
        })
      );

      createResponse(res, 200, true, undefined, newResults);
    } else {
      createResponse(res, 404, false, "Data Penyerahan Anak Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Penyerahan Anak");
  }
});

// Download Berkas
router.get("/download/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM tb_penyerahan_anak WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error retrieving sertifikat penyerahan anak:", error);
        createResponse(
          res,
          500,
          false,
          "Failed to retrieve sertifikat penyerahan anak"
        );
      } else {
        res.sendFile(
          path.resolve(
            `resources/uploads/penyerahanAnak/sertifikat/${results[0].sertifikat}`
          )
        );
      }
    }
  );
});

router.put(
  "/upload/:id",
  uploadSertifikat.single("sertifikat"),
  authenticateToken,
  async (req, res) => {
    const id = req.params.id;

    try {
      const renameSertifikat = `Sertifikat-${id}${path.extname(
        req.file.originalname
      )}`;
      fs.renameSync(
        req.file.path,
        `resources/uploads/penyerahanAnak/sertifikat/${renameSertifikat}`
      );

      await new Promise((resolve, reject) => {
        db.query(
          "UPDATE tb_penyerahan_anak SET sertifikat = ? WHERE id = ?",
          [renameSertifikat, id],
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
        "Sertifikat Penyerahan Anak Berhasil Ditambah"
      );
    } catch (error) {
      console.error("Database error:", error);
      createResponse(res, 500, false, "Gagal Untuk Menambah Sertifikat");
    }
  }
);

router.post(
  "/",
  uploadBerkas.fields([
    { name: "pas_foto", maxCount: 1 },
    { name: "akta_kelahiran", maxCount: 1 },
  ]),
  authenticateToken,
  async (req, res) => {
    const {
      id_jemaat,
      nama_lengkap,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      rt_rw,
      kelurahan,
      kecamatan,
      kota_kabupaten,
      provinsi,
      nama_ayah,
      nama_ibu,
    } = req.body;

    const idPenyerahanAnak = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
    });

    try {
      const files = req.files;
      const renameAkta = `AktaKelahiran-${idPenyerahanAnak}${path.extname(
        files.akta_kelahiran[0].originalname
      )}`;
      const renameFoto = `Foto-${idPenyerahanAnak}${path.extname(
        files.pas_foto[0].originalname
      )}`;
      fs.renameSync(
        files.akta_kelahiran[0].path,
        `resources/uploads/penyerahanAnak/berkas/${renameAkta}`
      );
      fs.renameSync(
        files.pas_foto[0].path,
        `resources/uploads/penyerahanAnak/berkas/${renameFoto}`
      );

      const results = await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO tb_penyerahan_anak (id, id_jemaat, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir,   alamat, rt_rw, kelurahan, kecamatan, kota_kabupaten, provinsi, nama_ayah, nama_ibu, pas_foto, akta_kelahiran) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            idPenyerahanAnak,
            id_jemaat,
            nama_lengkap,
            jenis_kelamin,
            tempat_lahir,
            tanggal_lahir,
            alamat,
            rt_rw,
            kelurahan,
            kecamatan,
            kota_kabupaten,
            provinsi,
            nama_ayah,
            nama_ibu,
            renameFoto,
            renameAkta,
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
        "Data Penyerahan Anak Berhasil Ditambahkan",
        `affectedRows = ${results.affectedRows}`
      );
    } catch (error) {
      console.error("Database error:", error);
      createResponse(
        res,
        500,
        false,
        "Gagal Untuk Menambahkan Data Penyerahan Anak"
      );
    }
  }
);

router.put("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const { id_pelaksana, status } = req.body;
  try {
    // Update Data di Database
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE tb_penyerahan_anak SET id_pelaksana = ?, status = ? WHERE id = ?",
        [id_pelaksana, status, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    createResponse(res, 200, true, "Data Penyerahan Anak Berhasil Diubah");
  } catch (error) {
    console.error("Database error:", error);
    createResponse(
      res,
      500,
      false,
      "Gagal Untuk Mengubah Data Penyerahan Anak"
    );
  }
});

// Menghapus Data Penyerahan Anak
router.delete("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const existingData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_penyerahan_anak WHERE id = ?",
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

    if (existingData.length > 0) {
      const pasFotoURL = existingData[0].pas_foto;
      const aktaURL = existingData[0].akta_kelahiran;
      const sertifikatURL = existingData[0].sertifikat;

      // Menghapus Query Dari Database
      await new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM tb_penyerahan_anak WHERE id = ?",
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

      // Menghapus Pas Foto dan Akta
      fs.unlinkSync(`resources/uploads/penyerahanAnak/berkas/${pasFotoURL}`);
      fs.unlinkSync(`resources/uploads/penyerahanAnak/berkas/${aktaURL}`);

      // Menghapus Sertifikat
      if (sertifikatURL) {
        fs.unlinkSync(
          `resources/uploads/penyerahanAnak/sertifikat/${sertifikatURL}`
        );
      }

      createResponse(res, 200, true, "Data Penyerahan Anak Berhasil Dihapus");
    } else {
      createResponse(res, 404, false, "Data Penyerahan Anak Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(
      res,
      500,
      false,
      "Gagal Untuk Menghapus Data Penyerahan Anak"
    );
  }
});

module.exports = router;
