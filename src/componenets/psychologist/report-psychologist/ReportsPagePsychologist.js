import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Modal, notification,Typography, Pagination } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import {Base_URL} from "../../../constant";
import './ReportsPagePsychologist.css';
import { Select } from 'antd';

const ReportsPagePsychologist = () => {
  const { Option } = Select;
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [reports, setReports] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(); // Total number of records
  const pageSize = 30; // Number of items per page
  const accessToken = localStorage.getItem('accessToken');
  const statusStyles = {
    IN_REQUEST: { color: 'silver' },
    IN_WORK: { color: 'blue' },
    REJECTED: { color: 'red' },
    FINISHED: { color: 'green' },
  };

  useEffect(() => {
    fetchReports();
  }, [currentPage, selectedStatus]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${Base_URL}/psychologist/reports`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: currentPage,
          pageSize: pageSize,
          search: searchText,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
        },
      });
      setReports(response.data.map((report, index) => ({ ...report, key: index })));
      //setTotalRecords(response.data.totalRecords);
    } catch (error) {
      notification.error({
        message: 'Ошибка при получении отчетов',
        description: 'Произошла ошибка при попытке получить отчеты.'
      });
    }
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setCurrentPage(1);
    fetchReports();
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
    fetchReports();
  }

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
    fetchReports();
  };

  const columns = [
    {
      title: 'Full name',
      dataIndex: 'studentFullName',
      key: 'studentFullName',
    },
    {
      title: 'Type of violation',
      dataIndex: 'reportTypeText',
      key: 'reportTypeText',
    },
    {
      title: 'Time of violation',
      dataIndex: 'violationTime',
      key: 'violationTime',
    },
    {
      title: 'Lesson',
      dataIndex: 'lesson',
      key: 'lesson',
    },
    {
      title: 'Who works',
      dataIndex: 'workedFullName',
      key: 'workedFullName',
    },
    {
      title: 'Time of create',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: 'Who created',
      dataIndex: 'createdFullName',
      key: 'createdFullName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <span style={statusStyles[text] || {}}>{text}</span>
      ),
    }
  ];
  const {Title, Text} = Typography;
  return (
    <div className="reports-page-container"> 
      <Title style={{color: 'white', fontSize:'66px'}} level={5} className='reports-page-header'>
        Disciplinary Report
      </Title>

      <div className='table-container'>
      <div className='table-search-bar-container'>
      <Space style={{}}>
        <Input
          prefix={<SearchOutlined />}
          style={{width: 500, borderRadius: 50}}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
        />

      </Space>

      <Select defaultValue={selectedStatus} style={{ width: 120, margin:'auto 20px'}} onChange={handleStatusChange}>
        <Option value="all">All statuses</Option>
        <Option value="IN_REQUEST">In Request</Option>
        <Option value="IN_WORK">In Work</Option>
        <Option value="REJECTED">Rejected</Option>
        <Option value="FINISHED">Finished</Option>
      </Select>


      </div>
      <Table columns={columns} dataSource={reports} className='disciplinary-report-table' style={{width:'100%'}}/>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        pageSize={pageSize}
        total={totalRecords}
        showSizeChanger={false}
        style={{margin:'auto 20rem'}}
      />
      </div>
    </div>
  );
};

export default ReportsPagePsychologist;
