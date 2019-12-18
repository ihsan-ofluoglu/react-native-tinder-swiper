import { StyleSheet, Dimensions } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  swiper: {
    flex: 1,
  },
  animated: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute',
  },
});
