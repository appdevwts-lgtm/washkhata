# 🚀 React Native Authentication App - Complete Dataflow Documentation

## 📁 Project Structure

```
src/
├── api/                    # API Layer
│   ├── axios.js           # Axios instance with auth interceptor
│   ├── auth.api.js        # Authentication API endpoints
│   └── user.api.js        # User management API endpoints
├── app/                    # Redux Store Configuration
│   ├── store.js           # Redux store with persist config
│   ├── mmkvStorage.js     # MMKV storage instance
│   └── mmkvPersist.js     # MMKV persist adapter
├── features/               # Redux Slices
│   └── auth/
│       └── authSlice.js   # Authentication state management
├── hooks/                  # Custom React Hooks
│   ├── mutations/
│   │   └── useLogin.js    # Login mutation hook
│   └── queries/
│       └── useUsers.js    # User queries hooks
├── screen/                 # Screen Components
│   ├── LoginScreen.jsx    # Login UI
│   └── HomeScreen.jsx     # Home UI with users list
├── components/             # Reusable Components
│   └── AppSafeArea.jsx    # Safe area wrapper
├── App.jsx                 # Root component with providers
├── RootNavigator.jsx       # Stack navigation
└── TabNavigator.jsx        # Bottom tab navigation
```

---

## 🔄 Complete Dataflow

### 1️⃣ **App Initialization Flow**

```
App.jsx
  ├── Redux Provider (store)
  ├── React Query Provider (queryClient)
  └── NavigationContainer
      └── RootNavigator
          ├── Login Screen (initial)
          ├── Home Screen
          └── MainTabs (Tab Navigator)
```

**Key Points:**

- ✅ Redux Toolkit for global state
- ✅ React Query for server state
- ✅ Redux Persist with MMKV for encrypted storage
- ✅ Navigation with React Navigation

---

### 2️⃣ **Login Flow** (User Authentication)

```
LoginScreen.jsx
  ↓
  User enters email/password
  ↓
  Calls: useLogin() hook
  ↓
hooks/mutations/useLogin.js
  ├── Dispatches: loginStart() → Set loading: true
  ├── Calls: loginAPI(credentials)
  │   ↓
  │   api/auth.api.js
  │   ├── Uses axios instance from api/axios.js
  │   ├── Generates mock token & user data
  │   └── Returns: { token, user }
  ↓
  On Success:
  ├── Dispatches: loginSuccess({ token, user })
  │   ├── Updates Redux state:
  │   │   - token: "Bearer_xxxx"
  │   │   - user: { id, name, email, avatar, role }
  │   │   - isAuthenticated: true
  │   │   - loading: false
  │   └── MMKV auto-persists state
  └── Navigate to MainTabs

  On Error:
  └── Dispatches: loginFailure()
      └── Shows error alert
```

**Files Involved:**

1. `screen/LoginScreen.jsx` - UI & form handling
2. `hooks/mutations/useLogin.js` - React Query mutation + Redux integration
3. `api/auth.api.js` - API call logic
4. `api/axios.js` - HTTP client with auth interceptor
5. `features/auth/authSlice.js` - Redux state management
6. `app/store.js` - Redux store with persistence

---

### 3️⃣ **Home Screen Flow** (Protected Route)

```
HomeScreen.jsx
  ↓
  useSelector(state.auth) → Get current user & isAuthenticated
  ↓
  IF !isAuthenticated → Navigate to Login
  ↓
  IF isAuthenticated:
    ├── Display user profile card
    └── Call: useUsers() hook
        ↓
hooks/queries/useUsers.js
  ├── Uses React Query useQuery
  ├── Calls: getUsersAPI()
  │   ↓
  │   api/user.api.js
  │   ├── Fetches from JSONPlaceholder API
  │   ├── URL: https://jsonplaceholder.typicode.com/users
  │   └── Enhances data with avatars & status
  ↓
  Returns cached data with 5min stale time
  ├── isLoading → Show spinner
  ├── isError → Show error message
  └── data → Render FlatList of users
```

**Features:**

- ✅ Pull-to-refresh with `refetch()`
- ✅ Auto-caching with React Query
- ✅ Loading & error states
- ✅ Protected route (redirects if not authenticated)

---

### 4️⃣ **Logout Flow**

```
HomeScreen.jsx
  ↓
  User taps "Logout" button
  ↓
  Shows confirmation alert
  ↓
  Dispatches: logout()
  ↓
features/auth/authSlice.js
  ├── Resets state:
  │   - token: null
  │   - user: null
  │   - isAuthenticated: false
  │   - loading: false
  └── MMKV auto-clears persisted data
  ↓
  Navigate to Login screen
```

---

### 5️⃣ **Authentication Interceptor Flow**

```
Any API Request from App
  ↓
api/axios.js (Interceptor)
  ├── Reads token from Redux: store.getState().auth.token
  ├── IF token exists:
  │   └── Adds header: Authorization: Bearer <token>
  └── Sends request
```

This ensures all API calls are automatically authenticated!

---

## 🎯 API Endpoints (Current Implementation)

### Authentication APIs (`api/auth.api.js`)

