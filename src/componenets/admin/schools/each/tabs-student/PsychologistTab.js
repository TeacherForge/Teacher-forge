import React from 'react';
import {Card, Col, Divider, Form, Input, Row} from 'antd';

const PsychologistTab = ({psychologyDetails, isEditPsychologist, form}) => {

    if (!psychologyDetails) return(<Card style={{marginTop: '-20px', textAlign: 'center'}}>Нет данных</Card>);

    const circleStyle = {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        width: '100%',
        height: '50px',
        marginTop: '15px'
    };

    const jsonMap = [
        {
            title: 'Diligence in studies:',
            text: psychologyDetails?.diligence ?? '',
            name: 'diligence'
        },
        {
            title: 'Sociality:',
            text: psychologyDetails?.sociality ?? '',
            name: 'sociality'
        },
        {
            title: 'Decency:',
            text: psychologyDetails?.decency ?? '',
            name: 'decency'
        },
        {
            title: 'Personality:',
            text: psychologyDetails?.personality ?? '',
            name: 'personality'
        }
    ];

    const jsonMapCognitiveProper = [
        {
            title: 'Memory:',
            text: psychologyDetails?.memory ?? '',
            name: 'memory'
        },
        {
            title: 'Mind:',
            text: psychologyDetails?.mind ?? '',
            name: 'mind'
        },
        {
            title: 'Observation and analysis:',
            text: psychologyDetails?.observation ?? '',
            name: 'observation'
        },
        {
            title: 'Attentiveness:',
            text: psychologyDetails?.attentiveness ?? '',
            name: 'attentiveness'
        }
    ];

    return (
        <Card style={{marginTop: '-20px'}}>
            <div style={{marginTop: '20px'}}>
                <Row>
                    <Col xs={1}>
                        <div style={{writingMode: 'vertical-rl', transform: 'scale(-1)', letterSpacing: '15px'}}>
                            Psychology
                        </div>
                    </Col>

                    <Col xs={23}>
                        <Form form={form}>
                            {
                                jsonMap.map((json) => {
                                    return (
                                        <div style={circleStyle}>
                                            <Row gutter={16} style={{margin: '10px'}}>
                                                <Col xs={6} style={{marginTop: '10px'}}>
                                                    <b>
                                                        {json.title}
                                                    </b>
                                                </Col>
                                                <Col xs={2} style={{marginTop: '10px'}}>
                                                    <Divider type={'vertical'}/>
                                                </Col>
                                                <Col xs={16} style={{marginTop: '10px'}}>
                                                    {
                                                        isEditPsychologist === true
                                                            ?
                                                            <Form.Item name={json.name}>
                                                                <Input/>
                                                            </Form.Item>
                                                            :
                                                            json.text
                                                    }
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </Form>
                    </Col>
                </Row>
                <div style={{marginTop: '50px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <hr style={{width: '80%'}}/>
                </div>
                <Row style={{marginTop: '15px'}}>
                    <Col xs={1}>
                        <div style={{writingMode: 'vertical-rl', transform: 'scale(-1)', letterSpacing: '5px'}}>
                            Cognitive properties
                        </div>
                    </Col>
                    <Col xs={23}>
                        <Form form={form}>
                            {
                                jsonMapCognitiveProper.map((json) => {
                                    return (
                                        <div style={circleStyle}>
                                            <Row gutter={16} style={{margin: '10px'}}>
                                                <Col xs={6} style={{marginTop: '10px'}}>
                                                    <b>
                                                        {json.title}
                                                    </b>
                                                </Col>
                                                <Col xs={2} style={{marginTop: '10px'}}>
                                                    <Divider type={'vertical'}/>
                                                </Col>
                                                <Col xs={16} style={{marginTop: '10px'}}>
                                                    {
                                                        isEditPsychologist === true
                                                            ?
                                                            <Form.Item name={json.name}>
                                                                <Input/>
                                                            </Form.Item>
                                                            :
                                                            json.text
                                                    }
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </Form>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default PsychologistTab;
