const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const { createResponse } = require("./utils/Response");

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const pengumumanRoute = require("./routes/pengumumanRoute");
const renunganRoute = require("./routes/renunganRoute");
const acaraRoute = require("./routes/acaraRoute");
const baptisRoute = require("./routes/baptisRoute");
const relasiRoute = require("./routes/relasiRoute");
const berkasRoute = require("./routes/berkasRoute");
const jemaatLuarRoute = require("./routes/jemaatLuarRoute");
const pernikahanRoute = require("./routes/pernikahanRoute");
const penyerahanAnakRoute = require("./routes/penyerahanAnakRoute");
const kasRoute = require("./routes/kasRoute");

dotenv.config();

const app = express();
const server = http.createServer(app);
global.io = new Server(server, {
  cors: {
    credentials: true,
    origin: ["http://localhost:5173"],
  },
});
const port = process.env.PORT || 3000;

io.use((socket, next) => {
  const idUser = socket.handshake.auth.idUser;
  const userLevel = socket.handshake.auth.userLevel;

  if (!idUser && !userLevel) {
    return next(new Error("Invalid User ID and User Level"));
  }

  socket.idUser = idUser;
  socket.userLevel = userLevel;
  next();
});

io.on("connection", (socket) => {
  console.log(`${socket.handshake.auth.idUser} Connected`);

  socket.on("disconnect", () => {
    console.log(`${socket.handshake.auth.idUser} Disconnected`);
  });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 30 * 60 * 1000 }, // Waktu kedaluwarsa sesi 30 menit
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(bodyParser.json());

// Routing
app.use("/auth", authRoute);
app.use("/jemaatluar", jemaatLuarRoute);
app.use("/users", userRoute);
app.use(
  "/users/profile",
  express.static(path.join(__dirname, "resources/uploads/profile"))
);
app.use("/pengumuman", pengumumanRoute);
app.use(
  "/pengumuman/uploads",
  express.static(path.join(__dirname, "resources/uploads/pengumuman"))
);
app.use("/kas", kasRoute);
app.use(
  "/kas/uploads",
  express.static(path.join(__dirname, "resources/uploads/buktikas"))
);
app.use("/penyerahananak", penyerahanAnakRoute);
app.use(
  "/penyerahananak/uploads/berkas/",
  express.static(
    path.join(__dirname, "resources/uploads/penyerahanAnak/berkas")
  )
);
app.use("/pernikahan", pernikahanRoute);
app.use(
  "/pernikahan/uploads/berkas/",
  express.static(path.join(__dirname, "resources/uploads/pernikahan/berkas"))
);
app.use("/baptis", baptisRoute);
app.use(
  "/baptis/uploads/pasfoto",
  express.static(path.join(__dirname, "resources/uploads/baptis/pasfoto"))
);
app.use("/renungan", renunganRoute);
app.use(
  "/renungan/uploads",
  express.static(path.join(__dirname, "resources/uploads/renungan"))
);
app.use("/acara", acaraRoute);
app.use("/relasi", relasiRoute);
app.use("/berkas", berkasRoute);

// Menangani route yang tidak ditemukan
app.use((req, res) => {
  createResponse(res, 404, false, "Route not found");
});

// Menangani error server
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  createResponse(res, 500, false, "Internal server error");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
