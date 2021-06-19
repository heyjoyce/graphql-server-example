const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaMorgan = require('koa-morgan');
const helmet = require('koa-helmet');
const { ApolloServer } = require('apollo-server-koa');
const schema = require('./schema');

const graphql = new Koa();
graphql.proxy = true

graphql
  .use(bodyParser())
  .use(koaMorgan('combined'))
  .use(helmet())

graphql.on('error', err => logger.error(`unexpected error occurred inside graphql: ${typeof err === 'object' ? JSON.stringify(err) : err}`));

const apolloServer = new ApolloServer({
  context: async ({ ctx }) => {
    const { request } = ctx;
    const session = {
      loggedIn: true,
    }
    return {
      request,
      session,
      trackErrors: ({ errors, request, session }) => {},
    }
  },
  schema,
  playground: true,
  introspection: true,
  debug: true,
})

apolloServer.applyMiddleware({
  app: graphql,
  path: '/',
});

module.exports = graphql;
