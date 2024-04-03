import React from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Typography} from 'antd';
import {useForm} from 'antd/es/form/Form';
import '../table.css'
const AddSchoolModal = ({isOpen, onClose}) => {
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
                    Create School
                </Typography.Title>
            </div>

            <Row style={{marginTop:'30px', marginBottom:'10px'}}>
                <Col xs={8}>
                </Col>
                <Col xs={16}>
                    <Form form={form}>
                        <Row gutter={16}>
                            <Col xs={12}>
                                <Form.Item name={'nameOfSchool'}>
                                    <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Name of School'}/>
                                </Form.Item>
                                <Form.Item name={'region'}>
                                    <Select style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeholder={'Region'}/>
                                </Form.Item>
                                <Form.Item name={'address'}>
                                   <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Address'}/>
                                </Form.Item>
                            </Col>
                            <Col xs={12}>
                                <Form.Item name={'domain'}>
                                    <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'Domain'}/>
                                </Form.Item>
                                <Form.Item name={'typeOfSchool'}>
                                    <Select style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeholder={'Type Of School'}/>
                                </Form.Item>
                                <Form.Item name={'status'}>
                                    <Select style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeholder={'Status'}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button style={{borderRadius:'80px', width:'100%'}} type={'primary'}>
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddSchoolModal;
