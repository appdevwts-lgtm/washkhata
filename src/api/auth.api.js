import api from './axios';

export const loginAPI = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { email, password } = credentials;

  // Simulate server-side validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  if (email === 'fail@test.com') {
    throw new Error('Invalid credentials');
  }

  const mockResponse = {
    token: `Bearer_${Math.random().toString(36).substring(7)}_${Date.now()}`,
    user: {
      id: Math.floor(Math.random() * 1000) + 1,
      name: email.split('@')[0], // Generate name from email
      email: email,
      avatar: `https://i.pravatar.cc/150?u=${email}`, // Consistent avatar based on email
      role: email.includes('admin') ? 'admin' : 'user', // Dynamic role assignment
      createdAt: new Date().toISOString(),
    },
  };

  return mockResponse;
};

export const logoutAPI = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // --- REAL API CALL WOULD GO HERE ---
  // await api.post('/logout');
  
  return { success: true };
};

export const getUserProfileAPI = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};


export const updateUserProfileAPI = async (userData) => {
  try {
    const response = await api.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};
