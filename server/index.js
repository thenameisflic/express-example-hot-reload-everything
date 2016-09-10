const path = require('path');
const express = require('express');
const webpack = require('webpack');
const connectLivereload = require('connect-livereload');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../webpack.config.development');
const livereload = require('express-livereload');

const app = express();
livereload(app, {});
const compiler = webpack(config);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

const PORT = 3000;

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));
app.use(connectLivereload({
  port: 9091
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});
