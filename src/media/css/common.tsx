import { Dimensions, StyleSheet, Appearance } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const colorScheme = Appearance.getColorScheme();

export const accentColor = '#265359';
export const accentPressedColor = '#337f8a';
export const blackColor = '#000000'; // #1C2126
export const blackPressedColor = '#353a40';
export const whiteColor = '#fff';
export const whitePressedColor = '#f0f0f0';
export const errorColor = '#B00020';
export const successColor = '#42ba96';
export const veryLightRed = '#EFE3E3';
export const borderLightGrey = '#00000027';
export const profileBorder = '#707070';
export const bgImageColor = '#F6F6F6';
export const orangeColor = '#F34445';
export const orangePressedColor = '#e65e5f';
export const blueColor = '#224A9A';
export const bluePressedColor = '#1e53bd';
export const greyColor = '#737373';
export const lightGreyColor = '#b8b8b8';
export const veryLightGreyColor = '#f0f1f1';
export const sliderTrackLightBlueColor = '#82b0db';
export const sliderTrackBlueColor = '#0084ff';
export const lightBlueColor = '#0084ff';
export const addNotesGreyColor = '#c5c4c5';
export const blueItenaryColor = '#2192FF';
export const buttonGreyColor = '#d1d1d1';
export const buttonPressedGreyColor = '#e3e3e3';
// export const styles = StyleSheet.create({
//   smallestFont: {
//     fontFamily: "Roboto",
//     fontSize: windowWidth * 0.027 /* 11 */,
//   },
//   xSmallFont: {
//     fontFamily: "Poppins-Regular",
//     fontSize: windowWidth * 0.03 /* 12 */,
//   },
//   xSmallRegular: {
//     fontFamily: "Poppins-Regular",
//     fontSize: windowWidth * 0.025,
//   },
//   regularFont: {
//     fontFamily: "Poppins-Regular",
//     fontSize: windowWidth * 0.037 /* 14 */,
//   },
//   mediumFont: {
//     fontFamily: "Poppins-Medium",
//     fontSize: windowWidth * 0.037 /* 14 */,
//   },
//   boldFont: {
//     fontFamily: "Poppins-Bold",
//     fontSize: windowWidth * 0.037 /* 14 */,
//   },
//   xboldFont: {
//     fontFamily: "Poppins-Bold",
//     fontSize: 18,
//   },
//   regularMedium: {
//     fontFamily: "Poppins-Regular",
//     fontSize: windowWidth * 0.04 /* 16 */,
//   },
//   semiBold: {
//     fontFamily: "Poppins-SemiBold",
//     fontSize: windowWidth * 0.03 /* 12 */,
//   },
//   semiXBold: {
//     fontFamily: "Poppins-SemiBold",
//     fontSize: windowWidth * 0.037 /* 14 */,
//   },
//   semiXXBold: {
//     fontFamily: "Poppins-SemiBold",
//     fontSize: windowWidth * 0.04 /* 16 */,
//   },
//   xMediumFont: {
//     fontFamily: "Poppins-Medium",
//     fontSize: windowWidth * 0.05 /* 18 */,
//   },
//   boldSemi: {
//     fontFamily: "Poppins-Bold",
//     fontSize: windowWidth * 0.03 /* 15 */,
//   },
//   boldMedium: {
//     fontFamily: "Poppins-Medium",
//     fontSize: windowWidth * 0.055 /* windowWidth / (windowWidth / 22) */ /* 22 */,
//   },
//   xSmallBold: {
//     fontFamily: "Poppins-Bold",
//     fontSize: windowWidth * 0.027,
//   },
//   regularProfileHeadingMedium: {
//     fontFamily: "Poppins-Regular",
//     fontSize: windowWidth * 0.045 /* 16 */,
//   },
// });

export const styles = StyleSheet.create({
  robotoLight13: {
    fontFamily: 'Roboto-Light',
    fontSize: windowWidth * 0.032,
  },
  robotoLight14: {
    fontFamily: 'Roboto-Light',
    fontSize: windowWidth * 0.037,
  },
  robotoRegular09: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.029,
  },
  robotoRegular10: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.03,
  },
  robotoRegular11: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.025,
  },
  robotoRegular12: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.027,
  },
  robotoRegular13: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.032,
  },
  robotoRegular13W700: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.032,
    fontWeight: '700',
  },
  robotoRegular14: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.037,
  },
  robotoRegular14W700: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.035,
    fontWeight: '700',
  },
  robotoRegular15W700: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.036,
    fontWeight: '700',
  },
  robotoRegular16W700: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.037,
    fontWeight: '700',
  },
  robotoRegular18: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.04,
  },
  robotoRegular18W700: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.04,
    fontWeight: '700',
  },
  robotoRegular24: {
    fontFamily: 'Roboto-Regular',
    fontSize: windowWidth * 0.05,
  },
  // Considering semi_bold as medium
  robotoSemibold10: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.03,
  },
  robotoSemibold10W700: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.03,
    fontWeight: '700',
  },
  robotoSemiBold12: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.03,
  },
  robotoSemibold13: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.032,
  },
  robotoSemibold14: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.037,
  },
  robotoSemibold24F700: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.045,
    fontWeight: '700',
  },
  robotoSemibold36: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.062,
  },
  robotoMedium16: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.04,
  },
  robotoMedium18: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.05,
  },
  robotoMedium24: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.058,
  },
  robotoBold16: {
    fontFamily: 'Roboto-Bold',
    fontSize: windowWidth * 0.04,
    fontWeight: '900',
  },
  robotoBold24: {
    fontFamily: 'Roboto-Medium',
    fontSize: windowWidth * 0.055,
    fontWeight: '700',
  },
  robotoBlack24: {
    fontFamily: 'Roboto-Black',
    fontSize: windowWidth * 0.07,
    fontWeight: '900',
  },
});

// Roboto Condensed
// Add fonts as required
export const robotoCondensed = StyleSheet.create({
  robotoCondensedRegular14: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: windowWidth * 0.037,
  },
});
