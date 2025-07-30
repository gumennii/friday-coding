import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchForm } from '../search-form';

describe('SearchForm', () => {
  it('renders search input and submit button', () => {
    render(<SearchForm />);
    
    expect(screen.getByRole('textbox', { name: /search advocates/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays default value when provided', () => {
    render(<SearchForm defaultValue="therapist" />);
    
    expect(screen.getByDisplayValue('therapist')).toBeInTheDocument();
  });
});