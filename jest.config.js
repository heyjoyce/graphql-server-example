module.exports = {
  testMatch: ['**/src/**/(*.)(spec|test).{js,jsx}'],
  bail: true,
  useStderr: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/scripts/'],
  setupFilesAfterEnv: [],
}
