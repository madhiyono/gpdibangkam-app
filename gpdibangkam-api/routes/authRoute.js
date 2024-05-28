const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../utils/Database");
const randomstring = require("randomstring");
const fs = require("fs");
const { sendEmailHTML } = require("../utils/Email");
const {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/Auth");
const { createResponse } = require("../utils/Response");

const router = express.Router();

// Rute untuk Register menggunakan kode OTP
router.post("/register-otp", (req, res) => {
  const session = req.session;
  const { email, nama } = req.body;

  if (!email || !nama) {
    createResponse(res, 400, false, "Email dan Nama Diperlukan");
  } else {
    // Cek apakah email terdapat di database
    db.query(
      "SELECT * FROM tb_users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.error("Terjadi Kesalahan Saat Mengambil Data Users:", error);
          createResponse(res, 500, false, "Gagal Untuk Mengambil Data Users");
        } else {
          if (results.length > 0) {
            createResponse(res, 409, false, "Email Sudah Ada");
          } else {
            // Generate OTP
            const otp = randomstring.generate({
              length: 6,
              charset: "alphanumeric",
            });
            // Generate ID
            const idUser = randomstring.generate({
              length: 10,
              charset: "alphanumeric",
            });
            const idJemaat = randomstring.generate({
              length: 10,
              charset: "alphanumeric",
            });

            // Generate Register Id
            const registerId = uuidv4();

            session.otp = [registerId, otp];
            session.register = [registerId, email];

            db.query(
              "INSERT INTO tb_users (id, id_jemaat, nama_lengkap, email) VALUES (?, ?, ?, ?)",
              [idUser, idJemaat, nama, email],
              (error, results) => {
                if (error) {
                  console.error("Database error:", error);
                  createResponse(res, 500, false, "Gagal Untuk Registrasi");
                } else {
                  db.query(
                    "INSERT INTO tb_jemaat (id) VALUES (?)",
                    [idJemaat],
                    (error, results) => {
                      if (error) {
                        console.error("Database error:", error);
                        createResponse(
                          res,
                          500,
                          false,
                          "Gagal Untuk Registrasi"
                        );
                      } else {
                        io.emit("user", { idJemaat });

                        // Kirim kode OTP melalui email
                        const subject = `${otp} Adalah Kode Verifikasi Registrasi Akun GPdI El-Shaddai Bangkam Anda`;
                        fs.readFile(
                          "resources/templates/otpEmail.html",
                          "utf8",
                          (error, htmlContent) => {
                            if (error) {
                              console.error("Error Reading HTML File:", error);
                            } else {
                              const personalizedHtml = htmlContent
                                .replace("{{subject}}", "Registrasi")
                                .replace("{{kode_otp}}", otp);
                              sendEmailHTML(email, subject, personalizedHtml)
                                .then(() => {
                                  createResponse(
                                    res,
                                    200,
                                    true,
                                    "OTP Berhasil Dikirim",
                                    {
                                      registerId,
                                    }
                                  );
                                })
                                .catch((error) => {
                                  console.error("Error sending email:", error);
                                  createResponse(
                                    res,
                                    500,
                                    false,
                                    "Gagal Mengirim OTP"
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
      }
    );
  }
});

// Rute untuk registrasi pengguna
router.post("/register", (req, res) => {
  let session = req.session;
  const { uuid, email, otp } = req.body;

  if (!uuid || !otp) {
    createResponse(res, 500, false, "Gagal Untuk Registrasi");
  } else {
    // Verifikasi UUID
    if (uuid === session.register[0]) {
      // Verifikasi Email
      if (email === session.register[1]) {
        // Cek apakah email terdapat di database
        db.query(
          "SELECT * FROM tb_users WHERE email = ?",
          [email],
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
                "Gagal Untuk Mengambil Data Users"
              );
            } else {
              // Verifikasi OTP
              if (otp === session.otp[1]) {
                db.query(
                  "UPDATE tb_users SET status = ? WHERE email = ?",
                  ["Aktif", email],
                  (error, results) => {
                    if (error) {
                      console.error("Database error:", error);
                      createResponse(
                        res,
                        500,
                        false,
                        "Gagal Untuk Verifikasi Kode OTP"
                      );
                    } else {
                      db.query(
                        "SELECT * FROM tb_users WHERE email = ?",
                        [email],
                        (error, results) => {
                          if (error) {
                            console.error("Database error:", error);
                            createResponse(
                              res,
                              500,
                              false,
                              "Gagal Untuk Meloginkan User"
                            );
                          } else {
                            const user = results[0];
                            const token = generateToken(user);
                            const refreshToken = generateRefreshToken(user);
                            // Menghapus kode OTP dari sesi setelah verifikasi sukses
                            session = null;
                            delete req.session.otp;
                            delete req.session.register;

                            createResponse(
                              res,
                              200,
                              true,
                              "Registrasi Berhasil. Kode OTP Berhasil Diverifikasi",
                              {
                                token,
                                refreshToken,
                                user,
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                createResponse(res, 401, false, "Invalid OTP");
              }
            }
          }
        );
      } else {
        createResponse(res, 500, false, "Gagal Untuk Registrasi");
      }
    } else {
      createResponse(res, 500, false, "Gagal Untuk Registrasi");
    }
  }
});

// Rute untuk login menggunakan kode OTP
router.post("/login-otp", (req, res) => {
  const session = req.session;
  const { email } = req.body;

  if (!email) {
    createResponse(res, 400, false, "Email Diperlukan");
  } else {
    // Cek apakah email terdapat di database
    db.query(
      "SELECT * FROM tb_users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.error("Terjadi Kesalahan Saat Mengambil Data Users:", error);
          createResponse(res, 500, false, "Gagal Untuk Mengambil Data Users");
        } else {
          if (results.length === 0) {
            createResponse(res, 404, false, "Email Tidak Ditemukan");
          } else {
            const user = results[0];
            // Verifikasi Status User
            if (user.status === "Aktif") {
              // Generate OTP
              const otp = randomstring.generate({
                length: 6,
                charset: "alphanumeric",
              });

              // Generate Login Id
              const loginId = uuidv4();

              session.otp = [loginId, otp];
              session.login = [loginId, user];

              // Kirim kode OTP melalui email
              const subject = `${otp} Adalah Kode Verifikasi Login Akun GPdI El-Shaddai Bangkam Anda`;
              fs.readFile(
                "resources/templates/otpEmail.html",
                "utf8",
                (error, htmlContent) => {
                  if (error) {
                    console.error("Error Reading HTML File:", error);
                  } else {
                    const personalizedHtml = htmlContent
                      .replace("{{subject}}", "Login")
                      .replace("{{kode_otp}}", otp);
                    sendEmailHTML(email, subject, personalizedHtml)
                      .then(() => {
                        createResponse(res, 200, true, "OTP Berhasil Dikirim", {
                          loginId,
                        });
                      })
                      .catch((error) => {
                        console.error("Error sending email:", error);
                        createResponse(res, 500, false, "Gagal Mengirim OTP");
                      });
                  }
                }
              );
            } else {
              const uuid = uuidv4();
              createResponse(res, 401, false, "Status User Belum Aktif", {
                uuid,
                email,
              });
            }
          }
        }
      }
    );
  }
});

// Mendapatkan token JWT dan Refresh token
router.post("/login", (req, res) => {
  let session = req.session;
  const { uuid, email, otp } = req.body;

  if (!uuid || !email || !otp) {
    createResponse(res, 400, false, "Email dan OTP Diperlukan");
  } else {
    // Lakukan verifikasi kode OTP
    if (email === session.login[1].email) {
      // Verifikasi kode OTP
      if (otp === session.otp[1] && uuid === session.login[0]) {
        const token = generateToken(session.login[1]);
        const refreshToken = generateRefreshToken(session.login[1]);
        const userData = session.login[1];
        // Menghapus kode OTP dari sesi setelah verifikasi sukses
        session = null;
        delete req.session.otp;
        delete req.session.login;

        createResponse(res, 200, true, undefined, {
          token,
          refreshToken,
          userData,
        });
      } else {
        createResponse(res, 401, false, "Invalid OTP");
      }
    } else {
      createResponse(res, 400, false, "Email Tidak Valid");
    }
  }
});

// Kirim Ulang Token
router.post("/kirim-otp", (req, res) => {
  const session = req.session;
  const { uuid, type, email } = req.body;

  if (!uuid || !type || !email) {
    createResponse(res, 400, false, "UUID, Type, dan Email Diperlukan");
  } else {
    if (!session.otp) {
      createResponse(res, 500, false, "Gagal Untuk Mengirim Kode OTP");
    } else {
      if (session.otp[0] === uuid) {
        const subject = `${session.otp[1]} Adalah Kode Verifikasi ${type} Akun GPdI El-Shaddai Bangkam Anda`;
        fs.readFile(
          "resources/templates/otpEmail.html",
          "utf8",
          (error, htmlContent) => {
            if (error) {
              console.error("Error Reading HTML File:", error);
            } else {
              const personalizedHtml = htmlContent
                .replace("{{subject}}", type)
                .replace("{{kode_otp}}", session.otp[1]);
              sendEmailHTML(email, subject, personalizedHtml)
                .then(() => {
                  createResponse(res, 200, true, "OTP Berhasil Dikirim");
                })
                .catch((error) => {
                  console.error("Error sending email:", error);
                  createResponse(res, 500, false, "Gagal Mengirim OTP");
                });
            }
          }
        );
      } else {
        createResponse(res, 404, false, "Kode OTP Tidak Ditemukan");
      }
    }
  }
});

// Refresh token
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    createResponse(res, 400, false, "Refresh token Diperlukan");
  } else {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      // Lakukan tindakan yang diizinkan hanya jika refresh token valid
      const user = {
        id: decoded.id,
        nama_lengkap: decoded.nama_lengkap,
        email: decoded.email,
      };
      const token = generateToken(user);
      createResponse(res, 200, true, undefined, { token });
    } catch (error) {
      createResponse(res, 401, false, "Invalid refresh token");
    }
  }
});

router.post("/aktivasi-otp", (req, res) => {
  const session = req.session;
  const { uuid, email } = req.body;

  if (!uuid || !email) {
    createResponse(res, 400, false, "Email Diperlukan");
  } else {
    db.query(
      "SELECT * FROM tb_users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.error("Terjadi Kesalahan Saat Mengambil Data Users:", error);
          createResponse(res, 500, false, "Gagal Untuk Mengambil Data Users");
        } else {
          if (results.length === 0) {
            createResponse(res, 404, false, "Email Tidak Ditemukan");
          } else {
            // Generate OTP
            const otp = randomstring.generate({
              length: 6,
              charset: "alphanumeric",
            });

            session.otp = [uuid, otp];
            session.aktivasi = [uuid, email];

            // Kirim kode OTP melalui email
            const subject = `${otp} Adalah Kode Aktivasi Akun GPdI El-Shaddai Bangkam Anda`;
            fs.readFile(
              "resources/templates/otpEmail.html",
              "utf8",
              (error, htmlContent) => {
                if (error) {
                  console.error("Error Reading HTML File:", error);
                } else {
                  const personalizedHtml = htmlContent
                    .replace("{{subject}}", "Aktivasi")
                    .replace("{{kode_otp}}", otp);
                  sendEmailHTML(email, subject, personalizedHtml)
                    .then(() => {
                      createResponse(res, 200, true, "OTP Berhasil Dikirim", {
                        uuid,
                      });
                    })
                    .catch((error) => {
                      console.error("Error sending email:", error);
                      createResponse(res, 500, false, "Gagal Mengirim OTP");
                    });
                }
              }
            );
          }
        }
      }
    );
  }
});

router.post("/aktivasi", (req, res) => {
  let session = req.session;
  const { uuid, email, otp } = req.body;

  if (!uuid || !otp) {
    createResponse(res, 500, false, "Gagal Untuk Aktivasi");
  } else {
    // Verifikasi UUID
    if (uuid === session.aktivasi[0]) {
      // Verifikasi Email
      if (email === session.aktivasi[1]) {
        // Verifikasi OTP
        if (otp === session.otp[1]) {
          db.query(
            "UPDATE tb_users SET status = ? WHERE email = ?",
            ["Aktif", email],
            (error, results) => {
              if (error) {
                console.error("Database error:", error);
                createResponse(
                  res,
                  500,
                  false,
                  "Gagal Untuk Verifikasi Kode OTP"
                );
              } else {
                db.query(
                  "SELECT * FROM tb_users WHERE email = ?",
                  [email],
                  (error, results) => {
                    if (error) {
                      console.error("Database error:", error);
                      createResponse(
                        res,
                        500,
                        false,
                        "Gagal Untuk Meloginkan User"
                      );
                    } else {
                      const user = results[0];
                      const token = generateToken(user);
                      const refreshToken = generateRefreshToken(user);
                      // Menghapus kode OTP dari sesi setelah verifikasi sukses
                      session = null;
                      delete req.session.otp;
                      delete req.session.aktivasi;

                      createResponse(
                        res,
                        200,
                        true,
                        "Aktivasi Berhasil. Kode OTP Berhasil Diverifikasi",
                        {
                          token,
                          refreshToken,
                          user,
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          createResponse(res, 401, false, "Invalid OTP");
        }
      } else {
        createResponse(res, 500, false, "Gagal Untuk Registrasi");
      }
    } else {
      createResponse(res, 500, false, "Gagal Untuk Registrasi");
    }
  }
});

module.exports = router;
