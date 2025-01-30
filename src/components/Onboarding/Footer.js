import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { SlidesData } from "../../constants/SlidesData";
import { Fonts } from "../../constants/Fonts";

const { height } = Dimensions.get("window");

export default function Footer({ currentSlideIndex, goToNextSlide, skip, onComplete }) {
    return (
        <View style={styles.footer}>
            {/* Indicator container */}
            <View style={styles.indicatorContainer}>
                {SlidesData.map((_, index) => (
                    <View key={index} style={[styles.indicator, currentSlideIndex === index && styles.activeIndicator,]}/>
                ))}
            </View>

            {/* Buttons */}
            <View style={{marginBottom: 20}}>
                {currentSlideIndex === SlidesData.length - 1 ? (
                    <View style={{height: 50}}>
                        <TouchableOpacity style={styles.button} onPress={onComplete}>
                            <Text style={styles.buttonText}>Get started</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity activeOpacity={0.8} style={[styles.button, styles.skipButton]} onPress={skip}>
                            <Text style={[styles.buttonText, styles.skipButtonText]}>Skip</Text>
                        </TouchableOpacity>
                        <View style={{width: 16}} />
                        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={goToNextSlide}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: height * 0.25,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'gray',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    activeIndicator: {
        backgroundColor: Colors.primaryColor_EA458E,
        width: 25,
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 100,
        backgroundColor: Colors.primaryColor_EA458E,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipButton: {
        borderColor: Colors.primaryColor_EA458E,
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    skipButtonText: {
        color: Colors.primaryColor_EA458E,
    },
    buttonText: {
        fontFamily: Fonts.SemiBold,
        color: Colors.white,
        fontSize: 19,
    },
});