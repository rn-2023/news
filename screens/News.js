import React,{ useState,useEffect } from 'react';
import {StyleSheet,View, Text, Image, ScrollView, Pressable} from 'react-native';

const URL = 'https://newsapi.org/v2';
const APIKEY = ''; // YOUR OWN API KEY HERE

export default function News({ navigation }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const criteria = 'top-headlines?country=us&category=business';
    const address = URL + '/' + criteria + '&apikey=' + APIKEY;
    fetch(address)
    .then(res => res.json())
    .then(
      (result) => {
        setError(null);
        setIsLoaded(true);
        setItems(result.articles);
      },(error) => {
        setError(error);
        setIsLoaded(true);
        setItems([]);
      }
    )
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  else if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {items.map((item, index) =>(
            (item.title !== "[Removed]" && item.title !== null &&
            item.urlToImage !== null && item.description !== null ) &&
            <Pressable 
              key={index} 
              onPress={() => navigation.navigate('Details', {news: item}) }>
                <View style={styles.news} key={item.title}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.imageWrapper}>
                    <Image
                      style={styles.thumbnail}
                      source={{
                        uri: item.urlToImage,
                      }}
                    />
                  </View>
                </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  news: {
    padding: 20,
    alignItems: 'stretch',
    borderTopWidth: 2,
    borderTopColor: '#333'
  },
  imageWrapper: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    margin: 0,
    padding: 0,
  },
  thumbnail: {
    width: 250,
    height: 250,
  },
});