import React from 'react';
import {useForm} from "antd/es/form/Form";
import {Button, Col, Form, Input, Modal, Row, Select, Typography} from "antd";

const AddStudentModal = ({isOpen,onClose}) => {
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
                    Add Student
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
                        <Form.Item name={'gender'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Gender'}/>
                        </Form.Item>
                        <Form.Item name={'nationality'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Nationality'}/>
                        </Form.Item>
                        <Form.Item name={'password'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Password'}/>
                        </Form.Item>
                        <Form.Item name={'class'}>
                            <Select style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeholder={'Class'}/>
                        </Form.Item>
                        <Form.Item name={'number'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'Number'}/>
                        </Form.Item>
                        <Form.Item name={'email'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px',width:'80%'}} placeHolder={'E-mail'}/>
                        </Form.Item>
                        <Form.Item>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.png,.jpg"
                            />
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

export default AddStudentModal;
