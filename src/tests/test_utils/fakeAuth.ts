export function fakeAuth() {
  jest.mock('services/firebase', () => {
    return {
      auth: 'fake-auth',
    };
  });
}
