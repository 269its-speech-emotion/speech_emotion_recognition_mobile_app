import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Controller } from "react-hook-form";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Fonts } from "../constants/Fonts";
import { Colors } from "../constants/Colors";


export default function CustomInput({
  name,
  control,
  rules = {},
  placeholder,
  secureTextEntry = false,
  isNumeric = false,
  iconName,
  onPress,
  keyboardType = "default",
  showEyeTogglePart = false,
  isIonIcon = false,
  isSimpleLineIcons = false,
  isMaterialIcons = false,
  autoCapitalize = "sentences",
  autoCorrect = true,
  textContentType = "none",
}) {

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <View style={[styles.container, { borderColor: error ? Colors.red : Colors.borderColor_AEB5BB }]}>
                        {isIonIcon && (<Ionicons name={iconName} size={30} color={Colors.borderColor_AEB5BB}/>)}
                        {isSimpleLineIcons && (<SimpleLineIcons name={iconName} size={30} color={Colors.borderColor_AEB5BB}/>)}
                        {isMaterialIcons && (<MaterialIcons name={iconName} size={30} color={Colors.borderColor_AEB5BB}/>)}
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor={"#AEB5BB"}
                            style={styles.textInput}
                            secureTextEntry={secureTextEntry}
                            keyboardType={isNumeric ? "numeric" : keyboardType}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                            textContentType={textContentType}

                        />
                        {showEyeTogglePart && ( // Show the eye icon only if secureTextEntry is true
                            <TouchableOpacity onPress={onPress}>
                                <Ionicons
                                    name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color={Colors.borderColor_AEB5BB}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    {error && (
                        <Text style={styles.errorText}>{error.message || 'Error'}</Text>
                    )}
                </>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.borderColor_AEB5BB,
        borderRadius: 100,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        marginVertical: 10,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: Fonts.Light,
    },
    errorText: {
        color: Colors.red,
        alignSelf: 'stretch',
        fontSize: 12,
    },
});
