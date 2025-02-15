
import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

type DayListItemProps = {
    day: number
}

export default function DayListItem({day}: DayListItemProps) {
  return (
    // @ts-ignore
    <Link href={`/project-${day}`} asChild>
      <Pressable style={styles.box}>
        <Text style={styles.text}>{day}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    aspectRatio: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe0b8",
    borderRadius: 15,
  },
  text: {
    fontSize: 70,
    color: "#ba7111",
    fontFamily: "AmaticBold",
  },
});
