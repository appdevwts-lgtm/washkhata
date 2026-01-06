import React from 'react';
import RootNavigation from './RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { injectStore } from './api/axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// Inject store into axios to avoid circular dependency
injectStore(store);

const queryClient = new QueryClient();


const App = ()=>{
    return (
        <Provider store={store}> 
            <QueryClientProvider client={queryClient}>
               <SafeAreaProvider>
               <NavigationContainer>
                 <RootNavigation/>
               </NavigationContainer>
               </SafeAreaProvider>
           </QueryClientProvider>
        </Provider>
          
    )
}

export default App;