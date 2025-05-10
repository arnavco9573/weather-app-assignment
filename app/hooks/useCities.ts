// app/hooks/useCities.ts
import { useState, useEffect } from 'react';
import { fetchCities } from '../lib/api';
import { City } from '../types';

export const useCities = (searchQuery: string = '') => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<Error | null>(null); // Add error state
  const limit = 20;

  const loadCities = async () => {
    if (loading) return;
    setLoading(true);
    setError(null); // Reset error before new request
    try {
      const newCities = await fetchCities(searchQuery, limit, offset);
      setCities((prev) => [...prev, ...newCities]);
      setHasMore(newCities.length === limit);
      setOffset((prev) => prev + limit);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cities'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCities([]);
    setOffset(0);
    loadCities();
  }, [searchQuery]);

  return { cities, loading, hasMore, loadCities, error }; // Include error in return
};