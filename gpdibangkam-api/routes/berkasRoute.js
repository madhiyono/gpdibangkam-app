const express = require("express");
const multer = require("multer");
const db = require("../utils/Database");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { createResponse } = require("../utils/Response");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
const uploadBerkas = multer({ dest: "resources/uploads/berkas/" });

// Mendapatkan Berkas Berdasarkan ID_Jemaat
router.get("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM tb_berkas WHERE id_jemaat = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error retrieving berkas:", error);
        createResponse(res, 500, false, "Failed to retrieve berkas");
      } else {
        createResponse(res, 200, true, undefined, results);
      }
    }
  );
});

// Download Berkas
router.get("/download/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM tb_berkas WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error("Error retrieving berkas:", error);
      createResponse(res, 500, false, "Failed to retrieve berkas");
    } else {
      res.sendFile(path.resolve(`resources/uploads/berkas/${results[0].file}`));
    }
  });
});

// Menambahkan Berkas
router.post(
  "/",
  uploadBerkas.single("file"),
  authenticateToken,
  async (req, res) => {
    const { id_jemaat, jenis_file, tipe_file } = req.body;

    if (!id_jemaat || !jenis_file || !tipe_file || !req.file) {
      createResponse(res, 400, false, "Data Diperlukan");
    } else {
      const id = randomstring.generate({
        length: 10,
        charset: "alphanumeric",
      });

      try {
        const renameBerkas = `${jenis_file}-${id_jemaat}${path.extname(
          req.file.originalname
        )}`;
        fs.renameSync(
          req.file.path,
          `resources/uploads/berkas/${renameBerkas}`
        );

        const results = await new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO tb_berkas (id, id_jemaat, jenis_file, tipe_file, file) VALUES (?, ?, ?, ?, ?)",
            [id, id_jemaat, jenis_file, tipe_file, renameBerkas],
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
          "Berkas Berhasil Ditambahkan",
          `affectedRows = ${results.affectedRows}`
        );
      } catch (error) {
        console.error("Database error:", error);
        createResponse(res, 500, false, "Gagal Untuk Menambahkan Berkas");
      }
    }
  }
);

// Menambahkan Berkas
router.put(
  "/:id",
  uploadBerkas.single("file"),
  authenticateToken,
  async (req, res) => {
    const id = req.params.id;

    if (!req.file) {
      createResponse(res, 400, false, "Data Diperlukan");
    } else {
      try {
        const results = await new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM tb_berkas WHERE id = ?",
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
          fs.unlinkSync(`resources/uploads/berkas/${results[0].file}`);

          const renameBerkas = `${results[0].jenis_file}-${
            results[0].id_jemaat
          }${path.extname(req.file.originalname)}`;
          fs.renameSync(
            req.file.path,
            `resources/uploads/berkas/${renameBerkas}`
          );
          createResponse(
            res,
            200,
            true,
            "Berkas Berhasil Diubah",
            `affectedRows = ${results.affectedRows}`
          );
        } else {
          createResponse(res, 404, false, "Berkas Tidak Ditemukan");
        }
      } catch (error) {
        console.error("Database error:", error);
        createResponse(res, 500, false, "Gagal Untuk Mengubah Berkas");
      }
    }
  }
);

module.exports = router;
