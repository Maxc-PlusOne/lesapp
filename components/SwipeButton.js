import React from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, Text } from 'react-native';

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get('screen');

export default function App() {
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
        ],
    }));

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            prevTranslationX.value = translationX.value;
        })
        .onUpdate((event) => {
            const maxTranslateX = width;

            translationX.value = clamp(
                prevTranslationX.value + event.translationX,
                -maxTranslateX,
                maxTranslateX
            );
        })
        .runOnJS(true);

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={pan}>
                <Animated.View style={[animatedStyles, styles.ball]}></Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: '90%',
        justifyContent: 'center',
        alignitems: 'center',
        backgroundColor: 'black',
        borderRadius: 50,
        zIndex:5

    },
    ball: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: '100%',
        justifyContent: 'center',
        alignitems: 'center',
    },
});
