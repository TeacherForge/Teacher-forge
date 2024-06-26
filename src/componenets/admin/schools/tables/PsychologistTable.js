import React, {useEffect, useState} from 'react';
import {Table, Button, Row, Col, Input, Form, Typography, notification} from 'antd';
import './index.css';
import { useForm } from 'antd/es/form/Form';
import {CloseOutlined, ContainerOutlined} from '@ant-design/icons';
import {useParams} from "react-router-dom";
import PsychologyService from "../../../../services/PsychologyService";

const PsychologistTable = ({open}) => {
    const { id } = useParams();

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [data,setData] = useState([]);
    const [item, setItem] = useState();
    const [position, setPosition] = useState();
    const [phoneNumber, setNumber] = useState();
    const [form] = useForm();

    const handleExpand = (recordKey) => {
        if (expandedRowKeys.includes(recordKey)) {
            setExpandedRowKeys([]);
        } else {
            setExpandedRowKeys([recordKey]);
        }
    };

    const handleSave = async () => {
        const values = form.getFieldsValue();
        const data = {
            ...values,
            phoneNumber,
            position
        };
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined) {
                delete data[key];
            }
        });

        await PsychologyService.updatePsychology(id,item?.key, data).then(() => {
            getPsychologyInfo();
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
        if (item) {
            form.setFieldsValue({
                userName:item?.userName,
                lastName: item?.lastName,
                middleName: item?.middleName,
                newPassword: item?.password,
                repeatPassword:item?.password,
            })
        }
    },[item, form])

    const handleChange = (type,value) => {
        if (type==='position') {
            setPosition(value)
        } else if (type==='phoneNumber') {
            setNumber(value)
        }
    }
    const handleDel = async (record) => {
        await PsychologyService.delPsychology(id,record.id).then(() => {
            getPsychologyInfo();
        }).catch((error) => {
            notification.error({
                message: error
            })
        });
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

    const handleEdit = (record) => {
        setItem(record);
        handleExpand(record.key);
    }



    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            className: 'full-name-column',
            render: (text, record) => {
                return( <>
                    {record.userName + ' ' + record.middleName + ' ' + record.lastName}
                </>)
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Row>
                    <Col>
                        <Button type={"link"} onClick={() => {handleEdit(record)}}>
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
        getPsychologyInfo();
    },[open]);

    const getPsychologyInfo = async () => {
        await PsychologyService.getPsychology(id).then((res) => {
            const updatedDataSource = res.data.map(item => ({
                ...item,
                key: item.id,
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

export default PsychologistTable;
