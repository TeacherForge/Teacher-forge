import React from 'react';
import {Button, Col, Form, Input, Modal, Row, Typography} from "antd";
import {useForm} from "antd/es/form/Form";

const AddTeacherModal = ({isOpen,onClose}) => {
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
                    Add Teacher
                </Typography.Title>
            </div>
            <Row style={{marginTop:'30px', marginBottom:'10px'}}>
                <Col xs={12}>
                </Col>
                <Col xs={12}>
                    <Form form={form}>
                        <Form.Item name={'fullName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Full Name'}/>
                        </Form.Item>
                        <Form.Item name={'password'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Password'}/>
                        </Form.Item>
                        <Form.Item name={'position'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Position'}/>
                        </Form.Item>
                        <Form.Item name={'number'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Number'}/>
                        </Form.Item>
                        <Form.Item name={'email'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'E-mail'}/>
                        </Form.Item>
                        <Form.Item name={'category'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Category'}/>
                        </Form.Item>
                    </Form>
                    <Button style={{borderRadius:'80px', width:'80%'}} type={'primary'}>
                        Add
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddTeacherModal;
