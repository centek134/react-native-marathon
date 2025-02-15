import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function index() {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Stack.Screen options={{title: "Project 1"}} />
      <Text style={{fontFamily: "AmaticBold", fontSize:50}}>It's working!!!</Text>
    </View>
  )
}