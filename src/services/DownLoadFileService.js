import axios from 'axios';
import { Base_URL } from "../constant"; // Убедитесь, что этот путь корректен

export const downloadFile = async (fileId) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.get(`${Base_URL}/files/${fileId}`, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    let filename = '';
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      const matches = contentDisposition.match(/filename="([^"]+)"/i);
      filename = matches[1] || 'download';
    }

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(filename);

    return { downloadUrl, filename, isImage };
  } catch (error) {
    console.error('Error downloading file:', error);
    // Возвращаем null, если произошла ошибка, чтобы можно было отобразить сообщение об ошибке
    return null;
  }
};