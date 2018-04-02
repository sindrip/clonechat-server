const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    // file size limitation in bytes
    limits: { fileSize: 1000000 },
  });

module.exports = {upload};