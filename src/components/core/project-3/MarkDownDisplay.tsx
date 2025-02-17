import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { PropsWithChildren } from "react";
import Markdown from "react-native-markdown-display";
const MarkdownDisplay = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.page}>
      <Markdown style={markdownStyles}>{children}</Markdown>
    </ScrollView>
  );
};

const markdownStyles = StyleSheet.create({
    heading1: {
        fontFamily: "InterBold",
        fontSize: 30
    }
})

const styles = StyleSheet.create({
    page: {
      backgroundColor: 'whitesmoke',
      flex: 1,
      padding: 10,
    }
  });

  export default MarkdownDisplay;