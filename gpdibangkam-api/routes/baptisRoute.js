const express = require("express");
const multer = require("multer");
const db = require("../utils/Database");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { createResponse } = require("../utils/Response");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
const uploadPasFoto = multer({ dest: "resources/uploads/baptis/pasfoto/" });
const uploadSertifikat = multer({
  dest: "resources/uploads/baptis/sertifikat/",
});

router.get("/", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tb_baptis", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      const newResults = results.map((result) => {
        const newUrl = `${req.protocol}://${req.get(
          "host"
        )}/baptis/uploads/pasfoto/${result.pasfoto}`;
        return {
          ...result,
          pasfoto: newUrl,
        };
      });

      createResponse(res, 200, true, undefined, newResults);
    } else {
      createResponse(res, 404, false, "Data Baptis Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Baptis");
  }
});

// Mendapatkan Data Baptis Berdasarkan ID_Jemaat
router.get("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_baptis WHERE id_jemaat = ?",
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
        const newUrl = `${req.protocol}://${req.get(
          "host"
        )}/baptis/uploads/pasfoto/${result.pasfoto}`;
        return {
          ...result,
          pasfoto: newUrl,
        };
      });

      createResponse(res, 200, true, undefined, newResults);
    } else {
      createResponse(res, 404, false, "Data Baptis Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Baptis");
  }
});

// Download Berkas
router.get("/download/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM tb_baptis WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error("Error retrieving sertifikat baptis:", error);
      createResponse(res, 500, false, "Failed to retrieve sertifikat baptis");
    } else {
      res.sendFile(
        path.resolve(
          `resources/uploads/baptis/sertifikat/${results[0].sertifikat}`
        )
      );
    }
  });
});

router.put(
  "/upload/:id",
  uploadSertifikat.single("sertifikat"),
  authenticateToken,
  async (req, res) => {
    const id = req.params.id;
    const { id_jemaat } = req.body;

    try {
      const renameSertifikat = `Sertifikat-${id_jemaat}${path.extname(
        req.file.originalname
      )}`;
      fs.renameSync(
        req.file.path,
        `resources/uploads/baptis/sertifikat/${renameSertifikat}`
      );

      await new Promise((resolve, reject) => {
        db.query(
          "UPDATE tb_baptis SET sertifikat = ? WHERE id = ?",
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

      createResponse(res, 200, true, "Sertifikat Baptis Berhasil Ditambah");
    } catch (error) {
      console.error("Database error:", error);
      createResponse(res, 500, false, "Gagal Untuk Menambah Sertifikat");
    }
  }
);

// User Mendaftarkan Data Baptis
router.post(
  "/",
  uploadPasFoto.single("pasfoto"),
  authenticateToken,
  async (req, res) => {
    const { id_jemaat, nama_ayah, nama_ibu } = req.body;

    if (!id_jemaat || !nama_ayah || !nama_ibu || !req.file) {
      createResponse(res, 400, false, "Data Diperlukan");
    } else {
      const id = randomstring.generate({
        length: 10,
        charset: "alphanumeric",
      });
      const idGambar = randomstring.generate({
        length: 20,
        charset: "alphanumeric",
      });
      try {
        const renamePasFoto = `${idGambar}${path.extname(
          req.file.originalname
        )}`;
        fs.renameSync(
          req.file.path,
          `resources/uploads/baptis/pasfoto/${renamePasFoto}`
        );

        const results = await new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO tb_baptis (id, id_jemaat, nama_ayah, nama_ibu, pasfoto) VALUES (?, ?, ?, ?, ?)",
            [id, id_jemaat, nama_ayah, nama_ibu, renamePasFoto],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        });

        io.emit("baptis", { id });

        createResponse(
          res,
          200,
          true,
          "Permintaan Baptis Berhasil Ditambahkan",
          `affectedRows = ${results.affectedRows}`
        );
      } catch (error) {
        console.error("Database error:", error);
        createResponse(
          res,
          500,
          false,
          "Gagal Untuk Menambahkan Permintaan Baptis"
        );
      }
    }
  }
);

// Mengubah Data Baptis
router.put("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const { id_pelaksana, tempat, tanggal, status } = req.body;
  try {
    // Update Data di Database
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE tb_baptis SET id_pelaksana = ?, tanggal = ?, tempat = ?, status = ? WHERE id = ?",
        [id_pelaksana, tanggal, tempat, status, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    createResponse(res, 200, true, "Data Baptis Berhasil Diubah");
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mengubah Data Baptis");
  }
});

// Menghapus Data Baptis
router.delete("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const existingData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_baptis WHERE id = ?",
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
      const pasFotoURL = existingData[0].pasfoto;
      const sertifikatURL = existingData[0].sertifikat;

      // Menghapus Query Dari Database
      await new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM tb_baptis WHERE id = ?",
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

      io.emit("deleteBaptis", { id });

      // Menghapus Pas Foto
      fs.unlinkSync(`resources/uploads/baptis/pasfoto/${pasFotoURL}`);

      // Menghapus Sertifikat
      if (sertifikatURL) {
        fs.unlinkSync(`resources/uploads/baptis/sertifikat/${sertifikatURL}`);
      }

      createResponse(res, 200, true, "Data Baptis Berhasil Dihapus");
    } else {
      createResponse(res, 404, false, "Data Baptis Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Menghapus Data Baptis");
  }
});

module.exports = router;
