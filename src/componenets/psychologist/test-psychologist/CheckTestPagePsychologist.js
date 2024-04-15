import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Base_URL} from "../../../constant";
import { useParams, useNavigate} from 'react-router-dom';
import { Table, notificationm,Card} from 'antd';
import './CreateTestPagePsychologist.css'

const CheckTestPagePsychologist = () => {
    const {id, teacherId} = useParams();
    const accessToken = localStorage.getItem('accessToken')
    const [testResults, setTestResults] = useState([]);
    const [ansFullName, setAnsFullName] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(); 
    const pageSize = 30;
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [photoUrls, setPhotoUrls] = useState([]);

    useEffect(() => {
        const fetchTestResponses = async () => {
          try {
            const response = await axios.get(`${Base_URL}/psychologist/tests/${id}/teacher/${teacherId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
              });
            setAnsFullName(response.headers['user-full-name'], 10);
            setTotalRecords(parseInt(response.headers['x-total-count'], 10));
            setTestResults(response.data.map((question, index) => ({ ...question, key: index })));
          } catch (error) {} 
        };
    
        fetchTestResponses();
      }, [id, teacherId]);

return(
    <div className='create-test-container'>

    </div>
);

};
export default CheckTestPagePsychologist;