'use strict';

//-- Require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const dragonsJson = require('./dragons.json');
const config = require('./config.js');

//-- JWT check

// @TODO: Remove .SAMPLE from /server/config.js.SAMPLE
// and update with your proper Auth0 information

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.CLIENT_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_AUDIENCE,
    issuer: `https://${config.CLIENT_DOMAIN}/`,
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
