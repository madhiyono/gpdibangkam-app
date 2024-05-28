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
const upload = multer({ dest: "resources/uploads/pengumuman/" });

// Mendapatkan Semua Data Pengumuman
router.get("/", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tb_pengumuman", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      const newResults = results.map((result) => {
        const gambarUrl = `${req.protocol}://${req.get(
          "host"
        )}/pengumuman/uploads/${result.gambar}`;
        return {
          ...result,
          gambar: gambarUrl,
        };
      });

      createResponse(res, 200, true, undefined, newResults);
    } else {
      createResponse(res, 404, false, "Data Pengumuman Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Pengumuman");
  }
});

// Mendapatkan Data Pengumuman Berdasarkan ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_pengumuman WHERE id = ?",
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
      const gambarUrl = `${req.protocol}://${req.get(
        "host"
      )}/pengumuman/uploads/${results[0].gambar}`;
      results[0].gambar = gambarUrl;

      createResponse(res, 200, true, undefined, results[0]);
    } else {
      createResponse(res, 404, false, "Data Pengumuman Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Pengumuman");
  }
});

// Mendapatkan Semua Data Pengumuman Berdasarkan Author
router.get("/author/:author", async (req, res) => {
  const author = req.params.author;
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_pengumuman WHERE author = ?",
        [author],
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
        const gambarUrl = `${req.protocol}://${req.get(
          "host"
        )}/pengumuman/uploads/${result.gambar}`;
        return {
          ...result,
          gambar: gambarUrl,
        };
      });

      createResponse(res, 200, true, undefined, newResults);
    } else {
      createResponse(res, 404, false, "Data Pengumuman Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Pengumuman");
  }
});

// Menambahkan Data Pengumuman
router.post(
  "/",
  upload.single("gambar"),
  authenticateToken,
  async (req, res) => {
    const { judul, isi, author } = req.body;

    if (!judul || !isi || !author || !req.file) {
      createResponse(
        res,
        400,
        false,
        "Judul, Isi, Author, dan Gambar Diperlukan"
      );
    } else {
      const id = uuidv4();
      const idGambar = randomstring.generate({
        length: 20,
        charset: "alphanumeric",
      });
      try {
        const renameGambar = `${idGambar}${path.extname(
          req.file.originalname
        )}`;
        fs.renameSync(
          req.file.path,
          `resources/uploads/pengumuman/${renameGambar}`
        );

        const results = await new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO tb_pengumuman (id, gambar, judul, author, isi) VALUES (?, ?, ?, ?, ?)",
            [id, renameGambar, judul, author, isi],
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
          "Pengumuman Berhasil Ditambahkan",
          `affectedRows = ${results.affectedRows}`
        );
      } catch (error) {
        console.error("Database error:", error);
        createResponse(res, 500, false, "Gagal Untuk Menambahkan Pengumuman");
      }
    }
  }
);

// Mengubah Data Pengumuman
router.put(
  "/:id",
  upload.single("gambar"),
  authenticateToken,
  async (req, res) => {
    const id = req.params.id;
    const { judul, isi, author } = req.body;

    if (!judul || !isi || !author) {
      createResponse(res, 400, false, "Judul, Isi, dan Author Diperlukan");
    } else {
      try {
        const results = await new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM tb_pengumuman WHERE id = ?",
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
          let gambar = results[0].gambar;

          if (req.file) {
            // Jika Ada Gambar Baru Yang Diupload
            // Hapus Gambar Lama
            fs.unlinkSync(`resources/uploads/pengumuman/${gambar}`);

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
              `resources/uploads/pengumuman/${renameGambar}`
            );

            gambar = renameGambar;
          }

          // Update Data di Database
          await new Promise((resolve, reject) => {
            db.query(
              "UPDATE tb_pengumuman SET gambar = ?, judul = ?, author = ?, isi = ? WHERE id = ?",
              [gambar, judul, author, isi, id],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          });

          createResponse(res, 200, true, "Data Pengumuman Berhasil Diubah");
        } else {
          createResponse(res, 404, false, "Data Pengumuman Tidak Ditemukan");
        }
      } catch (error) {
        console.error("Database error:", error);
        createResponse(res, 500, false, "Gagal Untuk Mengubah Data Pengumuman");
      }
    }
  }
);

// Menghapus Data Pengumuman
router.delete("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const existingData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_pengumuman WHERE id = ?",
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
      const gambarUrl = existingData[0].gambar;

      // Menghapus Query Dari Database
      await new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM tb_pengumuman WHERE id = ?",
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

      // Menghapus File Gambar
      fs.unlinkSync(`resources/uploads/pengumuman/${gambarUrl}`);

      createResponse(res, 200, true, "Data Pengumuman Berhasil Dihapus");
    } else {
      createResponse(res, 404, false, "Data Pengumuman Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Menghapus Data Pengumuman");
  }
});

module.exports = router;
