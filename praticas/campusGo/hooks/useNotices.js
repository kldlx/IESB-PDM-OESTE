import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotices = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      const data = await api.get('/posts?_limit=10');

      setNotices(data);
    } catch (err) {
      console.error('Erro ao carregar avisos:', err);
      setError('Não foi possível carregar os avisos acadêmicos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  return {
    notices,
    isLoading,
    error,
    reload: loadNotices,
  };
}