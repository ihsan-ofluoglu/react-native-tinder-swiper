import React, { useEffect, useState } from 'react';
import { Animated, View, PanResponder, PanResponderInstance } from 'react-native';

import Card, { CardProps } from '../../components/ui/Card/Card';
import styles, { SCREEN_WIDTH } from './Swiper.styles';

interface Props {
  readonly elements: CardProps[];
}

const Swiper = ({ elements }: Props) => {
  const [panResponder, setPanResponder] = useState<PanResponderInstance>();
  const [position, setPosition] = useState<Animated.ValueXY>();
  const [rotation, setRotation] = useState<Animated.AnimatedInterpolation>();
  const [opacity, setOpacity] = useState<Animated.AnimatedInterpolation>();
  const [nextRotate, setNextRotate] = useState<Animated.AnimatedInterpolation>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const pos = new Animated.ValueXY();

    const rot = pos.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });

    const nextCardO = pos.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });

    const nextCardS = pos.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });

    const pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gs) => {
        pos.setValue({ x: gs.dx, y: gs.dy });
      },
      onPanResponderRelease: (e, gs) => {
        if (gs.dx > 120) {
          Animated.spring(pos, {
            toValue: { x: SCREEN_WIDTH + 100, y: gs.dy },
          }).start(() => {
            setCurrentIndex(currentValue => currentValue + 1);
            pos.setValue({ x: 0, y: 0 });
          });
        } else if (gs.dx < -120) {
          Animated.spring(pos, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gs.dy },
          }).start(() => {
            setCurrentIndex(currentValue => currentValue + 1);
            pos.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(pos, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });

    setPosition(pos);
    setPanResponder(pan);
    setRotation(rot);
    setOpacity(nextCardO);
    setNextRotate(nextCardS);
  }, []);

  if (!panResponder) {
    return null;
  }

  if (!position) {
    return null;
  }

  if (!opacity) {
    return null;
  }

  if (!nextRotate) {
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
                style={[
                  {
                    transform: [
                      {
                        rotate: rotation,
                      },
                      ...position.getTranslateTransform(),
                    ],
                  },
                  styles.animated,
                ]}
              >
                <Card key={element.Poster} element={element} />
              </Animated.View>
            );
          }
          return (
            <Animated.View
              key={element.Poster}
              style={[{ opacity, transform: [{ scale: nextRotate }] }, styles.animated]}
            >
              <Card key={element.Poster} element={element} />
            </Animated.View>
          );
        })
        .reverse()}
    </View>
  );
};

export default Swiper;
