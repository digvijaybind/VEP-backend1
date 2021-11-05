const router = require("express").Router();
const userController = require("../controllers/user-controller");
const asyncMiddleware = require("../middlewares/async-middleware");
const upload = require("../services/file-upload-service");

router.post(
  "/register",
  upload.fields([]),
  asyncMiddleware(userController.register)
);
router.post("/login", upload.fields([]), asyncMiddleware(userController.login));
router.post(
  "/forgot",
  upload.fields([]),
  asyncMiddleware(userController.forgot)
);
router.patch(
  "/reset",
  upload.fields([]),
  asyncMiddleware(userController.reset)
);

module.exports = router;
