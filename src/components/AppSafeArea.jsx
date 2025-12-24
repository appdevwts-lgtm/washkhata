import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppSafeArea({ children , barStyle="dark-content" , backgroundColor="#ffffff" }) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
    <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
         {children}
    </SafeAreaView>
  );
}
