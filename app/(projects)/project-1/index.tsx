import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function index() {
  return (
    <View>
      <Stack.Screen options={{title: "Project 1"}} />
      <Text style={{fontFamily: "AmaticBold"}}>index</Text>
    </View>
  )
}