import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

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
  poster: {
    width: 50,
    height: 50,
  },
});

export const ShowMovies = () => {
  const [movies, setMovies] = React.useState<IMovies[] | null>(null);
  const [text, setText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);


  const onChangeText = (newText: string) => {
    setText(newText)
  }
  const onPressFunction = (selectedItem) => {
    console.log('Pressed selectedItem = ', selectedItem.Title)
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable onPress={onPressFunction(item)}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text>{item.Type}</Text>
        <Text>{item.Year}</Text>
        {item.Poster === "N/A" &&
          <Text style={styles.poster}>N/A</Text> ||
          <Image style={styles.poster} source={item.Poster} />}
        <Text>{item.imdbID}</Text>
      </Pressable>
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
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text>{backend.searchByTitle(text)}</Text>
      {loading ? <Text>"Loading"</Text> : <Text>"Done"</Text>}
      <ScrollView>

        <TouchableHighlight onPress={onPressFunction(mockMovie)}>
          <View style={styles.item}>
            <Text style={styles.title}>{mockMovie.Title}</Text>
            <Text>{mockMovie.Type}</Text>
            <Text>{mockMovie.Year}</Text>
            {mockMovie.Poster === "N/A" &&
              <Text style={styles.poster}>N/A</Text> ||
              <Image style={styles.poster} source={mockMovie.Poster} />}
            <Text>{mockMovie.imdbID}</Text>
          </View>
        </TouchableHighlight>

        {/* <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.imdbID}
        /> */}
        {/* <Text>{JSON.stringify(movies, null, 2)}</Text> */}
      </ScrollView>
    </View>

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
    const url = `${this.base}&s=${canonicalized}`
    return this.useGet(url)
  };

  getMoviesById = (imdbId: string) => {
    const url = `${this.base}&i=${imdbId}`
    return this.useGet(url)
  }

  useGet = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(JSON.stringify(json, null, 2))
      return json?.Search
    } catch (error) {
      console.error(error);
    }
  }
}

const backend = new OmdbAPI()

interface IMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const mockMovie: IMovies = {
  Title: "Sample Title",
  Year: "1988",
  imdbID: "tt0058590",
  Type: "Movie",
  Poster: "N/A"
}