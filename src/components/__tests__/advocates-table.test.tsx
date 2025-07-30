import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdvocatesTable } from '../advocates-table';
import type { Advocate } from '@/types/advocate';

const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'MD',
    specialties: ['Cardiology', 'Internal Medicine'],
    yearsOfExperience: 15,
    phoneNumber: 12125551234
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'Los Angeles',
    degree: 'PhD',
    specialties: ['Psychology'],
    yearsOfExperience: 8,
    phoneNumber: 13105555678
  }
];

describe('AdvocatesTable', () => {
  it('displays advocate information', () => {
    render(<AdvocatesTable advocates={mockAdvocates} />);
    
    // Verify key data is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();  
    expect(screen.getByText('Cardiology,')).toBeInTheDocument();
    expect(screen.getByText('Psychology')).toBeInTheDocument();
  });

  it('shows empty state when no advocates found', () => {
    render(<AdvocatesTable advocates={[]} />);
    
    expect(screen.getByText(/no advocates found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view all advocates/i })).toBeInTheDocument();
  });
});