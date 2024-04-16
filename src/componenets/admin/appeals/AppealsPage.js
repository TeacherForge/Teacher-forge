import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Space, Modal, notification,Typography, Pagination ,Col, Row,Select} from 'antd';
import {
    DeleteIcon,
    UpdateIcon
} from "../../../constant/image/icons/Index.";
import axios from 'axios';
import {Base_URL} from "../../../constant";
import { SearchOutlined} from '@ant-design/icons';

const AppealsPage = () => {
    const {Option } = Select;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(); 
    const pageSize = 30;
    const [searchText, setSearchText] = useState('');
    const [appeals, setAppeals] = useState([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [filter, setFilter] = useState();

    const handleSearch = (value) => {
        setSearchText(value);
        setCurrentPage(1); 
      };
    
    const handleFilterChange = (newFilter) => {
        let readValue;
        if (newFilter === 'read') {
            readValue = true;
        } else if (newFilter === 'unread') {
            readValue = false;
        } else {
            readValue = undefined; 
        }

        setFilter(readValue);
        setCurrentPage(1);
    };

    const onRowClick = (record) => {
        navigate(`/appeals-read/${record.id}`);
    };

      const onMainCheckboxChange = (event) => {
        if (event.target.checked) {
            setSelectedRowKeys(appeals.map((appeal) => appeal.id));
        } else {
            setSelectedRowKeys([]);
        }
    };

    const onCheckboxChange = (event, id) => {
        const newSelectedRowKeys = [...selectedRowKeys];
        if (event.target.checked) {
            newSelectedRowKeys.push(id);
        } else {
            const index = newSelectedRowKeys.indexOf(id);
            if (index > -1) {
                newSelectedRowKeys.splice(index, 1);
            }
        }
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handlePageChange = async (value) => {
    await new Promise(resolve => {
        setCurrentPage(value, resolve);
    });
    setAppeals([]);
    fetchAppeals();
    }

    const refreshAppeals = () => {
        fetchAppeals();
    };

    const deleteSelectedAppeals = async () => {
        try {
            const promises = selectedRowKeys.map((id) =>
                axios.delete(`${Base_URL}/admin/appeals/${id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
            );
            await Promise.all(promises);
            refreshAppeals();
            setSelectedRowKeys([]); 
        } catch (error) {}
    };


    useEffect(() => {
        fetchAppeals();
    }, [currentPage, filter,searchText]);

    const fetchAppeals = async () => {
        const params = {
          page: currentPage,
          pageSize: pageSize,
          read: filter,
          search: searchText,
        };
    
        try {
          const response = await axios.get(`${Base_URL}/admin/appeals`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params,
          });
          setAppeals(response.data.map((report, index) => ({ ...report, key: report.id })));
          setTotalRecords(parseInt(response.headers['x-total-count'], 10));
        } catch (error) {
          notification.error({
            message: 'Ошибка при получении обращений',
            description: 'Не удалось получить данные.'
          });
        }
      };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Are you sure delete this appeal?',
            content: 'This action cannot be undone and will permanently delete the appeal from the system.',
            okText: 'Yes, delete it',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteSelectedAppeals();
            }
        });
    };
      
    const getRowStyle = (appeal) => {
        let style = { ...circleStyle };
        if (selectedRowKeys.includes(appeal.id)) {
            style.backgroundColor = '#A2DEFF';
        } else if (appeal.read) {
            style.backgroundColor = '#EBEBEB';
        }
        return style;
    };

    const circleStyle = {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
        width: '100%',
        height: '50px',
        padding: '4px',
        marginTop:'10px',
        fontSize:'13px',
        paddingLeft:'15px'
    };

    return (
        <>
            <Typography.Title level={2}>Mail for appeals</Typography.Title>
            <Space style={{}}>
                <Input
                showSearch
                prefix={<SearchOutlined />}
                style={{width: 600, borderRadius: 50, margin:'5px 0 10px 0'}}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
                placeholder="Search..."
                />

            </Space>
            <Card style={{minWidth:'1000px'}}>
                <Row gutter={16} style={{marginLeft: '9px'}}>
                    <Col xs={24} lg={12}>
                        <Row gutter={16}>
                            <Col style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:'-4px'}}>
                            <input
                                type={'checkbox'}
                                className='maincheck'
                                style={{ width: '15px', height: '15px' }}
                                onChange={onMainCheckboxChange}
                                checked={selectedRowKeys.length === appeals.length && appeals.length > 0}
                                indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < appeals.length}
                            />
                            </Col>
                            <Col>
                                <Button onClick={refreshAppeals} style={{border:0, margin:0, padding:0}}><UpdateIcon /></Button>
                            </Col>
                            <Col>
                                <Button onClick={showDeleteConfirm}style={{border:0, margin:0, padding:0}}><DeleteIcon /></Button>
                            </Col>

                        </Row>
                    </Col>

                        
                    <Col xs={24} lg={12} style={{display:'flex', justifyContent: 'flex-end'}}>
                        <Select defaultValue="all" style={{ width: 120, margin: 'auto 20px' }} onChange={handleFilterChange}>
                            <Option value="all">All Mail</Option>
                            <Option value="read">Read</Option>
                            <Option value="unread">Unread</Option>
                        </Select>
                        <Row gutter={24}>
                        <Pagination
                            current={currentPage}
                            onChange={handlePageChange}
                            pageSize={pageSize}
                            total={totalRecords}
                            showSizeChanger={false}
                            size='small'
                            rootClassName='pagination-container'
                        />
                        </Row>
                    </Col>
                </Row>
                <div  >
                {appeals.map((appeal, index) => (
                    <Row key={appeal.id} style={getRowStyle(appeal)} >
                    <Col style={{height:'100%',display:'flex', flexDirection:'row', alignItems:'center', marginRight:10}}>
                        <input
                        type={'checkbox'}
                        style={{ width: '15px', height: '15px' }}
                        checked={selectedRowKeys.includes(appeal.id)}
                        onChange={(event) => onCheckboxChange(event, appeal.id)}
                    />
                    </Col>   
                    <Col style={{width:'20%'}} onClick={() => onRowClick(appeal)}>
                        <Row>
                            <b><p style={{padding:0, margin:0}}>{appeal.createdFullName} {appeal.schoolName}</p></b>
                        </Row>
                        <Row>
                            <p style={{padding:0, margin:0}}>{appeal.schoolAddress}</p>
                        </Row>
                    </Col>
                    <hr style={{margin:0}}></hr>
                    <Col style={{width:'60%', padding:0, margin:0}} onClick={() => onRowClick(appeal)}>
                        <b><p style={{margin:0}}>{appeal.topic}</p></b>
                        <p style={{height:20, width:'100%', overflow:'hidden', margin: 0}}>{appeal.text}</p>
                    </Col>
                    <Col style={{width:'15%', marginLeft:10}} onClick={() => onRowClick(appeal)}>
                        <p style={{padding:0, margin:0}}>{appeal.created}</p>
                    </Col>
                    </Row>

                ))}
                </div>

            </Card>
        </>
    );
};

export default AppealsPage;
