const express = require("express");
const db = require("../utils/Database");
const multer = require("multer");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { createResponse } = require("../utils/Response");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
const uploadBerkas = multer({ dest: "resources/uploads/pernikahan/berkas/" });
const uploadSertifikat = multer({
  dest: "resources/uploads/pernikahan/sertifikat/",
});

router.get("/", authenticateToken, (req, res) => {
  db.query("SELECT * FROM tb_pernikahan", (error, results) => {
    if (error) {
      console.error("Error retrieving data pernikahan:", error);
      createResponse(res, 500, false, "Failed to retrieve data pernikahan");
    } else {
      createResponse(res, 200, true, undefined, results);
    }
  });
});

router.get("/catatan/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  const results = await new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM tb_catatan_pernikahan WHERE id_pernikahan = ?",
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
    const newResults = results.map((result) => {
      const newFotoBerpasangan = `${req.protocol}://${req.get(
        "host"
      )}/pernikahan/uploads/berkas/${result.foto_berpasangan}`;
      const newSKK = `${req.protocol}://${req.get(
        "host"
      )}/pernikahan/uploads/berkas/${result.surat_keterangan_kelurahan}`;
      const newSKBN = `${req.protocol}://${req.get(
        "host"
      )}/pernikahan/uploads/berkas/${result.surat_keterangan_belum_menikah}`;
      return {
        ...result,
        foto_berpasangan: newFotoBerpasangan,
        surat_keterangan_kelurahan: newSKK,
        surat_keterangan_belum_menikah: newSKBN,
      };
    });

    createResponse(res, 200, true, undefined, newResults);
  } else {
    createResponse(res, 404, false, "Data Pernikahan Tidak Ditemukan");
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  const results = await new Promise((resolve, reject) => {
    db.query(
      "SELECT tb_pernikahan.id_jemaat_pertama, tb_pernikahan.ayah_jemaat_pertama, tb_pernikahan.agama_ayah_jemaat_pertama, tb_pernikahan.ibu_jemaat_pertama, tb_pernikahan.agama_ibu_jemaat_pertama, tb_pernikahan.asal_jemaat_kedua, tb_pernikahan.id_jemaat_kedua, tb_pernikahan.id, tb_pernikahan.ayah_jemaat_kedua, tb_pernikahan.agama_ayah_jemaat_kedua, tb_pernikahan.ibu_jemaat_kedua, tb_pernikahan.agama_ibu_jemaat_kedua, tb_pernikahan.nama_saksi_pertama, tb_pernikahan.asal_gereja_saksi_pertama, tb_pernikahan.nama_saksi_kedua, tb_pernikahan.asal_gereja_saksi_kedua, tb_pernikahan.tanggal_nikah, tb_pernikahan.id_pelaksana, tb_pernikahan.tanggal_nikah_cs, tb_pernikahan.nama_pelaksana_cs, tb_pernikahan.created_at, tb_catatan_pernikahan.tanggal_proses, tb_catatan_pernikahan.tanggal_pengumuman_pertama, tb_catatan_pernikahan.tanggal_pengumuman_kedua, tb_catatan_pernikahan.pengembala_nikah, tb_catatan_pernikahan.surat_keterangan_kelurahan, tb_catatan_pernikahan.surat_keterangan_belum_menikah, tb_catatan_pernikahan.foto_berpasangan, tb_catatan_pernikahan.updated_at, tb_catatan_pernikahan.`status`, tb_catatan_pernikahan.sertifikat FROM tb_pernikahan INNER JOIN tb_catatan_pernikahan ON tb_pernikahan.id = tb_catatan_pernikahan.id_pernikahan WHERE tb_pernikahan.id_jemaat_pertama = ? OR tb_pernikahan.id_jemaat_kedua = ?",
      [id, id],
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
        const newFotoBerpasangan = `${req.protocol}://${req.get(
          "host"
        )}/pernikahan/uploads/berkas/${result.foto_berpasangan}`;
        const newSKK = `${req.protocol}://${req.get(
          "host"
        )}/pernikahan/uploads/berkas/${result.surat_keterangan_kelurahan}`;
        const newSKBN = `${req.protocol}://${req.get(
          "host"
        )}/pernikahan/uploads/berkas/${result.surat_keterangan_belum_menikah}`;

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

        const jemaatPertamaResults = await new Promise((resolve, reject) => {
          db.query(
            "SELECT tb_users.nama_lengkap, tb_jemaat.tempat_lahir, tb_jemaat.tanggal_lahir FROM tb_users INNER JOIN tb_jemaat ON tb_users.id_jemaat = tb_jemaat.id WHERE tb_users.id_jemaat = ?",
            [result.id_jemaat_pertama],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        });
        delete result.id_jemaat_pertama;

        let jemaatKeduaResults = null;
        if (result.asal_jemaat_kedua === "Jemaat") {
          const response = await new Promise((resolve, reject) => {
            db.query(
              "SELECT tb_users.nama_lengkap, tb_jemaat.tempat_lahir, tb_jemaat.tanggal_lahir FROM tb_users INNER JOIN tb_jemaat ON tb_users.id_jemaat = tb_jemaat.id WHERE tb_users.id_jemaat = ?",
              [result.id_jemaat_kedua],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          });

          jemaatKeduaResults = response;
        } else {
          const response = await new Promise((resolve, reject) => {
            db.query(
              "SELECT nama_lengkap, tempat_lahir, tanggal_lahir FROM tb_jemaat_luar WHERE id = ?",
              [result.id_jemaat_kedua],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          });

          jemaatKeduaResults = response;
        }
        delete result.id_jemaat_pertama;

        return {
          ...result,
          nama_pelaksana: namaPelaksana,
          nama_jemaat_pertama: jemaatPertamaResults[0].nama_lengkap,
          tempat_lahir_jemaat_pertama: jemaatPertamaResults[0].tempat_lahir,
          tanggal_lahir_jemaat_pertama: jemaatPertamaResults[0].tanggal_lahir,
          nama_jemaat_kedua: jemaatKeduaResults[0].nama_lengkap,
          tempat_lahir_jemaat_kedua: jemaatKeduaResults[0].tempat_lahir,
          tanggal_lahir_jemaat_kedua: jemaatKeduaResults[0].tanggal_lahir,
          foto_berpasangan: newFotoBerpasangan,
          surat_keterangan_kelurahan: newSKK,
          surat_keterangan_belum_menikah: newSKBN,
        };
      })
    );

    createResponse(res, 200, true, undefined, newResults);
  } else {
    createResponse(res, 404, false, "Data Pernikahan Tidak Ditemukan");
  }
});

// Download Berkas
router.get("/download/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM tb_catatan_pernikahan WHERE id_pernikahan = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error retrieving sertifikat pernikahan:", error);
        createResponse(
          res,
          500,
          false,
          "Failed to retrieve sertifikat pernikahan"
        );
      } else {
        res.sendFile(
          path.resolve(
            `resources/uploads/pernikahan/sertifikat/${results[0].sertifikat}`
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
        `resources/uploads/pernikahan/sertifikat/${renameSertifikat}`
      );

      await new Promise((resolve, reject) => {
        db.query(
          "UPDATE tb_catatan_pernikahan SET sertifikat = ? WHERE id_pernikahan = ?",
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

      createResponse(res, 200, true, "Sertifikat Pernikahan Berhasil Ditambah");
    } catch (error) {
      console.error("Database error:", error);
      createResponse(res, 500, false, "Gagal Untuk Menambah Sertifikat");
    }
  }
);

router.post(
  "/",
  uploadBerkas.fields([
    { name: "surat_keterangan_kelurahan", maxCount: 1 },
    { name: "surat_keterangan_belum_menikah", maxCount: 1 },
    { name: "foto_berpasangan", maxCount: 1 },
  ]),
  authenticateToken,
  async (req, res) => {
    const {
      id_jemaat_pertama,
      ayah_jemaat_pertama,
      agama_ayah_jemaat_pertama,
      ibu_jemaat_pertama,
      agama_ibu_jemaat_pertama,
      id_jemaat_kedua,
      asal_jemaat_kedua,
      ayah_jemaat_kedua,
      agama_ayah_jemaat_kedua,
      ibu_jemaat_kedua,
      agama_ibu_jemaat_kedua,
      nama_saksi_pertama,
      asal_gereja_saksi_pertama,
      nama_saksi_kedua,
      asal_gereja_saksi_kedua,
    } = req.body;

    const idPernikahan = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
    });
    const idCatatanPernikahan = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
    });

    try {
      const files = req.files;
      const renameSKK = `SKK-${idPernikahan}${path.extname(
        files.surat_keterangan_kelurahan[0].originalname
      )}`;
      const renameSKBM = `SKBM-${idPernikahan}${path.extname(
        files.surat_keterangan_belum_menikah[0].originalname
      )}`;
      const renameFoto = `Foto-${idPernikahan}${path.extname(
        files.foto_berpasangan[0].originalname
      )}`;
      fs.renameSync(
        files.surat_keterangan_kelurahan[0].path,
        `resources/uploads/pernikahan/berkas/${renameSKK}`
      );
      fs.renameSync(
        files.surat_keterangan_belum_menikah[0].path,
        `resources/uploads/pernikahan/berkas/${renameSKBM}`
      );
      fs.renameSync(
        files.foto_berpasangan[0].path,
        `resources/uploads/pernikahan/berkas/${renameFoto}`
      );

      const resultPernikahan = await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO tb_pernikahan (id, id_jemaat_pertama, ayah_jemaat_pertama,       agama_ayah_jemaat_pertama, ibu_jemaat_pertama, agama_ibu_jemaat_pertama, id_jemaat_kedua, asal_jemaat_kedua, ayah_jemaat_kedua, agama_ayah_jemaat_kedua, ibu_jemaat_kedua,       agama_ibu_jemaat_kedua, nama_saksi_pertama, asal_gereja_saksi_pertama, nama_saksi_kedua, asal_gereja_saksi_kedua) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            idPernikahan,
            id_jemaat_pertama,
            ayah_jemaat_pertama,
            agama_ayah_jemaat_pertama,
            ibu_jemaat_pertama,
            agama_ibu_jemaat_pertama,
            id_jemaat_kedua,
            asal_jemaat_kedua,
            ayah_jemaat_kedua,
            agama_ayah_jemaat_kedua,
            ibu_jemaat_kedua,
            agama_ibu_jemaat_kedua,
            nama_saksi_pertama,
            asal_gereja_saksi_pertama,
            nama_saksi_kedua,
            asal_gereja_saksi_kedua,
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
      const resultCatatanPernikahan = await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO tb_catatan_pernikahan (id, id_pernikahan, surat_keterangan_kelurahan, surat_keterangan_belum_menikah, foto_berpasangan) VALUES (?, ?, ?, ?, ?)",
          [
            idCatatanPernikahan,
            idPernikahan,
            renameSKK,
            renameSKBM,
            renameFoto,
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

      io.emit("pernikahan", { idPernikahan });

      createResponse(
        res,
        200,
        true,
        "Data Pernikahan Berhasil Ditambahkan",
        `affectedRows = ${resultPernikahan.affectedRows} & ${resultCatatanPernikahan.affectedRows}`
      );
    } catch (error) {
      console.error("Database error:", error);
      createResponse(
        res,
        500,
        false,
        "Gagal Untuk Menambahkan Data Pernikahan"
      );
    }
  }
);

