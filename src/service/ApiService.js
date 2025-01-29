import axios from "axios";
import StorageHelper from "../utils/StorageHelper";

export default class ApiService {

    static BASE_URL = "http://192.168.1.172:8080/api/v1";

    static async getHeaders() {
        const token = await StorageHelper.getToken("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    static async signUp(registrationRequest){
        const response = await axios.post(`${this.BASE_URL}/auth/signup`, registrationRequest);
        return response.data;
    }

    static async verifyUser(verificationRequest){
        const response = await axios.post(`${this.BASE_URL}/auth/verify`, verificationRequest);
        return response.data;
    }

    static async login(loginRequest){
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginRequest);
        return response.data;
    }

    static async getUserProfile(){
        const headers = await this.getHeaders();
        const response = await axios.get(`${this.BASE_URL}/users/get-self`, {
            headers: headers
        });
        return response.data;
    }
}