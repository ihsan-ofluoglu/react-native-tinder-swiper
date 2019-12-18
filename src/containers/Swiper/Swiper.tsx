import React, { useEffect, useState } from 'react';
import {
  Animated,
  View,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
} from 'react-native';

import Card, { CardProps } from '../../components/ui/Card/Card';
import styles, { SCREEN_WIDTH } from './Swiper.styles';

interface Props {
  readonly elements: CardProps[];
  readonly onChange?: () => void;
}

const Swiper = ({ elements, onChange }: Props) => {
  const [panResponder, setPanResponder] = useState<PanResponderInstance>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentCardStyles, setCurrentCardStyles] = useState();
  const [nextCardStyles, setNextCardStyles] = useState();

  const interpolate = (position: Animated.ValueXY, outputRange: number[] | string[]) => {
    return position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange,
      extrapolate: 'clamp',
    });
  };

  const setAnimatedStarter = (position: Animated.ValueXY) => {
    setCurrentIndex(currentValue => currentValue + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const getAnimated = (
    position: Animated.ValueXY,
    toValue: {
      x: number;
      y: number;
    },
  ) => {
    return Animated.spring(position, {
      toValue,
    }).start(() => setAnimatedStarter(position));
  };

  const handlePanResponderMove = (position: Animated.ValueXY, gs: PanResponderGestureState) => {
    position.setValue({ x: gs.dx, y: gs.dy });
  };

  const handlePanResponserRelease = (position: Animated.ValueXY, gs: PanResponderGestureState) => {
    if (gs.dx > 120) {
      getAnimated(position, { x: SCREEN_WIDTH + 100, y: gs.dy });
      if (onChange) {
        onChange();
      }
    } else if (gs.dx < -120) {
      getAnimated(position, { x: -SCREEN_WIDTH - 100, y: gs.dy });
      if (onChange) {
        onChange();
      }
    } else {
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        friction: 4,
      }).start();
    }
  };

  useEffect(() => {
    const position = new Animated.ValueXY();

    const rotate = interpolate(position, ['-10deg', '0deg', '10deg']);

    const nextCardOpacity = interpolate(position, [1, 0, 1]);
    const nextCardScale = interpolate(position, [1, 0.8, 1]);

    const pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gs) => {
        handlePanResponderMove(position, gs);
      },
      onPanResponderRelease: (e, gs) => {
        handlePanResponserRelease(position, gs);
      },
    });

    setPanResponder(pan);
    setCurrentCardStyles([
      {
        transform: [
          {
            rotate,
          },
          ...position.getTranslateTransform(),
        ],
      },
      styles.animated,
    ]);

    setNextCardStyles([
      { opacity: nextCardOpacity, transform: [{ scale: nextCardScale }] },
      styles.animated,
    ]);
  }, []);

  if (!panResponder) {
    return null;
  }

  return (
    <View style={styles.swiper}>
      {elements
        .map((element, i) => {
          if (i < currentIndex) {
            return null;
          }
          if (i === currentIndex) {
            return (
              <Animated.View
                {...panResponder.panHandlers}
                key={element.Poster}
                style={currentCardStyles}
              >
                <Card key={element.Poster} element={element} />
              </Animated.View>
            );
          }
          return (
            <Animated.View key={element.Poster} style={nextCardStyles}>
              <Card key={element.Poster} element={element} />
            </Animated.View>
          );
        })
        .reverse()}
    </View>
  );
};

export default Swiper;
