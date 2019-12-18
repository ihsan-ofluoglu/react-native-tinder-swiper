import React, { ReactNode } from 'react';

import { Text, TextProps } from 'react-native';

import styles from './AppText.styles';

type Props = TextProps & {
  readonly children?: ReactNode;
};

const AppText = ({ children, style, ...otherProps }: Props) => (
  <Text style={[styles.text, style]} {...otherProps}>
    {children}
  </Text>
);

export default AppText;
