import React from 'react';
import {Card, Col, Divider, Form, Input, Row} from "antd";

const GuardianTab = ({institutions}) => {

    if (!institutions) return(<Card style={{marginTop: '-20px', textAlign: 'center'}}>Нет данных</Card>);
    

    const CardMap = (item) => {
        return (
            <Card>
                <Row gutter={[16, 16]}>
                    <Col xs={10}>
                        <Row gutter={[12, 12]}>
                            {
                                item.orphan === true
                                ?
                                    <>
                                        <Col xs={24}><b>Institutions:</b></Col>
                                        <Col xs={24}><b>Institutions is number:</b></Col>
                                        <Col xs={24}><b>Institutions is email:</b></Col>
                                        <Col xs={24}><b>Institutions is address:</b></Col>
                                        <Col xs={24}><b>Governess Name:</b></Col>
                                    </>
                                    :
                                    <>
                                        <Col xs={24}><b>Guardian:</b></Col>
                                        <Col xs={24}><b>Guardian is number:</b></Col>
                                        <Col xs={24}><b>Guardian is email:</b></Col>
                                        <Col xs={24}><b>Guardian is job:</b></Col>
                                        <Col xs={24}><b>Guardian is address:</b></Col>
                                    </>
                            }
                        </Row>
                    </Col>
                    <Col xs={2}>
                        <Divider type="vertical" style={{height: '160px'}}/>
                    </Col>
                    <Col xs={12}>
                        <Row gutter={[12, 12]}>
                            <Col xs={24}>{item?.item?.name ?? ''}</Col>
                            <Col xs={24}>{item?.item?.number ?? ''}</Col>
                            <Col xs={24}>{item?.item?.email ?? ''}</Col>
                            {
                                item.orphan === false
                                &&
                                <Col xs={24}>{item?.item?.job ?? ''}</Col>
                            }
                            <Col xs={24}>{item?.item?.address ?? ''}</Col>
                            <Col xs={24}>{item?.item?.governessName ?? ''}</Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card style={{marginTop: '-20px'}}>
            <Row gutter={16}>
                {
                    institutions && institutions.length > 0 && institutions?.map((item) => {
                        return (
                            <Col xs={12}>
                                <CardMap item={item}/>
                            </Col>
                        )
                    })
                }
            </Row>
        </Card>
        
    );
};

export default GuardianTab;
