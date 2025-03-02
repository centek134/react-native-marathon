import { useState } from "react";
import { View, StyleSheet, Button, FlatList, Text, Pressable } from "react-native";
import { Audio } from "expo-av";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { MemoListItem } from "@/src/components/project-6/MemoListItem";

export default function App() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [memos, setMemos] = useState<string[]>([])
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
       if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 

      console.log("Starting recording..");
       const { recording } = await Audio.Recording.createAsync(
         Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
     await recording?.stopAndUnloadAsync(); 
     await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    ); 
     const uri = recording?.getURI();
     if (uri){
      setMemos((existingMemos) => [uri, ...existingMemos])
     }
    console.log("Recording stopped and stored at", uri);
  };

  const aniamtedRedCircle = useAnimatedStyle(() => ({
    width: withTiming(recording? "60%" : "100%"),
    borderRadius: withTiming(recording? 5 : 35)
  }))

  return (
    <View style={styles.container}>
      <FlatList data={memos} renderItem={({item}) => <MemoListItem uri = {item}/>}/>
      <View style={styles.footer}>
        <Pressable style={styles.recordButton} onPress={recording ? stopRecording : startRecording}>
          <Animated.View style={[styles.redCircle, aniamtedRedCircle]}></Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  footer: {
    backgroundColor: "#fff",
    height: 150,
    justifyContent: "center",
    alignItems: "center"

  },
  recordButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    padding:3,
    borderWidth: 2,
    borderRadius: "50%",
    borderColor:"#000000",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center"
  },
  redCircle: {
    aspectRatio: 1,
    backgroundColor: "#ff443d",
    borderRadius: "50%",
  }
});
