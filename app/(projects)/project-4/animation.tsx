import { View, Text, StyleSheet, Button } from 'react-native';
import { Stack } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';

export default function animation() {
    const animation = useRef<LottieView>(null);
  return (
    <View style={styles.animationContainer}>
      <Stack.Screen options={{headerShown: false}} />
      <LottieView
      ref={animation}
      style={{
        width: "80%",
        height: 200,
        backgroundColor: '#000',}}
        source={require('../../../assets/lottie/netflix.json')}
      >
      </LottieView>
      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button title='Play' onPress={() => animation.current?.play()} />
        </View>
        <View style={styles.button}>
          <Button title='Pause' onPress={() => animation.current?.pause()} />
        </View>
        <View style={styles.button}>
          <Button title='Reset' onPress={() => animation.current?.reset()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    animationContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    buttonWrapper: {
      flexDirection: 'row',
      marginBottom: 50
    },
    button: {
      marginHorizontal: 10
    }
  });