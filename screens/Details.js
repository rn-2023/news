import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler } from 'react-native';

export default function Details({ route, navigation }) {

  const [title, setTitle] = useState('');
  const [published, setPublished] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  
  useEffect(() => {
    if (route.params?.news) {
      console.log(route.params.news);
      setTitle(route.params.news.title);
      setPublished(convertDatetime(route.params.news.publishedAt));
      setAuthor(route.params.news.author);
      setImage(route.params.news.urlToImage);
      setDescription(route.params.news.description);
      setSource(route.params.news.source.name);
    }
    BackHandler.addEventListener('hardwareBackPress',close);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress',close);
    }
  }, [route.params?.news])

  const convertDatetime = (datetime) => {
    const date = datetime.split("T")[0].split("-").reverse().join(".");
    const time = datetime.split("T")[1].slice(0, -4);
    return date + " " + time;
  }
 
  const close = () => {
    navigation.goBack(null);
    return true;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>Published {published} by {author}</Text>
      { image.length > 0 && 
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
      } 
      <Text>{description}</Text>
      <Text>Source: {source}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  news: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  imageWrapper: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
});