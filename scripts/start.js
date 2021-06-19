const http = require('http');
const Koa = require('koa');
const mount = require('koa-mount');
const graphql = require('../src/index');

const app = new Koa();
app.use(mount('/graphql', graphql));

module.exports = (async () => {
  // Create http server and listen
  const server = http.createServer(app.callback());
  server.listen(8000, 'localhost');
  console.log(server);
  global.__SERVER__ = server;
})()
