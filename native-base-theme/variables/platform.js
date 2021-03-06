// @flow

import color from 'color';
import { Platform, Dimensions, PixelRatio } from 'react-native';

import { PLATFORM } from './commonColor';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === PLATFORM.IOS &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 896 ||
    deviceWidth === 896);

export default {
  platformStyle,
  platform,

  // Accordion
  accordionBorderColor: '#d3d3d3',
  accordionContentPadding: 10,
  accordionIconFontSize: 18,
  contentStyle: '#f5f4f5',
  expandedIconStyle: '#000',
  headerStyle: '#edebed',
  iconStyle: '#000',

  // ActionSheet
  elevation: 4,
  containerTouchableBackgroundColor: 'rgba(0,0,0,0.4)',
  innerTouchableBackgroundColor: '#fff',
  listItemHeight: 50,
  listItemBorderColor: 'transparent',
  marginHorizontal: -15,
  marginLeft: 14,
  marginTop: 15,
  minHeight: 56,
  padding: 15,
  touchableTextColor: '#757575',

  // Android
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
  buttonUppercaseAndroidText: true,

  // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',
  // badgePadding: platform === PLATFORM.IOS ? 3 : 0,
  badgePadding: 3 ,

  // Button
  buttonFontFamily: 'ssb_Bold',
  // buttonFontFamily: platform === PLATFORM.IOS ? 'System' : 'ssb_Bold',
  // buttonFontFamily: platform === PLATFORM.IOS ? 'System' : '' : 'Roboto_medium',

  buttonDisabledBg: '#b5b5b5',
  buttonPadding: 6,
  buttonDefaultActiveOpacity: 0.5,
  buttonDefaultFlex: 1,
  buttonDefaultBorderRadius: 2,
  buttonDefaultBorderWidth: 1,
  get buttonPrimaryBg() {
    return this.brandPrimary;
  },
  get buttonPrimaryColor() {
    return this.inverseTextColor;
  },
  get buttonInfoBg() {
    return this.brandInfo;
  },
  get buttonInfoColor() {
    return this.inverseTextColor;
  },
  get buttonSuccessBg() {
    return this.brandSuccess;
  },
  get buttonSuccessColor() {
    return this.inverseTextColor;
  },
  get buttonDangerBg() {
    return this.brandDanger;
  },
  get buttonDangerColor() {
    return this.inverseTextColor;
  },
  get buttonWarningBg() {
    return this.brandWarning;
  },
  get buttonWarningColor() {
    return this.inverseTextColor;
  },
  // Oct/17/2020 comment out ot see if I can fix font on iOS
  // get buttonTextSize() {
  //   return platform === PLATFORM.IOS
  //     ? this.fontSizeBase * 1.1
  //     : this.fontSizeBase - 1;
  // },
  get buttonTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get buttonTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },
  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },

  // Card
  cardDefaultBg: '#fff',
  cardBorderColor: '#ccc',
  cardBorderRadius: 2,
  // cardItemPadding: platform === PLATFORM.IOS ? 10 : 12,
  cardItemPadding:  10,

  // CheckBox
  // CheckboxRadius: platform === PLATFORM.IOS ? 13 : 0,
  // CheckboxBorderWidth: platform === PLATFORM.IOS ? 1 : 2,
  // CheckboxPaddingLeft: platform === PLATFORM.IOS ? 4 : 2,
  // CheckboxPaddingBottom: platform === PLATFORM.IOS ? 0 : 5,
  // CheckboxIconSize: platform === PLATFORM.IOS ? 21 : 16,
  // CheckboxIconMarginTop: platform === PLATFORM.IOS ? undefined : 1,
  // CheckboxFontSize: platform === PLATFORM.IOS ? 23 / 0.9 : 17,

  // CheckboxRadius: 13,
  // CheckboxBorderWidth:  1 ,
  // CheckboxPaddingLeft:  4 ,
  // CheckboxPaddingBottom:  0 ,
  // CheckboxIconSize: 21 ,
  // // CheckboxIconMarginTop: platform === PLATFORM.IOS ? undefined : 1,
  // CheckboxIconMarginTop: 1,
  // CheckboxIconMarginRight: 1,
  // CheckboxFontSize:  23,
  // checkboxBgColor: '#039BE5',
  // checkboxSize: 20,
  // checkboxTickColor: '#fff',
  // checkboxDefaultColor: 'transparent',
  // checkboxTextShadowRadius: 0,

  CheckboxRadius: platform === PLATFORM.IOS ? 13 : 0,
  CheckboxBorderWidth: platform === PLATFORM.IOS ? 1 : 2,
  CheckboxPaddingLeft: platform === PLATFORM.IOS ? 4 : 2,
  CheckboxPaddingBottom: platform === PLATFORM.IOS ? 0 : 5,
  CheckboxIconSize: platform === PLATFORM.IOS ? 19 : 16,
  CheckboxIconMarginTop: platform === PLATFORM.IOS ? undefined : 1,
  CheckboxFontSize: platform === PLATFORM.IOS ? 12 / 0.9 : 17,
  checkboxBgColor: '#C6F7E8',
  checkboxSize: 20,
  checkboxTickColor: '#fff',
  checkboxDefaultColor: 'transparent',
  checkboxTextShadowRadius: 0,
  
  // Color
  // brandPrimary: platform === PLATFORM.IOS ? '#007aff' : '#3F51B5',
  brandPrimary:'#007aff',
  brandInfo: '#62B1F6',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandDark: '#000',
  brandLight: '#a9a9a9',

  // Container
  containerBgColor: '#fff',

  // Date Picker
  datePickerFlex: 1,
  datePickerPadding: 10,
  datePickerTextColor: '#000',
  datePickerBg: 'transparent',

  // FAB
  fabBackgroundColor: 'blue',
  fabBorderRadius: 28,
  fabBottom: 0,
  fabButtonBorderRadius: 20,
  fabButtonHeight: 40,
  fabButtonLeft: 7,
  fabButtonMarginBottom: 10,
  fabContainerBottom: 20,
  fabDefaultPosition: 20,
  fabElevation: 4,
  fabIconColor: '#fff',
  fabIconSize: 24,
  fabShadowColor: '#000',
  fabShadowOffsetHeight: 2,
  fabShadowOffsetWidth: 0,
  fabShadowOpacity: 0.4,
  fabShadowRadius: 2,
  fabWidth: 56,

  // Font
  DefaultFontSize: 16,
  fontFamily: 'ssb_Regular',
  // fontFamily: platform === PLATFORM.IOS ? 'System' : 'ssb_Bold',
  // fontFamily: platform === PLATFORM.IOS ? 'System' : 'Roboto',




  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  // Footer
  footerHeight: 55,
  // footerDefaultBg: platform === PLATFORM.IOS ? '#F8F8F8' : '#3F51B5',
  footerDefaultBg: '#F8F8F8',
  footerPaddingBottom: 0,

  // FooterTab
  // tabBarTextColor: platform === PLATFORM.IOS ? '#6b6b6b' : '#b3c7f9',
  tabBarTextColor: '#6b6b6b',
  // tabBarTextSize: platform === PLATFORM.IOS ? 14 : 11,
  tabBarTextSize: 14,
  // activeTab: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  activeTab: '#007aff',
  sTabBarActiveTextColor: '#007aff',
  // tabBarActiveTextColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  tabBarActiveTextColor: '#007aff',
  // tabActiveBgColor: platform === PLATFORM.IOS ? '#cde1f9' : '#3F51B5',
  tabActiveBgColor: '#cde1f9',

  // Header
  // toolbarBtnColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  // toolbarDefaultBg: platform === PLATFORM.IOS ? '#F8F8F8' : '#3F51B5',
  // toolbarHeight: platform === PLATFORM.IOS ? 64 : 56,
  // toolbarSearchIconSize: platform === PLATFORM.IOS ? 20 : 23,
  // toolbarInputColor: platform === PLATFORM.IOS ? '#CECDD2' : '#fff',
  // searchBarHeight: platform === PLATFORM.IOS ? 30 : 40,
  // searchBarInputHeight: platform === PLATFORM.IOS ? 30 : 50,
  // toolbarBtnTextColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  // toolbarDefaultBorder: platform === PLATFORM.IOS ? '#a7a6ab' : '#3F51B5',
  // iosStatusbar: platform === PLATFORM.IOS ? 'dark-content' : 'light-content',

  toolbarBtnColor: '#007aff',
  toolbarDefaultBg: '#F8F8F8' ,
  toolbarHeight: 64,
  toolbarSearchIconSize: 20,
  toolbarInputColor: '#CECDD2',
  searchBarHeight: 30,
  searchBarInputHeight: 30,
  toolbarBtnTextColor: '#007aff',
  toolbarDefaultBorder: '#a7a6ab',
  iosStatusbar: 'dark-content',
  get statusBarColor() {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex();
  },
  get darkenHeader() {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex();
  },

  // Icon
  iconFamily: 'Ionicons',
  // iconFontSize: platform === PLATFORM.IOS ? 30 : 28,
  iconFontSize: 30,
  // iconHeaderSize: platform === PLATFORM.IOS ? 33 : 24,
  iconHeaderSize: 33,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: '#D9D5DC',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',
  inputHeightBase: 50,
  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return '#575757';
  },

  // Line Height
  buttonLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 25,
  // lineHeight: platform === PLATFORM.IOS ? 20 : 24,
  lineHeight: 20,
  // listItemSelected: platform === PLATFORM.IOS ? '#007aff' : '#3F51B5',
  listItemSelected: '#007aff',

  // List
  listBg: 'transparent',
  listBorderColor: '#c9c9c9',
  listDividerBg: '#f4f4f4',
  listBtnUnderlayColor: '#DDD',
  // listItemPadding: platform === PLATFORM.IOS ? 10 : 12,
  listItemPadding: 10,
  listNoteColor: '#808080',
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',

  // Radio Button
  // radioBtnSize: platform === PLATFORM.IOS ? 25 : 23,
  radioBtnSize:25,
  radioSelectedColorAndroid: '#3F51B5',
  // radioBtnLineHeight: platform === PLATFORM.IOS ? 29 : 24,
  radioBtnLineHeight: 29,
  get radioColor() {
    return this.brandPrimary;
  },

  // Segment
  // segmentBackgroundColor: platform === PLATFORM.IOS ? '#F8F8F8' : '#3F51B5',
  // segmentActiveBackgroundColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  // segmentTextColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  // segmentActiveTextColor: platform === PLATFORM.IOS ? '#fff' : '#3F51B5',
  // segmentBorderColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  // segmentBorderColorMain: platform === PLATFORM.IOS ? '#a7a6ab' : '#3F51B5',

  segmentBackgroundColor:'#F8F8F8',
  segmentActiveBackgroundColor:'#007aff',
  segmentTextColor: '#007aff',
  segmentActiveTextColor: '#fff',
  segmentBorderColor:'#007aff',
  segmentBorderColorMain: '#a7a6ab',

  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',

  // Tab
  tabBarDisabledTextColor: '#BDBDBD',
  // tabDefaultBg: platform === PLATFORM.IOS ? '#F8F8F8' : '#3F51B5',
  // topTabBarTextColor: platform === PLATFORM.IOS ? '#6b6b6b' : '#b3c7f9',
  // topTabBarActiveTextColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  // topTabBarBorderColor: platform === PLATFORM.IOS ? '#a7a6ab' : '#fff',
  // topTabBarActiveBorderColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',

  tabDefaultBg: '#F8F8F8',
  topTabBarTextColor:'#6b6b6b' ,
  topTabBarActiveTextColor:  '#007aff',
  topTabBarBorderColor:  '#a7a6ab' ,
  topTabBarActiveBorderColor: '#007aff',

  // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,

  // Text
  // textColor: '#000',
  textColor: '#222',
  inverseTextColor: '#fff',
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },

  // Title
  titleFontfamily: 'ssb_Bold',
  // titleFontfamily: platform === PLATFORM.IOS ? 'System' : 'Roboto_medium',

  // titleFontSize: platform === PLATFORM.IOS ? 17 : 19,
  // subTitleFontSize: platform === PLATFORM.IOS ? 11 : 14,
  // subtitleColor: platform === PLATFORM.IOS ? '#8e8e93' : '#FFF',
  // titleFontColor: platform === PLATFORM.IOS ? '#000' : '#FFF',

  titleFontSize: 17 ,
  subTitleFontSize:  11 ,
  subtitleColor:'#8e8e93',
  titleFontColor: '#000' ,

  // Other
  // borderRadiusBase: platform === PLATFORM.IOS ? 5 : 2,
  borderRadiusBase:  5 ,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30,

  // iPhoneX SafeArea
  Inset: {
    portrait: {
      topInset: 24,
      leftInset: 0,
      rightInset: 0,
      bottomInset: 34
    },
    landscape: {
      topInset: 0,
      leftInset: 44,
      rightInset: 44,
      bottomInset: 21
    }
  }
};
