import { IMovies, OmdbAPI } from '../core/omdb-service';
import * as React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { styles } from '../core/stylesheet';

export const DetailScreen = ({ navigation, route }) => {
  const { imdbId = 'tt0058590' } = route.params;
  const [item, setItem] = React.useState<IMovies | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const backend = new OmdbAPI()

  React.useEffect((): void => {
    setLoading(true)
    const url = `http://www.omdbapi.com/?apikey=968f91f7&i=${imdbId}`
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setItem(json)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <Text>Details Screen</Text>
      <Text>IMDB ID = {JSON.stringify(imdbId)}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <ScrollView>
        <View style={styles.item}>
          <View style={{ flexDirection: "row" }}>
            {item?.Poster === "N/A" &&
              <Image style={styles.posterDetail} source={require('../assets/default-image.png')} /> ||
              <Image style={styles?.posterDetail} source={item?.Poster} />}
            <View style={{ paddingLeft: 32 }}>
              <Text style={styles.title}>{item?.Title}</Text>
              <Text>{item?.Type}</Text>
              <Text>{item?.Year}</Text>
              <Text>{item?.imdbID}</Text>
              <Text>{JSON.stringify(item, null, 4)}</Text>
            </View>
          </View>
        </View>
      </ScrollView >

      {loading ? <Text>"Loading"</Text> : <Text>"Done"</Text>}
      <Text>{backend.searchByImdbIdURL(imdbId)}</Text>
    </View >
  );
}
