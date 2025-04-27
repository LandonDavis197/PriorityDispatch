import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemberCard } from '../../components/MemberCard';
import {APIUser} from '../../types/member';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
     __esModule: true,
     default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
       React.createElement('img', props),
   }));

describe('MemberCard', () => {
  const user = {
    login: { uuid: 'abc-123' },
    name: { first: 'Jane', last: 'Smith' },
    picture: { thumbnail: 'https://example.com/thumb.jpg' },
    dob: { age: 42, date: '1980-01-01T00:00:00.000Z' },
  };

  it('renders a link to the profile with correct href', () => {
    render(<MemberCard user={user as APIUser} />);
    const link = screen.getByRole('link', { name: /Jane Smith/i });
    expect(link).toHaveAttribute('href', '/profile/abc-123');
  });

  it('displays the user name and age', () => {
    render(<MemberCard user={user as APIUser} />);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Age: 42')).toBeInTheDocument();
  });

  it('renders the thumbnail image with correct src and alt', () => {
    render(<MemberCard user={user as APIUser} />);
    const img = screen.getByAltText('Jane Smith') as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'https://example.com/thumb.jpg');
    expect(img).toHaveAttribute('alt', 'Jane Smith');
  });
});
