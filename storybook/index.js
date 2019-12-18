import React from 'react';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { AppRegistry, View, Platform } from 'react-native';

import { loadStories } from './storyLoader';

import './rn-addons';

const iosBarHeight = 20;

addDecorator(storyFn => (
  <View
    style={{
      paddingBottom: 16,
      backgroundColor: '#f7f7f7',
      flexGrow: 1,
      paddingTop: Platform.OS === 'ios' ? iosBarHeight + 16 : 16,
    }}
  >
    {storyFn()}
  </View>
));

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('crnaproject01', () => StorybookUIRoot);

export default StorybookUIRoot;
