import { IMovies, OmdbAPI } from '../core/omdb-service';
import * as React from 'react';
import { Pressable, View, Text, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { styles } from '../core/stylesheet';

export const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = React.useState<IMovies[] | null>(null);
  const [text, setText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const backend = new OmdbAPI()

  const onChangeText = (newText: string) => {
    setText(newText)
  }

  const onPressFunction = (selectedItem: IMovies) => {
    console.log('Pressed selectedItem = ', selectedItem.Title)
    navigation.navigate('Details', {
      imdbId: selectedItem.imdbID,
    })
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable onPress={() => onPressFunction(item)}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text>{item.Type}</Text>
        <Text>{item.Year}</Text>
        {item.Poster === "N/A" &&
          <Image style={styles.poster} source={require('../assets/default-image.png')} /> ||
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <Text>Type movie title to search</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />

      <ScrollView>
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.imdbID}
        />
        {/* <Text>{JSON.stringify(movies, null, 2)}</Text> */}
      </ScrollView>

      {/* status widgets */}
      {loading ? <Text>"Loading"</Text> : <Text>"Done"</Text>}
      <Text>{backend.searchByTitleURL(text)}</Text>
    </View>
  );
}
