'use strict';
const express = require('express'),
	  swig = require('swig'),
	  bodyParser = require('body-parser'),
	  session = require('express-session'),
	  cookieParser = require('cookie-parser'),
	  RedisStore = require('connect-redis')(session),
	  flash = require('connect-flash'),
	  server = express();

server.engine('html', swig.renderFile);

server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

/* Sessions, Cookies, BodyParser */
server.use(flash());
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(session({
		store: new RedisStore({
			host : "127.0.0.1",
			port : 6379,
			db : 1,
		}),
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true
	})
);
/* end Sessions, Cookies, BodyParser */




/* Passport Config */
require('./config/passport')(server)

server.listen(8000, onListen);
function onListen() {
	console.log("Servidor escuchando al puerto 8000");
}

require('./config/routers')(server);