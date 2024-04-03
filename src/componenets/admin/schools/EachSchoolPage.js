import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Col, Row, Tabs, Typography} from "antd";
import '../schools/table.css'
const EachSchoolPage = () => {

    const {id} = useParams();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Row gutter={16}>
                <Col xs={12}>
                    <Typography.Title>Школа №32</Typography.Title>
                    <Row>
                        <Col xs={4}>Address:</Col>
                        <Col xs={20}>VKO</Col>
                        <Col xs={4}>Type:</Col>
                        <Col xs={20}>General</Col>
                        <Col xs={4}>Status:</Col>
                        <Col xs={20}>State</Col>
                        <Col xs={4}>Domain:</Col>
                        <Col xs={20}>uierfuh</Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Button type={'primary'} style={{borderRadius: '20px', width: '200px', marginTop: '30px'}}
                            onClick={() => setOpen(true)}>
                        Edit
                    </Button>
                </Col>
               <div style={{marginTop:'50px'}}>
                   <Tabs
                       type="card"
                       items={[
                           {
                               label: 'Teachers',
                               key: 1,
                               children: 'ewfhj',
                           },
                           {
                               label: 'Psychologist',
                               key: 2,
                               children: 'eufhd',
                           },
                           {
                               label: 'Students',
                               key: 3,
                               children: 'rg8hijn',
                           }
                       ]}
                       size={"large"}
                   />
               </div>
            </Row>
        </>
    );
};

export default EachSchoolPage;
