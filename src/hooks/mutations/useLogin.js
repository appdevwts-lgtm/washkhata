import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { loginAPI } from '../../api/auth.api';

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginAPI,
    
    onMutate: () => {
      dispatch(loginStart());
    },
    
    onSuccess: (data) => {
      dispatch(loginSuccess({
        token: data.token,
        user: data.user,
      }));
    },
    
    onError: (error) => {
      dispatch(loginFailure());
      console.error('Login error:', error.message);
    },
  });
};

export default useLogin;
