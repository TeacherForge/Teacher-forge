import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Col, Form, Image, Input, notification, Row, Spin, Tabs, Typography, Table} from 'antd';
import {ContainerOutlined, FormOutlined} from '@ant-design/icons';
import GuardianTab from './tabs-student-psychologist/GuardianTab';
import PsychologistTab from './tabs-student-psychologist/PsychologistTab';
import GeneralTab from './tabs-student-psychologist/GeneralTab';
import StudentServicePsychologist from "../../../services/StudentServicePsychologist";
import {useForm} from "antd/es/form/Form";
import '../students/EachStudentPagePsychologist.css'
import axios from 'axios';
import {Base_URL} from "../../../constant";
import { useNavigate } from 'react-router-dom';
import {downloadFile}  from '../../../services/DownLoadFileService'


const EachStudentPagePsychologist = () => {
    const {studentId} = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const [form] = useForm();
    const [formPsychology] = useForm();
    const [reports, setReports] = useState([]);
    const [key, setKey] = useState(1);
    const [data, setData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditPsychologist, setIsEditPsychologist] = useState(false);
    const [sortField, setSortField] = useState('createdTime');
    const [sortOrder, setSortOrder] = useState('ascend');
    const pageSize = 10;
    const [photo, setPhoto] = useState();

    const onChange = (key) => {
        setKey(key);
    };


    useEffect(() => {
        if (studentId) {
            getStudentInfo();
        }
    }, [studentId])


    const getStudentInfo = async () => {
        setLoading(true);
        try {
            const r = await StudentServicePsychologist.getEachStudent(studentId);
            setData(r.data);
            if (r.data && r.data.photoId) {
                const fileResult = await downloadFile(r.data.photoId);
                if (fileResult && fileResult.isImage) {
                    setPhoto(fileResult.downloadUrl);
                } else {
                    notification.error({
                        message: 'File is not an image'
                    });
                }
            }
        } catch (err) {
            notification.error({
                message: err.message
            });
        } finally {
            setLoading(false);
        }
    };
    
    


    const handleSavePsychologist = async () => {
        const values = formPsychology.getFieldsValue();

        const object = {
            ...data,
            additionalProperties: {
                ...data.additionalProperties,
                psychologyDetails: {
                    values
                }
            }
        };
        setLoading(true);
        await StudentServicePsychologist.updateStudents(studentId, object)
            .then((r) => {
                getStudentInfo();
            })
            .catch((error) => {
                notification.error({
                    message: error.message
                })
            })
            .finally((r) => {
                setLoading(false);
            })
        setIsEditPsychologist(false);
    }

    const statusStyles = {
        IN_REQUEST: { color: 'silver' },
        IN_WORK: { color: 'blue' },
        REJECTED: { color: 'red' },
        FINISHED: { color: 'green' },
        
      };

      const onRowClick = (record) => {
        return {
          onClick: () => {
            navigate(`/report/${record.id}`); 
          },
        };
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

      const navigate = useNavigate();

      useEffect(() => {
        const fetchAndSetReports = async () => {
          setReports([]);
          await fetchReports();
        };
        
        fetchAndSetReports();
      },  [sortField, sortOrder]);

    const fetchReports = async () => {
        try {
          const response = await axios.get(`${Base_URL}/psychologist/students/${studentId}/reports`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setReports(response.data.map((report, index) => ({ ...report, key: index })));
        } catch (error) {
          notification.error({
            message: 'Ошибка при получении отчетов',
            description: 'Произошла ошибка при попытке получить отчеты.'
          });
        }
      };

    return (
        <div className='main-container'>
            <div className='main-container-studentbar'>
                <Spin spinning={loading}>
                    <Row gutter={[16, 16]}>
                        <Col xs={8}>
                        <Image src={photo} style={{width: '250px', height: '320px'}}/>
                        </Col>

                        <Col xs={12}>
                            <Typography.Title level={3} style={{color:'white'}}>
                                {data?.surname ?? ''}
                                &nbsp;
                                {data?.name ?? ''}
                                &nbsp;
                                {data?.middlename ?? ''}
                            </Typography.Title>
                            {
                                isEditPsychologist
                                    ?
                                    <Form form={form} style={{color:'white'}}>
                                        <Row>
                                            <Col xs={6}><b>Date of birth:</b></Col>
                                            <Col xs={18}>
                                                <Form.Item name={'birthDate'}>
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={6} style={{marginTop: '-15px'}}><b>Class:</b></Col>
                                            <Col xs={18} style={{marginTop: '-15px'}}>
                                                <Form.Item name={'classRoom'}>
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={6} style={{marginTop: '-15px'}}><b>E-mail:</b></Col>
                                            <Col xs={18} style={{marginTop: '-15px'}}>
                                                <Form.Item name={'email'}>
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={6} style={{marginTop: '-15px'}}><b>Phone number:</b></Col>
                                            <Col xs={18} style={{marginTop: '-15px'}}>
                                                <Form.Item name={'phoneNumber'}>
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={6} style={{marginTop: '-15px'}}><b>Nationality:</b></Col>
                                            <Col xs={18} style={{marginTop: '-15px'}}>
                                                <Form.Item name={'nationality'}>
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={6} style={{marginTop: '-15px'}}><b>Gender:</b></Col>
                                            <Col xs={18} style={{marginTop: '-15px'}}>
                                                <Form.Item name={'gender'}>
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                    :
                                    <Row gutter={[16, 24]} style={{color:'white'}}>
                                        <Col xs={6}><b>Date of birth:</b></Col>
                                        <Col xs={18}>{data?.birthDate ?? ''}</Col>
                                        <Col xs={6}><b>Class:</b></Col>
                                        <Col xs={18}>{data?.classRoom ?? ''}</Col>
                                        <Col xs={6}><b>E-mail:</b></Col>
                                        <Col xs={18}>{data?.email ?? ''}</Col>
                                        <Col xs={6}><b>Phone number:</b></Col>
                                        <Col xs={18}>{data?.phoneNumber ?? ''}</Col>
                                        <Col xs={6}><b>Nationality:</b></Col>
                                        <Col xs={18}>{data?.nationality ?? ''}</Col>
                                        <Col xs={6}><b>Gender:</b></Col>
                                        <Col xs={18}>{data?.gender ?? ''}</Col>
                                    </Row>
                            }
                        </Col>

                    </Row>

                    <div style={{marginTop: '50px'}}>
                        <hr/>
                    </div>

                    <div style={{textAlign: 'center', marginTop: '40px'}}>
                        <Typography.Title level={3} style={{color:'white'}}>Details</Typography.Title>
                    </div>
                    <Row>
                        <Col xs={22}>
                            <Tabs
                                style={{color:'white'}}
                                type='card'
                                items={[
                                    {
                                        label: 'Guardians',
                                        key: 1,
                                    },
                                    {
                                        label: 'Psychologist',
                                        key: 2,
                                    },
                                    {
                                        label: 'General',
                                        key: 3,
                                    }
                                ]}
                                onChange={onChange}
                                size={'large'}
                            />
                        </Col>
                        {
                            key === 2
                            &&
                            data?.additionalProperties?.psychologyDetails
                            &&
                            <Col xs={2}>
                                {
                                    isEditPsychologist
                                        ?
                                        <Button type={'primary'}
                                                style={{
                                                    borderRadius: '20px',
                                                    width: '130px',
                                                    marginTop: '-5px',
                                                    float: 'right'
                                                }}
                                                onClick={() => handleSavePsychologist()}>
                                            <Typography.Text style={{fontSize: '15px', color: 'white'}}>
                                                <b>
                                                    <ContainerOutlined/> &nbsp; Save
                                                </b>
                                            </Typography.Text>
                                        </Button>
                                        :
                                        <Button type={'primary'}
                                                style={{
                                                    borderRadius: '20px',
                                                    width: '130px',
                                                    marginTop: '-5px',
                                                    float: 'right'
                                                }}
                                                onClick={() => setIsEditPsychologist(true)}>
                                            <Typography.Text style={{fontSize: '15px', color: 'white'}}>
                                                <b>
                                                    <FormOutlined/> &nbsp; Edit
                                                </b>
                                            </Typography.Text>
                                        </Button>
                                }
                            </Col>
                        }
                    </Row>
                    <div>

                        {
                            key === 1
                            &&
                            <>
                                <GuardianTab guardians={data?.additionalProperties?.guardians}/>
                            </>
                        }
                        {
                            key === 2
                            &&
                            <>
                                <PsychologistTab
                                    psychologyDetails={data?.additionalProperties?.psychologyDetails}
                                    isEditPsychologist={isEditPsychologist}
                                    form={formPsychology}
                                />
                            </>
                        }
                        {
                            key === 3
                            &&
                            <>
                                <GeneralTab general={data?.additionalProperties.general}/>
                            </>
                        }
                    </div>
                    <div style={{marginTop: '50px'}}>
                        <hr/>
                    </div>

                    <div style={{textAlign: 'center', marginTop: '40px'}}>
                        <Typography.Title level={3} style={{color:'white'}}>Past Reports</Typography.Title>
                    </div>
                    <Row>
                        {
                            <Table 
                            onRow={onRowClick} 
                            pagination={true} 
                            pageSize={pageSize}
                            columns={columns} 
                            dataSource={reports} 
                            className='disciplinary-report-table' 
                            style={{width:'100%', minHeight:200}}/>
                        }
                    </Row>
                </Spin>
            </div>
            
        </div>
    );
};

export default EachStudentPagePsychologist;
