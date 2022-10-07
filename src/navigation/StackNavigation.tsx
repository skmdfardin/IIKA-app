import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/user/SignUp';
import SplashScreen from '../screens/static/SplashScreen';
import { StackNavigationParamList } from '../types/navigation';
import SliderScreen from '../screens/static/SliderScreen';
import SignIn from '../screens/user/SignIn';
// import ProductDisplayScreen from '../screens/ProductDisplayScreen';
import ProductDisplayHC from '../screens/static/ProductDisplayHC';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Hello from '../screens/static/Hello';
// import drawer from './DrawerNavigation';
// import Drawer from './DrawerNavigation';




const DrawerNav: FC = () => {
  const Drawer = createDrawerNavigator<StackNavigationParamList>();
  return (

    <Drawer.Navigator>
      <Drawer.Screen name="product_display_screen" component={ProductDisplayHC} />
      <Drawer.Screen name="hello" component={Hello} />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
  );
}



const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator<StackNavigationParamList>();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash_screen" component={SplashScreen} />
        <Stack.Screen name="slider_screen" component={SliderScreen} />
        <Stack.Screen name="sign_up" component={SignUp} />
        <Stack.Screen name="sign_in" component={SignIn} />
        {/* <Stack.Screen name="product_display_screen" component={ProductDisplayHC} /> */}
        <Stack.Screen name="Drawer" component={DrawerNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
