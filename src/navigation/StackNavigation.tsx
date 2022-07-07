import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/static/SplashScreen';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash_screen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
