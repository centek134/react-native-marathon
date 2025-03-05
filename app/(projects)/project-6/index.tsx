import { View, Text, Button, SafeAreaView } from 'react-native'
import { Link, Stack } from 'expo-router'
import React from 'react';

export default function index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{ title: "project-6" }} />
        <Text style={{fontFamily: "InterBold", fontSize:30}}>Project 6</Text>
        <Link href={"/project-6/memos"} asChild>
            <Button title="Go to memos app"/>
        </Link>
    </SafeAreaView>
  );
};