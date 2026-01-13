import React, { useMemo, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, interpolateColor } from "react-native-reanimated";
import * as Haptics from 'expo-haptics';
import { Colors } from "../../constants/Colors";
import { SlidesData } from "../../constants/SlidesData";
import { Fonts } from "../../constants/Fonts";
import {
    TABLET_BREAKPOINT,
    FOOTER_HEIGHT_TABLET,
    FOOTER_HEIGHT_PHONE_RATIO,
    FOOTER_MAX_HEIGHT,
    FOOTER_PADDING_HORIZONTAL_TABLET,
    FOOTER_PADDING_HORIZONTAL_PHONE,
    FOOTER_PADDING_BOTTOM_TABLET,
    FOOTER_PADDING_BOTTOM_PHONE,
    INDICATOR_MARGIN_TOP_TABLET,
    INDICATOR_MARGIN_TOP_PHONE,
    INDICATOR_HEIGHT_TABLET,
    INDICATOR_HEIGHT_PHONE,
    INDICATOR_WIDTH_TABLET,
    INDICATOR_WIDTH_PHONE,
    INDICATOR_ACTIVE_WIDTH_TABLET,
    INDICATOR_ACTIVE_WIDTH_PHONE,
    INDICATOR_MARGIN_HORIZONTAL_TABLET,
    INDICATOR_MARGIN_HORIZONTAL_PHONE,
    INDICATOR_BORDER_RADIUS,
    BUTTON_HEIGHT_TABLET,
    BUTTON_HEIGHT_PHONE,
    BUTTON_MAX_WIDTH_TABLET,
    BUTTON_BORDER_RADIUS,
    BUTTON_SPACER_WIDTH,
    BUTTON_MARGIN_BOTTOM,
    BUTTON_CONTAINER_MAX_WIDTH_TABLET,
    SKIP_BUTTON_BORDER_WIDTH_TABLET,
    SKIP_BUTTON_BORDER_WIDTH_PHONE,
    BUTTON_TEXT_SIZE_TABLET,
    BUTTON_TEXT_SIZE_PHONE,
    ANIMATION_INDICATOR_DURATION,
} from "../../constants/OnboardingConstants";

// Animated Indicator Component
function AnimatedIndicator({ index, currentIndex, isTablet }) {
    const progress = useSharedValue(currentIndex === index ? 1 : 0);

    React.useEffect(() => {
        progress.value = withTiming(currentIndex === index ? 1 : 0, { duration: ANIMATION_INDICATOR_DURATION });
    }, [currentIndex, index]);

    const animatedStyle = useAnimatedStyle(() => {
        const width = interpolate(
            progress.value,
            [0, 1],
            [isTablet ? INDICATOR_WIDTH_TABLET : INDICATOR_WIDTH_PHONE, 
             isTablet ? INDICATOR_ACTIVE_WIDTH_TABLET : INDICATOR_ACTIVE_WIDTH_PHONE]
        );

        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ['#808080', Colors.primaryColor_EA458E]
        );

        return {
            width,
            backgroundColor,
        };
    });

    return (
        <Animated.View
            style={[
                {
                    height: isTablet ? INDICATOR_HEIGHT_TABLET : INDICATOR_HEIGHT_PHONE,
                    marginHorizontal: isTablet ? INDICATOR_MARGIN_HORIZONTAL_TABLET : INDICATOR_MARGIN_HORIZONTAL_PHONE,
                    borderRadius: INDICATOR_BORDER_RADIUS,
                },
                animatedStyle,
            ]}
            accessibilityElementsHidden={true}
        />
    );
}

