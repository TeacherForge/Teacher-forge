import React from 'react';
import {useForm} from "antd/es/form/Form";
import {Button, Col, Form, Input, Modal, Row, Typography} from "antd";

const AddPsychologistModal = ({isOpen, onClose}) => {
    const [form] = useForm();

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
                </Col>
                <Col xs={14}>
                    <Form form={form}>
                        <Form.Item name={'fullName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Full Name'}/>
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
                    <Button style={{borderRadius:'80px', width:'100%'}} type={'primary'}>
                        Add
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddPsychologistModal;
