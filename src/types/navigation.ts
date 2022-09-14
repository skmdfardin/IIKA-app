export type NavigationParamList = {
  slider_screen: undefined;
  splash_screen: undefined;
  sign_in: undefined;
  sign_up: undefined;
  new_user_landing: undefined;
  edit_profile_screen: undefined;
  add_farm: undefined;
  farm_details: undefined;
  add_pond: undefined;
  add_cycle: undefined;
  pond_details_active: {
    pondID: Number | string;
  };
  pond_details_inactive: {
    pondID: Number | string;
  };
};

export interface RootStackParamList extends NavigationParamList {}
