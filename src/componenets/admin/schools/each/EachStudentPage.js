import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Col, DatePicker, Form, Image, Input, notification, Row, Spin, Tabs, Typography, Upload} from 'antd';
import {ContainerOutlined, FormOutlined, LoadingOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import GuardianTab from './tabs-student/GuardianTab';
import PsychologistTab from './tabs-student/PsychologistTab';
import GeneralTab from './tabs-student/GeneralTab';
import StudentService from "../../../../services/StudentService";
import {useForm} from "antd/es/form/Form";
import {uploadFile} from "../../../../services/UploadFileService";
import {downloadFile}  from '../../../../services/DownLoadFileService'
import AddGuardiansModal from "../modals/AddGuardiansModal";


const EachStudentPage = () => {
    const {studentId} = useParams();
    const [form] = useForm();
    const [formPsychology] = useForm();

    const [key, setKey] = useState(1);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [data, setData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditPsychologist, setIsEditPsychologist] = useState(false);
    const [isEditGeneral, setIsEditGeneral] = useState(false);
    const [general, setGeneral] = useState(null);
    const [open, setOpen] = useState(false);


    let documentIds = [];
    const handleUpload = async (file) => {
        try {
            const uploadedFileId = await uploadFile(file);
            documentIds.push(uploadedFileId);
            return documentIds;
        } catch (error) {
            notification.error({
                message: 'Upload Error',
                description: 'There was an error uploading the file.',
            });
        }
    };


    const onChange = (key) => {
        setKey(key);
    };


    useEffect(() => {
        if (studentId) {
            getStudentInfo();
        }
    }, [studentId, open])


    const getStudentInfo = async () => {
        setLoading(true);
        await StudentService.getEachStudent(studentId).then((r) => {
            if (r.data) {
                setData(r.data)
                if (r.data.photoId) {
                    fetchPhotoUrl(r.data.photoId);
                }
            }
        }).catch(err => {
            notification.error({
                message: err.message
            })
        }).finally(() => {
            setLoading(false);
        })
    }
    
    const fetchPhotoUrl = async (photoId) => {
        const result = await downloadFile(photoId);
        if (result) {
            setPhotoUrl(result.downloadUrl); // Set the fetched photo URL in state
        }
    };

    useEffect(() => {
        if (isEdit && data) {
            form.setFieldsValue(data);
        }
    }, [isEdit])


    const handleSave = async () => {
        const values = form.getFieldsValue();
        setLoading(true);
        await StudentService.updateStudents(studentId, {...data,...values, photoId: documentIds[0]})
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
        setIsEdit(false);
    }

    const handleSavePsychologist = async () => {
        const values = formPsychology.getFieldsValue();

        const object = {
            ...data,
            additionalProperties: {
                ...data.additionalProperties,
                psychologyDetails: {
                    ...values
                }
            }
        };

        setLoading(true);
        await StudentService.updateStudents(studentId, object)
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


    const handleSaveGeneral = async () => {
        const object = {
            ...data,
            additionalProperties: {
                ...data.additionalProperties,
                general:general
            }
        };
        setLoading(true);
        await StudentService.updateStudents(studentId, object)
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
        setIsEditGeneral(false);
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );



    return (
        <div style={{marginTop: '-50px', marginRight: '80px', marginLeft: '80px'}}>
            <Spin spinning={loading}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={8}>
                        {
                            isEdit
                            ?
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100%', marginLeft: '120px' }}>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={(file) => {
                                            handleUpload(file);
                                            return false;
                                        }}
                                    >
                                        {data?.photoId ? <img src={data?.photoId} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
                                :
                                <Image
                                src={photoUrl || 'fallback-image-url'} 
                                style={{ width: '250px', height: '320px' }}/>
                        }
                    </Col>

                    <Col xs={24} lg={12}>
                        <Typography.Title level={3}>
                            {data?.surname ?? ''}
                            &nbsp;
                            {data?.name ?? ''}
                            &nbsp;
                            {data?.middlename ?? ''}
                        </Typography.Title>
                        {
                            isEdit
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
                    <Col xs={4}>
                        {
                            isEdit
                                ?
                                <Button type={'primary'}
                                        style={{
                                            borderRadius: '20px',
                                            width: '130px',
                                            marginTop: '30px',
                                            float: 'right'
                                        }} onClick={() => handleSave()}>
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
                                            marginTop: '30px',
                                            float: 'right'
                                        }} onClick={() => setIsEdit(true)}>
                                    <Typography.Text style={{fontSize: '15px', color: 'white'}}>
                                        <b>
                                            <FormOutlined/> &nbsp; Edit
                                        </b>
                                    </Typography.Text>
                                </Button>
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
                        <Col xs={2}>
                            {
                                (isEditPsychologist || isEditGeneral)
                                    ?
                                    <Button type={'primary'}
                                            style={{
                                                borderRadius: '20px',
                                                width: '130px',
                                                marginTop: '-5px',
                                                float: 'right'
                                            }}
                                            onClick={() => {
                                                if (key === 2) {
                                                    handleSavePsychologist();

                                                }
                                                if (key === 3) {
                                                    handleSaveGeneral();
                                                }
                                            }}>
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
                                            onClick={() => {
                                                if (key === 1) {
                                                    setOpen(true)
                                                }
                                                if (key === 2) {
                                                    setIsEditPsychologist(true)
                                                }
                                                if (key === 3) {
                                                    setIsEditGeneral(true);
                                                }
                                            }}>
                                        {
                                            key === 1
                                            ?
                                                <Typography.Text style={{fontSize: '15px', color: 'white'}}>
                                                    <b>
                                                        <FormOutlined/> &nbsp; Add
                                                    </b>
                                                </Typography.Text>
                                                :
                                                <Typography.Text style={{fontSize: '15px', color: 'white'}}>
                                                    <b>
                                                        <FormOutlined/> &nbsp; Edit
                                                    </b>
                                                </Typography.Text>
                                        }
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
                            <GuardianTab
                                institutions={data?.additionalProperties?.institutions}
                            />
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
                            <GeneralTab
                                general={data?.additionalProperties?.general}
                                isEditGeneral={isEditGeneral}
                                setGeneral={setGeneral}
                            />
                        </>
                    }
                </div>
            </Spin>
            <AddGuardiansModal data={data} onClose={() => setOpen(false)} isOpen={open} />
        </div>
    );
};

export default EachStudentPage;
