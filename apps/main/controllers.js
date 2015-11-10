'use strict';
const express = require('express'),
	  router = express.Router();

router.route('/')

	.get(function (req, res) {
		res.locals.user = req.user;
		res.render('main/home.html');
	});

module.exports = router;