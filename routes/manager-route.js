const router = require("express").Router();
const managerController = require("../controllers/manager-controller");
const asyncMiddleware = require("../middlewares/async-middleware");
const upload = require("../services/file-upload-service");
const { auth, authRole } = require("../middlewares/auth-middleware");

router.get(
  "/cards",
  auth,
  authRole("manager"),
  asyncMiddleware(managerController.getCards)
);
router.get(
  "/card/:cardId",
  auth,
  authRole("manager"),
  asyncMiddleware(managerController.getCard)
);
router.get(
  "/cards/category/:category",
  auth,
  authRole("manager"),
  asyncMiddleware(managerController.getCards)
);
router.patch(
  "/card/:cardId",
  auth,
  authRole("manager"),
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "logo", maxCount: 1 },
    { name: "video" },
  ]),
  asyncMiddleware(managerController.updateCard)
);
router.delete(
  "/card/:cardId",
  auth,
  authRole("manager"),
  asyncMiddleware(managerController.deleteCard)
);

module.exports = router;
