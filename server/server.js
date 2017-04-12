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

var CLIENT_DOMAIN = '[CLIENT_DOMAIN].auth0.com';
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${CLIENT_DOMAIN}/.well-known/jwks.json`
    }),
    audience: 'http://localhost:3001/api/',
    issuer: `https://${CLIENT_DOMAIN}/`,
    algorithms: ['RS256']
});

//--- Set up app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//--- Get route

app.get('/api/dragons', jwtCheck, function (req, res) {
  res.json(dragonsJson);
});

//--- Port

app.listen(3001);
console.log('Listening on localhost:3001');
