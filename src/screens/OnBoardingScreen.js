import React, { useState, useRef } from "react";
import {SafeAreaView, StyleSheet, FlatList, StatusBar,
    Dimensions,} from "react-native";
import {SlidesData} from "../constants/SlidesData";
import OnBoardingSlide from "../components/OnBoardingSlide";
import OnBoardingFooter from "../components/OnBoardingFooter";
import {Colors} from "../constants/Colors";

const {width, height} = Dimensions.get("window");


export default function OnBoardingScreen ({ navigation }) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef(null);

  // Update current slide index based on FlatList scroll
    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

  // Navigate to the next slide
    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex < SlidesData.length) {
            const offset = nextSlideIndex * width;
            ref.current.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlideIndex);}
    };

  // Skip to the last slide
    const skip = () => {
        const lastSlideIndex = SlidesData.length - 1;
        const offset = lastSlideIndex * width;
        ref.current.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };

  // Complete onboarding and navigate to home
    const onComplete = () => {
        navigation.replace("LogInScreen");
    };

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.white} />
        <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={SlidesData}
            pagingEnabled
            renderItem={({ item }) => <OnBoardingSlide item={item} />}
        />

        <OnBoardingFooter
            currentSlideIndex={currentSlideIndex}
            goToNextSlide={goToNextSlide}
            skip={skip}
            onComplete={onComplete}
        />

    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    flatListContainer: {
        height: height * 0.75,
    },
});