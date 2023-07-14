const { userController } = require('../controllers/users.controller');
const { Router } = require('express');
const router = Router();

router.get('/user/:token', userController.getUserByToken)
router.patch('/users/:email', userController.updateUserToken);
router.patch('/users/:token/delete', userController.removeUserToken);
router.post('/registration', userController.registrationUser);
router.post('/login', userController.loginUser);

module.exports = router;
