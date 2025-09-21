import { useState, useEffect, useCallback } from "react";

// Custom Hook - Hook Pattern
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiCall();

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// For async operations (create, update, delete)
export const useAsyncOperation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (operation) => {
    try {
      setLoading(true);
      setError(null);

      const response = await operation();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return { execute, loading, error, reset };
};
