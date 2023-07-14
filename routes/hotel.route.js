const { hotelController } = require('../controllers/hotels.controller');
const { Router } = require('express');
const router = Router();

router.get('/favorite/hotel/user/:email', hotelController.getFavoriteHotels)
router.patch('/favorite/hotel/user/:email/add', hotelController.addFavoriteHotel)
router.patch('/favorite/hotel/user/:email/remove', hotelController.removeFavoriteHotel)

module.exports = router;
