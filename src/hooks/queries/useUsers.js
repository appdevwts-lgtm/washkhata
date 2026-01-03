import { useQuery } from '@tanstack/react-query';
import { getUsersAPI, getUserByIdAPI, getUserPostsAPI } from '../../api/user.api';

export const useUsers = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsersAPI(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};


export const useUser = (userId, options = {}) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserByIdAPI(userId),
    enabled: !!userId, // Only fetch if userId exists
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useUserPosts = (userId, options = {}) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPostsAPI(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options,
  });
};

export default useUsers;
