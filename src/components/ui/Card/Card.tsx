import React from 'react';
import { View, Image } from 'react-native';

import styles from './Card.styles';

export interface CardProps {
  readonly Poster: string;
}

interface Props {
  readonly element: CardProps;
}

const Card = ({ element }: Props) => (
  <View style={styles.card}>
    <Image source={{ uri: element.Poster }} style={styles.cardImage} />
  </View>
);

export default Card;
