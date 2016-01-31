const express = require('express');
const jade = require('jade');
const morgan = require('morgan');
const proxy = require('express-http-proxy');
const request = require('request');
const url = require('url');

const app = express();


/**
 * App configuration
 */
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(morgan());


/**
 * Setup API Proxy
 */
let api;

if (process.env.API_PORT_3000_TCP_ADDR && process.env.API_PORT_3000_TCP_PORT) {
  api = `${process.env.API_PORT_3000_TCP_ADDR}:${process.env.API_PORT_3000_TCP_PORT}`;
} else {
  api = 'localhost:3000';
}

// Forward every API calls to the backend
app.use('/api', proxy(api, {
  forwardPath: (req, res) => {
    return url.parse(req.url).path;
  }
}));


/**
 * Routes
 */
app.get('/', (req, res) => {
  // Populate data = require(the backend
  request(`http://${api}/users`, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.send('Something went wrong');
    }

    body = JSON.parse(body);

    res.render('index', {
      pageTitle: 'Users',
      users: body.data
    });
  });
});


// Start server
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
