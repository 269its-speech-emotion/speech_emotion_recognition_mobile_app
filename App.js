import {loadFonts} from "./src/constants/Fonts";
import StackNavigation from "./navigation/StackNavigation";

export default function App() {
    const fontsLoaded = loadFonts();
    return (
        <StackNavigation />
    );
};
