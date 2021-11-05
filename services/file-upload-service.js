const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") cb(null, "./storage/images");
    else if (file.fieldname === "logo") cb(null, "./storage/images/logo");
    else if (file.fieldname === "video") cb(null, "./storage/videos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("File Filter Method Called");
  console.log("Logging File " + file);
  if (file === "undefined") {
    console.log("undefined hai");
    cb(null, false);
  } else if (file.fieldname === "image" || file.fieldname === "logo") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    )
      cb(null, true);
    else cb(null, false);
  } else if (file.fieldname === "video") {
    if (file.mimetype === "video/mp4") cb(null, true);
    else cb(null, false);
  } else cb(null, false);
};

const upload = multer({ storage: storageEngine });

module.exports = upload;
