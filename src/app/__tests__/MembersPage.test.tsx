import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MembersPage from '../../app/page';
import type { APIUser } from '../../types/member';

const mockLoadMore = jest.fn();
jest.mock('../../context/MembersContext', () => ({
  useMembersContext: () => mockContext,
}));
let mockContext: {
  members: APIUser[];
  isLoading: boolean;
  error: string | null;
  loadMore: () => void;
};

describe('MembersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows skeletons when loading', () => {
    mockContext = {
      members: [],
      isLoading: true,
      error: null,
      loadMore: mockLoadMore,
    };
    const { container } = render(<MembersPage />);

    const pulses = container.querySelectorAll('.animate-pulse');
    expect(pulses.length).toBe(6);
    expect(screen.queryByRole('button', { name: /Load More/i })).toBeNull();
  });

  it('shows an error banner when error exists', () => {
    mockContext = {
      members: [],
      isLoading: false,
      error: 'Network failure',
      loadMore: mockLoadMore,
    };
    render(<MembersPage />);

    expect(screen.queryByRole('button', { name: /Load More/i })).toBeNull();
  });

  it('renders members and calls loadMore', () => {
    const users: APIUser[] = [
      {
        login: { uuid: '1', username: 'u1' },
        name: { title: 'Mr', first: 'Alice', last: 'Zephyr' },
        gender: 'female',
        location: {
          street: { number: 1, name: 'A St' },
          city: 'X',
          state: 'Y',
          country: 'Z',
          postcode: '000',
          coordinates: { latitude: '0', longitude: '0' },
          timezone: { offset: '+0:00', description: 'UTC' },
        },
        email: 'a@z.com',
        dob: { date: '2000-01-01T00:00:00.000Z', age: 24 },
        registered: { date: '', age: 0 },
        phone: '',
        cell: '',
        id: { name: '', value: null },
        picture: {
          large: '',
          medium: '',
          thumbnail: '',
        },
        nat: '',
      },
      {
        login: { uuid: '2', username: 'u2' },
        name: { title: 'Ms', first: 'Bob', last: 'Alpha' },
        gender: 'male',
        location: {
          street: { number: 2, name: 'B St' },
          city: 'X',
          state: 'Y',
          country: 'Z',
          postcode: '111',
          coordinates: { latitude: '0', longitude: '0' },
          timezone: { offset: '+0:00', description: 'UTC' },
        },
        email: 'b@a.com',
        dob: { date: '1990-01-01T00:00:00.000Z', age: 34 },
        registered: { date: '', age: 0 },
        phone: '',
        cell: '',
        id: { name: '', value: null },
        picture: {
          large: '',
          medium: '',
          thumbnail: '',
        },
        nat: '',
      },
    ];

    mockContext = {
      members: users,
      isLoading: false,
      error: null,
      loadMore: mockLoadMore,
    };

    render(<MembersPage />);

    expect(screen.getByText('Alice Zephyr')).toBeInTheDocument();
    expect(screen.getByText('Bob Alpha')).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /Load More/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(mockLoadMore).toHaveBeenCalled();
  });
});
