import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Markdown from "react-native-markdown-display";
import MarkdownDisplay from "@/src/components/core/project-3/MarkDownDisplay";
const template = `
# Markdown Editor
Hello **world!**

This is a list:
- Item 1
- Item 2
  - Subitem 1
`;

export default function EditorScreen() {
  const [content, setContent] = useState(template);
  const [tab, setTab] = useState("edit");

  return (
    <View style={styles.page}>
      <View style={styles.tabsContainer}>
        <Pressable onPress={() => setTab("edit")}  style={[styles.tab, {backgroundColor: tab === "edit" ? "gray" : "white"}]}>
          <Text style={styles.tabText}>Editor</Text>
        </Pressable>
        <Pressable onPress={() => setTab("preview")} style={[styles.tab, {backgroundColor: tab === "preview" ? "gray" : "white"}]}>
          <Text style={styles.tabText}>Preview</Text>
        </Pressable>
      </View>
      {tab === "edit" ? (
        <TextInput
          value={content}
          multiline
          style={styles.input}
          onChangeText={setContent}
          numberOfLines={20}
        />
      ) : (
        <MarkdownDisplay>{content}</MarkdownDisplay>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "whitesmoke",
    flex: 1,
    padding: 10,
  },
  input: {
    backgroundColor: "#fff",
    flex: 1,
    textAlignVertical: "top",
    padding: 20,
    paddingTop: 20,
    borderRadius: 10,
    fontSize: 16,
  },

  tabsContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },
  tabText: {
    fontFamily: "InterBold",
  },
});
