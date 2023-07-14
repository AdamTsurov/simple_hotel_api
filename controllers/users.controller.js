const User = require('../models/Users.model');
const bcrypt = require('bcrypt');

module.exports.userController = {
  registrationUser: async (req, res) => {
    try {
      const { email, password, favoriteHotels, token } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(401)
          .json({ error: `Этот адрес электронной почты ${email} уже существует` });
      }
      const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
      await User.create({ email, password: hash, favoriteHotels, token });
      res.json({ message: 'Пользователь успешно зарегистрирован!' });
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Ошибка регистрации!' });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(401).json({ error: 'С таким email пользователя нет!' });
      }
      const passwordValidation = await bcrypt.compare(password, userData.password);
      if (!passwordValidation) {
        return res.status(403).json({ error: 'Неверный пароль' });
      }
      if (userData && passwordValidation) {
        res.status(200).json(userData);
      }
    } catch (error) {
      res.status(401).json({ error: 'Ошибка авторизации!' });
    }
  },
  getUserByToken: async (req, res) => {
    try {
      const token = req.params.token;
      if (!token || token === null) {
        res.status(403).json({ error: 'Пользователь с таким токеном не найден!' });
      }
      const user = await User.findOne({ token });
      console.log(user);
      if (!user) {
        res.status(403).json({ error: 'Пользователь с таким токеном не найден!' });
      }
      res.status(200).json(user.email);
    } catch (error) {
      res.status(401).json({ error: 'Ошибка получения пользователя по токену!' });
    }
  },
  updateUserToken: async (req, res) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'С таким email пользователя нет!' });
      }
      const token = req.body.token;
      console.log(token);
      if (!token || token === null) {
        return res.status(401).json({ error: 'Укажите токен!' });
      }
      const updatedUser = await User.findOneAndUpdate({ email }, { token }, { new: true });
      res.json(updatedUser.token);
    } catch (error) {
      res.status(401).json({ error: 'Ошибка обновления токена!' });
    }
  },
  removeUserToken: async (req, res) => {
    try {
      const token = req.params.token;
      if (!token || token === null) {
        return res.status(401).json({ error: 'Токен пустой!' });
      }
      await User.findOneAndUpdate({ token }, { token: '' }, { new: true });
      res.status(200).json({ error: 'Токен удален!' });
    } catch (error) {
      res.status(401).json({ error: 'Ошибка удаления токена!' });
    }
  },
};
