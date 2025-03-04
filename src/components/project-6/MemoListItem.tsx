import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";

export type Memo = {
  uri: string;
  metering: number[];
}
export const MemoListItem = ({ memo }: {memo: Memo}) => {
  const [sound, setSound] = useState<Sound>();
  const [status, setStatus] = useState<AVPlaybackStatus>();

  async function loadSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: memo.uri }, {progressUpdateIntervalMillis: 100}, onPlaybackStatusUpdate);
    setSound(sound);
  };
  useEffect(() => {
    loadSound();
  }, [memo]);

  const onPlaybackStatusUpdate = useCallback( async (status: AVPlaybackStatus) => {
    setStatus(status);
    if (!status.isLoaded){
        return;
    };
    if ( status.isLoaded && status.didJustFinish){
        sound?.setStatusAsync({positionMillis: 0})
    };
  }, [sound]);

  async function playSound() {
    if (!sound) {
      return;
    };
    if (status?.isLoaded && status.isPlaying){
        await sound.pauseAsync();
    }else{
        await sound.replayAsync();
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound"); 
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const formatMilis = (milis: number) => {
    const minutes = Math.floor(milis / (1000 * 60));
    const seconds = Math.floor((milis % (1000 * 60) / 1000));

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  }
  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded && status.durationMillis ? status.durationMillis : 1;

  const progress = position / duration;

  // const animatedIndicatorStyle = useAnimatedStyle(() => ({
  //   left: withTiming(`${progress * 100}%`, {duration: 100})
  // }))
  
  let numLines = 50;
  let lines = [];

  for (let i = 0; i < numLines; i++) {
    const meteringIndex = Math.floor((i * memo.metering.length) / numLines);
    const nextMeteringIndex = Math.ceil(
      ((i + 1) * memo.metering.length) / numLines
    );
    const values = memo.metering.slice(meteringIndex, nextMeteringIndex);
    const average = values.reduce((sum, a) => sum + a, 0) / values.length;

    lines.push(average);
  }

  return (
    <View style={styles.container}>
      <FontAwesome6
        onPress={playSound}
        style={styles.icon}
        name={isPlaying? "pause" : "play"}
        size={24}
      />
      <View style={styles.playbackContainer}>
        {/* <View style={styles.playbackBackground}> */}
          <View style={styles.wave}>
            {lines.map((db, index) => <View key={index} style={[styles.waveLine, {height: interpolate(db, [-60, 0], [5, 50], Extrapolation.CLAMP), backgroundColor: progress > index / lines.length ? "royalblue" : "#cfcdcc"}]}/>)}
          </View>
        {/* </View> */}
        {/* <Animated.View
          style={[styles.playbackIndicator, animatedIndicatorStyle]}
        ></Animated.View> */}
        <Text style={styles.duration}>{formatMilis(position || 0)}/{formatMilis(duration || 0)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5,
  },
  icon: {
    marginRight: 10,
  },
  playbackContainer: {
    flex: 1,
    height: 50,
    justifyContent: "center",
  },
  playbackBackground: {
    height: 2,
    backgroundColor: "#e3e3e3",
  },
  playbackIndicator: {
    width: 10,
    aspectRatio: 1,
    borderRadius: "50%",
    backgroundColor: "#4d68d1",
    position: "absolute",
  },
  duration: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "#b0aeae"
  },
  wave: {
    flexDirection: "row",
    alignItems:"center",
    gap: 3,
  },
  waveLine: {
    flex: 1,
    height: 30,
    backgroundColor: "#cfcdcc",
    borderRadius: 20
  }
});
