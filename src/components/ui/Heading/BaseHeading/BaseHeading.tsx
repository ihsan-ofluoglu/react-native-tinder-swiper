import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';

import styles from './BaseHeading.styles';

type Props = TextProps & {
  readonly children: ReactNode;
};

const BaseHeading = ({ children, style, ...otherProps }: Props) => (
  <Text style={[styles.baseHeading, style]} {...otherProps}>
    {children}
  </Text>
);

export default BaseHeading;
