const multer = require('multer');

//configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { upload };