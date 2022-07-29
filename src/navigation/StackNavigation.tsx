import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SliderScreen from '../screens/static/SliderScreen';
import NewUserLanding from '../screens/user/NewUserLanding';
import SignIn from '../screens/user/SignIn';
import SignUp from '../screens/user/SignUp';
import SplashScreen from '../screens/static/SplashScreen';
import EditProfileScreen from '../screens/user/EditProfile';
import AddFarm from '../screens/farm/AddFarm';
import AddCycle from '../screens/cycle/AddCycle';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={SLIDER_SCREEN} component={SliderScreen} />
        <Stack.Screen name={SIGN_IN} component={SignIn} />
        <Stack.Screen name={SIGN_UP} component={SignUp} />
        <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen} />
        <Stack.Screen name={NEW_USER_LANDING} component={NewUserLanding} />
        <Stack.Screen name={ADD_FARM} component={AddFarm} />
        <Stack.Screen name={ADD_CYCLE} component={AddCycle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const SLIDER_SCREEN: string = 'slider_screen';
export const SPLASH_SCREEN: string = 'splash_screen';
export const SIGN_IN: string = 'sign_in';
export const SIGN_UP: string = 'sign_up';
export const NEW_USER_LANDING: string = 'new_user_landing';
export const EDIT_PROFILE_SCREEN = 'edit_profile_screen';
export const ADD_FARM = 'add_farm';
export const ADD_CYCLE = 'add_cycle';

export default StackNavigation;
