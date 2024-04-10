import React, {useEffect, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form, Image,
    Input,
    Modal,
    notification,
    Row,
    Select,
    Typography,
    Upload
} from "antd";
import {useParams} from "react-router-dom";
import StudentService from "../../../../services/StudentService";
import {UploadOutlined} from "@ant-design/icons";
import {uploadFile} from "../../../../services/UploadFileService";
import studentImage from '../../images/StudentAdd.svg'

const classJson = [
    {
        value: '1',
        name: '1'
    },
    {
        value: '2',
        name: '2'
    },
    {
        value: '3',
        name: '3'
    },
    {
        value: '4',
        name: '4'
    },
    {
        value: '5',
        name: '5'
    },
    {
        value: '6',
        name: '6'
    },
    {
        value: '7',
        name: '7'
    },
    {
        value: '8',
        name: '8'
    },
    {
        value: '9',
        name: '9'
    },
    {
        value: '10',
        name: '10'
    },
    {
        value: '11',
        name: '11'
    },
    {
        value: '12',
        name: '12'
    }
]

const AddStudentModal = ({isOpen,onClose}) => {
    const [form] = useForm();
    const [orphan, setOrphan] = useState(false);
    const { id } = useParams();

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


    const handleClick = async () => {
        const values = form.getFieldsValue();
        const data = {
            name: values.userName,
            surname: values.lastName,
            middlename: values.middleName,
            schoolId: id,
            birthDate: values.birthDate,
            gender: values.gender,
            nationality: values.nationality,
            photoId: documentIds[0],
            email: values.email,
            phoneNumber: values.number,
            classRoom: values.class,
            orphan: orphan,
            additionalProperties: {
                institutions: null,
                psychologyDetails: {
                    diligence: null,
                    sociality: null,
                    decency: null,
                    personality: null,
                    memory: null,
                    mind: null,
                    observation: null,
                    attentiveness: null
                },
                general: null
            }
        };
        await StudentService.createStudents(data);
        onClose();
        form.resetFields();
    }


    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={'850px'}
        >
            <div style={{textAlign:'center'}}>
                <Typography.Title level={4}>
                    Add Student
                </Typography.Title>
            </div>
            <Row style={{marginTop:'30px', marginBottom:'10px'}}>
                <Col xs={12}>
                    <Image src={studentImage} alt={'student'} />
                </Col>
                <Col xs={12}>
                    <Form form={form}>
                        <Form.Item name={'userName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px' ,width:'80%'}} placeHolder={'User Name'}/>
                        </Form.Item>
                        <Form.Item name={'lastName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px', width:'80%'}} placeHolder={'Last Name'}/>
                        </Form.Item>
                        <Form.Item name={'middleName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px', width:'80%'}} placeHolder={'Middle Name'}/>
                        </Form.Item>
                        <Form.Item name={'birthDate'}>
                            <DatePicker style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Birth Date'}/>
                        </Form.Item>
                        <Form.Item name={'gender'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Gender'}/>
                        </Form.Item>
                        <Form.Item name={'nationality'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Nationality'}/>
                        </Form.Item>
                        <Form.Item name={'password'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Password'}/>
                        </Form.Item>
                        <Form.Item name={'orphan'}>
                            <Checkbox onChange={(e) => setOrphan(e.target.checked)}>
                                Orphan
                            </Checkbox>
                        </Form.Item>
                        <Form.Item name={'class'}>
                            <Select
                                options={classJson}
                                style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}}
                                placeholder={'Class'}/>
                        </Form.Item>
                        <Form.Item name={'number'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Number'}/>
                        </Form.Item>
                        <Form.Item name={'email'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'E-mail'}/>
                        </Form.Item>
                        <Form.Item  name="attachment"   label="Attach a file"
                                    extra="PDF, PNG, JPEG no more than 5 MB">
                            <Upload
                                name={'file'}
                                beforeUpload={(file) => {
                                    handleUpload(file);
                                    return false;
                                }}
                                accept=".jpg, .jpeg .png"
                            >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                    <Button style={{borderRadius:'80px', width:'80%'}} type={'primary'}  onClick={() => handleClick()}>
                        Add
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddStudentModal;
