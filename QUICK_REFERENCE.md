# 🎯 Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Start development
npm start
```

---

## 🔐 Authentication

### Login

```javascript
// In any component
import { useLogin } from './hooks/mutations/useLogin';

const { mutate: login, isPending } = useLogin();

login({ email: 'test@test.com', password: 'password' });
```

### Logout

```javascript
// In any component
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';

const dispatch = useDispatch();
dispatch(logout());
```

### Get Current User

```javascript
import { useSelector } from 'react-redux';

const { user, isAuthenticated, token } = useSelector(state => state.auth);
```

---

## 👥 Fetching Users

### Get All Users

```javascript
import { useUsers } from './hooks/queries/useUsers';

const { data: users, isLoading, error, refetch } = useUsers();
```

### Get Single User

```javascript
import { useUser } from './hooks/queries/useUsers';

const { data: user, isLoading } = useUser(userId);
```

### Get User Posts

```javascript
import { useUserPosts } from './hooks/queries/useUsers';

const { data: posts } = useUserPosts(userId);
```

---

## 🔧 Making New API Calls

### 1. Create API Function

```javascript
// src/api/your.api.js
import api from './axios';

export const yourAPI = async params => {
  const response = await api.get('/your-endpoint', { params });
  return response.data;
};
```

### 2. Create Hook (for GET requests)

```javascript
// src/hooks/queries/useYourData.js
import { useQuery } from '@tanstack/react-query';
import { yourAPI } from '../../api/your.api';

export const useYourData = params => {
  return useQuery({
    queryKey: ['yourData', params],
    queryFn: () => yourAPI(params),
  });
};
```

### 3. Create Hook (for POST/PUT/DELETE)

```javascript
// src/hooks/mutations/useYourMutation.js
import { useMutation } from '@tanstack/react-query';
import { yourAPI } from '../../api/your.api';

export const useYourMutation = () => {
  return useMutation({
    mutationFn: yourAPI,
    onSuccess: data => {
      console.log('Success:', data);
    },
  });
};
```

### 4. Use in Component

```javascript
import { useYourData } from './hooks/queries/useYourData';

const { data, isLoading, error } = useYourData();
```

---

## 📱 Navigation

### Navigate to Screen

```javascript
navigation.navigate('ScreenName');
```

### Replace Current Screen

```javascript
navigation.replace('ScreenName');
```

### Go Back

```javascript
navigation.goBack();
```

### Pass Parameters

```javascript
navigation.navigate('ScreenName', { userId: 123 });

// In destination screen
const { userId } = route.params;
```

---

## 🎨 Adding New Redux State

### 1. Create Slice

```javascript
// src/features/yourFeature/yourSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const yourSlice = createSlice({
  name: 'yourFeature',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = yourSlice.actions;
export default yourSlice.reducer;
```

### 2. Add to Store

```javascript
// src/app/store.js
import yourReducer from '../features/yourFeature/yourSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  yourFeature: yourReducer, // Add here
});
```

### 3. Use in Component

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { setData } from './features/yourFeature/yourSlice';

const dispatch = useDispatch();
const data = useSelector(state => state.yourFeature.data);

dispatch(setData('new value'));
```

---

## 💾 Using MMKV Storage Directly

```javascript
import { storage } from './app/mmkvStorage';

// Set value
storage.set('key', 'value');

// Get value
const value = storage.getString('key');

// Delete value
storage.delete('key');

// Set object (automatically stringified)
storage.set('user', JSON.stringify({ name: 'John' }));
const user = JSON.parse(storage.getString('user'));
```

---

## 🎯 Common Patterns

### Protected Screen Component

```javascript
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ProtectedScreen({ navigation }) {
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Login');
    }
  }, [isAuthenticated, navigation]);

  return (/* Your UI */);
}
```

### Loading State

```javascript
{
  isLoading ? (
    <ActivityIndicator size="large" color="#ff3b30" />
  ) : (
    <YourContent />
  );
}
```

### Error Handling

```javascript
{
  isError && (
    <View>
      <Text>Error: {error.message}</Text>
      <TouchableOpacity onPress={refetch}>
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Pull to Refresh

```javascript
<FlatList
  data={data}
  refreshControl={
    <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
  }
/>
```

---

## 📝 File Naming Conventions

- **Screens**: `ScreenName.jsx` (PascalCase)
- **Components**: `ComponentName.jsx` (PascalCase)
- **Hooks**: `useHookName.js` (camelCase with 'use' prefix)
- **APIs**: `feature.api.js` (camelCase)
- **Slices**: `featureSlice.js` (camelCase)
- **Utilities**: `utilityName.js` (camelCase)

---

## 🔍 Debugging Tips

### View Redux State

```javascript
import { useSelector } from 'react-redux';

const state = useSelector(state => state);
console.log('Full Redux State:', state);
```

### View React Query Cache

```javascript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();
console.log('Query Cache:', queryClient.getQueryCache());
```

### Clear All Data (Logout + Clear Cache)

```javascript
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from './features/auth/authSlice';

const dispatch = useDispatch();
const queryClient = useQueryClient();

// Clear everything
dispatch(logout());
queryClient.clear();
```

---

## 🌐 Changing API Base URL

Edit `src/api/axios.js`:

```javascript
const api = axios.create({
  baseURL: 'https://your-api.com/api', // Change this
  timeout: 10000,
});
```

---

## 📦 Adding New Dependencies

```bash
# Add package
npm install package-name

# For iOS, install pods
cd ios && pod install && cd ..

# Rebuild app
npm run android
# or
npm run ios
```

---

## 🎨 Styling Tips

### Common Colors (from LoginScreen)

```javascript
const colors = {
  primary: '#ff3b30',
  background: '#f5f5f5',
  white: '#fff',
  text: '#333',
  textSecondary: '#666',
  border: '#ddd',
};
```

### Common Styles

```javascript
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    backgroundColor: '#ff3b30',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
});
```

---

## ⚡ Performance Tips

1. **Use React.memo** for expensive components
2. **Use useCallback** for functions passed as props
3. **Use useMemo** for expensive calculations
4. **Enable Hermes** (already enabled in new RN projects)
5. **Use FlatList** instead of ScrollView for long lists
6. **Optimize images** with proper resizeMode and size
7. **Remove console.logs** in production

---

## 🎯 Testing Login Flow

1. Run app: `npm run android`
2. Enter any email (e.g., `test@test.com`)
3. Enter any password (e.g., `123456`)
4. Tap "Login"
5. You'll be redirected to Home screen
6. Users list will load from JSONPlaceholder API
7. Tap "Logout" to test logout flow

---

**Happy Coding! 🚀**
