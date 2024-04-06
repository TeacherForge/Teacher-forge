import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Modal, notification,Typography, Pagination } from 'antd';
import { SearchOutlined, DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import {Base_URL} from "../../../constant";
import './ReportsPagePsychologist.css';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const ReportsPagePsychologist = () => {
  const {Option } = Select;
  const [selectedStatus, setSelectedStatus] = useState('IN_REQUEST');
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState()
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(498); 
  const pageSize = 30;
  const accessToken = localStorage.getItem('accessToken');
  const [sortField, setSortField] = useState('createdTime');
  const [sortOrder, setSortOrder] = useState('ascend');
  const statusStyles = {
    IN_REQUEST: { color: 'silver' },
    IN_WORK: { color: 'blue' },
    REJECTED: { color: 'red' },
    FINISHED: { color: 'green' },
    
  };

  const navigate = useNavigate();

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'ascend' ? 'descend' : 'ascend');
    } else {
      setSortField(field);
      setSortOrder('ascend');
    }
  };
  
  const onRowClick = (record) => {
    return {
      onClick: () => {
        navigate(`/report/${record.id}`); 
      },
    };
  };

  const getSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === 'ascend' ? <UpOutlined /> : <DownOutlined />;
    }
    return null;
  };

  const fetchReports = async () => {
    const sortParam = `${sortField}_${sortOrder === 'ascend' ? 'asc' : 'desc'}`;
    try {
      const response = await axios.get(`${Base_URL}/psychologist/reports`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: currentPage,
          pageSize: pageSize,
          search: searchText,
          status: selectedStatus,
          pageSize: pageSize,
          sort: sortParam
        },
      });
      setReports(response.data.map((report, index) => ({ ...report, key: index })));
      //setTotalRecords(response.headers.totalRecords);
    } catch (error) {
      notification.error({
        message: 'Ошибка при получении отчетов',
        description: 'Произошла ошибка при попытке получить отчеты.'
      });
    }
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };
  
  useEffect(() => {
    const fetchAndSetReports = async () => {
      setReports([]);
      await fetchReports();
    };
    
    fetchAndSetReports();
  },  [currentPage, selectedStatus, searchText, sortField, sortOrder]);
  
  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); 
  };

  const handlePageChange = async (value) => {
    await new Promise(resolve => {
      setCurrentPage(value, resolve);
    });
    setReports([]);
    fetchReports();
  }
  

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
      title: <><Button style={{border:0, textDecoration:'none',color:'black',}} onClick={() => toggleSort('violationTime')}><b>Time of violation</b> {getSortIcon('violationTime')}</Button></>,
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
      title: <><Button style={{border:0,textDecoration:'none', color:'black'}} onClick={() => toggleSort('createdTime')}><b>Time of create </b>{getSortIcon('createdTime')}</Button></>,
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
          showSearch
          prefix={<SearchOutlined />}
          style={{width: 500, borderRadius: 50}}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          placeholder="Search..."
        />

      </Space>

      <Select defaultValue={selectedStatus} style={{ width: 120, margin:'auto 20px'}} onChange={handleStatusChange}>
        <Option value="IN_REQUEST">In Request</Option>
        <Option value="IN_WORK">In Work</Option>
        <Option value="REJECTED">Rejected</Option>
        <Option value="FINISHED">Finished</Option>
      </Select>

      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        pageSize={pageSize}
        total={totalRecords}
        showSizeChanger={false}
        PaginationAlign='end'
        size='small'
        rootClassName='pagination-container'
      />
      </div>
      <Table 
        onRow={onRowClick} 
        pagination={false} 
        columns={columns} 
        dataSource={reports} 
        className='disciplinary-report-table' 
        style={{width:'100%'}}/>
      </div>
    </div>
  );
};

export default ReportsPagePsychologist;
