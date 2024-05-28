function createResponse(
  res,
  statusCode,
  success,
  messages = undefined,
  data = null,
  useCache = false
) {
  if (typeof statusCode !== "number" || typeof success !== "boolean") {
    // Jika tipe data statusCode atau success tidak valid, kirim respons error
    res.status(500).json({
      statusCode: 500,
      success: false,
      messages: "Error Membuat Respon!",
    });
    return;
  }

  if (useCache) {
    // Set header untuk mengaktifkan cache
    res.set("Cache-Control", "public, max-age=3600");
  } else {
    // Nonaktifkan cache
    res.set("Cache-Control", "no-store");
  }

  res.status(statusCode);

  const response = {
    statusCode,
    success,
    messages,
    data,
  };

  res.json(response);
}

module.exports = {
  createResponse,
};
