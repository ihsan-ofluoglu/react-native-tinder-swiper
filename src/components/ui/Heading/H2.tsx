import React, { FunctionComponent } from 'react';
import { TextProps } from 'react-native';

import BaseHeading from './BaseHeading';

import styles from './Heading.styles';

type Props = TextProps & {
  readonly className?: string;
};

const H2: FunctionComponent<Props> = ({ children, style, ...otherProps }) => (
  <BaseHeading style={[styles.h2, style]} {...otherProps}>
    {children}
  </BaseHeading>
);

export default H2;
