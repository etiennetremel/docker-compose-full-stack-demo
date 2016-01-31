const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');


/**
 * MongoDB setup
 */
let mongoDbUrl;

if (process.env.MONGO_PORT_27017_TCP_ADDR && process.env.MONGO_PORT_27017_TCP_PORT) {
  mongoDbUrl = `${process.env.MONGO_PORT_27017_TCP_ADDR}:${process.env.MONGO_PORT_27017_TCP_PORT}`;
} else {
  mongoDbUrl = 'localhost:27017';
}

mongoose.connect(`mongodb://${mongoDbUrl}/api`);

const User = mongoose.model('User', { name: String });


/**
 * Express setup
 */
const app = express();

app.use(bodyParser.json());
app.use(morgan());


/**
 * Routes
 */
app.get('/users', (req, res) => {
  const startTime = Date.now();

  User.find((err, users) => {
    if (err)  {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: users
    });
  });
});

app.post('/users', (req, res) => {
  const startTime = Date.now();
  const name = req.body.name;

  const user = new User({ name });
  user.save((err) => {
    if (err)  {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: user
    });
  });
});

app.put('/users/:id', (req, res) => {
  const startTime = Date.now();
  const name = req.body.name;

  User.findOneAndUpdate({ _id: req.params.id }, { name }, (err, user) => {
    if (err) {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: user
    });
  });
});

app.delete('/users/:id', (req, res) => {
  const startTime = Date.now();

  User.findOneAndRemove(req.params.id, (err, user) => {
    if (err) {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: user
    });
  });
});


// Start server
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
