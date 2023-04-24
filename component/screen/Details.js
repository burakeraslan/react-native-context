import React, { useContext, useEffect } from "react"
import { View, useWindowDimensions, StyleSheet, ScrollView,Image } from "react-native"
import RenderHtml from 'react-native-render-html'

import { BlogContext } from "../../context/Contex"

const Details = ({route}) => {

  // İstenildiği gibi veriler Context ile getirildi
  // The data was retrieved from the Context as desired
  // Önceki ekrandan "route" ile "postId" getirildi ve Context ile gelen veriler arasındaki aynı "postId" değerine sahip olan veri kaydedildi.
  //  "postId" was retrieved via "route" from the previous screen, and the data with the same "postId" value among the data retrieved from the Context was saved.
  const {blogData} = useContext(BlogContext)
  const id = route.params.id
  const selectedBlog = blogData.find(item => item.postId === id)
  
  // HTML kodlarını görüntülemek için "render-html" kütüphanesi kullanılır.s
  // "render-html" library is used to display HTML codes.
  const source = {
    html: selectedBlog.content
  }

  const { width } = useWindowDimensions()

  return(
    <View style={styles.container}>

      <ScrollView
        style={{paddingHorizontal: 10, paddingVertical: 20}}
        overScrollMode= 'never'
      >
        
        <Image
          style={{width: '98%', height: 200}}
          source={{uri:`${selectedBlog.image}`}}
        />

        <RenderHtml
          contentWidth={width}
          source={source}
        />
      </ScrollView>

    </View>
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Details