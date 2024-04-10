import React from 'react';
import {useForm} from "antd/es/form/Form";
import {Button, Col, Form, Image, Input, Modal, Row, Typography} from "antd";
import TeacherService from "../../../../services/TeacherService";
import PsychologyService from "../../../../services/PsychologyService";
import {useParams} from "react-router-dom";
import psychologyImage from '../../images/PsychologistAdd.svg'
const AddPsychologistModal = ({isOpen, onClose}) => {
    const [form] = useForm();
    const { id } = useParams();

    const handleClick = async () => {
        const values = form.getFieldsValue();
        const data = {
            email: values.email,
            userName: values.userName,
            lastName: values.lastName,
            middleName: values.middleName,
            userRole: "PSYCHOLOGIST",
            password: values.password,
            schoolId: id,
            position: values.position,
            category: values.category,
            phoneNumber: values.number
        };
        await PsychologyService.createPsychology(data);
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
                    Add Psychologist
                </Typography.Title>
            </div>
            <Row style={{marginTop:'30px', marginBottom:'10px'}}>
                <Col xs={10}>
                    <Image src={psychologyImage} alt={'psychology'} />
                </Col>
                <Col xs={14}>
                    <Form form={form}>
                        <Form.Item name={'userName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Full Name'}/>
                        </Form.Item>
                        <Form.Item name={'lastName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Last Name'}/>
                        </Form.Item>
                        <Form.Item name={'middleName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Middle Name'}/>
                        </Form.Item>
                        <Form.Item name={'password'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Password'}/>
                        </Form.Item>
                        <Form.Item name={'position'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Position'}/>
                        </Form.Item>
                        <Form.Item name={'number'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Number'}/>
                        </Form.Item>
                        <Form.Item name={'email'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'E-mail'}/>
                        </Form.Item>
                        <Form.Item name={'category'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Category'}/>
                        </Form.Item>
                    </Form>
                    <Button style={{borderRadius:'80px', width:'100%'}} type={'primary'} onClick={() => handleClick()}>
                        Add
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddPsychologistModal;
