import React from 'react';
import {Button, Col, Form, Input, Modal, notification, Row, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import {useParams} from "react-router-dom";
import StudentService from "../../../../services/StudentService";

const AddGuardiansModal = ({isOpen, onClose,data}) => {
    const {studentId} = useParams();

    const [form] = useForm();

    const handleClick = async () => {
        const values = form.getFieldsValue();

        const object = {
            ...data,
            additionalProperties: {
                ...data.additionalProperties,
                institutions: [
                    ...data.additionalProperties.institutions,
                    values
                ]
            }
        };
        await StudentService.updateStudents(studentId, object)
            .catch((error) => {
                notification.error({
                    message: error.message
                })
            })
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
                    Add Guardians
                </Typography.Title>
            </div>
            <Row style={{marginTop:'30px', marginBottom:'10px'}}>
                <Col xs={24}>
                    <Form form={form}>
                        <Form.Item name={'name'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'name'}/>
                        </Form.Item>
                        <Form.Item name={'number'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'number'}/>
                        </Form.Item>
                        <Form.Item name={'email'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'email'}/>
                        </Form.Item>
                        <Form.Item name={'address'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'address'}/>
                        </Form.Item>
                        <Form.Item name={'governessName'}>
                            <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'governessName'}/>
                        </Form.Item>
                        {
                            data?.orphan === false
                            &&
                            <Form.Item name={'job'}>
                                <Input style={{borderRadius:'80px', borderColor:'#000', height:'40px'}} placeHolder={'job'}/>
                            </Form.Item>
                        }
                    </Form>
                    <Button style={{borderRadius:'80px', width:'100%'}} type={'primary'} onClick={() => handleClick()}>
                        Add
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddGuardiansModal;
