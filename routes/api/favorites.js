const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/favorites');

// /*---------- Public Routes ----------*/
router.post('/', postsCtrl.favorite);
router.get('/', postsCtrl.index)

module.exports = router;