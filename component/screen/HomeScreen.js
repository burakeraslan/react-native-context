import React, { useContext, useState } from "react"
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl, StyleSheet } from "react-native"

import { BlogContext } from "../../context/Contex"
import { StatusBar } from "expo-status-bar"

import { useFonts } from 'expo-font'

const HomeScreen = ({navigation}) => {

  const [fontsLoaded] = useFonts({
    'Merriweather-Light': require('../../assets/font/Merriweather-Light.ttf'),
    'Merriweather-Regular': require('../../assets/font/Merriweather-Regular.ttf'),
  })

  // Veriler "Context API" ile getiriliyor.
  // The data is fetched using the "Context API".
  const {blogData, fetchData, loadMore, setPage} = useContext(BlogContext)

  const [refreshing, setRefreshing] = useState(false)
  
  // FlatList render.
  const renderItem = ({item}) => {

    return(
      <View style={styles.post}>

        <View style={styles.banner}>
          <Image
            style={styles.photo}
            source={{uri:`${item.banner}`}}
          />
        </View>

        <View style={styles.readingTime}>
          <Text style={styles.readingTimeText}>
            {item.totalReadingTime}
          </Text>
          <Text style={styles.readingTimeText}>
            min
          </Text>
        </View>
        
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {item.title}
          </Text>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            {item.summary}
          </Text>
        </View>

        <TouchableOpacity 
            onPress={()=>navigation.navigate("Details", {id: item.postId})}
            style={styles.readMore}
          >
            <Text style={styles.readMoreText}>
              read more
            </Text>
          </TouchableOpacity>
      </View>
    )
  }

  // Ekran aşağı kaydırıldığında tetiklenecek olan değişkenler.
  // When the screen is scrolled down, certain variables are triggered.
  const onRefresh = () => {
    setRefreshing(true)
    // Sayfanın yenilenmesi için fetchData çalışıyor.
    // fetchData is called to refresh the page.
    fetchData()
    // "page" değerinin 2 yapılmasının sebebi; "page" değeri, "maxPage" değerini geçince veri çekmiyor ama artmaya devam ediyor.
    // The reason for setting the "page" value to 2 is that it stops fetching data once it reaches the "maxPage" value, but the value of "page" continues to increase.
    // Sayfa yenilendikten sonra "maxPage" değerinden yüksek bir "page" değeri işe yaramamış oluyor. Bu sebeple istenilen başlangıç değerine burada döndürülüyor.
    // After the page is refreshed, a "page" value higher than the "maxPage" value is useless. Therefore, the desired starting value is returned here.  
    setPage(2)
    setRefreshing(false)
  }

  return(
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff4d4d" />
      <View style={{width: '100%', height: 24}}></View>
      
      <FlatList
        data = {blogData}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={5}
        style={{width: '100%'}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  post: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    marginBottom: 40
  },

  banner: {
    width: '100%',
    height: 150,
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  readingTime: {
    width: '10%',
    height: 60,
    backgroundColor: '#341f97',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 20,
    top: 0
  },

  readingTimeText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Merriweather-Light'
  },

  title: {
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 10
  },

  titleText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Merriweather-Regular'
  },

  summary: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10
  },

  summaryText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Merriweather-Light'
  },

  readMore: {
    width: '30%',
    height: 50,
    backgroundColor: '#3d3d3d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  readMoreText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Merriweather-Light'
  }

})

export default HomeScreen