import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Base_URL} from "../../../constant";
import { useParams, useNavigate} from 'react-router-dom';
import { Table, notification} from 'antd';
import './CreateTestPagePsychologist.css'
const EachTestPagePsychologist = () => {
  const {id} = useParams();
  const accessToken = localStorage.getItem('accessToken')
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await axios.get(`${Base_URL}/psychologist/tests/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
        setTestResults(response.data.map((test, index) => ({ ...test, key: index })));
      } catch (error) {
        console.error('Ошибка при получении результатов теста:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, [id]);

  const columns = [
    {
      title: 'Who Answered',
      dataIndex: 'answeredFullName',
      key: 'answeredFullName',
    },
    {
      title: 'Status',
      dataIndex: 'answered',
      key: 'answered',
      render: (answered) => (
        <span style={{ color: answered ? 'green' : 'red' }}>
          {answered ? 'ANSWERED' : 'NOT ANSWERED'}
        </span>
      ),
    },
];

const onRowClick = (test) => {
    return {
      onClick: () => {
          navigate(`/test-psychologist/${test.id}/create`);
      },
    };
  };

  return (
    <div style={{ padding: '100px 200px 20px 200px' }} className='create-test-container' >
        <Table 
      dataSource={testResults} 
      columns={columns} 
      onRow={onRowClick} 
      loading={loading}
      pagination={false}
        />
    </div>
  );
};

export default EachTestPagePsychologist;
