import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Omdb Sample App</Text>
        <StatusBar style="auto" />
        <ShowMovies />
      </View>
    </SafeAreaView>
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
    width: '80%'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  safeContainer: {
    marginTop: 60,
    flex: 1,
  },
});

export const ShowMovies = () => {
  const [movies, setMovies] = React.useState<IMovies[] | null>(null);
  const [text, setText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);


  const onChangeText = (newText: string) => {
    setText(newText)
  }

  const renderItem: { item: IMovies } = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Title}</Text>
      <Text>{item.Type}</Text>
      <Text>{item.Year}</Text>
      <Text>{item.Poster}</Text>
      <Text>{item.imdbID}</Text>
    </View>
  );

  React.useEffect((): void => {
    setLoading(true)
    backend.getMoviesByTitle(text).then(items => {
      if (items) {
        setMovies(items)
        setLoading(false)
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
      {loading ? <Text>"Loading"</Text> : <Text>"Done"</Text>}
      <ScrollView>
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.Title}
        />
        <Text>{JSON.stringify(movies, null, 2)}</Text>
      </ScrollView>
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
      console.log(JSON.stringify(json, null, 2))
      return json?.Search
    } catch (error) {
      console.error(error);
    }
  };

}

const backend = new OmdbAPI()

interface IMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
