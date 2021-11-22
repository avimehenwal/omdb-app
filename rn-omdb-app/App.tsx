import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Working on App</Text>
      <StatusBar style="auto" />
      <ShowMovies />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ShowMovies = () => {
  const [movies, setMovies] = React.useState<IMovies | null>(null);

  React.useEffect((): void => {
    getMoviesFromApi().then(items => {
      if (items) {
        setMovies(items)
      }
    })
  }, [])

  return (
    <>
      <Text>{JSON.stringify(movies, null, 2)}</Text>
    </>
  )
}


const getMoviesFromApi = async () => {
  const key = '968f91f7'
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}`

  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(Object.keys(json))
    return json
  } catch (error) {
    console.error(error);
  }
};