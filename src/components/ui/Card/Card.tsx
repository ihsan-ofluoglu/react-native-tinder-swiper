import React from 'react';
import { View, Image } from 'react-native';

import { H2 } from '../Heading';
import AppText from '../AppText';

import styles from './Card.styles';

export interface CardProps {
  readonly Poster: string;
  readonly Title: string;
  readonly Year: string;
  readonly Type: string;
}

interface Props {
  readonly element: CardProps;
}

const Card = ({ element }: Props) => (
  <View style={styles.card}>
    <Image source={{ uri: element.Poster }} style={styles.cardImage} />
    <View style={styles.cardBody}>
      <H2>{`${element.Title},  ${element.Year}`}</H2>
      <AppText>
        {`Type: ${element.Type.substring(0, 1).toLocaleUpperCase()}${element.Type.substr(1)}`}
      </AppText>
    </View>
  </View>
);

export default Card;
