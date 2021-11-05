const router = require("express").Router();
const adminController = require("../controllers/admin-controller");
const asyncMiddleware = require("../middlewares/async-middleware");
const { auth, authRole } = require("../middlewares/auth-middleware");
const upload = require("../services/file-upload-service");
const participantController = require("../controllers/participant-controller");

router.post(
  "/stallInformation",
  auth,
  authRole("admin"),
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "logo", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  asyncMiddleware(adminController.createCard)
);

router.get(
  "/cards",
  auth,
  authRole("admin"),
  asyncMiddleware(participantController.getCards)
);

router.get(
  "/cards/category/:Category",
  auth,
  authRole("admin"),
  asyncMiddleware(participantController.getCards)
);

module.exports = router;
