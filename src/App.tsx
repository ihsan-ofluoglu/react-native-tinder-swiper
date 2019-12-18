/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import Swiper from './containers/Swiper';
import { CardProps } from './components/ui/Card/Card';

import styles from './App.styles';

const App = () => {
  const [movies, setMovies] = useState<CardProps[]>();

  const getMovie = async () => {
    try {
      const response = await fetch('http://www.omdbapi.com/?apikey=4b4f58&s=der');

      if (!response) {
        return null;
      }

      return response.json();
    } catch (err) {
      console.log('TCL: movieData -> err', err);
      return err;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovie();

      setMovies(data.Search);
    };

    fetchData();
  }, []);

  if (!movies) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Swiper elements={movies} />
    </SafeAreaView>
  );
};

export default App;
