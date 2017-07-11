'use strict';

//-- Require
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var dragonsJson = require('./dragons.json');

//-- JWT check
// @TODO: change [CLIENT_DOMAIN] to your Auth0 domain name.
// @TODO: change [AUTH0_API_AUDIENCE] to your Auth0 API audience.
var CLIENT_DOMAIN = '[CLIENT_DOMAIN]'; // e.g., 'youraccount.auth0.com'
var AUTH0_AUDIENCE = '[AUTH0_API_AUDIENCE]'; // 'http://localhost:3001/api' in this example

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${CLIENT_DOMAIN}/.well-known/jwks.json`
    }),
    aud: AUTH0_AUDIENCE,
    issuer: `https://${CLIENT_DOMAIN}/`,
    algorithm: 'RS256'
});

//--- Set up app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//--- GET protected dragons route
app.get('/api/dragons', jwtCheck, function (req, res) {
  res.json(dragonsJson);
});

//--- Port
app.listen(3001);
console.log('Listening on localhost:3001');
