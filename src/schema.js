const { schemaComposer } = require('graphql-compose');

const UserTC = schemaComposer.createObjectTC({
  name: 'User',
  fields: {
    id: 'ID!',
    loggedIn: 'Boolean!',
    nickname: 'String',
    imageUrl: 'String',
  },
});

UserTC.addResolver({
  kind: 'query',
  name: 'session',
  type: UserTC,
  args: {
    id: 'Int',
  },
  resolve: async ({ args, context }) => {
    const { session } = context;
    return session;
  },
});

UserTC.addResolver({
  kind: 'query',
  name: 'profile',
  type: UserTC,
  args: {
    id: 'Int',
  },
  resolve: async ({ args, context }) => {
    const { id } = args;
    const findById = (id) => [{ id: 1, nickname: '사월이', imageUrl: 'https://s3.ap-northeast-2.amazonaws.com/heyjoyce.com/user/C9831075-56CA-432A-B0E2-76B5CBD7192D.jpeg' }].find(item => item.id === id);
    return findById(id);
  },
});

schemaComposer.Query.addFields({
  session: UserTC.getResolver('session'),
  profile: UserTC.getResolver('profile'),
});

schemaComposer.Mutation.addFields({});

const schema = schemaComposer.buildSchema();

module.exports = schema;
