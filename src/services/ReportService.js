import axios from "axios";
import {Base_URL} from "../constant";
import {notification} from "antd";

export const SendReport = async (reportData) => {
    const id = localStorage.getItem('id'); 
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.post(`${Base_URL}/client/${id}/reports`, reportData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        notification.success({
            message: 'You have successfully reported'
        });
        return response.data;
    } catch (error) {
        notification.error({
            message: 'Error sending report',
            description: error.response && error.response.data ? error.response.data.message : error.message
        });
        throw error;
    }
};