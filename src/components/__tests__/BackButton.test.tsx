import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackButton } from '../../components/BackButton';
import '@testing-library/jest-dom';

describe('BackButton', () => {
  it('renders with correct text', () => {
    render(<BackButton onClick={() => {}} />);
    const btn = screen.getByRole('button', { name: /← Back/i });
    expect(btn).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<BackButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: /← Back/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has the expected Tailwind classes', () => {
    render(<BackButton onClick={() => {}} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass(
      'inline-flex',
      'items-center',
      'px-4',
      'py-2',
      'text-indigo-600',
      'bg-indigo-50',
      'rounded-lg'
    );
  });
});
