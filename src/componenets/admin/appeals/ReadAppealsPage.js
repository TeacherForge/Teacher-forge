import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import {RollbackOutlined,FileOutlined} from '@ant-design/icons'
import {AllEmailIcon,LetterIcon, OpenLetterIcon, DeleteIcon} from "../../../constant/image/icons/Index.";
import {Col, Row, Typography, notification, Pagination, Button,Modal} from "antd";
import axios from 'axios';
import {Base_URL} from "../../../constant";
import {downloadFile}  from '../../../services/DownLoadFileService'


const ReadAppealsPage = () => {
    const {id} = useParams();
    const [appeals, setAppeals] = useState([]);
    const [appeal, setAppeal] = useState(null);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(); 
    const [read, setRead] = useState();
    const pageSize = 9;
    const [fileLinks, setFileLinks] = useState([]);
    const [activeButton, setActiveButton] = useState('all');
    const styleSideBar = {
        backgroundColor: 'white',
        height: '100%',
        width: '30%',
        padding: '20px'
    };
    const circleStyle = {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
        width: '100%',
        minHeight: '50px',
        padding: '4px',
        marginTop:'10px',
        fontSize:'13px',
        paddingLeft:'15px'
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Are you sure delete this appeal?',
            content: 'This action cannot be undone and will permanently delete the appeal from the system.',
            okText: 'Yes, delete it',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteAppeal();
            }
        });
    };

    const onRowClick = async (selectedAppeal) => {
        try {
            const response = await axios.get(`${Base_URL}/admin/appeals/${selectedAppeal.id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setAppeal(response.data);
            await fetchAppeals();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Could not fetch appeal details.',
            });
        }
    };

    const handlePageChange = async (value) => {
    await new Promise(resolve => {
        setCurrentPage(value, resolve);
    });
    setAppeals([]);
    fetchAppeals();
    }


    const deleteAppeal = async () => {
        if (!appeal || !appeal.id) {
            notification.error({
                message: 'No Appeal Selected',
                description: 'Please select an appeal to delete.',
            });
            return;
        }
    
        try {
            const response = await axios.delete(`${Base_URL}/admin/appeals/${appeal.id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (response.status === 200) {
                notification.success({
                    message: 'Appeal Deleted',
                    description: 'The appeal has been successfully deleted.'
                });
                setAppeal(null); // Clear the current appeal details from the view
                await fetchAppeals(); // Refresh the list of appeals
            }
        } catch (error) {
            notification.error({
                message: 'Failed to Delete Appeal',
                description: 'An error occurred while attempting to delete the appeal.'
            });
        }
    };

    const markAsRead = async (read) => {
        if(read === 'all'){
            setRead();
        } else
        setRead(read);
    };

    useEffect(() => {
        fetchAppeals();
    }, [currentPage]);

    useEffect(() => {
        fetchAppeal();
    }, []);

    const fetchAppeals = async () => {
        try {
            const response = await axios.get(`${Base_URL}/admin/appeals`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    read: read,
                    page: currentPage,
                    pageSize: pageSize,
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

    useEffect(() => {
        const fetchFiles = async () => {
          if (appeal && appeal.documentIds && appeal.documentIds.length > 0) {
            const linksPromises = appeal.documentIds.map(fileId => downloadFile(fileId));
            try {
              const links = await Promise.all(linksPromises);
              setFileLinks(links.filter(link => link !== null));
            } catch (error) {}
          }
        };
      
        if (appeal && appeal.documentIds) {
            fetchFiles();
        }
      }, [appeal, appeal?.documentIds]);
    

    const getRowStyle = (appeal) => {
        let style = { ...circleStyle };
        if (appeal.read) {
            style.backgroundColor = '#EBEBEB';
        } else {
            style.backgroundColor = '#FFFFFF';
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
                    <Row key={appeal.id} style={getRowStyle(appeal)} onClick={() => onRowClick(appeal)}>
                    <Col style={{width:'90%'}}>
                        <Row>
                            <Col style={{width:'75%'}}><b><p style={{paddingRight:5, margin:0}}>
                                {appeal.createdFullName}, {appeal.schoolName} 
                                </p></b>
                            </Col>
                            <Col style={{width:'25%'}}>
                            <p style={{padding:0, margin:0, fontSize:'10px'}}>{appeal.created}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontSize:'10px', width:'25%', display:'flex', flexDirection:'row', alignItems:'center', paddingRight:5}}>{appeal.schoolAddress}</Col>
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
                            <Button onClick={showDeleteConfirm} style={{border:0}}><DeleteIcon /></Button>
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
                                <Row>
                                <div className="files">
                                {fileLinks.map((file, index) => {
                                    return (
                                    <div key={index} className="file-item">
                                        <a href={file.downloadUrl} download={file.filename}>
                                        <Button style={{border:0}} icon={<FileOutlined style={{color:'#0085FF'}}/>} size="small">{file.filename}</Button>
                                        </a>
                                    </div>
                                    );
                                })}
                                </div>
                                </Row>
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
