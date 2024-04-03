import React from 'react';
import {Card, Col, Divider, Row} from "antd";

const GuardianTab = ({guardians}) => {

    if (!guardians) return(<Card style={{marginTop: '-20px', textAlign: 'center'}}>Нет данных</Card>);

    const CardMap = (item) => {
        return (
            <Card>
                <Row gutter={[16, 16]}>
                    <Col xs={10}>
                        <Row gutter={[12, 12]}>
                            <Col xs={24}><b>Guardian:</b></Col>
                            <Col xs={24}><b>Guardian relationship:</b></Col>
                            <Col xs={24}><b>Guardian is number:</b></Col>
                            <Col xs={24}><b>Guardian is email:</b></Col>
                            <Col xs={24}><b>Guardian is job:</b></Col>
                        </Row>
                    </Col>
                    <Col xs={2}>
                        <Divider type="vertical" style={{height: '160px'}}/>
                    </Col>
                    <Col xs={12}>
                        <Row gutter={[12, 12]}>
                            <Col xs={24}>{item?.name ?? ''}</Col>
                            <Col xs={24}>{item?.relation ?? ''}</Col>
                            <Col xs={24}>{item?.number ?? ''}</Col>
                            <Col xs={24}>{item?.email ?? ''}</Col>
                            <Col xs={24}>{item?.job ?? ''}</Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card style={{marginTop: '-20px'}}>
            <Row>
                {
                    guardians && guardians.length > 0 && guardians?.map((item) => {
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
