import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Col, Form, Image, Input, notification, Row, Spin, Tabs, Typography} from 'antd';
import {ContainerOutlined, FormOutlined} from '@ant-design/icons';
import GuardianTab from './tabs-student-psychologist/GuardianTab';
import PsychologistTab from './tabs-student-psychologist/PsychologistTab';
import GeneralTab from './tabs-student-psychologist/GeneralTab';
import StudentServicePsychologist from "../../../services/StudentServicePsychologist";
import {useForm} from "antd/es/form/Form";
import '../students/EachStudentPagePsychologist.css'


const EachStudentPagePsychologist = () => {
    const {studentId} = useParams();
    const [form] = useForm();
    const [formPsychology] = useForm();

    const [key, setKey] = useState(1);
    const [data, setData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditPsychologist, setIsEditPsychologist] = useState(false);

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
        await StudentServicePsychologist.getEachStudent(studentId).then((r) => {
            if (r.data) {
                setData(r.data)
            }
        }).catch(err => {
            notification.error({
                message: err.message
            })
        }).finally(() => {
            setLoading(false);
        })
    }



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

    return (
        <div className='main-container'>
            <Spin spinning={loading}>
                <Row gutter={[16, 16]}>
                    <Col xs={8}>
                        <Image
                            src={'https://v1.spb.ru/gallery/foto-na-dokumenty/20150512/3,5_4,5.jpg'}
                            style={{width: '250px', height: '320px'}}/>
                    </Col>

                    <Col xs={12}>
                        <Typography.Title level={3}>
                            {data?.surname ?? ''}
                            &nbsp;
                            {data?.name ?? ''}
                            &nbsp;
                            {data?.middlename ?? ''}
                        </Typography.Title>
                        {
                            isEditPsychologist
                                ?
                                <Form form={form}>
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
                                <Row gutter={[16, 24]}>
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

                <div style={{textAlign: 'center', marginTop: '-20px'}}>
                    <Typography.Title level={3}>Details</Typography.Title>
                </div>
                <Row>
                    <Col xs={22}>
                        <Tabs
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
            </Spin>
        </div>
    );
};

export default EachStudentPagePsychologist;
