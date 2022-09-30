import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/user/SignUp';
import SplashScreen from '../screens/static/SplashScreen';
import { NavigationParamList } from '../types/navigation';
import SliderScreen from '../screens/static/SliderScreen';
import SignIn from '../screens/user/SignIn';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator<NavigationParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash_screen" component={SplashScreen} />
        <Stack.Screen name="slider_screen" component={SliderScreen} />
        <Stack.Screen name="sign_up" component={SignUp} />
        <Stack.Screen name="sign_in" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
