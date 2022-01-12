import React from 'react';
import { View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import Svg, { Path } from "react-native-svg";


// Props should have a list of menu text strings and a function provided by the 
// parent that will do some action when the menu item is selected. 
// See SetsAndReps.js onMenuAction() for an example

// The styling is it's own beast. Check the github page for react-native-popup-menu for examples
const optionsStyles = {
  optionsContainer: {
    // backgroundColor: 'green',
    padding: 5,
    width: 'auto',
    // flex: 0,
  },
  optionsWrapper: {
    // backgroundColor: 'purple',
  },
  optionWrapper: {
    // backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    // underlayColor: 'gold',
    // activeOpacity: 70,
    // width: '10',
  },
  optionText: {
    // color: 'brown',
  },
};

export const ThreeDotMenu = (props) => (
  <View>
    <Menu>
      <MenuTrigger onPress={props.onPress}>
        {/* <MaterialCommunityIcons name='dots-vertical' size={25} color="black" /> */}
        <Svg viewBox="0 0 64 512"
          height={22}
          width={22}
          fill='#222'
        >
          <Path d="M32 224c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM0 136c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z" />
        </Svg>
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        {props.menuActions.map((text) => (
          <MenuOption key={text} onSelect={() => props.onMenuAction(text)} text={text} />
        ))}
      </MenuOptions>
    </Menu>
  </View>
);

