import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Col, Input, Row, Select, Tabs, Typography} from 'antd';
import '../table.css'
import {ContainerOutlined, FormOutlined} from '@ant-design/icons';
import TeachersTable from "../tables/TeachersTable";
import SchoolsService from "../../../../services/SchoolsService";
import AddTeacherModal from "../modals/AddTeacherModal";
import AddPsychologistModal from "../modals/AddPsychologistModal";
import PsychologistTable from "../tables/PsychologistTable";
import AddStudentModal from "../modals/AddStudentModal";
import StudentTable from "../tables/StudentTable";
import RegionService from "../../../../services/RegionService";

const EachSchoolPage = () => {

    const {id} = useParams();
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState(1);
    const [info, setInfo] = useState();
    const [isEdit, setIsEdit] = useState(false);

    const [name,setName] = useState(null);
    const [address,setAddress] = useState(null);
    const [type,setType] = useState(null);
    const [status,setStatus] = useState(null);
    const [domain,setDomain] = useState(null);






    const onChange = (key) => {
        setKey(key);
    };

    useEffect(() => {
        infoSchool();
    }, [])

    const infoSchool = async () => {
        await SchoolsService.getSchoolsById(id).then((res) => {
            setInfo(res.data);
        });
    }

    const handleSave = async () => {
        const data = {
            address: address,
            status: status,
            type: type,
            name: name
        };
        await SchoolsService.updateSchools(id, data);
        setIsEdit(false);
        infoSchool();
    }

    return (
        <>
            <Row gutter={16} style={{marginTop: '-70px'}}>
                <Col xs={12}>
                    {
                        isEdit
                            ?
                            <Typography.Title>
                                <Input defaultValue={info?.name} size="large" onChange={(e) => setName(e.target.value)}/>
                            </Typography.Title>
                            :
                            <Typography.Title>{info?.name}</Typography.Title>
                    }
                    <Row gutter={[16,16]}>
                        <Col xs={4}>
                            <Typography.Text style={{fontSize: '15px'}}><b>Address:</b></Typography.Text>
                        </Col>
                        <Col xs={20}>
                            {
                                isEdit
                                    ?
                                    <Typography.Text>
                                        <Input defaultValue={info?.address} onChange={(e) => setAddress(e.target.value)} style={{width:'100%'}}/>
                                    </Typography.Text>
                                    :
                            <Typography.Text style={{fontSize: '15px'}}>{info?.address ?? ''}</Typography.Text>
                            }
                        </Col>
                        <Col xs={4}>
                            <Typography.Text style={{fontSize: '15px'}}><b>Type:</b></Typography.Text>
                        </Col>
                        <Col xs={20}>
                            {
                                isEdit
                                    ?
                                    <Typography.Text>
                                        <Select
                                            options={[
                                                { value: 'GYMNASIUMS', label: 'GYMNASIUMS' },
                                                { value: 'LYCEUMS', label: 'LYCEUMS' },
                                                { value: 'INTERNATIONAL', label: 'INTERNATIONAL' },
                                                { value: 'SPECIALIZED', label: 'SPECIALIZED' },
                                                { value: 'GENERAL', label: 'GENERAL' },
                                                { value: 'BOARDING', label: 'BOARDING' },
                                            ]} defaultValue={info?.type} onChange={(e) => setType(e)} style={{width:'100%'}}/>
                                    </Typography.Text>
                                    :
                            <Typography.Text style={{fontSize: '15px'}}>{info?.type}</Typography.Text>
                            }
                        </Col>
                        <Col xs={4}>
                            <Typography.Text style={{fontSize: '15px'}}><b>Status:</b></Typography.Text>
                        </Col>
                        <Col xs={20}>
                            {
                                isEdit
                                    ?
                                    <Typography.Text>
                                        <Select
                                            options={[
                                                { value: 'STATE', label: 'STATE' },
                                                { value: 'MUNICIPAL', label: 'MUNICIPAL' },
                                                { value: 'PRIVATE', label: 'PRIVATE' },
                                            ]} defaultValue={info?.status} onChange={(e) => setStatus(e)} style={{width:'100%'}}/>
                                    </Typography.Text>
                                    :
                            <Typography.Text style={{fontSize: '15px'}}>{info?.status}</Typography.Text>
                            }
                        </Col>
                        <Col xs={4}>
                            <Typography.Text style={{fontSize: '15px'}}><b>Domain:</b></Typography.Text>
                        </Col>
                        <Col xs={20}>
                            {
                            <Typography.Text style={{fontSize: '15px'}}>{info?.domain}</Typography.Text>
                            }
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    {
                        isEdit
                            ?
                            <Button type={'primary'}
                                    style={{
                                        borderRadius: '20px',
                                        width: '130px',
                                        marginTop: '30px',
                                        float: 'right'
                                    }} onClick={() => handleSave()}>
                                <Typography.Text style={{fontSize: '15px', color: 'white'}}>
                                    <b>
                                        <ContainerOutlined/> &nbsp; Save
                                    </b>
                                </Typography.Text>
                            </Button>
                            :
                            <Button type={'primary'}
                                    style={{borderRadius: '20px', width: '130px', marginTop: '30px', float: 'right'}}
                                    onClick={() => setIsEdit(true)}>
                                <Typography.Text style={{fontSize: '15px', color: 'white'}}><b>
                                    <FormOutlined/> &nbsp; Edit</b></Typography.Text>
                            </Button>
                    }
                </Col>
            </Row>
            <div style={{marginTop: '50px'}}>
                <Row>
                    <Col xs={12}>
                        <Tabs
                            type='card'
                            items={[
                                {
                                    label: 'Teachers',
                                    key: 1,
                                },
                                {
                                    label: 'Psychologist',
                                    key: 2,
                                },
                                {
                                    label: 'Students',
                                    key: 3,
                                }
                            ]}
                            onChange={onChange}
                            size={'large'}
                        />
                    </Col>
                    <Col xs={12}>
                        <Button type={'primary'} onClick={() => setOpen(true)}
                                style={{borderRadius: '20px', width: '110px', float: 'right'}}>
                            Add people
                        </Button>
                    </Col>
                </Row>
            </div>
            {
                key === 1
                &&
                <>
                    <TeachersTable open={open}/>
                    <AddTeacherModal
                        isOpen={open}
                        onClose={() => setOpen(false)}
                    />
                </>
            }
            {
                key === 2
                &&
                <>
                    <PsychologistTable open={open}/>
                    <AddPsychologistModal
                        isOpen={open}
                        onClose={() => setOpen(false)}
                    />
                </>
            }
            {
                key === 3
                &&
                <>
                    <StudentTable open={open}/>
                    <AddStudentModal
                        isOpen={open}
                        onClose={() => setOpen(false)}
                    />
                </>
            }
        </>
    );
};

export default EachSchoolPage;
