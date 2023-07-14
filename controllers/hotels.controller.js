const User = require('../models/Users.model');

module.exports.hotelController = {
  getFavoriteHotels: async (req, res) => {
    try {
      const email = req.params.email;
      if (!email) {
        res.status(403).json({ error: 'Пустой email!' });
      }
      const userData = await User.findOne({ email });
      if (!userData) {
        res.status(401).json({ error: 'Избранные отели не найдены!' });
      }
      console.log(userData);
      res.status(200).json(userData);
    } catch (error) {
      res.status(401).json({ error: 'Ошибка получения избранных отелей!' });
    }
  },
  addFavoriteHotel: async (req, res) => {
    try {
      const email = req.params.email;
      console.log(email);
      if (!email) {
        res.status(403).json({ error: 'Пустой email!' });
      }
      const { hotelId, hotelName, price, starsHotel } = req.body;
      const updatedFavoriteHotels = await User.findOneAndUpdate(
        { email },
        {
          $addToSet: {
            favoriteHotels: {
              hotelId,
              hotelName,
              price,
              starsHotel,
            },
          },
        },
        { new: true },
      );
      res.status(200).json(updatedFavoriteHotels);
    } catch (error) {
      res.status(401).json({ error: 'Ошибка добавления в избранные отели!' });
    }
  },
  removeFavoriteHotel: async (req, res) => {
    try {
      const email = req.params.email;
      if (!email) {
        res.status(403).json({ error: 'Пустой email!' });
      }
      const { hotelId } = req.body;
      console.log(hotelId);
      if (!hotelId) {
        res.status(403).json({ error: 'Пустой id избранного отеля!' });
      }
      const updatedFavoriteHotels = await User.findOneAndUpdate(
        { email },
        {
          $pull: {
            favoriteHotels: { hotelId },
          },
        },
        { new: true },
      );
      console.log(updatedFavoriteHotels);
      res.status(200).json(updatedFavoriteHotels);
    } catch (error) {
      res.status(401).json({ error: 'Ошибка удаления отеля из избранного!' });
    }
  },
};
