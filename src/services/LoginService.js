import axios from "axios";
import {Base_URL} from "../constant";
import {notification} from "antd";
import {useNavigate} from 'react-router-dom';

export const login = async (data) => {
    await axios.post(Base_URL + '/auth/email/send', data)
        .then((response) => {
            if (response.data) {
                notification.success({
                    message: 'You have successfully logged in'
                })
            }
        })
        .catch((error) => {
            notification.error({
                message: error
            })
        });
}
export const loginOTP = async (data,setAccessToken) => {
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
        })
        .catch((error) => {
            notification.error({
                message: error
            })
        });
}

