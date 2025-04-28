import { listUsers, searchUsers, getUser, GitHubUser, SearchUsersResult } from './github';

describe('GitHub API helpers', () => {
  const OLD_FETCH = global.fetch;

  afterEach(() => {
    global.fetch = OLD_FETCH;
    jest.resetAllMocks();
  });

  describe('listUsers', () => {
    it('resolves with an array of users on success', async () => {
      const mockUsers: GitHubUser[] = [{ login: 'a', id: 1, avatar_url: '', html_url: '' }];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        })
      ) as jest.Mock;

      await expect(listUsers(0, 20)).resolves.toEqual(mockUsers);
    });

    it('throws an error when response.ok is false', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          text: () => Promise.resolve('Not Found'),
        })
      ) as jest.Mock;

      await expect(listUsers()).rejects.toThrow('GitHub 404: Not Found');
    });
  });

  describe('searchUsers', () => {
    it('resolves with a SearchUsersResult on success', async () => {
      const mockResult: SearchUsersResult = {
        total_count: 1,
        incomplete_results: false,
        items: [{ login: 'b', id: 2, avatar_url: '', html_url: '' }],
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResult),
        })
      ) as jest.Mock;

      await expect(searchUsers('test', 1, 20)).resolves.toEqual(mockResult);
    });

    it('throws when GitHub responds with error status', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          text: () => Promise.resolve('Server Error'),
        })
      ) as jest.Mock;

      await expect(searchUsers('x')).rejects.toThrow('GitHub 500: Server Error');
    });
  });

  describe('getUser', () => {
    it('resolves with a single GitHubUser on success', async () => {
      const mockUser: GitHubUser = { login: 'c', id: 3, avatar_url: '', html_url: '' };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser),
        })
      ) as jest.Mock;

      await expect(getUser('c')).resolves.toEqual(mockUser);
    });

    it('throws if the user is not found', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          text: () => Promise.resolve('User Not Found'),
        })
      ) as jest.Mock;

      await expect(getUser('missing')).rejects.toThrow('GitHub 404: User Not Found');
    });
  });
});
