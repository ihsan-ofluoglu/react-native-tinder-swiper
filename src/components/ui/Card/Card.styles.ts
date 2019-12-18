import { StyleSheet } from 'react-native';
import { color, spacing } from '../../../styles';

export default StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 7,
    backgroundColor: color.white,
    borderWidth: 1,
    padding: spacing.normal,
    borderStyle: 'solid',
    borderColor: color.gray[300],
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardBody: {
    paddingTop: spacing.small,
  },
  cardImage: {
    flex: 1,
    width: '100%',
  },
});
