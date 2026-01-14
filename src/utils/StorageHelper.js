import AsyncStorage from "@react-native-async-storage/async-storage";

export default class StorageHelper {

    static async setUserDTO(registrationRequest) {
        try{
            const userDTO = JSON.stringify(registrationRequest);
            await AsyncStorage.setItem('userDTO', userDTO);
        }catch(e){
            console.error("Error when storing userDTO", e);
        }
    }

    static async getUserDTO() {
        try {
            const userDTO = await AsyncStorage.getItem('userDTO');
            return userDTO ? JSON.parse(userDTO) : null;
        }catch(e){}
        console.error("Error when retrieving userDTO");
    }

    static async setToken(token) {
        try{
            await AsyncStorage.setItem('token', token);
        }catch(e){
            console.error("Error when storing token", e);
        }
    }

    static async getToken() {
        try{
            return await AsyncStorage.getItem('token');
        }catch(e){
            console.error("Error when retrieving token", e);
        }
    }

    static async removeToken() {
        try {
            await AsyncStorage.removeItem('token');
        } catch (e) {
            console.error("Error when removing token", e);
        }
    }

    static async setGuestMode(isGuest) {
        try {
            await AsyncStorage.setItem('isGuest', JSON.stringify(isGuest));
        } catch (e) {
            console.error("Error when storing guest mode", e);
        }
    }

    static async isGuestMode() {
        try {
            const isGuest = await AsyncStorage.getItem('isGuest');
            return isGuest ? JSON.parse(isGuest) : false;
        } catch (e) {
            console.error("Error when retrieving guest mode", e);
            return false;
        }
    }

    static async clearGuestMode() {
        try {
            await AsyncStorage.removeItem('isGuest');
        } catch (e) {
            console.error("Error when clearing guest mode", e);
        }
    }


}