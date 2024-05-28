const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const db = require("../utils/Database");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { createResponse } = require("../utils/Response");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
const upload = multer({ dest: "resources/uploads/buktikas/" });

// Mendapatkan Semua Data Kas
router.get("/", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tb_kas", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      const newResults = results.map((result) => {
        const buktiUrl = `${req.protocol}://${req.get("host")}/kas/uploads/${
          result.bukti
        }`;
        return {
          ...result,
          bukti: buktiUrl,
        };
      });

      createResponse(res, 200, true, undefined, newResults);
    } else {
      createResponse(res, 404, false, "Data Kas Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Kas");
  }
});

// Menambahkan Data Kas
router.post(
  "/",
  upload.single("bukti"),
  authenticateToken,
  async (req, res) => {
    const { jenis_kas, sumber_kas, keterangan, nilai } = req.body;

    const id = uuidv4();
    const idBukti = randomstring.generate({
      length: 20,
      charset: "alphanumeric",
    });
    try {
      const renameBukti = `${idBukti}${path.extname(req.file.originalname)}`;
      fs.renameSync(req.file.path, `resources/uploads/buktikas/${renameBukti}`);

      const results = await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO tb_kas (id, jenis_kas, sumber_kas, keterangan, nilai, bukti) VALUES (?, ?, ?, ?, ?, ?)",
          [id, jenis_kas, sumber_kas, keterangan, nilai, renameBukti],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      io.emit("kas", { jenis_kas, nilai });

      createResponse(
        res,
        200,
        true,
        "Kas Berhasil Ditambahkan",
        `affectedRows = ${results.affectedRows}`
      );
    } catch (error) {
      console.error("Database error:", error);
      createResponse(res, 500, false, "Gagal Untuk Menambahkan Kas");
    }
  }
);

// Menghapus Data Kas
router.delete("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const existingData = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tb_kas WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (existingData.length > 0) {
      const buktiUrl = existingData[0].bukti;
      const jenis_kas = existingData[0].jenis_kas;
      const nilai = existingData[0].nilai;

      // Menghapus Query Dari Database
      await new Promise((resolve, reject) => {
        db.query("DELETE FROM tb_kas WHERE id = ?", [id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      // Menghapus File Bukti
      fs.unlinkSync(`resources/uploads/buktikas/${buktiUrl}`);

      io.emit("deleteKas", { jenis_kas, nilai });

      createResponse(res, 200, true, "Data Kas Berhasil Dihapus");
    } else {
      createResponse(res, 404, false, "Data Kas Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Menghapus Data Kas");
  }
});

module.exports = router;
