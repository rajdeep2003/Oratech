import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setError } from '@store/reducers/appReducer';
import { AppDispatch } from '@store/store';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useApi = (options: UseApiOptions = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<any>(null);
  const [loading, setLocalLoading] = useState(false);
  const [error, setLocalError] = useState<string | null>(null);

  const execute = useCallback(
    async (apiCall: Promise<any>) => {
      try {
        setLocalLoading(true);
        setLocalError(null);
        dispatch(setLoading(true));

        const result = await apiCall;
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err: any) {
        const errorMessage = err.message || 'An error occurred';
        setLocalError(errorMessage);
        dispatch(setError(errorMessage));
        options.onError?.(err);
        throw err;
      } finally {
        setLocalLoading(false);
        dispatch(setLoading(false));
      }
    },
    [dispatch, options]
  );

  return { data, loading, error, execute };
};
