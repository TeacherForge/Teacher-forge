import axios from 'axios';
import { Base_URL } from "../constant"; 

export const downloadFile = async (fileId) => {
    const accessToken = localStorage.getItem('accessToken');
  
    try {
      const response = await axios.get(`${Base_URL}/files/${fileId}`, {
        responseType: 'blob', 
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      // Извлекаем имя файла из заголовков ответа
      const contentDisposition = response.headers['Content-Disposition'];
      const filename = contentDisposition.split('filename=')[1].split('"').join(''); // Убираем кавычки
  
      // Создаем URL для скачивания файла
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
  
      // Создаем ссылку и программно кликаем для скачивания
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename); // Устанавливаем имя файла для скачивания
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      // Освобождаем URL объекта Blob после скачивания
      window.URL.revokeObjectURL(downloadUrl);
  
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  };
  

  