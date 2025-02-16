import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft, } from "react-native-reanimated";

const onboardingSteps = [
    {
      icon: "snowflake",
      title: "Welcome to Dev-Marathon",
      description: "Daily React Native tutorials during December",
    },
    {
      icon: "people-arrows",
      title: "Learn and grow together",
      description: "Learn by building 24 projects with React Native and Expo",
    },
    {
      icon: "book-open-reader",
      title: "Education for Children",
      description:
        'Contribute to the fundraiser "Education for Children" to help Save the Children in their effort of providing education to every child',
    },
  ];
export default function OnboardingScreen() {
    const [screenIndex, setScreenIndex] = useState(0);
    const data = onboardingSteps[screenIndex];

    const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => onContinue()).runOnJS(true);

    const swipeBack = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd( () => onBack()).runOnJS(true);

    const swipes = Gesture.Simultaneous(swipeBack, swipeForward)

    const onContinue = () => {
        if(screenIndex === onboardingSteps.length - 1) endOnboarding();
        setScreenIndex(screenIndex + 1);
    };

    const onBack = () => {
        if(screenIndex === 0) endOnboarding();
        setScreenIndex(screenIndex - 1);
    };

    const endOnboarding = () => {
        setScreenIndex(0);
        router.back();
    };

  return (
    <SafeAreaView style={styles.page}>
        <Stack.Screen options={{headerShown: false}} />
        <StatusBar backgroundColor="#000" style="auto" />
        <GestureDetector gesture={swipes}>
            <View key={screenIndex} style={styles.pageContent}>
                <View style={styles.pageIndicatorContainer}>
                    {onboardingSteps.map( (step, index) => (
                        <View key={index} style={[styles.stepIndicator ,{ backgroundColor: index === screenIndex? "#CEF202" : "#787878"}]}/>
                    ))}
                </View>
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <FontAwesome6 style={styles.image} name={data.icon} size={100} color="#CEF202" />
                </Animated.View>
                <View style={styles.footer}>
                    <Animated.Text entering={SlideInRight} exiting={SlideOutLeft} style={styles.title}>{data.title}</Animated.Text>
                    <Animated.Text entering={SlideInRight.delay(50)} exiting={SlideOutLeft} style={styles.description}>{data.description}</Animated.Text>
                    
                    <View style={styles.buttonsRow}>
                        <Text onPress={endOnboarding} style={styles.buttonText}>Skip</Text>
                        <Pressable style={styles.button} onPress={onContinue}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </GestureDetector>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:"#15141A"
    },
    pageContent: {
        flex: 1,
        padding: 20
    },
    pageIndicatorContainer: {
        flexDirection: "row",
        margin: 10
    },
    stepIndicator: {
        flex: 1,
        height: 3,
        backgroundColor: "#787878",
        margin: 5,
        borderRadius: 10
    },
    title: {
        color: "#FDFDFD",
        fontSize: 45,
        letterSpacing: 1.3,
        fontFamily: "InterBold"
    },
    description: {
        color: "#919191",
        fontSize: 20,
        fontFamily: "Inter",
        lineHeight: 25,
        marginBottom: 20
    },
    image: {
        alignSelf: "center",
        marginTop: 50
    },
    buttonsRow: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    button: {
        backgroundColor: "#302E38",
        borderRadius: 50,
        flex: 1,
    },
    buttonText: {
        color: "#FDFDFD",
        fontSize: 16,
        fontFamily: "InterSemi",
        textAlign: "center",
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    footer: {
        marginTop: "auto"
    }
})