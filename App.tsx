import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './src/navigations/AuthNavigation';
import { ThemeProvider } from './src/utils/globalStyle';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
