import axios from "axios";
import StorageHelper from "../utils/StorageHelper";

export default class ApiService {

    static BASE_URL = "http://192.168.1.172:8888/api/v1";

    static async getHeaders() {
        const token = await StorageHelper.getToken("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    static async signUp(registrationRequest){
        const response = await axios.post(`${this.BASE_URL}/auth/signup`, registrationRequest);
        console.log(response);
        return response.data;
    }

    static async verifyUser(verificationRequest){
        const response = await axios.post(`${this.BASE_URL}/auth/verify`, verificationRequest);
        return response.data;
    }

static async login(loginRequest) {
    try {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginRequest);
        console.log(response);
        if (response && response.data.statusCode === 200) {
            await StorageHelper.setToken(response.data.token);
            console.log(response.data);
            return response.data.statusCode;
        }else{
            console.log("Login failed:", response.data.statusCode);
            return response.data.statusCode;
        }
    }catch (error) {
        console.error("Login error:", error);
    }
}

    static async getUserInfo(){
        const headers = await this.getHeaders();
        const response = await axios.get(`${this.BASE_URL}/users/get-self`, {
            headers: headers
        });
        return response.data;
    }
}
