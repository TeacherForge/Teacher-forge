import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Base_URL} from "../../../constant";
import { useParams, useNavigate} from 'react-router-dom';
import { Table, notification} from 'antd';

const TestPageTeacher = () => {
  const {id} = useParams();
  const accessToken = localStorage.getItem('accessToken')
  const [testsTeacher, setTestsTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${Base_URL}/client/tests`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
        setTestsTeacher(response.data.map((testTeacher, index) => ({ ...testTeacher, key: index })));
      } catch (error) {
        console.error('Ошибка при получении результатов теста:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [id]);

  const columns = [
    {
      title:'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title:'Number of questions',
      dataIndex: 'questionCount',
      key: 'questionCount',
    },
];

const onRowClick = (test) => {
    return {
      onClick: () => {
          navigate(`/test-teacher/${test.id}/${test.questionCount}`);
      },
    };
  };

  return (
    <div style={{ padding: '100px 200px 20px 200px' }} className='create-test-container' >
        <Table 
      dataSource={testsTeacher} 
      columns={columns} 
      onRow={onRowClick}
      loading={loading}
      pagination={false}
        />
    </div>
  );
};

export default TestPageTeacher;
