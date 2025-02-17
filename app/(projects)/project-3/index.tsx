import { View, Text, Button, SafeAreaView } from 'react-native'
import { Link, Stack } from 'expo-router'
import React from 'react';
import MarkdownDisplay from '@/src/components/core/project-3/MarkDownDisplay';
const description = `
#Markdown

Integrate Markdown content in **React Native**
`;

export default function index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{ title: "project-3" }} />
        <MarkdownDisplay children={description}></MarkdownDisplay>
        <Link href={"/project-3/editor"} asChild>
            <Button title="Go to editor"/>
        </Link>
    </SafeAreaView>
  )
}