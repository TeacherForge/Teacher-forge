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
      const filenameRegex = /filename\*=UTF-8''(.+)$/i;
      const matches = contentDisposition.match(filenameRegex);
      if (matches && matches[1]) {
        filename = decodeURIComponent(matches[1]);
      } else {
        const filenameRegexFallback = /filename="([^"]+)"/i;
        const matchesFallback = contentDisposition.match(filenameRegexFallback);
        filename = matchesFallback && matchesFallback[1] ? matchesFallback[1] : 'download';
      }
    }

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const isImage = /\.(jpg|jpeg|png)$/i.test(filename);

    return { downloadUrl, filename, isImage };
  } catch (error) {
    console.error('Error downloading file:', error);
    return null;
  }
};
