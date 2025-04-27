'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type { APIUser, RandomUserAPIResponse } from '../types/member';
import { fetchMembers } from '../services/randomUserService';

interface MembersContextType {
  members: APIUser[];
  isLoading: boolean;
  error: string | null;
  loadMore: () => void;
}

const MembersContext = createContext<MembersContextType | undefined>(
  undefined
);

export function MembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<APIUser[]>([]);
  const [page, setPage] = useState(1);
  const [prefetch, setPrefetch] = useState<APIUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchMembers(1, 10)
      .then((resp: RandomUserAPIResponse) => {
        if (!cancelled) setMembers(resp.results);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    fetchMembers(2, 10)
      .then((resp) => {
        if (!cancelled) setPrefetch(resp.results);
      })
      .catch((err) => {
        if (!cancelled) console.error('Prefetch error:', err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = async () => {
    if (prefetch.length === 0) return;
    setMembers((m) => [...m, ...prefetch]);
    setPage((p) => p + 1);

    setIsLoading(true);
    try {
      const resp = await fetchMembers(page + 2, 10);
      setPrefetch(resp.results);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MembersContext.Provider
      value={{ members, isLoading, error, loadMore }}
    >
      {children}
    </MembersContext.Provider>
  );
}

export function useMembersContext() {
  const ctx = useContext(MembersContext);
  if (!ctx)
    throw new Error(
      'useMembersContext must be used within a MembersProvider'
    );
  return ctx;
}
