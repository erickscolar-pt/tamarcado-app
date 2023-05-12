import { View,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthProvider } from './src/contexts/AuthContext';


import Routes from './src/routes';

export default function App() {
  return (
        <NavigationContainer>
          <AuthProvider>
              <StatusBar backgroundColor='#D6AE20' barStyle="light-content" translucent={false}/>
              <Routes/>
          </AuthProvider>
        </NavigationContainer>

    
  );
}


