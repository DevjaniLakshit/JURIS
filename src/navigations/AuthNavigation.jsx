import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AuthStackParamList } from './type';
import Login from '../screens/auth/Login';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
}

export default AuthNavigation;
