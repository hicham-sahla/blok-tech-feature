const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/users/create");
});

router.get("/users/create", userController.user_create_get);
router.get('/users', userController.user_index);
router.post('/users', userController.user_create_post);
router.get('/users/:id', userController.user_details);
router.delete('/users/:id', userController.user_delete);

module.exports = router; 