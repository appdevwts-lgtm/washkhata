import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { loginAPI } from '../../api/auth.api';

/**
 * Custom hook for login mutation
 * Handles login API call and Redux state updates
 */
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginAPI,
    
    onMutate: () => {
      // Dispatch login start action
      dispatch(loginStart());
    },
    
    onSuccess: (data) => {
      // Dispatch login success with token and user data
      dispatch(loginSuccess({
        token: data.token,
        user: data.user,
      }));
    },
    
    onError: (error) => {
      // Dispatch login failure
      dispatch(loginFailure());
      console.error('Login error:', error.message);
    },
  });
};

export default useLogin;
