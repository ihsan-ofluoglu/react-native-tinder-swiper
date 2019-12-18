import { TextStyle } from 'react-native';
import normalize from '../utils/normalizeText';

const FONT_SIZE_BASE = 16;

type Weight = { [key: string]: TextStyle['fontWeight'] };

export default {
  fontFamily: 'Cochin',
  font: {
    size: {
      xsmall: normalize(FONT_SIZE_BASE - 4),
      small: normalize(FONT_SIZE_BASE - 2),
      normal: normalize(FONT_SIZE_BASE),
      medium: normalize(FONT_SIZE_BASE + 2),
      large: normalize(FONT_SIZE_BASE + 4),
      xlarge: normalize(FONT_SIZE_BASE + 6),
    },
    weight: {
      light: '300',
      regular: '400',
      medium: '500',
      bold: '600',
    } as Weight,
  },
  buttonHeight: 40,
};
