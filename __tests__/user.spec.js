const request = require('supertest');

describe('user', () => {
  test('query user without session', async () => {
    const query = `
      query User($id: Int!) {
        session(id: $id) {
          loggedIn
        }
        profile(id: $id) {
          nickname
          imageUrl
        }
      }
    `
    const { statusCode, body } = await request('localhost:8000')
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query,
        variables: {
          id: 1,
        },
      })
      .expect('Content-Type', /json/);

    expect(statusCode).toEqual(200);

    const { session, profile } = body.data;
    expect(session).toEqual(
      expect.objectContaining({
        loggedIn: true,
      }),
    )
    expect(profile).toEqual(
      expect.objectContaining({
        nickname: expect.any(String),
        imageUrl: expect.any(String),
      }),
    )
  });
})