export default function Footer({ currentSlideIndex, goToNextSlide, skip, onComplete }) {
    const { height, width } = useWindowDimensions();
    const isTablet = width >= TABLET_BREAKPOINT;

    // Haptic feedback handlers
    const handleSkip = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        skip();
    }, [skip]);

    const handleNext = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        goToNextSlide();
    }, [goToNextSlide]);

    const handleComplete = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onComplete();
    }, [onComplete]);

    const styles = useMemo(() => StyleSheet.create({
        footer: {
            height: isTablet ? FOOTER_HEIGHT_TABLET : height * FOOTER_HEIGHT_PHONE_RATIO,
            maxHeight: FOOTER_MAX_HEIGHT,
            justifyContent: 'space-between',
            paddingHorizontal: isTablet ? FOOTER_PADDING_HORIZONTAL_TABLET : FOOTER_PADDING_HORIZONTAL_PHONE,
            paddingBottom: isTablet ? FOOTER_PADDING_BOTTOM_TABLET : FOOTER_PADDING_BOTTOM_PHONE,
        },
        indicatorContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: isTablet ? INDICATOR_MARGIN_TOP_TABLET : INDICATOR_MARGIN_TOP_PHONE,
        },
        buttonContainer: {
            marginBottom: BUTTON_MARGIN_BOTTOM,
            maxWidth: isTablet ? BUTTON_CONTAINER_MAX_WIDTH_TABLET : undefined,
            alignSelf: 'center',
            width: '100%',
        },
        singleButtonWrapper: {
            height: isTablet ? BUTTON_HEIGHT_TABLET : BUTTON_HEIGHT_PHONE,
        },
        doubleButtonWrapper: {
            flexDirection: 'row',
        },
        buttonSpacer: {
            width: BUTTON_SPACER_WIDTH,
        },
        button: {
            flex: 1,
            height: isTablet ? BUTTON_HEIGHT_TABLET : BUTTON_HEIGHT_PHONE,
            borderRadius: BUTTON_BORDER_RADIUS,
            backgroundColor: Colors.primaryColor_EA458E,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: isTablet ? BUTTON_MAX_WIDTH_TABLET : undefined,
        },
        skipButton: {
            borderColor: Colors.primaryColor_EA458E,
            borderWidth: isTablet ? SKIP_BUTTON_BORDER_WIDTH_TABLET : SKIP_BUTTON_BORDER_WIDTH_PHONE,
            backgroundColor: 'transparent',
        },
        skipButtonText: {
            color: Colors.primaryColor_EA458E,
        },
        buttonText: {
            fontFamily: Fonts.SemiBold,
            color: Colors.white,
            fontSize: isTablet ? BUTTON_TEXT_SIZE_TABLET : BUTTON_TEXT_SIZE_PHONE,
        },
    }), [height, width, isTablet]);

    return (
        <View style={styles.footer}>
            {/* Indicator container */}
            <View 
                style={styles.indicatorContainer}
                accessibilityRole="progressbar"
                accessibilityLabel={`Slide ${currentSlideIndex + 1} of ${SlidesData.length}`}
            >
                {SlidesData.map((_, index) => (
                    <AnimatedIndicator 
                        key={index} 
                        index={index} 
                        currentIndex={currentSlideIndex} 
                        isTablet={isTablet}
                    />
                ))}
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                {currentSlideIndex === SlidesData.length - 1 ? (
                    <View style={styles.singleButtonWrapper}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={handleComplete}
                            accessibilityRole="button"
                            accessibilityLabel="Get started"
                            accessibilityHint="Complete onboarding and go to login screen"
                        >
                            <Text style={styles.buttonText}>Get started</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.doubleButtonWrapper}>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={[styles.button, styles.skipButton]} 
                            onPress={handleSkip}
                            accessibilityRole="button"
                            accessibilityLabel="Skip"
                            accessibilityHint="Skip to the last slide"
                        >
                            <Text style={[styles.buttonText, styles.skipButtonText]}>Skip</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonSpacer} />
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={styles.button} 
                            onPress={handleNext}
                            accessibilityRole="button"
                            accessibilityLabel="Next"
                            accessibilityHint="Go to the next slide"
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}