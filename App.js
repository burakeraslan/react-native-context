import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './component/screen/HomeScreen'
import Details from './component/screen/Details'

import { BlogContextProvider } from './context/Contex'

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <BlogContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Details"
            component={Details}
            options={{headerTitle: 'Content'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BlogContextProvider>
  )
}

export default App