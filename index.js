const express = require('express');
const util = require('./src/util');
const hello = require('./src/ansi/animations/hello');

const app = express();

// simple hello route
app.get('/hello', async (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (util.isCommandline(userAgent)) {
    return res.send(hello.hello());
  }
  return next();
});
app.use('/hello', express.static('static/hello'));

// animated example
app.get('/anime-hello', async (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (util.isCommandline(userAgent)) {
    const stream = util.getStream(req, res);
    return hello.animateHello(stream);
  }
  return next();
});
app.use('/anime-hello', express.static('static/hello'));


app.listen(3000, () => console.log('Example app listening on port 3000!'));
