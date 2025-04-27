import axios from 'axios';
import type { RandomUserAPIResponse } from '../types/member';

//This api is almost never working.  Was not working 4/25 - 4/27 for me
const client = axios.create({
  baseURL: 'https://randomuser.me/api',
});

export async function fetchMembers(
  page = 1,
  results = 10
): Promise<RandomUserAPIResponse> {
  try {
    const { data } = await client.get<RandomUserAPIResponse>('', {
      params: { page, results, seed: 'member-dir' },
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverMsg =
        (err.response?.data as { message?: string })?.message ||
        err.response?.statusText ||
        err.message;
      throw new Error(
        `Could not load members (${err.response?.status || 'randomuser.me is down'}): ${serverMsg}`
      );
    }
    throw new Error(`Unexpected error: ${(err as Error).message}`);
  }
}

export async function fetchMemberById(uuid: string) {
  try {
    const { results } = await fetchMembers(1, 50);
    return results.find((u) => u.login.uuid === uuid) ?? null;
  } catch (err) {
    throw err;
  }
}
