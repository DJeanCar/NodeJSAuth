'use strict';
const passport = require('passport'),
	  FacebookStrategy = require('passport-facebook'),
	  User = require('../../apps/users/models').User;

const facebook = function (server){

	passport.use(new FacebookStrategy({
			clientID: '742694022439888',
			clientSecret: '5450a69e21f912864b7e95a785a14515',
			callbackURL: '/auth/facebook/callback/'
		},
		function (accessToken, refreshToken, profile, done) {
			let username = profile._json.name.split(' ').join('.'); 
			User.findOne({'facebook.id': profile._json.id})
			.then(function (user) {
				if (user) return done(null, user);
				let new_user = new User({
					username: username
				});
				new_user.save(function (err) {
					if (!err) return done(null, new_user);
				});
			});
		}
	));

	server.get('/auth/facebook/', passport.authenticate('facebook'));

	server.get('/auth/facebook/callback/', passport.authenticate('facebook', 
									{ successRedirect: '/',
									  failureRedirect: '/ingresar/' }))

};

module.exports = facebook;