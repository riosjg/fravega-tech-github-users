export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface SearchUsersResult {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

const BASE_URL = 'https://api.github.com';

export async function listUsers(since = 0, perPage = 20): Promise<GitHubUser[]> {
  const url = new URL(`${BASE_URL}/users`);
  url.searchParams.set('since', String(since));
  url.searchParams.set('per_page', String(perPage));

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<GitHubUser[]>;
}

export async function searchUsers(q: string, page = 1, perPage = 20): Promise<SearchUsersResult> {
  const url = new URL(`${BASE_URL}/search/users`);
  url.searchParams.set('q', q || '');
  url.searchParams.set('page', String(page));
  url.searchParams.set('per_page', String(perPage));

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`GitHub ${res.status}: ${message}`);
  }

  return res.json() as Promise<SearchUsersResult>;
}

export async function getUser(login: string): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${login}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  return res.json() as Promise<GitHubUser>;
}
