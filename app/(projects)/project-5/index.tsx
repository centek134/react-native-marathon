import { View, Text, Button } from "react-native"
import { Link, Stack } from "expo-router"
import React from "react"

export default function index() {
  return (
    <View>
        <Stack.Screen options={{ title: "project -5"}}/>
        <Text>AirBnb map</Text>
        <Link href={"/(projects)/project-5/airbnb"} asChild>
            <Button title="Go to AirBnB map" />
        </Link>
    </View>
  );
};