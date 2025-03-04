import { useState } from "react";
import { View, StyleSheet, Button, FlatList, Text, Pressable, useAnimatedValue } from "react-native";
import { Audio } from "expo-av";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { MemoListItem } from "@/src/components/project-6/MemoListItem";
import { Memo } from "@/src/components/project-6/MemoListItem";

export default function App() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [memos, setMemos] = useState<Memo[]>([])
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [audioMetering, setAudioMetering] = useState<number[]>([])
  const metering = useSharedValue(-100);

  async function startRecording() {
    try {
      setAudioMetering([]);
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
         Audio.RecordingOptionsPresets.HIGH_QUALITY, undefined, 100
      );
      setRecording(recording);
      console.log("Recording started");
      recording.setOnRecordingStatusUpdate((status) => {
        if(status.metering){
          metering.value = status.metering;
          setAudioMetering((curVal) => [...curVal, status.metering || -100]);
        }
      })
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
      setMemos((existingMemos) => [{uri, metering: audioMetering}, ...existingMemos])
     };
  };

  const aniamtedRedCircle = useAnimatedStyle(() => ({
    width: withTiming(recording? "60%" : "100%"),
    borderRadius: withTiming(recording? 5 : 35)
  }));

  const animatedRecordWave = useAnimatedStyle(() => {
    const size = withTiming(interpolate(metering.value, [-160, -60, 0], [0, 0, -30]), { duration: 100 })
    return{
      left: size,
      right: size,
      top: size,
      bottom: size
    }
  })

  return (
    <View style={styles.container}>
      <FlatList data={memos} renderItem={({item}) => <MemoListItem memo = {item}/>}/>
        <View style={styles.footer}>
          <View>
            <Animated.View style={[styles.voiceWave, animatedRecordWave]}/>
            <Pressable style={styles.recordButton} onPress={recording ? stopRecording : startRecording}>
              <Animated.View style={[styles.redCircle, aniamtedRedCircle]}></Animated.View>
            </Pressable>
          </View>
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
    alignItems: "center",
  },
  redCircle: {
    aspectRatio: 1,
    backgroundColor: "#ff443d",
    borderRadius: "50%",

  },
  voiceWave:{
    backgroundColor:"#ff9c9c",
    ...StyleSheet.absoluteFillObject,
    top: -20,
    bottom: -20,
    left: -20,
    right: -20,
    aspectRatio: 1,
    borderRadius: "50%"
  }
});
