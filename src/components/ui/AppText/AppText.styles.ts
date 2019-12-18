import { StyleSheet } from 'react-native';
import { variables, color } from '../../../styles';

export default StyleSheet.create({
  text: {
    fontFamily: variables.fontFamily,
    fontSize: variables.font.size.small,
    color: color.gray[500],
  },
});
