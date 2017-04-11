var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 3001;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://kmaida.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3001/api/',
    issuer: "https://kmaida.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/api/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.listen(port);
