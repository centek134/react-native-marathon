import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

export default function index() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "project-2" }} />
      <Link href={"/project-2/onboarding"} asChild>
        <Button title="Go to onboarding"/>
      </Link>
    </SafeAreaView>
  )
}