| Function                 | Method | Endpoint        | Description                      |
| ------------------------ | ------ | --------------- | -------------------------------- |
| `loginAPI()`             | POST   | `/login`        | Login with email/password (mock) |
| `logoutAPI()`            | POST   | `/logout`       | Logout user (mock)               |
| `getUserProfileAPI()`    | GET    | `/user/profile` | Get current user profile         |
| `updateUserProfileAPI()` | PUT    | `/user/profile` | Update user profile              |

### User APIs (`api/user.api.js`)

| Function            | Method | Endpoint                                               | Description               |
| ------------------- | ------ | ------------------------------------------------------ | ------------------------- |
| `getUsersAPI()`     | GET    | `https://jsonplaceholder.typicode.com/users`           | Get all users (REAL API)  |
| `getUserByIdAPI()`  | GET    | `https://jsonplaceholder.typicode.com/users/:id`       | Get user by ID (REAL API) |
| `getUserPostsAPI()` | GET    | `https://jsonplaceholder.typicode.com/users/:id/posts` | Get user posts (REAL API) |
| `deleteUserAPI()`   | DELETE | `/users/:id`                                           | Delete user (mock)        |

---

## 🎨 Redux State Shape

```javascript
{
  auth: {
    token: "Bearer_abc123_1234567890",
    user: {
      id: 42,
      name: "john",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?img=42",
      role: "user"
    },
    isAuthenticated: true,
    loading: false
  }
}
```

This state is automatically persisted to MMKV encrypted storage!

---

## 🛠️ Technologies Used

| Technology           | Purpose                 |
| -------------------- | ----------------------- |
| **React Native**     | Mobile framework        |
| **Redux Toolkit**    | Global state management |
| **React Query**      | Server state & caching  |
| **Axios**            | HTTP client             |
| **React Navigation** | Navigation & routing    |
| **MMKV**             | Fast encrypted storage  |
| **Redux Persist**    | State persistence       |
| **JSONPlaceholder**  | Mock REST API           |

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Run on Android
npm run android

# Run on iOS
npm run ios

# Start Metro bundler
npm start
```

---

## 🔐 Login Demo

**Use any credentials:**

- Email: `test@example.com`
- Password: `password123`

The login is mocked, so any email/password will work for testing!

---

## 📊 React Query Cache Strategy

| Query Key               | Stale Time | Cache Time | Refetch On   |
| ----------------------- | ---------- | ---------- | ------------ |
| `['users']`             | 5 minutes  | 10 minutes | Window focus |
| `['user', userId]`      | 5 minutes  | 10 minutes | Window focus |
| `['userPosts', userId]` | 5 minutes  | 10 minutes | Window focus |

---

## 🔄 State Persistence Flow

```
Redux State Change
  ↓
redux-persist middleware
  ↓
mmkvPersist adapter
  ↓
MMKV storage.set(key, value)
  ↓
Encrypted storage on device
```

**Benefits:**

- ⚡ 30x faster than AsyncStorage
- 🔒 Encrypted by default
- 💾 Survives app restarts
- 🎯 Zero config needed

---

## 📱 Screen Navigation Map

```
Login Screen (Auth Stack)
  ↓ (After successful login)
  ↓
Main Tabs (Protected)
  ├── Home Tab → HomeScreen.jsx
  ├── Tab 2 → HomeScreen.jsx (placeholder)
  └── Tab 3 → HomeScreen.jsx (placeholder)
```

---

## ✅ Features Implemented

- ✅ User login with form validation
- ✅ Auto-navigation based on auth state
- ✅ Logout with confirmation
- ✅ Protected routes (redirect if not authenticated)
- ✅ Persistent authentication (survives app restart)
- ✅ Loading & error states
- ✅ Pull-to-refresh
- ✅ User list from real API (JSONPlaceholder)
- ✅ Auto token injection in requests
- ✅ Clean, modern UI design
- ✅ TypeScript-ready structure

---

## 🎯 Next Steps / Enhancements

1. **Replace Mock APIs**: Update `baseURL` in `api/axios.js` and implement real endpoints
2. **Add Register Screen**: Create signup flow
3. **User Profile Screen**: Show detailed user info
4. **Add More Tabs**: Implement Settings, Profile, etc.
5. **Error Boundary**: Add global error handling
6. **Biometric Auth**: Add Face ID / Touch ID
7. **Push Notifications**: Integrate Firebase Cloud Messaging
8. **Offline Support**: Add offline queue for mutations
9. **Dark Mode**: Implement theme switching
10. **Unit Tests**: Add Jest tests for hooks & reducers

---

## 🐛 Troubleshooting

### Issue: "Cannot read token from undefined"

**Solution**: Make sure Redux Provider is wrapping the app in `App.jsx`

### Issue: "Network request failed"

**Solution**: Check internet connection or API endpoint

### Issue: "Redux state not persisting"

**Solution**: Verify MMKV is properly installed: `cd ios && pod install`

---

## 📞 Support

For issues or questions, check the conversation history or create a new issue.

---

**Built with ❤️ using React Native + Redux Toolkit + React Query**
