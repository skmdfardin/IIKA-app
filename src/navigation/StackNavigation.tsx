import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/user/SignUp';
import SplashScreen from '../screens/static/SplashScreen';
import { NavigationParamList } from '../types/navigation';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator<NavigationParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash_screen" component={SplashScreen} />
        {/* <Stack.Screen name="sign_up" component={SignUp} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
