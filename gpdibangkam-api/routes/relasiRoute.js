const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../utils/Database");
const { createResponse } = require("../utils/Response");
const { authenticateToken } = require("../utils/Middleware");

const router = express.Router();
// Mendapatkan Data Relasi Berdasar ID Orang Pertama
router.get("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM tb_relasi WHERE id_jemaat_pertama = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error retrieving relasi:", error);
        createResponse(res, 500, false, "Failed to retrieve relasi");
      } else {
        createResponse(res, 200, true, undefined, results);
      }
    }
  );
});

// Mendapatkan Nama Berdasar ID_Jemaat
router.get("/user/:id", authenticateToken, (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM tb_users WHERE id_jemaat = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error retrieving user:", error);
        createResponse(res, 500, false, "Failed to retrieve user");
      } else {
        createResponse(res, 200, true, undefined, results);
      }
    }
  );
});

module.exports = router;
