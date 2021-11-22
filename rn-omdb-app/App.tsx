import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export const ShowMovies = () => {
  const [movies, setMovies] = React.useState<IMovies | null>(null);
  const [text, setText] = React.useState<string>("");

  const onChangeText = (newText: string) => {
    setText(newText)
  }

  React.useEffect((): void => {
    backend.getMoviesByTitle(text).then(items => {
      if (items) {
        setMovies(items)
      }
    })
  }, [text])

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text>{backend.searchByTitle(text)}</Text>
      <Text>{JSON.stringify(movies, null, 2)}</Text>
    </>
  )
}


type type = 'movie' | 'series' | 'episode'


class OmdbAPI {
  type?: string
  _key?: string
  base: string
  url?: string

  constructor(type: type = 'movie', _key = '968f91f7') {
    this.type = type
    this._key = _key
    this.url ?? `http://www.omdbapi.com/?i=tt3896198&apikey=${_key}`
    this.base = `http://www.omdbapi.com/?apikey=${_key}&type=${type}`
  }

  searchByTitle = (searchText: string) => {
    // trim spaces
    const canonicalized = searchText.replace(/\s+/g, '');
    this.url = `${this.base}&s=${canonicalized}`
    return this.url
  }

  getMoviesByTitle = async (searchText: string) => {
    // trim spaces
    const canonicalized = searchText.replace(/\s+/g, '');
    this.url = `${this.base}&s=${canonicalized}`

    try {
      const response = await fetch(this.url);
      const json = await response.json();
      console.log(Object.keys(json))
      return json
    } catch (error) {
      console.error(error);
    }
  };

}

const backend = new OmdbAPI()
