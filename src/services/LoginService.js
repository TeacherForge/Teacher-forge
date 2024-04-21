import axios from "axios";
import {Base_URL} from "../constant";
import {notification} from "antd";

export const login = async (data) => {
    try {
        const response = await axios.post(`${Base_URL}/auth/email/send`, data);
        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Received status code: ${response.status}`);
        }
    } catch (error) {
        throw error; 
    }
};

export const loginOTP = async (data,setAccessToken) => {
    try{
    await axios.post(Base_URL + '/auth/email/otp', data)
        .then((response) => {
            if (response.data) {
                localStorage.setItem('role', response.data.roles[0]);
                localStorage.setItem('accessToken', response.data.token);
                localStorage.setItem('fullName', response.data.fullName);
                localStorage.setItem('id', response.data.id);

                setAccessToken(true);
                notification.success({
                    message: 'You have successfully logged in',
                })
            }
        })}
        catch {

        };
}

