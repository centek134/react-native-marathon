import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const MemoListItem = (props:any) => {
    const progress = 40;
  return (
    <View style={styles.container}>
        <FontAwesome6 style={styles.icon} name={"play"} size={24} /> 
        <View style={styles.playbackContainer}>
            <View style={styles.playbackBackground}></View>
            <View style={[styles.playbackIndicator, { left: `${progress}%`}]}></View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:"#fff",
        padding: 15,
        borderRadius: 5,
        margin: 5
    },
    icon: {
        marginRight: 10
    },
    playbackContainer: {
        flex: 1,
        height: 30,
        justifyContent: "center"
    },
    playbackBackground: {
        height: 2,
        backgroundColor: "#e3e3e3",
    },
    playbackIndicator: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "#4d68d1",
        position: "absolute",
    }
})