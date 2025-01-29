module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        "react-native-reanimated/plugin",
        ["@babel/plugin-transform-class-properties"],
        ["@babel/plugin-transform-private-methods"] // ✅ Add this line
    ],
};
