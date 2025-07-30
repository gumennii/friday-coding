import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAdvocates } from '../advocates';
import { advocateData } from '@/db/seed/advocates';

// Mock the database module
vi.mock('@/db', () => ({
  default: {
    select: () => ({
      from: () => Promise.resolve(
        advocateData.map((advocate, index) => ({
          ...advocate,
          id: index + 1,
          specialties: advocate.specialties as string[],
          createdAt: new Date('2024-01-20')
        }))
      )
    })
  }
}));

describe('getAdvocates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all advocates when no search term is provided', async () => {
    const result = await getAdvocates({ page: 1, pageSize: 10 });
    
    expect(result.totalCount).toBe(advocateData.length);
    expect(result.advocates).toHaveLength(10);
    expect(result.advocates[0]).toHaveProperty('firstName');
    expect(result.advocates[0]).toHaveProperty('lastName');
    expect(result.advocates[0]).toHaveProperty('specialties');
  });

  it('filters advocates by search term', async () => {
    const result = await getAdvocates({ search: 'John', page: 1, pageSize: 10 });
    
    expect(result.totalCount).toBeGreaterThan(0);
    expect(result.advocates.every((advocate: any) => 
      advocate.firstName.toLowerCase().includes('john') ||
      advocate.lastName.toLowerCase().includes('john') ||
      advocate.city.toLowerCase().includes('john') ||
      advocate.degree.toLowerCase().includes('john')
    )).toBe(true);
  });

  it('paginates results correctly', async () => {
    const page1 = await getAdvocates({ page: 1, pageSize: 5 });
    const page2 = await getAdvocates({ page: 2, pageSize: 5 });
    
    expect(page1.advocates).toHaveLength(5);
    expect(page2.advocates).toHaveLength(5);
    expect(page1.advocates[0].id).not.toBe(page2.advocates[0].id);
  });

  it('returns empty array when page exceeds total pages', async () => {
    const result = await getAdvocates({ page: 100, pageSize: 10 });
    
    expect(result.advocates).toHaveLength(0);
    expect(result.totalCount).toBe(advocateData.length);
  });

  it('searches across multiple fields', async () => {
    const searchTerms = ['New York', 'MD', 'John'];
    
    for (const term of searchTerms) {
      const result = await getAdvocates({ search: term, page: 1, pageSize: 10 });
      expect(result.totalCount).toBeGreaterThan(0);
    }
  });
});