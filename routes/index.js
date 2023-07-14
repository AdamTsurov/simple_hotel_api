const { Router } = require("express");
const router = Router();

router.use(require('./user.route'))
router.use(require('./hotel.route'))

module.exports = router