'use strict';

import { Dimensions } from "react-native";

var React = require('react-native');

var { StyleSheet } = React;

var { height, width } = Dimensions.get('window');
const windowWidth = window.width;


//Colors
// export const PrimaryColor = "#2e2694";
export const PrimaryColor = "#00492F";
export const SecondColor = "hsl(159, 60%, 92%)";
export const RedColor = '#B50000';
export const BlackText = 'hsl(98, 0%, 11%)';

//Button
// export const SecondaryBtn = '#E0F7EF';

module.exports = StyleSheet.create({

  //////////////////////// GENERAL

  padding_general: {
    padding: 20,
    backgroundColor: '#FFF'
  },

  background_general: {
    // backgroundColor: '#FFF'
    backgroundColor: 'hsl(50, 100%, 100%)'
    // backgroundColor: '#f2f2f2'
  },

  card_general: {
    width: width,
  },

  inputLogin: {
    // backgroundColor: '#FFFFFF',
    width: width * 0.80,
    shadowRadius: 5,
    marginBottom: 10,
    // borderColor: '#a4a4a4',
    // color: '#a4a4a4',
    backgroundColor: 'white',
    borderColor: PrimaryColor,
    borderWidth: 1,

  },

  gradient_general: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title_general: {
    color: '#FFF',
    fontSize: 28,
    // fontWeight: 'bold'   
    fontFamily: 'ssb_SemiBold',
  },

  subtitle_general: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: '300'
  },

  touchBookmark: {
    backgroundColor: PrimaryColor,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 15,
    bottom: -25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  touchBookmarkTran: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 50,
    height: 50,
    position: 'absolute',
    right: 15,
    top: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },


  //////////////////////// CATEGORIES

  title_categories: {
    color: '#FFF',
    fontSize: 16,
    // fontWeight: 'bold'
    fontFamily: 'ssb_SemiBold',

  },

  title_categories_background: {
    width: width,
    alignItems: 'center',
    padding: 15
  },

  title_categories_border: {
    height: 2,
    backgroundColor: PrimaryColor,
    width: 50
  },

  gradient_categories: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  background_categories: {
    width: width,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  gradient_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  title_2columns_background: {
    width: width * 0.50,
    alignItems: 'center',
    padding: 15
  },

  background_2columns: {
    width: width * 0.50,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  background_exercises: {
    width: width * 0.50,
    height: height / 4.35,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  //////////////////////// POSTS


  title_posts_categories: {
    color: '#FFF',
    fontSize: 13,
    padding: 10,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    paddingTop: 2
  },

  date_posts: {
    color: 'rgba(255,255,255,0.50)',
    fontSize: 11,
    padding: 10,
    paddingBottom: 0,

    fontFamily: 'ssb_SemiBold',
    // fontWeight: 'bold'
  },

  gradient_posts_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  background_posts_2columns: {
    width: width * 0.46,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  postDetail_background: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  postDetail_gradient: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  postDetail_title: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 5,
    lineHeight: 30,
  },

  postDetail_tag: {
    fontSize: 18,
    fontWeight: 'normal',
    color: PrimaryColor,
    lineHeight: 30,
  },

  postDetail_date: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
    marginLeft: 0,
    paddingLeft: 8
  },

  postCommentButton: {
    backgroundColor: PrimaryColor,
    elevation: 0,
    shadowOpacity: 0
  },

  postCommentText: {
    color: '#FFFFFF'
  },

  //////////////////////// DIETS

  title_diets: {
    color: '#FFF',
    fontSize: 17,
    marginBottom: 5,
    // fontWeight: 'bold'
    fontFamily: 'ssb_SemiBold',

  },

  title_diets_categories: {
    color: '#FFF',
    fontSize: 14,
    padding: 10,
    // fontWeight: 'bold'
    fontFamily: 'ssb_SemiBold',

  },

  category_diets: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: PrimaryColor,
    padding: 5
  },

  subcategory_diets: {
    color: '#FFF',
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 10,
  },

  gradient_diets: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.29,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  background_diets: {
    width: width,
    height: height * 0.29,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 15
  },

  gradient_diets_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  background_diets_2columns: {
    width: width * 0.46,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  background_diets_col: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info_diets: {
    backgroundColor: 'rgba(0,0,0,0.70)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    paddingBottom: 11,
    paddingTop: 11
  },

  title_diets_detail: {
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 30,
  },

  gtitle_diets_detail: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

  },

  description_diets_detail: {
    fontSize: 14,
  },

  col_diets: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'

  },

  titlecol_diets: {
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    fontSize: 15,
    marginTop: 5,
    color: PrimaryColor

  },

  tabs_diets: {
    backgroundColor: '#fafafa',
  },

  activetabs_diets: {
    backgroundColor: '#fafafa',
  },

  tabs_text_diets: {
    color: 'rgba(0,0,0,0.3)',
    fontWeight: 'normal'
  },

  activetabs_text_diets: {
    color: '#333',
    fontWeight: 'normal'
  },

  //////////////////////// CARDS

  title_card: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 3,
    // fontWeight: 'bold'   
    fontFamily: 'ssb_SemiBold',


  },

  category_card: {
    color: PrimaryColor,
    marginBottom: 3,
    fontSize: 14
  },

  subcategory_card: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.8
  },

  gradient_card: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.23,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  background_card: {
    width: width,
    height: height * 0.23,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 15
  },

  //////////////////////// WORKOUT DETAILS

  title_workout: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 3,
    // fontWeight: 'bold'
    fontFamily: 'ssb_SemiBold',

  },

  category_workout: {
    color: PrimaryColor,
    fontSize: 16,
    // fontWeight: 'bold'
    fontFamily: 'ssb_SemiBold',


  },

  gradient_workout: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  background_workout: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  col_workout: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'

  },

  titlecol_workout: {
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    fontSize: 18,
    color: PrimaryColor
  },

  icon_workout: {
    fontSize: 26,
    // fontWeight: 'bold',   
    fontFamily: 'ssb_SemiBold',


    color: '#ddd',
    position: 'absolute',
    right: 15
  },

  textButton_workout: {
    color: '#000'
  },

  button_workout: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: 'flex-start',
    borderColor: 'rgba(0,0,0,0.02)',
    height: 48,
    paddingLeft: 15,
    elevation: 0,
    shadowOpacity: 0
  },

  //////////////////////// EXERCISE

  footer_exercise: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginTop: 10,
    marginBottom: 5,
    elevation: 0,
    shadowOpacity: 0,
  },

  start_exercise: {
    backgroundColor: '#fff',
    borderColor: PrimaryColor,
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 5,
    width: width * 0.9
  },

  textStart_exercise: {
    color: PrimaryColor,
    fontSize: 16,
    // fontWeight: 'bold'
    fontFamily: 'ssb_SemiBold',

  },

  col_exercise: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  titlecol_exercise: {
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    marginTop: 2,
    marginBottom: 6,
    fontSize: 16,

  },

  title_exercise_background: {
    width: width,
    alignItems: 'flex-start',
    padding: 15
  },

  subtitle_exercise: {
    color: PrimaryColor,
  },

  icon_get: {
    fontSize: 14,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    color: PrimaryColor

  },

  icon_exercise: {
    width: 40, height: 40,
    marginTop: 10,
    marginBottom: 7
  },

  icon_videoexercise: {
    width: 50, height: 50,
    marginTop: 10,
    marginBottom: 7
  },

  playButton: {
    backgroundColor: PrimaryColor,
    elevation: 0,
    shadowOpacity: 0
  },

  playCol_exercise: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  },

  //////////////////////// START

  button_start: {
    minWidth: 250,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: PrimaryColor,
    marginBottom: 11,
    height: 53
  },

  //  this changing the logo size
  // logo_start: {
  //   width: 140,
  //   height: 169,
  //   marginTop: 15,
  //   marginBottom: 30
  // },
  logo_start: {
    width: 300,
    height: 500,
    marginTop: 15,
    // marginBottom: 0
  },
  login_screen_login: {
    width: 500,
    height: 500,
    marginTop: 15,
  },




  //////////////////////// LOGIN & SIGNUP

  button_auth: {
    minWidth: 200,
    backgroundColor: PrimaryColor,
    marginBottom: 8,
    height: 53,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },

  text_auth: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    minWidth: 200,
    marginTop: 5,
    color: '#808080',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },

  //////////////////////// HOME

  listitem_home: {
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },

  icon_home: {
    fontSize: 20,
    color: '#ddd'
  },

  note_home: {
    fontSize: 13,
  },

  //////////////////////// MENU

  container_menu: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  item_menu: {
    borderBottomWidth: 0,
    borderBottomColor: '#f7f8f9',
    marginLeft: 0,
    width: 300,
    // paddingRight: 20,
    // paddingLeft: 20,
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    // alignContent: 'flex-end'
  },

  text_menu: {
    fontSize: 16,
    // color: 'hsl(98, 0%, 11%)',
  },

  thumbnail_menu: {
    marginRight: 10,
    maxWidth: 40
  },

  icon_menu: {
    fontSize: 14,
    color: '#ddd'
  },

  footer_menu: {
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },


  //////////////////////// CARDIO

  TextInputArea: {
    flex: 5,
    justifyContent: 'space-between',
    borderColor: 'purple',
    padding: 20,
  },

  card: {
    flex: 1,
    height: 166,
    width: 117,
    borderRadius: 10,
    // borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#2e2694',
    backgroundColor: '#C6F7E9',
  },


  cardslayout: {
    flex: 10,
    flexDirection: 'row',
  },


  //////////////////// GENERAL
  CommentBox: {
    flex: 5,
    flexWrap: 'wrap',
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    margin: 10,
  },
  TertiaryBtnLinkText: {
    color: PrimaryColor,
  },
  TitleText: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

  },
  HOneTitles: {
    // fontSize: 13,
    fontSize: 13,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',
    color: PrimaryColor,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  secondText: {
    fontSize: 25,
  },


  //This is not being used right now...have to wrap workout card in a view for it to kick in
  CenterContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WorkoutSet: {
    // paddingTop: 5,
    paddingBottom: 5,
    // fontColor:'#E8E8E8',
    fontWeight: '200',
    fontSize: 13,
    color: '#54635E',
  },
  workoutDescription: {
    fontSize: 13,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  AddWorkout: {
    fontSize: 13,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

  },
  PrimaryButton: {
    height: 115,
    width: 47,
    color: '#00492e',
  },
  SecondButton: {
    height: 115,
    width: 47,
    color: SecondColor,
  },
  ActiveShadow: {
    alignSelf: 'flex-end',
    marginRight: 50,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  InputCard: {
    position: 'absolute',
    bottom: 0,
  },
  CameraApp: {
    // borderStyle: 'dashed',
    // width: 500,
    // height: 500,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },

  timerButton: {
    alignItems: 'flex-end',
  },

  // Timer Screen
  SideBySide: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },

  timerIconTextSize: {
    // color: '#b5b5b5',
    color: '#00492f',
    fontSize: 22,
    marginHorizontal: 5,
  },

  timerUserInput: {
    color: '#00492F',
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    textAlign: 'center',
  },

  timerTitle: {
    textAlign: 'center',
    marginBottom: 10,
    width: '100%',
    fontWeight: '200',
  },

  runningTimerInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 50,
  },
  runningTimerCount: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
  },
  runningTimerButtons: {
    marginTop: 200,
  },
  profileBackground: {
    backgroundColor: '#00492F',
    width: 330,
    height: 160,
    borderRadius: 20,
  },
  userProfileInfo: {
    backgroundColor: '#E0F7EF',
    width: 315,
    height: 62,
    borderRadius: 20,
    marginTop: 90,
    marginLeft: 7,
  },
  modalBorder: {
    borderColor: '#FFB800',
    borderWidth: 2,
  },
  modalContent: {
    display: 'flex',
    backgroundColor: 'white',
    flex: 0.4,
    borderLeftColor: '#FFB800',
    borderRightColor: '#FFB800',
    borderTopColor: '#FFB800',
    borderBottomColor: 'transparent',
    borderWidth: 2,
  },
  modalFooter: {
    // display: 'flex',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    // flexDirection: 'row',
    // backgroundColor: '#DBDBDB',
    // alignItems: 'flex-end',
    // borderTopColor: '#DBDBDB',
    // borderTopWidth: 1/2,
  },
  modalHeader: {
    // fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10,
    paddingTop: 10,
    fontFamily: 'ssb_SemiBold',


  },


  ///////// Texts ///////////
  boldText: {
    fontWeight: '700',
    fontSize: 18,
  },

  inputItem: {
    backgroundColor: '#F5F7F6',
    maxWidth: '75%',
    marginBottom: 30,
    marginLeft: 15,
    marginRight: 15,
    // left: 50,
  },

  inputLablel: {
    marginLeft: 15,
    fontSize: 20,
    color: 'hsl(98, 0%, 20%)',
  },
  topFormPadding: {
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    // fontWeight: 'bold',  
    paddingLeft: 20,
    color: 'hsl(98, 0%, 11%)'
  },
  paddingTop75: {
    paddingTop: 75,
  },
  buttonWithText: {
    margin: 25,
    maxWidth: '35%',
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    //can't get the padding on the left and right side right
  },



  // for the camera dotted image wrapper
  imageBox: {
    marginTop: '25%'
  },
  imageWrapper: {
    width: 250,
    height: 250,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignSelf: 'center',
    // alignContent: 'center',
  },
  centerItem: {
    alignSelf: 'center',
  },
  boldTitle: {
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',
    fontSize: 16,
  },
  instructionBox1: {
    width: 303,
    height: 150,
    borderColor: '#FF0000',
    // borderWidth: 1,
    justifyContent: 'center',
    borderStyle: 'solid',
    marginTop: 30,
    borderLeftWidth: 3,
  },

  instructionBox2: {
    width: 303,
    height: 110,
    borderColor: '#FF0000',
    // borderWidth: 1,
    justifyContent: 'center',
    borderStyle: 'solid',
    marginTop: 30,
    borderLeftWidth: 3,
  },

  marginCenter: {
    margin: 10,
  },
  fivepadding: {
    paddingTop: 8,
    paddingBottom: 5,
  },
  secondaryButtonText: {
    color: '#00492F',
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

  },
  DarkGreen: {
    backgroundColor: '#00492F',
  },
  LightGreen: {
    backgroundColor: '#E0F7EF',
  },
  primaryButtonText: {
    color: '#E7E9E7',
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

  },
  Red: {
    color: '#FF0000',
  },
  searchIcon: {
    paddingLeft: 5,
    paddingTop: 3,
    color: '#C4C4C4',
  },
  // search bar header background color
  headerBackground: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: width * 0.7,
    height: 50,
    paddingTop: 50,
    paddingBottom: 50,
    borderWidth: 1 / 4,
    borderColor: 'white',

  },
  // the actual search bar style
  searchBar: {
    backgroundColor: '#FAFAFA',
    width: width * 0.7,
    height: 50,
    borderWidth: 1 / 4,
    borderColor: 'transparent',
  },
  // search bar results (NOT the border colors of the list)
  searchBarStyle: {
    backgroundColor: '#fafafa',
    maxHeight: 300,
    width: width * 0.7,
    alignSelf: 'center',
  },
  // search bar results list style (So the border color and all)
  listDivider: {
    paddingLeft: 10,
    width: width * 0.7,
    borderTopColor: 'transparent',
  },
  // search bar - icon for the results
  searchicon: {
    flex: 1,
  },

  textAreaInput: {
    // height: 150,
    backgroundColor: '#FAFAFA',
    // width: '75%',
    // minHeight: '25%',
    margin: 15,
    marginTop: 0,
    overflow: 'scroll',
  },
  ButtonWithMenu: {
    display: "flex",
    flexDirection: 'row',
    margin: 15,
    marginTop: 0,
  },
  footerPrimaryButton: {
    color: '#00492F',
    fontSize: 16,
    // fontWeight: 'bold',
    // marginBottom: '-10%',
  },
  footerSecondButton: {
    backgroundColor: '#E0F7EF',
    borderRadius: 10,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',
    marginBottom: '-10%',
  },
  FooterCompartment: {
    paddingBottom: 10,
    borderTopColor: 'black',
    borderWidth: 2,
  },
  flexFooter: {
    alignItems: 'flex-end',
    borderColor: 'black',
  },
  primaryButton: {
    backgroundColor: '#00492F',
  },
  searchBarStyle: {
    backgroundColor: '#fafafa',
    maxHeight: 300,
  },
  listDivider: {
    padding: 10,
    borderBottomColor: '#ECECEC',
    borderWidth: 0.2,
  },
  listOfItems: {
    borderBottomWidth: 1,
    backgroundColor: '#F5F7F6',
    borderColor: '#C7971D',
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 5,
    // marginLeft: 25,
    // marginRight: 25,
  },
  exerciseDescription: {
    // paddingTop: 5,
    maxHeight: 20,
  },
  workoutTitle: {
    fontSize: 16,
    color: '#00492F',
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',
  },
  blah: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  Beside: {
    display: "flex",
    flexDirection: 'row',
  },
  CardioNumberText: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  timerText: {
    fontSize: 12,
    color: '#8A8A8A',
  },
  cardioInput: {
    fontSize: 36,
    // fontWeight: 'bold',
    fontFamily: 'ssb_Bold',
    width: 50,
    color: 'black',
    marginLeft: 5,
  },
  cardioInputDisplay: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: 'ssb_Bold',

    color: '#C4C4C4',
    marginLeft: 5,
    paddingTop: 10,
  },
  levelSpeed: {
    display: 'flex',
  },
  tempoInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: 25,
    marginRight: 3,
    textAlign: 'center',
    fontSize: 18,
  },
  repSelector: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: 'purple',
    borderColor: 'purple',
    borderWidth: 2,
  },
  Footers: {
    backgroundColor: 'white',
  },
  inputShadow: {
    borderTopColor: 'hsl(98, 0%, 88%)',
    borderTopWidth: 1,
    borderBottomColor: 'hsl(98, 0%, 95%)',
    borderBottomWidth: 2,
    borderRightColor: 'hsl(98, 0%, 93%)',
    borderRightWidth: 1,
    borderLeftColor: 'hsl(98, 0%, 93%)',
    borderLeftWidth: 1,
  },

  bottomRightButtons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 30,
  },
  bottomLeftButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 30,
  },

  bottomButtons: {
    position: 'absolute',
    bottom: 0,
  },
  customFooter: {
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'center',
    paddingBottom: 35,
    paddingTop: 25,
  },
  profileTitle: {
    fontSize: 13,
    color: 'hsl(98, 0%, 61%)',
    // fontWeight:'bold',
  },
  profileInfo: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    color: PrimaryColor,
  },
  profileInfo2: {
    fontSize: 12,

  },
  indexButton: {
    backgroundColor: 'transparent',
    color: PrimaryColor,
    borderColor: PrimaryColor,
    borderWidth: 1,
  },

  profileTitle: {
    fontSize: 13,
    // fontWeight: 'bold',
    color: 'hsl(98, 0%, 20%)',
  },
  profileSubtitle: {
    paddingTop: 5,
    paddingBottom: 5,
    // fontColor:'#E8E8E8',
    color: BlackText,
    fontSize: 10,
  },
  profileSubtitleBold: {
    color: BlackText,
    // fontWeight: 'bold',
    fontFamily: 'ssb_SemiBold',

    fontSize: 14,
  },
  NavbarIcon: {
    fontSize: 16,
    color: 'hsl(98, 0%, 11%)',
    // marginRight:10, 
    // marginTop:2
  },
  NavbarIconText: {
    fontSize: 8,
    alignItems: 'center',
    // marginRight:10, 

  },
  inputTextColor: {
    color: 'hsl(98, 0%, 11%)',
  },

  exerciseInfoIcon: {
    paddingRight: 10,
    marginRight: 10,
    padding: 10,
  },
  redDot: {
    color: '#B50000',
  },
  // end of the stylesheet
  startButton: {
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingTop: 15
  },
  WorkoutNotes: {
    // paddingTop: 15,
    fontSize: 13,
    // height: 66,
    paddingVertical: 25,
    paddingHorizontal: 35,
    backgroundColor: '#fbfcfc'

  },
  NoteTitle: {
    fontSize: 10,
    fontWeight: '200',
    color: '#54635E',
  },
  NoteDescription: {
    fontSize: 13,
    color: BlackText,
  },
  ExerciseInfo: {
    fontSize: 13,
    color: '#3E4C59',
  },
  Keyboardcontainer: {
    flex: 1
  },
  DisplayImageWidth: {
    width: 200,
  },
  animationSize: {
    width: 100,
    height: 100,
  },
});


