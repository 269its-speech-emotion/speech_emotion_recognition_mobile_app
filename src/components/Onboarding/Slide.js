import React, { useEffect, useMemo } from "react";
import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming,
    withSpring,
    Easing 
} from "react-native-reanimated";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import {
    TABLET_BREAKPOINT,
    FOOTER_HEIGHT_TABLET,
    FOOTER_HEIGHT_PHONE_RATIO,
    IMAGE_HEIGHT_RATIO_TABLET,
    IMAGE_HEIGHT_RATIO_PHONE,
    IMAGE_MAX_HEIGHT_TABLET,
    IMAGE_MAX_HEIGHT_PHONE,
    IMAGE_WIDTH_RATIO_TABLET,
    IMAGE_WIDTH_RATIO_PHONE,
    IMAGE_MAX_WIDTH_TABLET,
    IMAGE_WIDTH_OFFSET_PHONE,
    SLIDE_PADDING_HORIZONTAL_TABLET,
    SLIDE_PADDING_HORIZONTAL_PHONE,
    SLIDE_PADDING_VERTICAL_TABLET,
    SLIDE_PADDING_VERTICAL_PHONE,
    SLIDE_MAX_WIDTH_TABLET,
    IMAGE_MARGIN_BOTTOM_TABLET,
    IMAGE_MARGIN_BOTTOM_PHONE,
    TEXT_CONTAINER_MAX_WIDTH_TABLET,
    TEXT_CONTAINER_MAX_WIDTH_PHONE_OFFSET,
    TITLE_FONT_SIZE_TABLET,
    TITLE_FONT_SIZE_PHONE,
    TITLE_MARGIN_BOTTOM_TABLET,
    TITLE_MARGIN_BOTTOM_PHONE,
    TITLE_MAX_WIDTH_TABLET,
    DESCRIPTION_FONT_SIZE_TABLET,
    DESCRIPTION_FONT_SIZE_PHONE,
    DESCRIPTION_LINE_HEIGHT_TABLET,
    DESCRIPTION_LINE_HEIGHT_PHONE,
    DESCRIPTION_PADDING_HORIZONTAL_TABLET,
    DESCRIPTION_PADDING_HORIZONTAL_PHONE,
    DESCRIPTION_MAX_WIDTH_TABLET,
    ANIMATION_FADE_DURATION,
    ANIMATION_SPRING_DAMPING,
    ANIMATION_SPRING_STIFFNESS,
    ANIMATION_INITIAL_OPACITY,
    ANIMATION_INITIAL_TRANSLATE_Y,
    ANIMATION_INITIAL_SCALE,
} from "../../constants/OnboardingConstants";

