import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Col, Row, Tabs, Typography} from 'antd';
import '../table.css'
import {FormOutlined} from '@ant-design/icons';
import TeachersTable from "../tables/TeachersTable";
import SchoolsService from "../../../../services/SchoolsService";
import AddSchoolModal from "../modals/AddSchoolModal";
import AddTeacherModal from "../modals/AddTeacherModal";
import AddPsychologistModal from "../modals/AddPsychologistModal";
import PsychologyService from "../../../../services/PsychologyService";
import PsychologistTable from "../tables/PsychologistTable";
import AddStudentModal from "../modals/AddStudentModal";
import StudentTable from "../tables/StudentTable";
const EachSchoolPage = () => {

    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState(1);
    const [info, setInfo] = useState();
    const [openModal, setOpenModal] = useState(false);

    const onChange = (key) => {
        setKey(key);
    };

    // useEffect(() => {
    //     infoSchool();
    // },[])

    const infoSchool = async () => {
        await SchoolsService.getSchoolsById(id).then((res) => {
            setInfo(res);
        });
    }

    return (
        <>
            <Row gutter={16} style={{marginTop:'-70px'}}>
                <Col xs={12}>
                    <Typography.Title>Школа №32</Typography.Title>
                    {/*для бэка*/}
                    {/*<Typography.Title>{info?.name}</Typography.Title>*/}
                    <Row>
                        <Col xs={4}><Typography.Text style={{fontSize:'15px'}}><b>Address:</b></Typography.Text></Col>
                        {/*для бэка*/}
                        {/*<Col xs={20}><Typography.Text style={{fontSize:'15px'}}>{info?.region}</Typography.Text></Col>*/}
                        <Col xs={20}><Typography.Text style={{fontSize:'15px'}}>VKO</Typography.Text></Col>
                        <Col xs={4}><Typography.Text style={{fontSize:'15px'}}><b>Type:</b></Typography.Text></Col>
                        {/*для бэка*/}
                        {/*<Col xs={20}><Typography.Text style={{fontSize:'15px'}}>{info?.type}</Typography.Text></Col>*/}
                        <Col xs={20}><Typography.Text style={{fontSize:'15px'}}>General</Typography.Text></Col>
                        <Col xs={4}><Typography.Text style={{fontSize:'15px'}}><b>Status:</b></Typography.Text></Col>
                        {/*для бэка*/}
                        {/*<Col xs={20}><Typography.Text style={{fontSize:'15px'}}>{info?.status}</Typography.Text></Col>*/}
                        <Col xs={20}><Typography.Text style={{fontSize:'15px'}}>State</Typography.Text></Col>
                        <Col xs={4}><Typography.Text style={{fontSize:'15px'}}><b>Domain:</b></Typography.Text></Col>
                        {/*для бэка*/}
                        {/*<Col xs={20}><Typography.Text style={{fontSize:'15px'}}>{info?.domain}</Typography.Text></Col>*/}
                        <Col xs={20}><Typography.Text style={{fontSize:'15px'}}>122</Typography.Text></Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Button type={'primary'} style={{borderRadius: '20px', width: '130px', marginTop: '30px', float:'right'}}>
                        <Typography.Text style={{fontSize:'15px', color:'white'}}><b> <FormOutlined /> &nbsp; Edit</b></Typography.Text>
                    </Button>
                </Col>
            </Row>
            <div style={{marginTop:'50px'}}>
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
                        <Button type={'primary'} onClick={() =>setOpen(true)} style={{borderRadius: '20px', width: '110px', float:'right'}}>
                            Add people
                        </Button>
                    </Col>
                </Row>
            </div>
                {
                    key===1
                    &&
                    <>
                        <TeachersTable />
                        <AddTeacherModal
                            isOpen={open}
                            onClose={() => setOpen(false)}
                        />
                    </>
                }
                {
                    key===2
                    &&
                    <>
                        <PsychologistTable />
                        <AddPsychologistModal
                            isOpen={open}
                            onClose={() => setOpen(false)}
                        />
                    </>
                }
                {
                    key===3
                    &&
                    <>
                        <StudentTable />
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
