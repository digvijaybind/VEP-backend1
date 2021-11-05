const router = require('express').Router();
const participantController = require('../controllers/participant-controller');
const asyncMiddleware  = require('../middlewares/async-middleware');
const { auth, authRole } = require('../middlewares/auth-middleware');

router.get('/cards',auth,authRole('participant'), asyncMiddleware(participantController.getCards));
router.get('/cards/category/:Category',auth,authRole('participant'),asyncMiddleware(participantController.getCards));
router.get('/card/:cardId',auth,authRole('participant'),asyncMiddleware(participantController.getCard));

module.exports = router;