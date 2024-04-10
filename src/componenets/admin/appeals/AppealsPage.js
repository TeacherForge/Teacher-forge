import React from 'react';
import {Card, Checkbox, Col, Row, Typography, Image} from "antd";
// import {
//     DeleteIcon,
//     FiltrationIcon,
//     LeftIcon,
//     LetterIcon,
//     OpenLetterIcon,
//     RightIcon,
//     UpdateIcon
// } from "../../icons/Index.";

const AppealsPage = () => {

    const circleStyle = {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        width: '100%',
        height: '100%',
        padding: '4px',
        marginTop:'10px'
    };

    const styleDivider = {
        borderLeft: '1px solid #909090',
        height: '40px'
    };


    return (
        <>
            <Typography.Title level={2}>Mail for appeals</Typography.Title>
            <Card>
                <Row gutter={16} style={{marginLeft: '9px'}}>
                    <Col xs={24} lg={12}>
                        <Row gutter={16}>
                            <Col>
                                <input type={'checkbox'} style={{width:'90%', height:'90%', marginTop: '-1px'}} />
                            </Col>
                            <Col>
                                {/*<UpdateIcon />*/}
                            </Col>
                            <Col>
                                {/*<DeleteIcon />*/}
                            </Col>
                            <Col>
                                {/*<OpenLetterIcon />*/}
                            </Col>
                            <Col>
                                {/*<LetterIcon />*/}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} lg={12} style={{display:'flex', justifyContent: 'flex-end'}}>
                        <Row gutter={24}>
                            <Col>
                                1-10 of 1,435
                            </Col>
                            <Col>
                                {/*<LeftIcon />*/}
                                &nbsp;
                                &nbsp;
                                {/*<RightIcon />*/}
                            </Col>
                            <Col>
                                {/*<FiltrationIcon />*/}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div style={circleStyle}>
                    <Row>
                        <Col xs={24} lg={1}>
                            <input type={'checkbox'} style={{width:'50%', height:'50%',marginLeft: '15px', marginTop:'10px'}} />
                        </Col>
                        <Col xs={24} lg={6}>
                            <b>Сакен Амир Ренатович, Школа №30</b>
                            <br />
                            ВКО, г.Алматы, ул. Чехова 48
                        </Col>
                        <Col xs={24} lg={2}>
                            <div className="vl" style={styleDivider}></div>
                        </Col>
                        <Col xs={24} lg={10}>
                            <b>Заголовок</b>
                            <br />
                            Текст текст текст текст текст текст текст текст текст текст текст текст...
                        </Col>
                        <Col xs={24} lg={4}>
                            <div style={{textAlign: 'center'}}>
                                03.03.3030
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        </>
    );
};

export default AppealsPage;
