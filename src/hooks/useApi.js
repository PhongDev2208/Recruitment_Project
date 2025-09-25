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

// Custom Hook for Paginated APIs
export const usePaginatedApi = (apiCall, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitItems: 10,
    totalPage: 1,
    totalRecords: 0,
  });
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ...initialParams,
  });

  const fetchData = useCallback(
    async (queryParams = params) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiCall(queryParams);

        if (response.success) {
          setData(response.data);
          if (response.pagination) {
            setPagination(response.pagination);
          }
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [apiCall, params]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update pagination parameters
  const updateParams = useCallback(
    (newParams) => {
      setParams((prevParams) => ({ ...prevParams, ...newParams }));
    },
    [setParams]
  );

  // Go to specific page
  const goToPage = useCallback(
    (page) => {
      updateParams({ page });
    },
    [updateParams]
  );

  // Change items per page
  const changeLimit = useCallback(
    (limit) => {
      updateParams({ limit, page: 1 }); // Reset to first page when changing limit
    },
    [updateParams]
  );

  // Update search keyword
  const search = useCallback(
    (keyword) => {
      updateParams({ keyword, page: 1 }); // Reset to first page when searching
    },
    [updateParams]
  );

  // Update sorting
  const sort = useCallback(
    (sortKey, sortValue = "asc") => {
      updateParams({ sortKey, sortValue, page: 1 }); // Reset to first page when sorting
    },
    [updateParams]
  );

  // Filter by status
  const filterByStatus = useCallback(
    (status) => {
      updateParams({ status, page: 1 }); // Reset to first page when filtering
    },
    [updateParams]
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    setParams({ page: 1, limit: params.limit });
  }, [params.limit]);

  // Refetch current data
  const refetch = useCallback(() => {
    fetchData(params);
  }, [fetchData, params]);

  return {
    data,
    loading,
    error,
    pagination,
    params,
    // Actions
    updateParams,
    goToPage,
    changeLimit,
    search,
    sort,
    filterByStatus,
    resetFilters,
    refetch,
  };
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
