import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import {RollbackOutlined} from '@ant-design/icons'
import {AllEmailIcon, LeftIcon, LetterIcon, OpenLetterIcon, RightIcon,DeleteIcon} from "../../../constant/image/icons/Index.";
import {Checkbox, Col, Row, Typography, notification, Pagination, Button, Card} from "antd";
import axios from 'axios';
import {Base_URL} from "../../../constant";


const ReadAppealsPage = () => {
    const {id} = useParams();
    const [appeals, setAppeals] = useState([]);
    const [appeal, setAppeal] = useState(null);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(); 
    const [read, setRead] = useState();
    const pageSize = 30;
    const [activeButton, setActiveButton] = useState('all');
    const styleSideBar = {
        backgroundColor: 'white',
        height: '100%',
        width: '30%',
        padding: '20px'
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const circleStyle = {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        width: '100%',
        height: '50px',
        padding: '4px',
        marginTop:'10px',
        fontSize:'13px'
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

    const deleteAppeal = async () => {
        try {
            const del = appeal.id;
            axios.delete(`${Base_URL}/admin/appeals/${del}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            
            refreshAppeals();
            setSelectedRowKeys([]); 
            setAppeal();
        } catch (error) {}
    };

    const markAsRead = async (read) => {
        if(read === 'all'){
            setRead();
        } else
        setRead(read);
    };
    


    useEffect(() => {
        fetchAppeals();
    }, [currentPage, read]);

    useEffect(() => {
        fetchAppeal();
    }, []);

    const fetchAppeals = async () => {
        try {
            const response = await axios.get(`${Base_URL}/admin/appeals`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    read: read,
                }
            });
            setAppeals(response.data.map((report, index) => ({ ...report, key: report.id })));
            setTotalRecords(parseInt(response.headers['x-total-count'], 10));
        } catch (error) {
            notification.error({
                message: 'Ошибка при получении обращения',
                description: 'Не удалось получить данные.'
            });
        }
    };

    
    const fetchAppeal = async () => {
        try {
            const response = await axios.get(`${Base_URL}/admin/appeals/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setAppeal(response.data);
        } catch (error) {
            notification.error({
                message: 'Ошибка при получении обращения',
                description: 'Не удалось получить данные.'
            });
        }
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

    const callback = () =>{
        navigate(`/appeals`);
    }

    return (
        <div style={{display:'flex', flexDirection:'row'}}>
            <div style={styleSideBar}>
                <Row gutter={[20,20]}>
                    <Col xs={24}>
                        <Row gutter={16}>
                            <Col style={{marginTop:'2px'}}>
                            <Button
                                onClick={() => {
                                    markAsRead('all');
                                    setActiveButton('all');
                                }}
                                style={{
                                    width:'200px',
                                    border: 0,
                                    margin: 0,
                                    padding: 0,
                                    backgroundColor: activeButton === 'all' ? '#C0DAFF' : 'inherit'
                                }}
                            >
                                <AllEmailIcon />
                                All mail
                            </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24}>
                        <Row gutter={16}>
                            <Col style={{marginTop:'2px'}}>
                            <Button
                                onClick={() => {
                                    markAsRead(true);
                                    setActiveButton('read');
                                }}
                                style={{
                                    width:'200px',
                                    border: 0,
                                    margin: 0,
                                    padding: 0,
                                    backgroundColor: activeButton === 'read' ? '#C0DAFF' : 'inherit'
                                }}
                            >
                                <OpenLetterIcon />
                                Read
                            </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24}>
                        <Row gutter={16}>
                            <Col style={{marginTop:'2px'}}>
                            <Button
                                onClick={() => {
                                    markAsRead(false);
                                    setActiveButton('unread');
                                }}
                                style={{
                                    width:'200px',
                                    border: 0,
                                    margin: 0,
                                    padding: 0,
                                    backgroundColor: activeButton === 'unread' ? '#C0DAFF' : 'inherit'
                                }}
                            >
                                <LetterIcon />
                                Unread
                            </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:'15px'}}>
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
                    <Col xs={24} lg={22} style={{display:'flex', justifyContent: 'flex-end',marginTop:'2px'}}>
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
                <hr />
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
                    <Col style={{width:'90%'}} onClick={() => onRowClick(appeal)}>
                        <Row>
                            <Col style={{width:'75%'}}><b><p style={{padding:0, margin:0}}>
                                {appeal.createdFullName} {appeal.schoolName} 
                                </p></b>
                            </Col>
                            <Col style={{width:'25%'}}>
                            <p style={{padding:0, margin:0, fontSize:'10px'}}>{appeal.created}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontSize:'10px', width:'25%', display:'flex', flexDirection:'row', alignItems:'center'}}>{appeal.schoolAddress}</Col>
                            <Col style={{width:'75%', height:20, overflow:'hidden'}}><b>{appeal.topic}</b> {appeal.text}</Col>
                        </Row>
                    </Col>
                    </Row>

                ))}
                </div>
            </div>
            <div style={{width: '60%', height:'100%'}}>
                <Typography.Title level={2} style={{margin:'50px 0 50px 40px'}}>Mail for appeals</Typography.Title>
                <div style={{padding: 10, margin:'0 40px 20px 10px', width:'100%', minHeight:'600px', backgroundColor:'white', border: 0, borderRadius:'20px'}}>
                    <Row style={{padding:5}}>
                        <Col>
                            <Button onClick={callback} style={{border:0}}><RollbackOutlined /></Button>
                        </Col>
                        <Col>
                            <Button onClick={deleteAppeal} style={{border:0}}><DeleteIcon /></Button>
                        </Col>
                    </Row>
                    <hr/>
                    <div style={{padding:'5px'}}>
                        <Row style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Col>
                                <b>{appeal && appeal.createdFullName}</b>
                            </Col>
                            <Col>
                                <b>{appeal && appeal.schoolName}</b>
                            </Col>
                            <Col>
                                {appeal && appeal.schoolAddress}
                            </Col>
                            <Col>
                                {appeal && appeal.created}
                            </Col>
                        </Row>
                        <Row style={{padding:'10px'}}>
                            <Col>
                                <Row style={{width:'100%'}}><b><p style={{fontSize:20}}>{appeal && appeal.topic}</p></b></Row>
                                <Row style={{width:'100%'}}><p style={{fontSize:12}}>{appeal && appeal.text}</p></Row>
                            </Col>
                        </Row>
                        <div >
                            
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ReadAppealsPage;
