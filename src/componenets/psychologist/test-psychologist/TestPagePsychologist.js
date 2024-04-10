import React, { useState, useEffect} from 'react';
import { Table, Tag, Space, Typography,Button, Modal, Form, Input, Checkbox,notification,Select} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Base_URL} from "../../../constant";
import './TestPagePsychologist.css'


const { Title } = Typography;
const { Option } = Select;

const TestsPagePsychologist = () => {
  // Здесь должен быть ваш стейт и функции для обработки данных, которые обычно вы получаете с бэкенда
  const accessToken = localStorage.getItem('accessToken');
  const id = localStorage.getItem('id');
  const [tests, setTests] = useState([]); // Данные тестов, предположительно, будут загружены из API
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();


  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleSearchTeachers = async (value) => {
    if (value) {
      try {
        const response = await axios.get(`${Base_URL}/psychologist/${id}/teachers`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { search: value }
        });
        const filteredTeachers = response.data.map(teacher => ({
          id: teacher.id,
          name: `${teacher.lastName} ${teacher.userName} ${teacher.middleName}`
        }));
        setTeachers(filteredTeachers);
      } catch (error) {}
    } else {
      setTeachers([]);
    }
  };

  const handleSaveTest = async (testData) => {
    try {
      await axios.post(`${Base_URL}/psychologist/tests`, testData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      notification.success({
        message: 'Тест успешно создан',
      });
      setIsModalVisible(false);
      fetchTests(); // Refresh the list of tests
    } catch (error) {
      notification.error({
        message: 'Ошибка при создании теста',
        description: error.message,
      });
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created date',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: 'Who created',
      dataIndex: 'createdFullName',
      key: 'createdFullName',
    },
    {
      title: 'Addressed',
      dataIndex: 'addressed',
      key: 'addressed',
    },
    {
      title: 'Status',
      key: 'testStatus',
      dataIndex: 'testStatus',
      render: (testStatus) => {
        let color = 'geekblue';
        if (testStatus === 'DRAW') {
          color = 'volcano';
        } else  if(testStatus==='FINISHED'){
          color = 'green';
        } else if(testStatus ==='IN_PROCESSING'){
          color = 'geekblue'
        } else {
          color = 'volcano'
        }
        return (
          <Tag color={color} key={testStatus}>
            {testStatus.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  

  const fetchTests = async () => {
    try {
      const response = await axios.get(`${Base_URL}/psychologist/tests`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          search: searchText,
        },
      });
      setTests(response.data.map((report, index) => ({ ...report, key: index })));
    } catch (error) {}
  };
  useEffect(() => {
    const fetchAndSetTests = async () => {
      setTests([]);
      await fetchTests();
    };
    
    fetchAndSetTests();
  },  [searchText]);

  const onFinish = (values) => {
    const testData = {
      ...values,
      teacherIds: selectedTeacherIds,
    };
    handleSaveTest(testData);
  };
  
  const onRowClick = (test) => {
    return {
      onClick: () => {
        if (test.testStatus === 'DRAW') {
          navigate(`/test-psychologist/${test.id}/create`);
        } else {
          navigate(`/test-psychologist/${test.id}`);
        }
      },
    };
  };

  return (
    <div className='test-container'>
      <Title level={2} style={{display:'flex', width:'100%', justifyContent:'center', fontSize:40, color:'white'}}>Tests</Title>
      <div className='test-container-inner'>
        <div className='test-container-inner-searchbar'>
          <Space style={{display:'flex', justifyContent:'flex-start', width:500}}>
            <Input
              showSearch
              prefix={<SearchOutlined />}
              style={{width: 600, borderRadius: 50}}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
              placeholder="Search..."
            />
          </Space>
          <div className='test-container-inner-searchbar-buttom'>
            <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ borderRadius:100}}>
              <b>Create Test</b>
            </Button>
          </div>
        </div>
        
        <Table 
          dataSource={tests} 
          columns={columns} 
          onRow={onRowClick} 
        />
        <Modal
          title="CREATE TEST"
          style={{display:'flex', flexDirection:'column', justifyContent:'center'}}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Create
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="title"  rules={[{ required: true }]}>
              <Input placeholder="Test name" style={{borderRadius:15}}/>
            </Form.Item>
            <Form.Item name="description"  rules={[{ required: true }]} >
              <Input.TextArea placeholder="Description" style={{borderRadius:15}}/>
            </Form.Item>
            <Form.Item name="sendAll" valuePropName="sendAll">
              <Checkbox>Send to all teachers in that school</Checkbox>
            </Form.Item>
            <Form.Item name="teacherIds">
              <Select
                mode="multiple"
                showSearch
                placeholder="Select Teachers"
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onSearch={handleSearchTeachers}
                onChange={(value) => setSelectedTeacherIds(value)}
                notFoundContent={null}
                style={{ width: '100%' ,borderRadius:15}}
                listItemHeight={10}
                listHeight={250}
              >
                {teachers.map((teacher) => (
                  <Option  key={teacher.id} value={teacher.id}>{teacher.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TestsPagePsychologist;
