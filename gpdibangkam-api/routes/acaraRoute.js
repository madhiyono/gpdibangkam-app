const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../utils/Database");
const fs = require("fs");
const { createResponse } = require("../utils/Response");
const { sendEmailHTML } = require("../utils/Email");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
// Mendapatkan Semua Data Acara
router.get("/", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tb_acara", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      createResponse(res, 200, true, undefined, results);
    } else {
      createResponse(res, 404, false, "Data Acara Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Acara");
  }
});

// Mendapatkan Data Acara Berdasarkan ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tb_acara WHERE id = ?",
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
      createResponse(res, 200, true, undefined, results[0]);
    } else {
      createResponse(res, 404, false, "Data Acara Tidak Ditemukan");
    }
  } catch (error) {
    console.error("Database error:", error);
    createResponse(res, 500, false, "Gagal Untuk Mendapatkan Acara");
  }
});

// Mengirim Email Data Acara Berdasarkan ID
router.get("/send/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM tb_acara WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error("Terjadi Kesalahan Saat Mengambil Data Acara:", error);
      createResponse(res, 500, false, "Gagal Untuk Mengambil Data Acara");
    } else {
      if (results.length === 0) {
        createResponse(res, 404, false, "Acara Tidak Ditemukan");
      } else {
        const acara = results[0];
        db.query(
          "SELECT * FROM tb_users WHERE status = ?",
          ["Aktif"],
          (error, results) => {
            if (error) {
              console.error(
                "Terjadi Kesalahan Saat Mengambil Data Users:",
                error
              );
              createResponse(
                res,
                500,
                false,
                "Gagal Untuk Mengambil Data User"
              );
            } else {
              // Kirim Acara melalui email
              const subject = `Undangan Acara ${acara.nama}`;
              fs.readFile(
                "resources/templates/acaraEmail.html",
                "utf8",
                (error, htmlContent) => {
                  if (error) {
                    console.error("Error Reading HTML File:", error);
                  } else {
                    const tanggalMulai = new Date(acara.tanggal_mulai);
                    const tanggalSelesai = new Date(acara.tanggal_selesai);
                    const options = {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hourCycle: "h24",
                      hour: "2-digit",
                      minute: "2-digit",
                    };
                    const tanggalMulaiString = tanggalMulai.toLocaleDateString(
                      "id-ID",
                      options
                    );
                    const tanggalSelesaiString =
                      tanggalSelesai.toLocaleDateString("id-ID", options);
                    const personalizedHtml = htmlContent
                      .replace("{{nama_acara}}", acara.nama)
                      .replace("{{lokasi}}", acara.lokasi)
                      .replace("{{keterangan}}", acara.keterangan)
                      .replace(
                        "{{tanggal}}",
                        `${tanggalMulaiString} Sampai ${tanggalSelesaiString}`
                      );
                    const recipients = results.map((result) => result.email);
                    sendEmailHTML(
                      recipients.join(","),
                      subject,
                      personalizedHtml
                    )
                      .then(() => {
                        createResponse(
                          res,
                          200,
                          true,
                          "Acara Berhasil Dikirim"
                        );
                      })
                      .catch((error) => {
                        console.error("Error sending email:", error);
                        createResponse(res, 500, false, "Gagal Mengirim Acara");
                      });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

// Menambahkan Data Acara
router.post("/", authenticateToken, (req, res) => {
  const { nama, tanggal_mulai, tanggal_selesai, lokasi, keterangan } = req.body;

  if (!nama || !tanggal_mulai || !tanggal_selesai || !lokasi || !keterangan) {
    createResponse(
      res,
      400,
      false,
      "Nama, Tanggal Mulai, Tanggal Selesai, Lokasi, dan Keterangan Diperlukan"
    );
  } else {
    const id = uuidv4();

    db.query(
      "INSERT INTO tb_acara (id, nama, tanggal_mulai, tanggal_selesai, lokasi, keterangan) VALUES (?, ?, ?, ?, ?, ?)",
      [id, nama, tanggal_mulai, tanggal_selesai, lokasi, keterangan],
      (error, results) => {
        if (error) {
          console.error("Database error:", error);
          createResponse(res, 500, false, "Gagal Untuk Menambahkan Acara");
        } else {
          const affectedRows = results.affectedRows;
          db.query(
            "SELECT * FROM tb_users WHERE status = ?",
            ["Aktif"],
            (error, results) => {
              if (error) {
                console.error("Database error:", error);
              } else {
                // Kirim Acara melalui email
                const subject = `Undangan Acara ${nama}`;
                fs.readFile(
                  "resources/templates/acaraEmail.html",
                  "utf8",
                  (error, htmlContent) => {
                    if (error) {
                      console.error("Error Reading HTML File:", error);
                    } else {
                      const tanggalMulai = new Date(tanggal_mulai);
                      const tanggalSelesai = new Date(tanggal_selesai);
                      const options = {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hourCycle: "h24",
                        hour: "2-digit",
                        minute: "2-digit",
                      };
                      const tanggalMulaiString =
                        tanggalMulai.toLocaleDateString("id-ID", options);
                      const tanggalSelesaiString =
                        tanggalSelesai.toLocaleDateString("id-ID", options);
                      const personalizedHtml = htmlContent
                        .replace("{{nama_acara}}", nama)
                        .replace("{{lokasi}}", lokasi)
                        .replace("{{keterangan}}", keterangan)
                        .replace(
                          "{{tanggal}}",
                          `${tanggalMulaiString} Sampai ${tanggalSelesaiString}`
                        );
                      const recipients = results.map((result) => result.email);
                      sendEmailHTML(
                        recipients.join(","),
                        subject,
                        personalizedHtml
                      )
                        .then(() => {
                          createResponse(
                            res,
                            200,
                            true,
                            "Acara Berhasil Ditambahkan",
                            `affectedRows = ${affectedRows}`
                          );
                        })
                        .catch((error) => {
                          console.error("Error sending email:", error);
                          createResponse(
                            res,
                            500,
                            false,
                            "Gagal Untuk Menambahkan Acara"
                          );
                        });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
});

// Menghapus Data Pengumuman
router.delete("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM tb_acara WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error("Terjadi Kesalahan Saat Mengambil Data Acara:", error);
      createResponse(res, 500, false, "Gagal Untuk Mengambil Data Acara");
    } else {
      if (results.length === 0) {
        createResponse(res, 404, false, "Acara Tidak Ditemukan");
      } else {
        const acara = results[0];
        db.query(
          "SELECT * FROM tb_users WHERE status = ?",
          ["Aktif"],
          (error, results) => {
            if (error) {
              console.error(
                "Terjadi Kesalahan Saat Mengambil Data Users:",
                error
              );
              createResponse(
                res,
                500,
                false,
                "Gagal Untuk Mengambil Data User"
              );
            } else {
              const recipients = results.map((result) => result.email);
              db.query(
                "DELETE FROM tb_acara WHERE id = ?",
                [id],
                (error, results) => {
                  if (error) {
                    console.error("Database error:", error);
                    createResponse(
                      res,
                      500,
                      false,
                      "Gagal Untuk Menghapus Data Acara"
                    );
                  } else {
                    // Kirim Acara melalui email
                    const subject = `Pembatalan Acara ${acara.nama}`;
                    fs.readFile(
                      "resources/templates/acaraEmail.html",
                      "utf8",
                      (error, htmlContent) => {
                        if (error) {
                          console.error("Error Reading HTML File:", error);
                        } else {
                          const personalizedHtml = htmlContent
                            .replace("{{nama_acara}}", acara.nama)
                            .replace("{{lokasi}}", acara.lokasi)
                            .replace("{{keterangan}}", acara.keterangan)
                            .replace("{{tanggal}}", "Dibatalkan");
                          sendEmailHTML(
                            recipients.join(","),
                            subject,
                            personalizedHtml
                          )
                            .then(() => {
                              createResponse(
                                res,
                                200,
                                true,
                                "Data Acara Berhasil Dihapus"
                              );
                            })
                            .catch((error) => {
                              console.error("Error sending email:", error);
                              createResponse(
                                res,
                                500,
                                false,
                                "Gagal Untuk Menghapus Data Acara"
                              );
                            });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

module.exports = router;
