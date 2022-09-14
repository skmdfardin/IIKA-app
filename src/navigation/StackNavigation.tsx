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
import FarmDetails from '../screens/farm/FarmDetails';
import AddCycle from '../screens/cycle/AddCycle';
import AddPond from '../screens/pond/AddPond';
import PondDetailsActive from '../screens/pond/PondDetailsActive';
import PondDetailsInactive from '../screens/pond/PondDetailsInactive';
import { NavigationParamList } from '../types/navigation';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator<NavigationParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash_screen" component={SplashScreen} />
        <Stack.Screen name="slider_screen" component={SliderScreen} />
        <Stack.Screen name="sign_in" component={SignIn} />
        <Stack.Screen name="sign_up" component={SignUp} />
        <Stack.Screen name="edit_profile_screen" component={EditProfileScreen} />
        <Stack.Screen name="new_user_landing" component={NewUserLanding} />
        <Stack.Screen name="add_farm" component={AddFarm} />
        <Stack.Screen name="add_pond" component={AddPond} />
        <Stack.Screen name="farm_details" component={FarmDetails} />
        <Stack.Screen name="pond_details_active" component={PondDetailsActive} />
        <Stack.Screen name="pond_details_inactive" component={PondDetailsInactive} />
        <Stack.Screen name="add_cycle" component={AddCycle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
