import React, {useEffect, useState} from 'react';
import {Table, Button, Row, Col, Input, Form, Typography, notification} from 'antd';
import './index.css';
import { useForm } from 'antd/es/form/Form';
import {CloseOutlined, ContainerOutlined} from '@ant-design/icons';
import TeacherService from "../../../../services/TeacherService";
import {useParams} from "react-router-dom";

const TeachersTable = () => {
    const { id } = useParams();

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [data,setData] = useState([]);
    const [record, setRecord] = useState();
    const [position, setPosition] = useState();
    const [phoneNumber, setNumber] = useState();
    const [category, setCategory] = useState();
    const [form] = useForm();

    const handleExpand = (key) => {
        if (expandedRowKeys.includes(key)) {
            setExpandedRowKeys([]);
        } else {
            setExpandedRowKeys([key]);
        }
    };

    const handleSave = async () => {
        const values = form.getFieldsValue();
        const data = {
            ...values,
            phoneNumber,
            position,
            category
        };
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined) {
                delete data[key];
            }
        });

        await TeacherService.updateTeachers(id, data).then(() => {
            getTeachersInfo();
        }).catch((e) => {
            notification.error({
                message: e
            })
        });
    };

    const expandedRowRender = (record) => (
        <p style={{ margin: 0 }}>{record.extra}</p>
    );

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                userName:record?.userName,
                lastName: record?.lastName,
                middleName: record?.middleName,
                newPassword: record?.password,
                repeatPassword:record?.password,
            })
        }
    },[record])

    const handleChange = (type,value) => {
         if (type==='position') {
             setPosition(value)
         } else if (type==='phoneNumber') {
             setNumber(value)
         } else if (type==='category') {
             setCategory(value)
         }
    }

    const extraform = () => {
        return (
            <Row gutter={12}>
                <Col xs={4}>
                    <Row gutter={[36, 36]}>
                        <Col xs={24}><b>Name</b></Col>
                        <Col xs={24}><b>Surname</b></Col>
                        <Col xs={24}><b>Middle name</b></Col>
                        <Col xs={24}><b>New password</b></Col>
                        <Col xs={24}><b>Repeat password</b></Col>
                    </Row>
                </Col>
                <Col xs={11}>
                    <Form form={form}>
                        <Form.Item name="userName">
                            <Input style={{ width: '200px' }} />
                        </Form.Item>
                        <Form.Item name="lastName">
                            <Input style={{ width: '200px' }} />
                        </Form.Item>
                        <Form.Item name="middleName">
                            <Input style={{ width: '200px' }} />
                        </Form.Item>
                        <Form.Item name="newPassword">
                            <Input style={{ width: '200px' }} />
                        </Form.Item>
                        <Form.Item name="repeatPassword">
                            <Input style={{ width: '200px' }} />
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={9}>
                    <Button style={{ borderRadius: '20px', width: '50px', position: 'absolute', right: 0 }} onClick={handleExpand}>
                        <Typography.Text style={{ fontSize: '15px' }}><CloseOutlined /></Typography.Text>
                    </Button>
                    <Button type={'primary'} style={{ borderRadius: '20px', width: '130px', position: 'absolute', bottom: 0, right: 0 }} onClick={handleSave}>
                        <Typography.Text style={{ fontSize: '15px', color: 'white' }}><b><ContainerOutlined /> &nbsp; Save</b></Typography.Text>
                    </Button>
                </Col>
            </Row>
        );
    };

    const handleDel = async (record) => {
        await TeacherService.delUser(id,record.id).then(() => {
            getTeachersInfo();
        }).catch((error) => {
            notification.error({
                message: error
            })
        });
    }


    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            className: 'full-name-column',
            render: (text, record) => {
               return <>
                   {record.userName + ' ' + record.middleName + ' ' + record.lastName}
               </>
            },
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            className: 'position-column',
            render: (text, record) => {
                if (record.key === expandedRowKeys[0]) {
                    return <Input defaultValue={text} onChange={(e) => handleChange('position',e.target.value)} />;
                } else {
                    return text;
                }
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (text, record) => {
                if (text!==null){
                    if (record.key === expandedRowKeys[0]) {
                        return <Input defaultValue={text} onChange={(e) => handleChange('phoneNumber',e.target.value)} />;
                    } else {
                        return text;
                    }
                }
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text, record) => {
                if(text!==null) {
                    if (record.key === expandedRowKeys[0]) {
                        return <Input defaultValue={text} onChange={(e) => handleChange('category',e.target.value)} />;
                    } else {
                        return text;
                    }
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Row>
                    <Col>
                        <Button type={"link"} onClick={() => { handleExpand(record.key); setRecord(record) }}>
                            Edit
                        </Button>
                    </Col>
                    <Col>
                        <Button type={"link"} onClick={() => handleDel(record)} danger>
                            Delete
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];
    
    useEffect(() => {
    getTeachersInfo();
    },[]);

    const getTeachersInfo = async () => {
        await TeacherService.getTeachers(id).then((res) => {
            const updatedDataSource = res.data.map(item => ({
                ...item,
                extra: extraform(),
            }));
            setData(updatedDataSource);
        })
    }

    return (
        <Table

            dataSource={data}
            columns={columns}
            expandedRowRender={expandedRowRender}
            expandedRowKeys={expandedRowKeys}
        />
    );
};

export default TeachersTable;
