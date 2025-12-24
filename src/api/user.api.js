import api from './axios';

export const getUsersAPI = async (params = {}) => {
  try {
    const response = await api.get('https://jsonplaceholder.typicode.com/users', {
      params,
    });
    
    const enhancedUsers = response.data.map((user) => ({
      ...user,
      avatar: `https://i.pravatar.cc/150?img=${user.id}`,
      status: Math.random() > 0.5 ? 'active' : 'inactive',
      joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    }));
    
    return enhancedUsers;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

export const getUserByIdAPI = async (userId) => {
  try {
    const response = await api.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    return {
      ...response.data,
      avatar: `https://i.pravatar.cc/150?img=${userId}`,
      status: Math.random() > 0.5 ? 'active' : 'inactive',
      joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

export const getUserPostsAPI = async (userId) => {
  try {
    const response = await api.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch posts');
  }
};
 
export const deleteUserAPI = async (userId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};
