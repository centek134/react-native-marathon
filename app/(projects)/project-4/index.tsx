import { View, Text, Button, SafeAreaView } from 'react-native'
import { Link, Stack } from 'expo-router'
import React from 'react';

export default function index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{ title: "project-4" }} />
        <Text style={{fontFamily: "InterBold", fontSize:30}}>Project 4</Text>
        <Link href={"/project-4/animation"} asChild>
            <Button title="Go to animation"/>
        </Link>
    </SafeAreaView>
  )
}