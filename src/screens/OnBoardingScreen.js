import React, { useState, useRef } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { SlidesData } from "../constants/SlidesData";
import Slide from "../components/Onboarding/Slide";
import Footer from "../components/Onboarding/Footer";
import { Colors } from "../constants/Colors";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/ScreenDimensions";

export default function OnBoardingScreen({ navigation }) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef(null);

    // Track viewable items in FlashList
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentSlideIndex(viewableItems[0].index);
        }
    }).current;

    // Navigate to the next slide
    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex < SlidesData.length) {
            ref.current?.scrollToIndex({ index: nextSlideIndex, animated: true });
        }
    };

    // Skip to the last slide
    const skip = () => {
        const lastSlideIndex = SlidesData.length - 1;
        ref.current?.scrollToIndex({ index: lastSlideIndex, animated: true });
    };

    // Complete onboarding and navigate to home
    const onComplete = () => {
        navigation.replace("LoginScreen");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                backgroundColor={Colors.white} 
                barStyle="dark-content"
                translucent={false}
            />
            <View style={styles.flashListContainer}>
                <FlashList
                    ref={ref}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={SlidesData}
                    estimatedItemSize={SCREEN_WIDTH}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <Slide 
                            item={item} 
                            index={index} 
                            currentIndex={currentSlideIndex}
                        />
                    )}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                />
            </View>
            <Footer
                currentSlideIndex={currentSlideIndex}
                goToNextSlide={goToNextSlide}
                skip={skip}
                onComplete={onComplete}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    flashListContainer: {
        flex: 1,
    },
});
