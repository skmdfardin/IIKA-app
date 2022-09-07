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
import AddPond from '../screens/pond/AddPond';
import PondDetails from '../screens/pond/PondDetails';
import CycleHistory from '../screens/cycle/CycleHistory';
import CycleSummaryCard from '../components/cycleComponents/CycleSummaryCard';

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
        <Stack.Screen name={ADD_CYCLE} component={AddCycle} />
        <Stack.Screen name={ADD_FARM} component={AddFarm} />
        <Stack.Screen name={ADD_POND} component={AddPond} />
        <Stack.Screen name={POND_DETAILS} component={PondDetails} />
        <Stack.Screen name={CYCLE_HISTORY} component={CycleHistory} />
        <Stack.Screen name={CYCLE_SUMMARY_CARD} component={CycleSummaryCard} />
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
export const ADD_POND = 'add_pond';
export const ADD_CYCLE = 'add_cycle';
export const POND_DETAILS = 'pond_details';
export const CYCLE_HISTORY = 'cycle_history';
export const CYCLE_SUMMARY_CARD = 'cycle_summary_card';
export default StackNavigation;