export default function Slide({ item, index, currentIndex }) {
    // Get dimensions dynamically
    const { width, height } = useWindowDimensions();
    const isTablet = width >= TABLET_BREAKPOINT;

    // Calculate available space considering footer
    const footerHeight = isTablet ? FOOTER_HEIGHT_TABLET : height * FOOTER_HEIGHT_PHONE_RATIO;
    const availableHeight = height - footerHeight;

    // Responsive image sizing
    const imageHeight = isTablet 
        ? Math.min(availableHeight * IMAGE_HEIGHT_RATIO_TABLET, IMAGE_MAX_HEIGHT_TABLET)
        : Math.min(availableHeight * IMAGE_HEIGHT_RATIO_PHONE, IMAGE_MAX_HEIGHT_PHONE);

    const imageWidth = isTablet
        ? Math.min(width * IMAGE_WIDTH_RATIO_TABLET, IMAGE_MAX_WIDTH_TABLET)
        : Math.min(width * IMAGE_WIDTH_RATIO_PHONE, width - IMAGE_WIDTH_OFFSET_PHONE);

    // Animation values
    const opacity = useSharedValue(ANIMATION_INITIAL_OPACITY);
    const translateY = useSharedValue(ANIMATION_INITIAL_TRANSLATE_Y);
    const scale = useSharedValue(ANIMATION_INITIAL_SCALE);

    useEffect(() => {
        // Animate content in when slide becomes active
        if (currentIndex === index) {
            opacity.value = withTiming(1, { duration: ANIMATION_FADE_DURATION, easing: Easing.out(Easing.cubic) });
            translateY.value = withSpring(0, { damping: ANIMATION_SPRING_DAMPING, stiffness: ANIMATION_SPRING_STIFFNESS });
            scale.value = withSpring(1, { damping: ANIMATION_SPRING_DAMPING - 3, stiffness: ANIMATION_SPRING_STIFFNESS });
        } else {
            // Reset when slide is not active
            opacity.value = ANIMATION_INITIAL_OPACITY;
            translateY.value = ANIMATION_INITIAL_TRANSLATE_Y;
            scale.value = ANIMATION_INITIAL_SCALE;
        }
    }, [currentIndex, index]);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const styles = useMemo(() => StyleSheet.create({
        slideContainer: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            width: width,
            paddingHorizontal: isTablet ? SLIDE_PADDING_HORIZONTAL_TABLET : SLIDE_PADDING_HORIZONTAL_PHONE,
            paddingVertical: isTablet ? SLIDE_PADDING_VERTICAL_TABLET : SLIDE_PADDING_VERTICAL_PHONE,
            maxWidth: isTablet ? SLIDE_MAX_WIDTH_TABLET : undefined,
            alignSelf: 'center',
            minHeight: availableHeight,
        },
        slideImage: {
            height: imageHeight,
            width: imageWidth,
            resizeMode: 'contain',
            marginBottom: isTablet ? IMAGE_MARGIN_BOTTOM_TABLET : IMAGE_MARGIN_BOTTOM_PHONE,
        },
        textContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: isTablet ? TEXT_CONTAINER_MAX_WIDTH_TABLET : width - TEXT_CONTAINER_MAX_WIDTH_PHONE_OFFSET,
        },
        title: {
            color: Colors.primaryColor_EA458E,
            fontFamily: Fonts.SemiBold,
            fontSize: isTablet ? TITLE_FONT_SIZE_TABLET : TITLE_FONT_SIZE_PHONE,
            marginBottom: isTablet ? TITLE_MARGIN_BOTTOM_TABLET : TITLE_MARGIN_BOTTOM_PHONE,
            textAlign: 'center',
            maxWidth: isTablet ? TITLE_MAX_WIDTH_TABLET : undefined,
        },
        description: {
            color: Colors.primaryColor_EA458E,
            fontFamily: Fonts.Regular,
            fontSize: isTablet ? DESCRIPTION_FONT_SIZE_TABLET : DESCRIPTION_FONT_SIZE_PHONE,
            textAlign: 'center',
            lineHeight: isTablet ? DESCRIPTION_LINE_HEIGHT_TABLET : DESCRIPTION_LINE_HEIGHT_PHONE,
            paddingHorizontal: isTablet ? DESCRIPTION_PADDING_HORIZONTAL_TABLET : DESCRIPTION_PADDING_HORIZONTAL_PHONE,
            maxWidth: isTablet ? DESCRIPTION_MAX_WIDTH_TABLET : undefined,
        },
    }), [width, height, isTablet, availableHeight, imageHeight, imageWidth]);

    return (
        <Animated.View style={[styles.slideContainer, animatedContainerStyle]}>
            <Animated.View style={animatedImageStyle}>
                <Image 
                    source={item?.image} 
                    style={styles.slideImage}
                    accessibilityLabel={`${item?.title} illustration`}
                    accessibilityRole="image"
                />
            </Animated.View>
            <View style={styles.textContainer}>
                <Text 
                    style={styles.title}
                    accessibilityRole="header"
                >
                    {item?.title}
                </Text>
                <Text 
                    style={styles.description}
                    accessibilityRole="text"
                >
                    {item?.description}
                </Text>
            </View>
        </Animated.View>
    );
}