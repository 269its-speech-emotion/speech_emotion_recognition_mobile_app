import { useFonts,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_600SemiBold
} from "@expo-google-fonts/poppins";

export const Fonts = {
    Regular: "Poppins_400Regular",
    Bold: "Poppins_700Bold",
    Light: "Poppins_300Light",
    Medium: "Poppins_500Medium",
    SemiBold: "Poppins_600SemiBold",
};

export const loadFonts = () => {
    const [fontsLoaded] = useFonts({
        [Fonts.Regular]: Poppins_400Regular,
        [Fonts.Bold]: Poppins_700Bold,
        [Fonts.Light]: Poppins_300Light,
        [Fonts.Medium]: Poppins_500Medium,
        [Fonts.SemiBold]: Poppins_600SemiBold,
    });

    return fontsLoaded;
};

