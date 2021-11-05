const managerController = require("../controllers/manager-controller");
const { auth } = require("../middlewares/auth-middleware");
const asyncMiddleware = require("../middlewares/async-middleware");
const router = require("express").Router();
router.get(
  "/cards/search/:text",
  auth,
  asyncMiddleware(managerController.getCardsFilter)
);

module.exports = router;
