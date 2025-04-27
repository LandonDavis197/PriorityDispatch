import React from 'react';
import { render } from '@testing-library/react';
import { SkeletonCard } from '../../components/SkeletonCard';

describe('SkeletonCard', () => {
  it('renders placeholder blocks with correct classes', () => {
    const { container } = render(<SkeletonCard />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('animate-pulse', 'flex');

    expect(container.querySelectorAll('.rounded-full').length).toBe(1);
    expect(container.querySelectorAll('.bg-gray-200.rounded').length).toBeGreaterThanOrEqual(2);
  });
});