router.put("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const {
    tanggal_nikah,
    id_pelaksana,
    pengembala_nikah,
    tanggal_proses,
    tanggal_pengumuman_pertama,
    tanggal_pengumuman_kedua,
    nama_pelaksana_cs,
    tanggal_nikah_cs,
    status,
  } = req.body;
  try {
    // Update Data di Database
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE tb_pernikahan SET tanggal_nikah = ?, id_pelaksana = ?, tanggal_nikah_cs = ?, nama_pelaksana_cs = ? WHERE id = ?",
        [tanggal_nikah, id_pelaksana, tanggal_nikah_cs, nama_pelaksana_cs, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE tb_catatan_pernikahan SET tanggal_proses = ?, tanggal_pengumuman_pertama = ?, tanggal_pengumuman_kedua = ?, pengembala_nikah = ?, status = ? WHERE id_pernikahan = ?",
        [
          tanggal_proses,
          tanggal_pengumuman_pertama,
          tanggal_pengumuman_kedua,
          pengembala_nikah,
          status,
          id,
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

    createResponse(res, 200, true, "Data Pernikahan Berhasil Diubah");
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mengubah Data Pernikahan");
  }
});

// Menghapus Data Penyerahan Anak
router.delete("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const existingData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_pernikahan WHERE id = ?",
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
      const catatanPernikahan = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM tb_catatan_pernikahan WHERE id_pernikahan = ?",
          [existingData[0].id],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      if (catatanPernikahan.length > 0) {
        const SKKURL = catatanPernikahan[0].surat_keterangan_kelurahan;
        const SKBNURL = catatanPernikahan[0].surat_keterangan_belum_menikah;
        const fotoURL = catatanPernikahan[0].foto_berpasangan;
        const sertifikatURL = catatanPernikahan[0].sertifikat;

        // Menghapus Query Dari Database
        await new Promise((resolve, reject) => {
          db.query(
            "DELETE FROM tb_catatan_pernikahan WHERE id_pernikahan = ?",
            [existingData[0].id],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        });

        await new Promise((resolve, reject) => {
          db.query(
            "DELETE FROM tb_pernikahan WHERE id = ?",
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
        fs.unlinkSync(`resources/uploads/pernikahan/berkas/${SKKURL}`);
        fs.unlinkSync(`resources/uploads/pernikahan/berkas/${SKBNURL}`);
        fs.unlinkSync(`resources/uploads/pernikahan/berkas/${fotoURL}`);

        // Menghapus Sertifikat
        if (sertifikatURL) {
          fs.unlinkSync(
            `resources/uploads/pernikahan/sertifikat/${sertifikatURL}`
          );
        }

        createResponse(res, 200, true, "Data Pernikahan Berhasil Dihapus");
      }
    } else {
      createResponse(res, 404, false, "Data Pernikahan Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Menghapus Data Pernikahan");
  }
});

module.exports = router;
