import React from 'react';
import {Card, Col, Row} from "antd";

const GuardianTab = () => {
    return (
        <Card>
            <Row gutter={16}>
                <Col xs={12}>
                   <Row gutter={12}>
                       <Col xs={24}><b>Guardian:</b></Col>
                       <Col xs={24}><b>Guardian relationship:</b></Col>
                       <Col xs={24}><b>Guardian is number:</b></Col>
                       <Col xs={24}><b>Guardian is email:</b></Col>
                       <Col xs={24}><b>Guardian is job:</b></Col>
                   </Row>
                </Col>
                <div className="vertical-line"></div>
                <Col xs={12}>
                    <Col xs={24}>Full name</Col>
                    <Col xs={24}>Father</Col>
                    <Col xs={24}>7777777</Col>
                    <Col xs={24}>uen@mail.ru</Col>
                    <Col xs={24}>BIGroup</Col>
                </Col>
            </Row>
        </Card>
    );
};

export default GuardianTab;
