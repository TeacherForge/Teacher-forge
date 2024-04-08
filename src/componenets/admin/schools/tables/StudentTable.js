import React, {useEffect, useState} from 'react';
import {Table, Button, Row, Col, notification} from 'antd';
import './index.css';
import TeacherService from "../../../../services/TeacherService";
import {Link, useNavigate, useParams} from "react-router-dom";
import StudentService from "../../../../services/StudentService";

const StudentTable = () => {
    const { id } = useParams();

    const [data,setData] = useState([]);

    const navigate = useNavigate();

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
                return (
                    <>
                    {record.name + ' ' + record.middleName + ' ' + record.surname}
                    </>
                )
            },
        },
        {
            title: 'Class',
            dataIndex: 'classRoom',
            key: 'classRoom',
            className: 'position-column',
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
        },
        {
            title: 'Date of birth',
            dataIndex: 'birthDate',
            key: 'birthDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Row>
                    <Col>
                        <Link to={`/schools/student/${record?.id}`}>
                            <Button type={"link"}>
                                Edit
                            </Button>
                        </Link>
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
        await StudentService.getStudents(id).then((res) => {
            const updatedDataSource = res.data.map(item => ({
                ...item,
            }));
            setData(updatedDataSource);
        })
    }

    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    );
};

export default StudentTable;
