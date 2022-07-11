import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SliderScreen from '../screens/SliderScreen';
import NewUserLanding from '../screens/user/NewUserLanding';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="slider_screen" component={SliderScreen} />
        <Stack.Screen name="splash_screen" component={SplashScreen} />
        {/* <Stack.Screen name="splash_screen" component={SplashScreen} /> */}
        {/* <Stack.Screen name="sign_in" component={SignIn} /> */}
        {/* <Stack.Screen name="sign_up" component={SignUp} /> */}
        <Stack.Screen name="new_user_landing" component={NewUserLanding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
