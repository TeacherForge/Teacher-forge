import axios from 'axios';
import { Base_URL } from "../constant"; 


export const uploadFile = async (file) => {
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('file', file); 
    const purpose = "PHOTO";
  
    try {
      const response = await axios.post(`${Base_URL}/files?userId=${userId}&purpose=${purpose}`, formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data.id;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
  