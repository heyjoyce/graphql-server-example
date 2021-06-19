const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');
const http = require('http');
const Koa = require('koa');
const mount = require('koa-mount');
const graphql = require('../src/index');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

const app = new Koa();
app.use(mount('/graphql', graphql));

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  global.__BROWSER__GLOBAL__ = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR)
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());

  const integrationServer = http.createServer(app.callback());
  integrationServer.listen(8000, 'localhost');

  global.__SERVER__ = integrationServer;
}
